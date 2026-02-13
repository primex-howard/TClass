<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    /**
     * Display a listing of programs.
     */
    public function index(Request $request)
    {
        $query = Program::query();

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        } else {
            $query->where('status', 'active');
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $programs = $query->paginate($request->per_page ?? 10);

        return response()->json($programs);
    }

    /**
     * Store a newly created program.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'required|string',
            'duration' => 'required|string|max:100',
            'slots' => 'nullable|string|max:100',
            'price' => 'nullable|numeric',
            'scholarship' => 'nullable|string',
            'requirements' => 'nullable|array',
            'qualifications' => 'nullable|array',
            'doc_requirements' => 'nullable|array',
            'image' => 'nullable|string',
            'status' => 'nullable|in:active,inactive,draft',
        ]);

        $program = Program::create($request->all());

        return response()->json([
            'message' => 'Program created successfully',
            'program' => $program,
        ], 201);
    }

    /**
     * Display the specified program.
     */
    public function show(Program $program)
    {
        return response()->json($program);
    }

    /**
     * Update the specified program.
     */
    public function update(Request $request, Program $program)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'category' => 'sometimes|string|max:100',
            'description' => 'sometimes|string',
            'duration' => 'sometimes|string|max:100',
            'slots' => 'nullable|string|max:100',
            'price' => 'nullable|numeric',
            'scholarship' => 'nullable|string',
            'requirements' => 'nullable|array',
            'qualifications' => 'nullable|array',
            'doc_requirements' => 'nullable|array',
            'image' => 'nullable|string',
            'status' => 'nullable|in:active,inactive,draft',
        ]);

        $program->update($request->all());

        return response()->json([
            'message' => 'Program updated successfully',
            'program' => $program,
        ]);
    }

    /**
     * Remove the specified program.
     */
    public function destroy(Program $program)
    {
        $program->delete();

        return response()->json([
            'message' => 'Program deleted successfully',
        ]);
    }

    /**
     * Get program categories.
     */
    public function categories()
    {
        $categories = Program::distinct()->pluck('category');

        return response()->json($categories);
    }
}
