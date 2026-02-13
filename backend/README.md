# TClass Backend API

A Laravel 10 backend API for the TClass Learning Management System with PostgreSQL database support.

## Features

- **Authentication**: Laravel Sanctum for API token authentication
- **Role-based Access Control**: Spatie Laravel Permission for role management (Admin, Faculty, Student)
- **PostgreSQL Database**: Full support for PostgreSQL
- **RESTful API**: Complete CRUD operations for all entities

## User Roles

1. **Admin**: Full system access - manage users, departments, programs, courses, approvals
2. **Faculty/Teacher**: Manage classes, grade students, create assignments, view enrolled students
3. **Student**: View courses, submit assignments, check grades, enroll in programs

## Default Login Credentials

After running seeders:

| Role   | Email               | Password     |
|--------|---------------------|--------------|
| Admin  | admin@tclass.ph     | admin123     |
| Faculty| faculty1@tclass.ph  | teacher123   |
| Student| student1@tclass.ph  | student123   |

## Installation

### Prerequisites

- PHP 8.1 or higher
- PostgreSQL 12 or higher
- Composer

### Setup Steps

1. **Install dependencies:**
   ```bash
   cd backend
   composer install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Configure database in .env:**
   ```
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=tclass
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   ```

4. **Generate application key:**
   ```bash
   php artisan key:generate
   ```

5. **Create database:**
   ```bash
   createdb tclass
   ```

6. **Run migrations:**
   ```bash
   php artisan migrate
   ```

7. **Run seeders:**
   ```bash
   php artisan db:seed
   ```

8. **Start the server:**
   ```bash
   php artisan serve
   ```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /api/login` - Login user
- `POST /api/register` - Register new student
- `POST /api/logout` - Logout (authenticated)
- `GET /api/user` - Get current user (authenticated)
- `PUT /api/user/profile` - Update profile (authenticated)

### Public Endpoints
- `GET /api/programs` - List all programs
- `GET /api/programs/{id}` - Get program details
- `POST /api/enroll` - Enroll in a program

### Authenticated Endpoints

#### Dashboard
- `GET /api/dashboard/student` - Student dashboard data
- `GET /api/dashboard/faculty` - Faculty dashboard data
- `GET /api/dashboard/admin` - Admin dashboard data

#### Programs (Admin only for write operations)
- `POST /api/programs` - Create program
- `PUT /api/programs/{id}` - Update program
- `DELETE /api/programs/{id}` - Delete program

#### Courses
- `GET /api/courses` - List courses
- `POST /api/courses` - Create course (Admin/Faculty)
- `GET /api/courses/{id}` - Get course details
- `PUT /api/courses/{id}` - Update course (Admin/Faculty)
- `DELETE /api/courses/{id}` - Delete course (Admin)
- `GET /api/courses/{id}/students` - Get enrolled students

#### Enrollments
- `GET /api/enrollments` - List enrollments
- `GET /api/enrollments/statistics` - Enrollment stats (Admin)
- `POST /api/enrollments/{id}/approve` - Approve enrollment (Admin)
- `POST /api/enrollments/{id}/reject` - Reject enrollment (Admin)

#### Assignments
- `GET /api/assignments` - List assignments
- `POST /api/assignments` - Create assignment (Admin/Faculty)
- `GET /api/assignments/{id}` - Get assignment details
- `PUT /api/assignments/{id}` - Update assignment (Admin/Faculty)
- `DELETE /api/assignments/{id}` - Delete assignment (Admin/Faculty)

#### Submissions
- `GET /api/submissions` - List submissions
- `POST /api/submissions` - Submit assignment
- `GET /api/submissions/{id}` - Get submission details
- `POST /api/submissions/{id}/return` - Return for revision (Admin/Faculty)

#### Grades
- `GET /api/grades` - List grades
- `POST /api/grades` - Create grade (Admin/Faculty)
- `PUT /api/grades/{id}` - Update grade (Admin/Faculty)

#### Users (Admin only)
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `GET /api/users/{id}` - Get user details
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user
- `GET /api/users/statistics` - User statistics

#### Departments (Admin only for write operations)
- `GET /api/departments` - List departments
- `POST /api/departments` - Create department
- `PUT /api/departments/{id}` - Update department
- `DELETE /api/departments/{id}` - Delete department

#### Announcements
- `GET /api/announcements` - List announcements
- `POST /api/announcements` - Create announcement (Admin/Faculty)
- `PUT /api/announcements/{id}` - Update announcement (Admin/Faculty)
- `DELETE /api/announcements/{id}` - Delete announcement (Admin)

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3000` (Next.js dev server)
- `http://127.0.0.1:3000`

Configure `FRONTEND_URL` in your `.env` file to match your frontend URL.

## License

This project is private and for educational purposes.
