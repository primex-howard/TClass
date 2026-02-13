<?php

namespace Database\Seeders;

use App\Models\Program;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = [
            [
                'title' => 'Rigid Highway Dump Truck NCII',
                'category' => 'heavy-equipment',
                'description' => 'School Based Training - Heavy Equipment Operation under TCLASS scholarship with minimal fee of PISO per hour.',
                'duration' => '3 months',
                'slots' => 'Limited slots available',
                'price' => null,
                'scholarship' => 'TCLASS Scholarship',
                'requirements' => [
                    'At least Highschool or SHS Graduate/ALS Passer/College Level or Graduate',
                    '18 years old and above',
                    'Physically and Mentally Fit',
                    'Can comply to all requirements needed',
                ],
                'qualifications' => [
                    'At least Highschool or SHS Graduate/ALS Passer/College Level or Graduate',
                    '18 years old and above',
                    'Physically and Mentally Fit',
                    'Can comply to all requirements needed',
                ],
                'doc_requirements' => [
                    'educational' => [
                        'highSchool' => ['Photocopy of Diploma', 'Photocopy of Certified True Copy of Form 138 or Form 137 or Form 9'],
                        'als' => ['ALS Certificate'],
                        'college' => ['Photocopy of Diploma', 'Photocopy of Certified True Copy of Transcript of Records', 'National Certificates (If applicable)'],
                    ],
                    'general' => [
                        'PSA Birth Certificate (Photocopy)',
                        'PSA Marriage Certificate (For female married students)',
                        'Picture in White background and with collar (Studio Shot) - 3 pcs passport size, 4 pcs 1x1',
                        'Original Brgy. Indigency',
                        'Original Medical Certificate',
                        'Voter\'s ID / Certification or any government issued ID with address (Photocopy)',
                        'Long envelope with clear plastic envelope',
                    ],
                    'special' => [
                        'Driver\'s license Original and Photocopy',
                        'Must bring the original documents for verification',
                        'Must be capable of operating a 4 wheeled vehicle',
                    ],
                ],
                'image' => '/programs/dump-truck.jpg',
                'status' => 'active',
            ],
            [
                'title' => 'Transit Mixer NCII',
                'category' => 'heavy-equipment',
                'description' => 'School Based Training - Heavy Equipment Operation under TCLASS scholarship with minimal fee of PISO per hour.',
                'duration' => '3 months',
                'slots' => 'Now accepting applicants',
                'price' => null,
                'scholarship' => 'TCLASS Scholarship',
                'requirements' => [
                    'At least Highschool or SHS Graduate/ALS Passer/College Level or Graduate',
                    '18 years old and above',
                    'Physically and Mentally Fit',
                    'Can comply to all requirements needed',
                ],
                'qualifications' => [
                    'At least Highschool or SHS Graduate/ALS Passer/College Level or Graduate',
                    '18 years old and above',
                    'Physically and Mentally Fit',
                    'Can comply to all requirements needed',
                ],
                'doc_requirements' => [
                    'educational' => [
                        'highSchool' => ['Photocopy of Diploma', 'Photocopy of Certified True Copy of Form 138 or Form 137 or Form 9'],
                        'als' => ['ALS Certificate'],
                        'college' => ['Photocopy of Diploma', 'Photocopy of Certified True Copy of Transcript of Records', 'National Certificates (If applicable)'],
                    ],
                    'general' => [
                        'PSA Birth Certificate (Photocopy)',
                        'PSA Marriage Certificate (For female married students)',
                        'Picture in White background and with collar (Studio Shot) - 3 pcs passport size, 4 pcs 1x1',
                        'Original Brgy. Indigency',
                        'Original Medical Certificate',
                        'Voter\'s ID / Certification or any government issued ID with address (Photocopy)',
                        'Long envelope with clear plastic envelope',
                    ],
                    'special' => [
                        'Driver\'s license Original and Photocopy',
                        'Must bring the original documents for verification',
                        'Must be capable of operating a 4 wheeled vehicle',
                    ],
                ],
                'image' => '/programs/transit-mixer.jpg',
                'status' => 'active',
            ],
            [
                'title' => 'Forklift NCII',
                'category' => 'heavy-equipment',
                'description' => 'School Based Training - Heavy Equipment Operator under maYAP Scholarship with minimal fee of PISO per hour.',
                'duration' => '2 months',
                'slots' => 'Open for enrollment',
                'price' => null,
                'scholarship' => 'maYAP Scholarship',
                'requirements' => [
                    'At least Highschool or SHS Graduate/ALS Passer/College Level or Graduate',
                    '18 years old and above',
                    'Physically and Mentally Fit',
                    'Can comply to all requirements needed',
                ],
                'qualifications' => [
                    'At least Highschool or SHS Graduate/ALS Passer/College Level or Graduate',
                    '18 years old and above',
                    'Physically and Mentally Fit',
                    'Can comply to all requirements needed',
                ],
                'doc_requirements' => [
                    'educational' => [
                        'highSchool' => ['Photocopy of Diploma', 'Photocopy of Certified True Copy of Form 138 or Form 137 or Form 9'],
                        'als' => ['ALS Certificate'],
                        'college' => ['Photocopy of Diploma', 'Photocopy of Certified True Copy of Transcript of Records', 'National Certificates (If applicable)'],
                    ],
                    'general' => [
                        'PSA Birth Certificate (Photocopy)',
                        'PSA Marriage Certificate (For female married students)',
                        'Picture in White background and with collar (Studio Shot) - 3 pcs passport size, 4 pcs 1x1',
                        'Original Brgy. Indigency',
                        'Original Medical Certificate',
                        'Voter\'s ID / Certification or any government issued ID with address (Photocopy)',
                        'Long envelope with clear plastic envelope',
                    ],
                    'special' => [
                        'Driver\'s license Original and Photocopy',
                        'Must bring the original documents for verification',
                    ],
                ],
                'image' => '/programs/forklift.jpg',
                'status' => 'active',
            ],
            [
                'title' => '3-Year Diploma in ICT',
                'category' => 'ict',
                'description' => '3 Year Diploma in Information and Communication Technology',
                'duration' => '3 years',
                'slots' => '5 SLOTS LEFT!',
                'price' => null,
                'scholarship' => 'TCLASS Program',
                'requirements' => [
                    '18 YEARS OLD AND ABOVE',
                    'GRADUATE OF SENIOR HIGH SCHOOL / ALS / OLD CURRICULUM',
                    'MUST MEET THE INTERVIEW REQUIREMENTS',
                ],
                'qualifications' => [
                    '18 YEARS OLD AND ABOVE',
                    'GRADUATE OF SENIOR HIGH SCHOOL / ALS / OLD CURRICULUM',
                    'MUST MEET THE INTERVIEW REQUIREMENTS',
                ],
                'doc_requirements' => [
                    'general' => [
                        'Valid ID / Recent School ID',
                        'PSA Birth Certificate',
                        'SF9 / Report Card',
                        'Certificate of Good Moral Conduct',
                    ],
                ],
                'image' => '/programs/ict.jpg',
                'status' => 'active',
            ],
            [
                'title' => 'Housekeeping NCII',
                'category' => 'services',
                'description' => 'School Based Training under maYAP Scholarship with minimal fee of PISO per hour',
                'duration' => '2 months',
                'slots' => 'Now open',
                'price' => null,
                'scholarship' => 'maYAP Scholarship',
                'requirements' => [
                    'At least Highschool or SHS Graduate/ALS Passer/College Level or Graduate',
                    '18 years old and above',
                    'Physically and Mentally Fit',
                    'Can comply to all requirements needed',
                ],
                'qualifications' => [
                    'At least Highschool or SHS Graduate/ALS Passer/College Level or Graduate',
                    '18 years old and above',
                    'Physically and Mentally Fit',
                    'Can comply to all requirements needed',
                ],
                'doc_requirements' => [
                    'educational' => [
                        'highSchool' => ['Photocopy of Diploma', 'Photocopy of Certified True Copy of Form 138 or Form 137 or Form 9'],
                        'als' => ['ALS Certificate'],
                        'college' => ['Photocopy of Diploma', 'Photocopy of Certified True Copy of Transcript of Records', 'National Certificates (If applicable)'],
                    ],
                    'general' => [
                        'PSA Birth Certificate (Photocopy)',
                        'PSA Marriage Certificate (For female married students)',
                        'Picture in White background and with collar (Studio Shot) - 3 pcs passport size, 4 pcs 1x1',
                        'Original Brgy. Indigency',
                        'Original Medical Certificate',
                        'Voter\'s ID / Certification or any government issued ID with address (Photocopy)',
                        'Long envelope with clear plastic envelope',
                    ],
                ],
                'image' => '/programs/housekeeping.jpg',
                'status' => 'active',
            ],
            [
                'title' => 'Health Care Services NCII',
                'category' => 'services',
                'description' => 'School Based Training under maYAP Scholarship with minimal fee of PISO per hour',
                'duration' => '6 months',
                'slots' => 'Limited slots',
                'price' => null,
                'scholarship' => 'maYAP Scholarship',
                'requirements' => [
                    'At least Highschool or SHS Graduate/ALS Passer/College Level or Graduate',
                    '18 years old and above',
                    'Physically and Mentally Fit',
                    'Can comply to all requirements needed',
                ],
                'qualifications' => [
                    'At least Highschool or SHS Graduate/ALS Passer/College Level or Graduate',
                    '18 years old and above',
                    'Physically and Mentally Fit',
                    'Can comply to all requirements needed',
                ],
                'doc_requirements' => [
                    'educational' => [
                        'highSchool' => ['Photocopy of Diploma', 'Photocopy of Certified True Copy of Form 138 or Form 137 or Form 9'],
                        'als' => ['ALS Certificate'],
                        'college' => ['Photocopy of Diploma', 'Photocopy of Certified True Copy of Transcript of Records', 'National Certificates (If applicable)'],
                    ],
                    'general' => [
                        'PSA Birth Certificate (Photocopy)',
                        'PSA Marriage Certificate (For female married students)',
                        'Picture in White background and with collar (Studio Shot) - 3 pcs passport size, 4 pcs 1x1',
                        'Original Brgy. Indigency',
                        'Original Medical Certificate',
                        'Voter\'s ID / Certification or any government issued ID with address (Photocopy)',
                        'Long envelope with clear plastic envelope',
                    ],
                ],
                'image' => '/programs/healthcare.jpg',
                'status' => 'active',
            ],
        ];

        foreach ($programs as $programData) {
            Program::create($programData);
        }
    }
}
