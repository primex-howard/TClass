<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of courses.
     */
    public function index(Request $request)
    {
        $query = Course::with(['program', 'instructor']);

        // Filter by instructor
        if ($request->has('instructor_id')) {
            $query->where('instructor_id', $request->instructor_id);
        }

        // Filter by program
        if ($request->has('program_id')) {
            $query->where('program_id', $request->program_id);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Get my courses (for authenticated user)
        if ($request->has('my_courses')) {
            $user = $request->user();
            if ($user->isStudent()) {
                $query->whereHas('enrollments', function ($q) use ($user) {
                    $q->where('user_id', $user->id)->where('status', 'active');
                });
            } elseif ($user->isFaculty()) {
                $query->where('instructor_id', $user->id);
            }
        }

        $courses = $query->paginate($request->per_page ?? 10);

        return response()->json($courses);
    }

    /**
     * Store a newly created course.
     */
    public function store(Request $request)
    {
        $request->validate([
            'program_id' => 'required|exists:programs,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:courses',
            'description' => 'nullable|string',
            'schedule' => 'nullable|string',
            'room' => 'nullable|string',
            'capacity' => 'nullable|integer',
            'status' => 'nullable|in:active,inactive,completed',
        ]);

        $course = Course::create($request->all());
        $course->load(['program', 'instructor']);

        return response()->json([
            'message' => 'Course created successfully',
            'course' => $course,
        ], 201);
    }

    /**
     * Display the specified course.
     */
    public function show(Course $course)
    {
        $course->load(['program', 'instructor', 'students', 'assignments']);

        return response()->json($course);
    }

    /**
     * Update the specified course.
     */
    public function update(Request $request, Course $course)
    {
        $request->validate([
            'program_id' => 'sometimes|exists:programs,id',
            'name' => 'sometimes|string|max:255',
            'code' => 'sometimes|string|max:50|unique:courses,code,' . $course->id,
            'description' => 'nullable|string',
            'schedule' => 'nullable|string',
            'room' => 'nullable|string',
            'capacity' => 'nullable|integer',
            'status' => 'nullable|in:active,inactive,completed',
            'instructor_id' => 'nullable|exists:users,id',
        ]);

        $course->update($request->all());
        $course->load(['program', 'instructor']);

        return response()->json([
            'message' => 'Course updated successfully',
            'course' => $course,
        ]);
    }

    /**
     * Remove the specified course.
     */
    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json([
            'message' => 'Course deleted successfully',
        ]);
    }

    /**
     * Get students in a course.
     */
    public function students(Course $course)
    {
        $students = $course->students()->paginate(20);

        return response()->json($students);
    }
}
