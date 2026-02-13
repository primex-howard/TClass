<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_session_id',
        'user_id',
        'status',
        'remarks',
        'recorded_at',
    ];

    protected $casts = [
        'recorded_at' => 'datetime',
    ];

    /**
     * Get the class session that owns the attendance.
     */
    public function classSession()
    {
        return $this->belongsTo(ClassSession::class);
    }

    /**
     * Get the user (student) that the attendance belongs to.
     */
    public function student()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
