<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Login user and create token.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'role' => 'required|in:student,faculty,admin',
        ]);

        // Explicitly set the guard
        Auth::shouldUse('web');

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Check if user has the requested role
        if (!$user->hasRole($request->role)) {
            throw ValidationException::withMessages([
                'role' => ['You do not have permission to login as ' . $request->role . '.'],
            ]);
        }

        $token = $user->createToken('auth-token', [$request->role])->plainTextToken;

        return response()->json([
            'user' => $this->formatUser($user),
            'token' => $token,
            'role' => $request->role,
        ]);
    }

    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'education_level' => 'nullable|string',
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'birth_date' => $request->birth_date,
            'education_level' => $request->education_level,
            'status' => 'active',
        ]);

        // Assign student role by default
        $user->assignRole('student');

        $token = $user->createToken('auth-token', ['student'])->plainTextToken;

        return response()->json([
            'user' => $this->formatUser($user),
            'token' => $token,
            'role' => 'student',
        ], 201);
    }

    /**
     * Logout user (revoke token).
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    /**
     * Get the authenticated user.
     */
    public function user(Request $request)
    {
        return response()->json([
            'user' => $this->formatUser($request->user()),
        ]);
    }

    /**
     * Update user profile.
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'education_level' => 'nullable|string',
            'avatar' => 'nullable|string',
        ]);

        $user->update($request->only([
            'first_name', 'last_name', 'phone', 'address',
            'birth_date', 'education_level', 'avatar'
        ]));

        return response()->json([
            'user' => $this->formatUser($user),
            'message' => 'Profile updated successfully',
        ]);
    }

    /**
     * Change password.
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The current password is incorrect.'],
            ]);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Password changed successfully',
        ]);
    }

    /**
     * Format user data for response.
     */
    private function formatUser(User $user): array
    {
        return [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'full_name' => $user->full_name,
            'email' => $user->email,
            'phone' => $user->phone,
            'address' => $user->address,
            'birth_date' => $user->birth_date,
            'education_level' => $user->education_level,
            'avatar' => $user->avatar,
            'status' => $user->status,
            'initials' => $user->initials,
            'roles' => $user->roles->pluck('name'),
            'created_at' => $user->created_at,
        ];
    }
}
