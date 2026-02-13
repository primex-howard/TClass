<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\Course;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    /**
     * Display a listing of assignments.
     */
    public function index(Request $request)
    {
        $query = Assignment::with(['course']);

        // Filter by course
        if ($request->has('course_id')) {
            $query->where('course_id', $request->course_id);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Get assignments for student's enrolled courses
        if ($request->has('my_assignments')) {
            $user = $request->user();
            $courseIds = $user->enrollments()
                ->where('status', 'active')
                ->pluck('course_id')
                ->filter();
            $query->whereIn('course_id', $courseIds);
        }

        $assignments = $query->latest()->paginate($request->per_page ?? 10);

        return response()->json($assignments);
    }

    /**
     * Store a newly created assignment.
     */
    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'nullable|in:quiz,exam,homework,project,practical',
            'total_points' => 'nullable|integer',
            'due_date' => 'nullable|date',
            'status' => 'nullable|in:draft,published,archived',
        ]);

        $assignment = Assignment::create($request->all());
        $assignment->load('course');

        return response()->json([
            'message' => 'Assignment created successfully',
            'assignment' => $assignment,
        ], 201);
    }

    /**
     * Display the specified assignment.
     */
    public function show(Assignment $assignment)
    {
        $assignment->load(['course', 'submissions.user']);

        return response()->json($assignment);
    }

    /**
     * Update the specified assignment.
     */
    public function update(Request $request, Assignment $assignment)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'type' => 'nullable|in:quiz,exam,homework,project,practical',
            'total_points' => 'nullable|integer',
            'due_date' => 'nullable|date',
            'status' => 'nullable|in:draft,published,archived',
        ]);

        $assignment->update($request->all());
        $assignment->load('course');

        return response()->json([
            'message' => 'Assignment updated successfully',
            'assignment' => $assignment,
        ]);
    }

    /**
     * Remove the specified assignment.
     */
    public function destroy(Assignment $assignment)
    {
        $assignment->delete();

        return response()->json([
            'message' => 'Assignment deleted successfully',
        ]);
    }

    /**
     * Publish the assignment.
     */
    public function publish(Assignment $assignment)
    {
        $assignment->update(['status' => 'published']);

        return response()->json([
            'message' => 'Assignment published successfully',
            'assignment' => $assignment,
        ]);
    }
}
