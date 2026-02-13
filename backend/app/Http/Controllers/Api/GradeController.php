<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use App\Models\Submission;
use Illuminate\Http\Request;

class GradeController extends Controller
{
    /**
     * Display a listing of grades.
     */
    public function index(Request $request)
    {
        $query = Grade::with(['student', 'assignment.course', 'grader', 'enrollment']);

        // Filter by student
        if ($request->has('student_id')) {
            $query->where('user_id', $request->student_id);
        }

        // Filter by assignment
        if ($request->has('assignment_id')) {
            $query->where('assignment_id', $request->assignment_id);
        }

        // Get my grades
        if ($request->has('my_grades')) {
            $query->where('user_id', $request->user()->id);
        }

        $grades = $query->latest()->paginate($request->per_page ?? 10);

        return response()->json($grades);
    }

    /**
     * Store a newly created grade.
     */
    public function store(Request $request)
    {
        $request->validate([
            'enrollment_id' => 'required|exists:enrollments,id',
            'assignment_id' => 'required|exists:assignments,id',
            'submission_id' => 'nullable|exists:submissions,id',
            'user_id' => 'required|exists:users,id',
            'score' => 'required|numeric|min:0',
            'total_points' => 'nullable|integer',
            'feedback' => 'nullable|string',
        ]);

        $user = $request->user();

        // Check if grade already exists
        $existingGrade = Grade::where('assignment_id', $request->assignment_id)
            ->where('user_id', $request->user_id)
            ->first();

        if ($existingGrade) {
            return response()->json([
                'message' => 'Grade already exists for this assignment.',
            ], 422);
        }

        $grade = Grade::create([
            'enrollment_id' => $request->enrollment_id,
            'assignment_id' => $request->assignment_id,
            'submission_id' => $request->submission_id,
            'user_id' => $request->user_id,
            'score' => $request->score,
            'total_points' => $request->total_points ?? 100,
            'feedback' => $request->feedback,
            'graded_by' => $user->id,
            'graded_at' => now(),
        ]);

        // Update submission status if provided
        if ($request->submission_id) {
            Submission::where('id', $request->submission_id)->update(['status' => 'graded']);
        }

        $grade->load(['student', 'assignment.course', 'grader']);

        return response()->json([
            'message' => 'Grade saved successfully',
            'grade' => $grade,
        ], 201);
    }

    /**
     * Display the specified grade.
     */
    public function show(Grade $grade)
    {
        $grade->load(['student', 'assignment.course', 'grader']);

        return response()->json($grade);
    }

    /**
     * Update the specified grade.
     */
    public function update(Request $request, Grade $grade)
    {
        $request->validate([
            'score' => 'sometimes|numeric|min:0',
            'total_points' => 'nullable|integer',
            'feedback' => 'nullable|string',
        ]);

        $grade->update([
            'score' => $request->score ?? $grade->score,
            'total_points' => $request->total_points ?? $grade->total_points,
            'feedback' => $request->feedback ?? $grade->feedback,
            'graded_by' => $request->user()->id,
            'graded_at' => now(),
        ]);

        $grade->load(['student', 'assignment.course', 'grader']);

        return response()->json([
            'message' => 'Grade updated successfully',
            'grade' => $grade,
        ]);
    }

    /**
     * Remove the specified grade.
     */
    public function destroy(Grade $grade)
    {
        $grade->delete();

        return response()->json([
            'message' => 'Grade deleted successfully',
        ]);
    }

    /**
     * Get grade statistics for a student.
     */
    public function studentStats(Request $request, $studentId)
    {
        $grades = Grade::where('user_id', $studentId)->get();

        $stats = [
            'total_graded' => $grades->count(),
            'average_score' => $grades->avg('percentage'),
            'highest_score' => $grades->max('percentage'),
            'lowest_score' => $grades->min('percentage'),
            'passing_rate' => $grades->where('percentage', '>=', 75)->count() / max($grades->count(), 1) * 100,
        ];

        return response()->json($stats);
    }
}
