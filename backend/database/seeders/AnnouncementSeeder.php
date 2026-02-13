<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\User;
use Illuminate\Database\Seeder;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admins = User::role('admin')->get();
        $faculty = User::role('faculty')->get();

        if ($admins->isEmpty()) {
            return;
        }

        $announcements = [
            [
                'title' => 'TARA NA at Maging maYAP Scholar!',
                'content' => 'Calling all TARLAQUEÑOS! Be a scholar today under the maYAP Scholarship Program. Limited slots available. Enroll now!',
                'type' => 'announcement',
                'target_audience' => 'all',
                'is_pinned' => true,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Heavy Equipment Assessment Schedule',
                'content' => 'Assessment for Heavy Equipment Operations will be held next week. Please check your schedules and prepare all necessary documents.',
                'type' => 'academic',
                'target_audience' => 'students',
                'is_pinned' => false,
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => 'TCLASS Scholarship Renewal',
                'content' => 'Current scholars may now apply for scholarship renewal for the upcoming semester. Deadline is at the end of this month.',
                'type' => 'announcement',
                'target_audience' => 'students',
                'is_pinned' => false,
                'published_at' => now()->subDay(),
            ],
            [
                'title' => 'New Workshop Equipment Arrival',
                'content' => 'We are pleased to announce the arrival of new heavy equipment for training purposes. Students will have access starting next week.',
                'type' => 'general',
                'target_audience' => 'all',
                'is_pinned' => false,
                'published_at' => now()->subDays(3),
            ],
            [
                'title' => 'Department Meeting',
                'content' => 'All faculty members are required to attend the department meeting this Friday at 3:00 PM.',
                'type' => 'general',
                'target_audience' => 'faculty',
                'is_pinned' => false,
                'published_at' => now(),
            ],
            [
                'title' => 'Grade Submission Deadline',
                'content' => 'Please submit all grades for the current term by Friday. Late submissions will not be accepted.',
                'type' => 'deadline',
                'target_audience' => 'faculty',
                'is_pinned' => true,
                'published_at' => now()->subDays(1),
            ],
            [
                'title' => 'New Curriculum Updates',
                'content' => 'The curriculum for ICT programs has been updated. Please review the changes and implement them in your classes.',
                'type' => 'academic',
                'target_audience' => 'faculty',
                'is_pinned' => false,
                'published_at' => now()->subDays(4),
            ],
            [
                'title' => 'System Maintenance',
                'content' => 'The system will undergo maintenance tonight at 10:00 PM. Please save your work and log out before then.',
                'type' => 'general',
                'target_audience' => 'all',
                'is_pinned' => false,
                'published_at' => now(),
                'expires_at' => now()->addDay(),
            ],
        ];

        foreach ($announcements as $announcementData) {
            $author = $announcementData['target_audience'] === 'faculty' 
                ? $admins->first() 
                : ($admins->merge($faculty))->random();

            Announcement::create([
                ...$announcementData,
                'user_id' => $author->id,
            ]);
        }
    }
}
