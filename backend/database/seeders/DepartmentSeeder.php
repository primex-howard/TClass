<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\User;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get faculty users to assign as heads
        $faculty = User::role('faculty')->get();

        $departments = [
            [
                'name' => 'Heavy Equipment Operations',
                'code' => 'HEO',
                'description' => 'Training programs for heavy equipment operation including dump trucks, transit mixers, and forklifts.',
                'head_id' => $faculty[0]->id ?? null,
            ],
            [
                'name' => 'Information and Communication Technology',
                'code' => 'ICT',
                'description' => 'Programs covering computer operations, programming, and digital skills.',
                'head_id' => $faculty[1]->id ?? null,
            ],
            [
                'name' => 'Healthcare Services',
                'code' => 'HCS',
                'description' => 'Training programs for healthcare and caregiving professions.',
                'head_id' => $faculty[2]->id ?? null,
            ],
            [
                'name' => 'Hospitality and Services',
                'code' => 'HAS',
                'description' => 'Programs for housekeeping, food service, and hospitality management.',
                'head_id' => $faculty[3]->id ?? null,
            ],
        ];

        foreach ($departments as $departmentData) {
            Department::create($departmentData);
        }
    }
}
