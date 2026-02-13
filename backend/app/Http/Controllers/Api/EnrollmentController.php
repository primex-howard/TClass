<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Program;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    /**
     * Display a listing of enrollments.
     */
    public function index(Request $request)
    {
        $query = Enrollment::with(['user', 'program', 'course']);

        // Filter by user
        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        // Filter by current user
        if ($request->has('my_enrollments')) {
            $query->where('user_id', $request->user()->id);
        }

        // Filter by program
        if ($request->has('program_id')) {
            $query->where('program_id', $request->program_id);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $enrollments = $query->latest()->paginate($request->per_page ?? 10);

        return response()->json($enrollments);
    }

    /**
     * Store a newly created enrollment.
     */
    public function store(Request $request)
    {
        $request->validate([
            'program_id' => 'required|exists:programs,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'birth_date' => 'required|date',
            'education_level' => 'required|string',
            'address' => 'required|string',
            'documents' => 'nullable|array',
        ]);

        // Check if program exists and is active
        $program = Program::findOrFail($request->program_id);
        if ($program->status !== 'active') {
            return response()->json([
                'message' => 'This program is not currently accepting enrollments.',
            ], 422);
        }

        // Find or create user
        $user = \App\Models\User::firstOrCreate(
            ['email' => $request->email],
            [
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'password' => bcrypt('password123'), // Default password
                'phone' => $request->phone,
                'address' => $request->address,
                'birth_date' => $request->birth_date,
                'education_level' => $request->education_level,
                'status' => 'pending',
            ]
        );

        // Assign student role if not already assigned
        if (!$user->hasRole('student')) {
            $user->assignRole('student');
        }

        // Check if already enrolled
        $existingEnrollment = Enrollment::where('user_id', $user->id)
            ->where('program_id', $request->program_id)
            ->first();

        if ($existingEnrollment) {
            return response()->json([
                'message' => 'You are already enrolled in this program.',
                'enrollment' => $existingEnrollment,
            ], 422);
        }

        // Create enrollment
        $enrollment = Enrollment::create([
            'user_id' => $user->id,
            'program_id' => $request->program_id,
            'status' => 'pending',
            'enrolled_at' => now(),
            'cor_number' => Enrollment::generateCorNumber(),
            'documents' => $request->documents,
        ]);

        $enrollment->load(['user', 'program']);

        return response()->json([
            'message' => 'Enrollment successful!',
            'enrollment' => $enrollment,
            'cor_number' => $enrollment->cor_number,
        ], 201);
    }

    /**
     * Display the specified enrollment.
     */
    public function show(Enrollment $enrollment)
    {
        $enrollment->load(['user', 'program', 'course']);

        return response()->json($enrollment);
    }

    /**
     * Update the specified enrollment.
     */
    public function update(Request $request, Enrollment $enrollment)
    {
        $request->validate([
            'status' => 'sometimes|in:pending,active,completed,dropped',
            'course_id' => 'nullable|exists:courses,id',
            'documents' => 'nullable|array',
        ]);

        if ($request->has('status')) {
            $enrollment->status = $request->status;
            
            if ($request->status === 'completed' && !$enrollment->completed_at) {
                $enrollment->completed_at = now();
            }
        }

        if ($request->has('course_id')) {
            $enrollment->course_id = $request->course_id;
        }

        if ($request->has('documents')) {
            $enrollment->documents = $request->documents;
        }

        $enrollment->save();

        return response()->json([
            'message' => 'Enrollment updated successfully',
            'enrollment' => $enrollment->fresh(['user', 'program', 'course']),
        ]);
    }

    /**
     * Remove the specified enrollment.
     */
    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();

        return response()->json([
            'message' => 'Enrollment deleted successfully',
        ]);
    }

    /**
     * Approve enrollment (admin only).
     */
    public function approve(Enrollment $enrollment)
    {
        $enrollment->update([
            'status' => 'active',
        ]);

        // Activate user if pending
        if ($enrollment->user->status === 'pending') {
            $enrollment->user->update(['status' => 'active']);
        }

        return response()->json([
            'message' => 'Enrollment approved successfully',
            'enrollment' => $enrollment->fresh(['user', 'program']),
        ]);
    }

    /**
     * Reject enrollment (admin only).
     */
    public function reject(Enrollment $enrollment)
    {
        $enrollment->update([
            'status' => 'dropped',
        ]);

        return response()->json([
            'message' => 'Enrollment rejected',
            'enrollment' => $enrollment->fresh(['user', 'program']),
        ]);
    }

    /**
     * Get enrollment statistics.
     */
    public function statistics()
    {
        $stats = [
            'total' => Enrollment::count(),
            'pending' => Enrollment::where('status', 'pending')->count(),
            'active' => Enrollment::where('status', 'active')->count(),
            'completed' => Enrollment::where('status', 'completed')->count(),
            'dropped' => Enrollment::where('status', 'dropped')->count(),
            'this_month' => Enrollment::whereMonth('created_at', now()->month)->count(),
        ];

        return response()->json($stats);
    }
}
