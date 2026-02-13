<?php

use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\AssignmentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\EnrollmentController;
use App\Http\Controllers\Api\GradeController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\SubmissionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/enroll', [EnrollmentController::class, 'store']);

// Public programs
Route::get('/programs', [ProgramController::class, 'index']);
Route::get('/programs/categories', [ProgramController::class, 'categories']);
Route::get('/programs/{program}', [ProgramController::class, 'show']);

// Protected routes
Route::middleware(['auth:sanctum'])->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);
    Route::post('/user/change-password', [AuthController::class, 'changePassword']);

    // Dashboard
    Route::get('/dashboard/student', [DashboardController::class, 'student']);
    Route::get('/dashboard/faculty', [DashboardController::class, 'faculty']);
    Route::get('/dashboard/admin', [DashboardController::class, 'admin']);

    // Courses
    Route::get('/courses', [CourseController::class, 'index']);
    Route::post('/courses', [CourseController::class, 'store'])->middleware('role:admin|faculty');
    Route::get('/courses/{course}', [CourseController::class, 'show']);
    Route::put('/courses/{course}', [CourseController::class, 'update'])->middleware('role:admin|faculty');
    Route::delete('/courses/{course}', [CourseController::class, 'destroy'])->middleware('role:admin');
    Route::get('/courses/{course}/students', [CourseController::class, 'students']);

    // Enrollments
    Route::get('/enrollments', [EnrollmentController::class, 'index']);
    Route::get('/enrollments/statistics', [EnrollmentController::class, 'statistics'])->middleware('role:admin');
    Route::get('/enrollments/{enrollment}', [EnrollmentController::class, 'show']);
    Route::put('/enrollments/{enrollment}', [EnrollmentController::class, 'update'])->middleware('role:admin');
    Route::delete('/enrollments/{enrollment}', [EnrollmentController::class, 'destroy'])->middleware('role:admin');
    Route::post('/enrollments/{enrollment}/approve', [EnrollmentController::class, 'approve'])->middleware('role:admin');
    Route::post('/enrollments/{enrollment}/reject', [EnrollmentController::class, 'reject'])->middleware('role:admin');

    // Assignments
    Route::get('/assignments', [AssignmentController::class, 'index']);
    Route::post('/assignments', [AssignmentController::class, 'store'])->middleware('role:admin|faculty');
    Route::get('/assignments/{assignment}', [AssignmentController::class, 'show']);
    Route::put('/assignments/{assignment}', [AssignmentController::class, 'update'])->middleware('role:admin|faculty');
    Route::delete('/assignments/{assignment}', [AssignmentController::class, 'destroy'])->middleware('role:admin|faculty');
    Route::post('/assignments/{assignment}/publish', [AssignmentController::class, 'publish'])->middleware('role:admin|faculty');

    // Submissions
    Route::get('/submissions', [SubmissionController::class, 'index']);
    Route::post('/submissions', [SubmissionController::class, 'store']);
    Route::get('/submissions/{submission}', [SubmissionController::class, 'show']);
    Route::put('/submissions/{submission}', [SubmissionController::class, 'update']);
    Route::delete('/submissions/{submission}', [SubmissionController::class, 'destroy']);
    Route::post('/submissions/{submission}/return', [SubmissionController::class, 'returnSubmission'])->middleware('role:admin|faculty');
    Route::get('/submissions/{submission}/download', [SubmissionController::class, 'download']);

    // Grades
    Route::get('/grades', [GradeController::class, 'index']);
    Route::post('/grades', [GradeController::class, 'store'])->middleware('role:admin|faculty');
    Route::get('/grades/{grade}', [GradeController::class, 'show']);
    Route::put('/grades/{grade}', [GradeController::class, 'update'])->middleware('role:admin|faculty');
    Route::delete('/grades/{grade}', [GradeController::class, 'destroy'])->middleware('role:admin|faculty');
    Route::get('/students/{student}/grades/stats', [GradeController::class, 'studentStats']);

    // Announcements
    Route::get('/announcements', [AnnouncementController::class, 'index']);
    Route::post('/announcements', [AnnouncementController::class, 'store'])->middleware('role:admin|faculty');
    Route::get('/announcements/{announcement}', [AnnouncementController::class, 'show']);
    Route::put('/announcements/{announcement}', [AnnouncementController::class, 'update'])->middleware('role:admin|faculty');
    Route::delete('/announcements/{announcement}', [AnnouncementController::class, 'destroy'])->middleware('role:admin');
    Route::post('/announcements/{announcement}/toggle-pin', [AnnouncementController::class, 'togglePin'])->middleware('role:admin');

    // Users (Admin only)
    Route::get('/users', [UserController::class, 'index'])->middleware('role:admin');
    Route::get('/users/statistics', [UserController::class, 'statistics'])->middleware('role:admin');
    Route::post('/users', [UserController::class, 'store'])->middleware('role:admin');
    Route::get('/users/{user}', [UserController::class, 'show'])->middleware('role:admin');
    Route::put('/users/{user}', [UserController::class, 'update'])->middleware('role:admin');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->middleware('role:admin');
    Route::get('/users/role/{role}', [UserController::class, 'byRole'])->middleware('role:admin');

    // Departments (Admin only)
    Route::get('/departments', [DepartmentController::class, 'index']);
    Route::get('/departments/statistics', [DepartmentController::class, 'statistics'])->middleware('role:admin');
    Route::post('/departments', [DepartmentController::class, 'store'])->middleware('role:admin');
    Route::get('/departments/{department}', [DepartmentController::class, 'show']);
    Route::put('/departments/{department}', [DepartmentController::class, 'update'])->middleware('role:admin');
    Route::delete('/departments/{department}', [DepartmentController::class, 'destroy'])->middleware('role:admin');

    // Programs (Admin only for create/update/delete)
    Route::post('/programs', [ProgramController::class, 'store'])->middleware('role:admin');
    Route::put('/programs/{program}', [ProgramController::class, 'update'])->middleware('role:admin');
    Route::delete('/programs/{program}', [ProgramController::class, 'destroy'])->middleware('role:admin');
});
