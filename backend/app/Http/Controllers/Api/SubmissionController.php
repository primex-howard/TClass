<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\Submission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SubmissionController extends Controller
{
    /**
     * Display a listing of submissions.
     */
    public function index(Request $request)
    {
        $query = Submission::with(['assignment.course', 'user']);

        // Filter by assignment
        if ($request->has('assignment_id')) {
            $query->where('assignment_id', $request->assignment_id);
        }

        // Filter by user
        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Get my submissions
        if ($request->has('my_submissions')) {
            $query->where('user_id', $request->user()->id);
        }

        // Get submissions for teacher's assignments
        if ($request->has('for_teacher')) {
            $user = $request->user();
            $assignmentIds = Assignment::whereHas('course', function ($q) use ($user) {
                $q->where('instructor_id', $user->id);
            })->pluck('id');
            $query->whereIn('assignment_id', $assignmentIds);
        }

        $submissions = $query->latest()->paginate($request->per_page ?? 10);

        return response()->json($submissions);
    }

    /**
     * Store a newly created submission.
     */
    public function store(Request $request)
    {
        $request->validate([
            'assignment_id' => 'required|exists:assignments,id',
            'content' => 'nullable|string',
            'file' => 'nullable|file|max:10240', // 10MB max
            'comments' => 'nullable|string',
        ]);

        $user = $request->user();
        $assignment = Assignment::findOrFail($request->assignment_id);

        // Check if already submitted
        $existingSubmission = Submission::where('assignment_id', $request->assignment_id)
            ->where('user_id', $user->id)
            ->first();

        if ($existingSubmission) {
            return response()->json([
                'message' => 'You have already submitted this assignment.',
            ], 422);
        }

        $filePath = null;
        $fileName = null;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $filePath = $file->store('submissions', 'public');
        }

        $submission = Submission::create([
            'assignment_id' => $request->assignment_id,
            'user_id' => $user->id,
            'content' => $request->content,
            'file_path' => $filePath,
            'file_name' => $fileName,
            'submitted_at' => now(),
            'status' => $assignment->due_date && now() > $assignment->due_date ? 'late' : 'submitted',
            'comments' => $request->comments,
        ]);

        $submission->load(['assignment.course', 'user']);

        return response()->json([
            'message' => 'Assignment submitted successfully',
            'submission' => $submission,
        ], 201);
    }

    /**
     * Display the specified submission.
     */
    public function show(Submission $submission)
    {
        $submission->load(['assignment.course', 'user', 'grade.grader']);

        return response()->json($submission);
    }

    /**
     * Update the specified submission.
     */
    public function update(Request $request, Submission $submission)
    {
        $request->validate([
            'content' => 'nullable|string',
            'comments' => 'nullable|string',
        ]);

        $submission->update($request->only(['content', 'comments']));

        return response()->json([
            'message' => 'Submission updated successfully',
            'submission' => $submission,
        ]);
    }

    /**
     * Remove the specified submission.
     */
    public function destroy(Submission $submission)
    {
        // Delete file if exists
        if ($submission->file_path) {
            Storage::disk('public')->delete($submission->file_path);
        }

        $submission->delete();

        return response()->json([
            'message' => 'Submission deleted successfully',
        ]);
    }

    /**
     * Return submission for revision.
     */
    public function returnSubmission(Submission $submission)
    {
        $submission->update(['status' => 'returned']);

        return response()->json([
            'message' => 'Submission returned to student',
            'submission' => $submission,
        ]);
    }

    /**
     * Download submission file.
     */
    public function download(Submission $submission)
    {
        if (!$submission->file_path) {
            return response()->json([
                'message' => 'No file attached to this submission.',
            ], 404);
        }

        return Storage::disk('public')->download($submission->file_path, $submission->file_name);
    }
}
