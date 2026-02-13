<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Program;
use App\Models\User;
use Illuminate\Database\Seeder;

class EnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = User::role('student')->get();
        $programs = Program::all();
        $courses = Course::all();

        if ($students->isEmpty() || $programs->isEmpty()) {
            return;
        }

        $statuses = ['active', 'pending', 'completed'];

        foreach ($students as $index => $student) {
            // Enroll each student in 1-3 random programs
            $numEnrollments = rand(1, min(3, $programs->count()));
            $selectedPrograms = $programs->random($numEnrollments);

            foreach ($selectedPrograms as $program) {
                // Find a course for this program
                $course = $courses->where('program_id', $program->id)->first();

                Enrollment::create([
                    'user_id' => $student->id,
                    'program_id' => $program->id,
                    'course_id' => $course?->id,
                    'status' => $statuses[array_rand($statuses)],
                    'enrolled_at' => now()->subDays(rand(1, 90)),
                    'completed_at' => rand(0, 10) > 7 ? now()->subDays(rand(1, 30)) : null,
                    'cor_number' => Enrollment::generateCorNumber(),
                    'documents' => [],
                ]);
            }
        }
    }
}
