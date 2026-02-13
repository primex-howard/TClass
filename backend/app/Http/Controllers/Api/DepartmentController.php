<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of departments.
     */
    public function index(Request $request)
    {
        $query = Department::with('head');

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $departments = $query->paginate($request->per_page ?? 10);

        return response()->json($departments);
    }

    /**
     * Store a newly created department.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:departments',
            'description' => 'nullable|string',
            'head_id' => 'nullable|exists:users,id',
            'status' => 'nullable|in:active,inactive',
        ]);

        $department = Department::create($request->all());
        $department->load('head');

        return response()->json([
            'message' => 'Department created successfully',
            'department' => $department,
        ], 201);
    }

    /**
     * Display the specified department.
     */
    public function show(Department $department)
    {
        $department->load(['head', 'faculty', 'courses']);

        return response()->json($department);
    }

    /**
     * Update the specified department.
     */
    public function update(Request $request, Department $department)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'code' => 'sometimes|string|max:50|unique:departments,code,' . $department->id,
            'description' => 'nullable|string',
            'head_id' => 'nullable|exists:users,id',
            'status' => 'nullable|in:active,inactive',
        ]);

        $department->update($request->all());
        $department->load('head');

        return response()->json([
            'message' => 'Department updated successfully',
            'department' => $department,
        ]);
    }

    /**
     * Remove the specified department.
     */
    public function destroy(Department $department)
    {
        $department->delete();

        return response()->json([
            'message' => 'Department deleted successfully',
        ]);
    }

    /**
     * Get department statistics.
     */
    public function statistics()
    {
        $stats = [
            'total_departments' => Department::count(),
            'active_departments' => Department::where('status', 'active')->count(),
            'with_heads' => Department::whereNotNull('head_id')->count(),
        ];

        return response()->json($stats);
    }
}
