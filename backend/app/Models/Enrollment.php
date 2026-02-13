<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'program_id',
        'course_id',
        'status',
        'enrolled_at',
        'completed_at',
        'cor_number',
        'documents',
    ];

    protected $casts = [
        'enrolled_at' => 'datetime',
        'completed_at' => 'datetime',
        'documents' => 'array',
    ];

    /**
     * Get the user that owns the enrollment.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the program for this enrollment.
     */
    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    /**
     * Get the course for this enrollment.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the grades for this enrollment.
     */
    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    /**
     * Generate Certificate of Registration number.
     */
    public static function generateCorNumber(): string
    {
        return 'COR-' . date('Y') . '-' . strtoupper(substr(uniqid(), -6));
    }
}
