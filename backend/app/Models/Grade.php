<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;

    protected $fillable = [
        'enrollment_id',
        'assignment_id',
        'submission_id',
        'user_id',
        'score',
        'total_points',
        'feedback',
        'graded_by',
        'graded_at',
    ];

    protected $casts = [
        'graded_at' => 'datetime',
        'score' => 'decimal:2',
    ];

    /**
     * Get the enrollment that owns the grade.
     */
    public function enrollment()
    {
        return $this->belongsTo(Enrollment::class);
    }

    /**
     * Get the assignment that owns the grade.
     */
    public function assignment()
    {
        return $this->belongsTo(Assignment::class);
    }

    /**
     * Get the submission that owns the grade.
     */
    public function submission()
    {
        return $this->belongsTo(Submission::class);
    }

    /**
     * Get the user (student) that received the grade.
     */
    public function student()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the user (teacher) that gave the grade.
     */
    public function grader()
    {
        return $this->belongsTo(User::class, 'graded_by');
    }

    /**
     * Get the percentage score.
     */
    public function getPercentageAttribute(): float
    {
        if ($this->total_points == 0) return 0;
        return round(($this->score / $this->total_points) * 100, 2);
    }
}
