<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'program_id',
        'instructor_id',
        'name',
        'code',
        'description',
        'schedule',
        'room',
        'capacity',
        'status',
    ];

    /**
     * Get the program that owns the course.
     */
    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    /**
     * Get the instructor teaching this course.
     */
    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    /**
     * Get the enrollments for this course.
     */
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    /**
     * Get the students enrolled in this course.
     */
    public function students()
    {
        return $this->belongsToMany(User::class, 'enrollments')
            ->wherePivot('status', 'active');
    }

    /**
     * Get the assignments for this course.
     */
    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }

    /**
     * Get the class sessions for this course.
     */
    public function classSessions()
    {
        return $this->hasMany(ClassSession::class);
    }
}
