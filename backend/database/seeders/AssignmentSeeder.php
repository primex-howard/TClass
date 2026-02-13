<?php

namespace Database\Seeders;

use App\Models\Assignment;
use App\Models\Course;
use Illuminate\Database\Seeder;

class AssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = Course::all();

        if ($courses->isEmpty()) {
            return;
        }

        $assignmentTypes = ['quiz', 'exam', 'homework', 'project', 'practical'];

        foreach ($courses as $course) {
            // Create 3-5 assignments per course
            $numAssignments = rand(3, 5);

            for ($i = 1; $i <= $numAssignments; $i++) {
                $type = $assignmentTypes[array_rand($assignmentTypes)];

                Assignment::create([
                    'course_id' => $course->id,
                    'title' => $this->getAssignmentTitle($type, $i),
                    'description' => 'This is a ' . $type . ' assignment for ' . $course->name,
                    'type' => $type,
                    'total_points' => rand(50, 100),
                    'due_date' => now()->addDays(rand(-7, 30)),
                    'status' => rand(0, 10) > 3 ? 'published' : 'draft',
                ]);
            }
        }
    }

    private function getAssignmentTitle($type, $index): string
    {
        $titles = [
            'quiz' => ['Quiz #' . $index, 'Quick Assessment #' . $index, 'Knowledge Check #' . $index],
            'exam' => ['Midterm Exam', 'Final Exam', 'Practical Examination'],
            'homework' => ['Homework Set #' . $index, 'Practice Exercise #' . $index, 'Take-home Assignment #' . $index],
            'project' => ['Project Phase ' . $index, 'Group Project', 'Final Project'],
            'practical' => ['Practical Assessment #' . $index, 'Hands-on Test #' . $index, 'Skills Demo #' . $index],
        ];

        $typeTitles = $titles[$type] ?? ['Assignment #' . $index];
        return $typeTitles[array_rand($typeTitles)];
    }
}
