<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'head_id',
        'status',
    ];

    /**
     * Get the head of the department.
     */
    public function head()
    {
        return $this->belongsTo(User::class, 'head_id');
    }

    /**
     * Get the faculty in this department.
     */
    public function faculty()
    {
        return $this->hasMany(User::class, 'department_id')
            ->role('faculty');
    }

    /**
     * Get the courses in this department.
     */
    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
