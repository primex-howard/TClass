<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@tclass.ph'],
            [
                'first_name' => 'System',
                'last_name' => 'Administrator',
                'password' => Hash::make('admin123'),
                'phone' => '0917-706-6718',
                'address' => 'IT Training Center Bldg., Right Wing, IT Park I, Tibag Tarlac City, Tarlac, Philippines, 2300',
                'birth_date' => '1980-01-01',
                'education_level' => 'College Graduate',
                'status' => 'active',
            ]
        );
        if (!$admin->hasRole('admin')) {
            $admin->assignRole('admin');
        }

        // Create Faculty Users
        $faculty1 = User::firstOrCreate(
            ['email' => 'faculty1@tclass.ph'],
            [
                'first_name' => 'Roberto',
                'last_name' => 'Dela Cruz',
                'password' => Hash::make('teacher123'),
                'phone' => '0917-111-2222',
                'address' => 'Tarlac City, Tarlac',
                'birth_date' => '1975-03-15',
                'education_level' => 'College Graduate',
                'status' => 'active',
            ]
        );
        if (!$faculty1->hasRole('faculty')) {
            $faculty1->assignRole('faculty');
        }

        $faculty2 = User::firstOrCreate(
            ['email' => 'faculty2@tclass.ph'],
            [
                'first_name' => 'Maria',
                'last_name' => 'Santos',
                'password' => Hash::make('teacher123'),
                'phone' => '0917-222-3333',
                'address' => 'Tarlac City, Tarlac',
                'birth_date' => '1982-07-20',
                'education_level' => 'College Graduate',
                'status' => 'active',
            ]
        );
        if (!$faculty2->hasRole('faculty')) {
            $faculty2->assignRole('faculty');
        }

        $faculty3 = User::firstOrCreate(
            ['email' => 'faculty3@tclass.ph'],
            [
                'first_name' => 'Juan',
                'last_name' => 'Reyes',
                'password' => Hash::make('teacher123'),
                'phone' => '0917-333-4444',
                'address' => 'Tarlac City, Tarlac',
                'birth_date' => '1978-11-10',
                'education_level' => 'College Graduate',
                'status' => 'active',
            ]
        );
        if (!$faculty3->hasRole('faculty')) {
            $faculty3->assignRole('faculty');
        }

        $faculty4 = User::firstOrCreate(
            ['email' => 'faculty4@tclass.ph'],
            [
                'first_name' => 'Lisa',
                'last_name' => 'Garcia',
                'password' => Hash::make('teacher123'),
                'phone' => '0917-444-5555',
                'address' => 'Tarlac City, Tarlac',
                'birth_date' => '1985-05-25',
                'education_level' => 'College Graduate',
                'status' => 'active',
            ]
        );
        if (!$faculty4->hasRole('faculty')) {
            $faculty4->assignRole('faculty');
        }

        // Create Student Users
        $students = [
            ['first_name' => 'Juan', 'last_name' => 'Dela Cruz'],
            ['first_name' => 'Maria', 'last_name' => 'Santos'],
            ['first_name' => 'Pedro', 'last_name' => 'Reyes'],
            ['first_name' => 'Ana', 'last_name' => 'Garcia'],
            ['first_name' => 'Miguel', 'last_name' => 'Lopez'],
            ['first_name' => 'Sofia', 'last_name' => 'Torres'],
            ['first_name' => 'Carlos', 'last_name' => 'Ramos'],
            ['first_name' => 'Isabella', 'last_name' => 'Mendoza'],
            ['first_name' => 'Antonio', 'last_name' => 'Flores'],
            ['first_name' => 'Gabriela', 'last_name' => 'Aquino'],
        ];

        foreach ($students as $index => $studentData) {
            $student = User::firstOrCreate(
                ['email' => 'student' . ($index + 1) . '@tclass.ph'],
                [
                    'first_name' => $studentData['first_name'],
                    'last_name' => $studentData['last_name'],
                    'password' => Hash::make('student123'),
                    'phone' => '0917-' . rand(1000000, 9999999),
                    'address' => 'Tarlac City, Tarlac',
                    'birth_date' => '1995-01-01',
                    'education_level' => 'High School Graduate',
                    'status' => 'active',
                ]
            );
            if (!$student->hasRole('student')) {
                $student->assignRole('student');
            }
        }

        $this->command->info('Users created successfully!');
        $this->command->info('Admin: admin@tclass.ph / admin123');
        $this->command->info('Faculty: faculty1@tclass.ph / teacher123');
        $this->command->info('Student: student1@tclass.ph / student123');
    }
}
