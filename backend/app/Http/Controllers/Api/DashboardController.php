<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Submission;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Get student dashboard data.
     */
    public function student(Request $request)
    {
        $user = $request->user();

        // Get enrolled courses
        $enrolledCourseIds = $user->enrollments()
            ->where('status', 'active')
            ->whereNotNull('course_id')
            ->pluck('course_id');

        $courses = Course::whereIn('id', $enrolledCourseIds)
            ->with('instructor')
            ->get()
            ->map(function ($course) use ($user) {
                // Calculate progress based on completed assignments
                $totalAssignments = $course->assignments()->count();
                $completedAssignments = Submission::where('user_id', $user->id)
                    ->whereIn('assignment_id', $course->assignments()->pluck('id'))
                    ->count();
                $course->progress = $totalAssignments > 0 
                    ? round(($completedAssignments / $totalAssignments) * 100) 
                    : 0;
                return $course;
            });

        // Get upcoming assignments
        $assignments = Assignment::whereIn('course_id', $enrolledCourseIds)
            ->where('status', 'published')
            ->where('due_date', '>=', now())
            ->with('course')
            ->orderBy('due_date')
            ->take(5)
            ->get();

        // Get recent submissions
        $submissions = Submission::where('user_id', $user->id)
            ->with(['assignment.course'])
            ->latest()
            ->take(5)
            ->get();

        // Get stats
        $stats = [
            'enrolled_courses' => $courses->count(),
            'pending_assignments' => Assignment::whereIn('course_id', $enrolledCourseIds)
                ->where('status', 'published')
                ->whereNotIn('id', $submissions->pluck('assignment_id'))
                ->count(),
            'completed_assignments' => Submission::where('user_id', $user->id)->count(),
            'average_grade' => \App\Models\Grade::where('user_id', $user->id)->avg('percentage') ?? 0,
        ];

        return response()->json([
            'courses' => $courses,
            'assignments' => $assignments,
            'submissions' => $submissions,
            'stats' => $stats,
        ]);
    }

    /**
     * Get faculty dashboard data.
     */
    public function faculty(Request $request)
    {
        $user = $request->user();

        // Get taught courses
        $courses = Course::where('instructor_id', $user->id)
            ->withCount('students')
            ->get();

        // Get recent submissions for grading
        $submissions = Submission::whereHas('assignment.course', function ($q) use ($user) {
                $q->where('instructor_id', $user->id);
            })
            ->where('status', 'submitted')
            ->with(['user', 'assignment.course'])
            ->latest()
            ->take(10)
            ->get();

        // Get pending grading assignments
        $pendingGrading = Assignment::whereHas('course', function ($q) use ($user) {
                $q->where('instructor_id', $user->id);
            })
            ->withCount(['submissions' => function ($q) {
                $q->where('status', 'submitted');
            }])
            ->get()
            ->filter(function ($assignment) {
                return $assignment->submissions_count > 0;
            })
            ->take(5);

        // Get stats
        $stats = [
            'total_courses' => $courses->count(),
            'total_students' => $courses->sum('students_count'),
            'to_grade' => $submissions->count(),
            'average_pass_rate' => 87, // Placeholder - calculate from actual data
        ];

        return response()->json([
            'courses' => $courses,
            'submissions' => $submissions,
            'pending_grading' => $pendingGrading,
            'stats' => $stats,
        ]);
    }

    /**
     * Get admin dashboard data.
     */
    public function admin(Request $request)
    {
        // Get recent users
        $recentUsers = User::latest()
            ->take(5)
            ->get();

        // Get pending enrollments
        $pendingEnrollments = Enrollment::where('status', 'pending')
            ->with(['user', 'program'])
            ->take(5)
            ->get();

        // Get stats
        $stats = [
            'total_students' => User::role('student')->count(),
            'total_faculty' => User::role('faculty')->count(),
            'total_courses' => Course::count(),
            'total_departments' => \App\Models\Department::count(),
            'pending_enrollments' => Enrollment::where('status', 'pending')->count(),
            'active_enrollments' => Enrollment::where('status', 'active')->count(),
        ];

        // Enrollment trends (last 6 months)
        $enrollmentTrends = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $enrollmentTrends[] = [
                'month' => $date->format('M'),
                'count' => Enrollment::whereMonth('created_at', $date->month)
                    ->whereYear('created_at', $date->year)
                    ->count(),
            ];
        }

        return response()->json([
            'recent_users' => $recentUsers,
            'pending_enrollments' => $pendingEnrollments,
            'stats' => $stats,
            'enrollment_trends' => $enrollmentTrends,
        ]);
    }
}
