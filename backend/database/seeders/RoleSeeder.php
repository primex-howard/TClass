<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // User permissions
            'view users',
            'create users',
            'edit users',
            'delete users',
            
            // Course permissions
            'view courses',
            'create courses',
            'edit courses',
            'delete courses',
            
            // Assignment permissions
            'view assignments',
            'create assignments',
            'edit assignments',
            'delete assignments',
            
            // Grade permissions
            'view grades',
            'create grades',
            'edit grades',
            'delete grades',
            
            // Enrollment permissions
            'view enrollments',
            'create enrollments',
            'edit enrollments',
            'delete enrollments',
            
            // Program permissions
            'view programs',
            'create programs',
            'edit programs',
            'delete programs',
            
            // Department permissions
            'view departments',
            'create departments',
            'edit departments',
            'delete departments',
            
            // Announcement permissions
            'view announcements',
            'create announcements',
            'edit announcements',
            'delete announcements',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // Create roles and assign permissions

        // Admin role - has all permissions
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $adminRole->givePermissionTo(Permission::all());

        // Faculty role
        $facultyRole = Role::firstOrCreate(['name' => 'faculty', 'guard_name' => 'web']);
        $facultyRole->givePermissionTo([
            'view courses',
            'create courses',
            'edit courses',
            'view assignments',
            'create assignments',
            'edit assignments',
            'view grades',
            'create grades',
            'edit grades',
            'view enrollments',
            'edit enrollments',
            'view programs',
            'view departments',
            'view announcements',
            'create announcements',
            'edit announcements',
        ]);

        // Student role
        $studentRole = Role::firstOrCreate(['name' => 'student', 'guard_name' => 'web']);
        $studentRole->givePermissionTo([
            'view courses',
            'view assignments',
            'view grades',
            'view programs',
            'view announcements',
            'create enrollments',
        ]);
    }
}
