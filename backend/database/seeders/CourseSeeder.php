<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Program;
use App\Models\User;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = Program::all();
        $faculty = User::role('faculty')->get();

        if ($programs->isEmpty() || $faculty->isEmpty()) {
            return;
        }

        $courses = [
            [
                'program_id' => $programs[0]->id,
                'name' => 'Dump Truck Operations - Batch 1',
                'code' => 'DTO-001',
                'description' => 'Comprehensive training on Rigid Highway Dump Truck operations',
                'schedule' => 'Mon/Wed/Fri 8:00 AM - 12:00 PM',
                'room' => 'Heavy Equipment Yard A',
                'capacity' => 15,
                'status' => 'active',
            ],
            [
                'program_id' => $programs[1]->id,
                'name' => 'Transit Mixer Operations - Batch 1',
                'code' => 'TMO-001',
                'description' => 'Training on Transit Mixer NCII operations',
                'schedule' => 'Tue/Thu 8:00 AM - 4:00 PM',
                'room' => 'Heavy Equipment Yard B',
                'capacity' => 12,
                'status' => 'active',
            ],
            [
                'program_id' => $programs[2]->id,
                'name' => 'Forklift Operations - Batch 1',
                'code' => 'FLO-001',
                'description' => 'Forklift NCII certification training',
                'schedule' => 'Mon-Fri 1:00 PM - 5:00 PM',
                'room' => 'Workshop Room 3',
                'capacity' => 20,
                'status' => 'active',
            ],
            [
                'program_id' => $programs[4]->id,
                'name' => 'Housekeeping Services - Batch 1',
                'code' => 'HSK-001',
                'description' => 'Professional housekeeping training NCII',
                'schedule' => 'Mon/Wed 8:00 AM - 4:00 PM',
                'room' => 'Training Room 5',
                'capacity' => 25,
                'status' => 'active',
            ],
            [
                'program_id' => $programs[5]->id,
                'name' => 'Health Care Services - Batch 1',
                'code' => 'HCS-001',
                'description' => 'Health Care Services NCII training',
                'schedule' => 'Tue/Thu/Fri 8:00 AM - 4:00 PM',
                'room' => 'Medical Training Lab',
                'capacity' => 20,
                'status' => 'active',
            ],
        ];

        foreach ($courses as $index => $courseData) {
            Course::create([
                ...$courseData,
                'instructor_id' => $faculty[$index % $faculty->count()]->id,
            ]);
        }
    }
}
