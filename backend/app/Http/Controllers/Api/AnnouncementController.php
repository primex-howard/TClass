<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of announcements.
     */
    public function index(Request $request)
    {
        $query = Announcement::with('author');

        // Filter by type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filter by target audience
        if ($request->has('target_audience')) {
            $query->where('target_audience', $request->target_audience);
        }

        // Show only active
        if ($request->has('active')) {
            $query->active();
        }

        // Get relevant announcements for current user
        if ($request->has('for_me')) {
            $user = $request->user();
            $query->where(function ($q) use ($user) {
                $q->where('target_audience', 'all');
                if ($user->isStudent()) {
                    $q->orWhere('target_audience', 'students');
                }
                if ($user->isFaculty()) {
                    $q->orWhere('target_audience', 'faculty');
                }
                if ($user->isAdmin()) {
                    $q->orWhere('target_audience', 'admins');
                }
            });
        }

        $announcements = $query->orderBy('is_pinned', 'desc')
            ->latest()
            ->paginate($request->per_page ?? 10);

        return response()->json($announcements);
    }

    /**
     * Store a newly created announcement.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => 'nullable|in:general,academic,announcement,deadline,event',
            'target_audience' => 'nullable|in:all,students,faculty,admins',
            'is_pinned' => 'nullable|boolean',
            'published_at' => 'nullable|date',
            'expires_at' => 'nullable|date',
        ]);

        $announcement = Announcement::create([
            'user_id' => $request->user()->id,
            'title' => $request->title,
            'content' => $request->content,
            'type' => $request->type ?? 'general',
            'target_audience' => $request->target_audience ?? 'all',
            'is_pinned' => $request->is_pinned ?? false,
            'published_at' => $request->published_at ?? now(),
            'expires_at' => $request->expires_at,
        ]);

        $announcement->load('author');

        return response()->json([
            'message' => 'Announcement created successfully',
            'announcement' => $announcement,
        ], 201);
    }

    /**
     * Display the specified announcement.
     */
    public function show(Announcement $announcement)
    {
        $announcement->load('author');

        return response()->json($announcement);
    }

    /**
     * Update the specified announcement.
     */
    public function update(Request $request, Announcement $announcement)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'type' => 'nullable|in:general,academic,announcement,deadline,event',
            'target_audience' => 'nullable|in:all,students,faculty,admins',
            'is_pinned' => 'nullable|boolean',
            'published_at' => 'nullable|date',
            'expires_at' => 'nullable|date',
        ]);

        $announcement->update($request->all());
        $announcement->load('author');

        return response()->json([
            'message' => 'Announcement updated successfully',
            'announcement' => $announcement,
        ]);
    }

    /**
     * Remove the specified announcement.
     */
    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return response()->json([
            'message' => 'Announcement deleted successfully',
        ]);
    }

    /**
     * Toggle pin status.
     */
    public function togglePin(Announcement $announcement)
    {
        $announcement->update(['is_pinned' => !$announcement->is_pinned]);

        return response()->json([
            'message' => $announcement->is_pinned ? 'Announcement pinned' : 'Announcement unpinned',
            'announcement' => $announcement,
        ]);
    }
}
