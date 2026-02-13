<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'description',
        'duration',
        'slots',
        'price',
        'scholarship',
        'requirements',
        'qualifications',
        'doc_requirements',
        'image',
        'status',
    ];

    protected $casts = [
        'requirements' => 'array',
        'qualifications' => 'array',
        'doc_requirements' => 'array',
        'price' => 'decimal:2',
    ];

    /**
     * Get the courses for this program.
     */
    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    /**
     * Get the enrollments for this program.
     */
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
}
