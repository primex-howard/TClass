<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'title',
        'description',
        'start_time',
        'end_time',
        'room',
        'status',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    /**
     * Get the course that owns the class session.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the attendances for this class session.
     */
    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
