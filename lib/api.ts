/**
 * TClass API Service
 * 
 * This file contains all API calls to the Laravel backend.
 * Base URL: http://localhost:8000/api
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Types
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone?: string;
  address?: string;
  birth_date?: string;
  education_level?: string;
  avatar?: string;
  status: string;
  initials: string;
  roles: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'student' | 'faculty' | 'admin';
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  birth_date?: string;
  education_level?: string;
}

export interface EnrollmentData {
  program_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  education_level: string;
  address: string;
  documents?: string[];
}

export interface Program {
  id: number;
  title: string;
  category: string;
  description: string;
  duration: string;
  slots: string;
  price?: string;
  scholarship?: string;
  requirements?: string[];
  qualifications?: string[];
  doc_requirements?: {
    educational?: {
      highSchool?: string[];
      als?: string[];
      college?: string[];
    };
    general: string[];
    special?: string[];
  };
  image: string;
  status: string;
}

export interface Course {
  id: number;
  name: string;
  code: string;
  description?: string;
  schedule?: string;
  room?: string;
  capacity: number;
  status: string;
  program?: Program;
  instructor?: User;
  progress?: number;
}

export interface Assignment {
  id: number;
  title: string;
  description?: string;
  type: 'quiz' | 'exam' | 'homework' | 'project' | 'practical';
  total_points: number;
  due_date?: string;
  status: string;
  course?: Course;
}

export interface Submission {
  id: number;
  content?: string;
  file_path?: string;
  file_name?: string;
  submitted_at: string;
  status: string;
  comments?: string;
  assignment?: Assignment;
  user?: User;
}

export interface Grade {
  id: number;
  score: number;
  total_points: number;
  percentage: number;
  feedback?: string;
  graded_at: string;
  student?: User;
  assignment?: Assignment;
  grader?: User;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  type: string;
  target_audience: string;
  is_pinned: boolean;
  published_at?: string;
  author?: User;
}

export interface Enrollment {
  id: number;
  status: 'pending' | 'active' | 'completed' | 'dropped';
  enrolled_at?: string;
  completed_at?: string;
  cor_number: string;
  user?: User;
  program?: Program;
  course?: Course;
}

export interface DashboardStats {
  enrolled_courses: number;
  pending_assignments: number;
  completed_assignments: number;
  average_grade: number;
}

export interface StudentDashboard {
  courses: Course[];
  assignments: Assignment[];
  submissions: Submission[];
  stats: DashboardStats;
}

export interface FacultyDashboard {
  courses: Course[];
  submissions: Submission[];
  pending_grading: Assignment[];
  stats: {
    total_courses: number;
    total_students: number;
    to_grade: number;
    average_pass_rate: number;
  };
}

export interface AdminDashboard {
  recent_users: User[];
  pending_enrollments: Enrollment[];
  stats: {
    total_students: number;
    total_faculty: number;
    total_courses: number;
    total_departments: number;
    pending_enrollments: number;
    active_enrollments: number;
  };
  enrollment_trends: { month: string; count: number }[];
}

// Helper function to get auth token
function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

// Helper function to get headers
function getHeaders(includeAuth = true): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

// Generic fetch wrapper
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
  includeAuth = true
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(includeAuth),
      ...options.headers,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const text = await response.text();
    let message = 'An error occurred';
    try {
      const error = JSON.parse(text);
      message = error.message || error.error || `HTTP error! status: ${response.status}`;
    } catch {
      message = text || `HTTP error! status: ${response.status}`;
    }
    throw new Error(message);
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: (credentials: LoginCredentials) =>
    fetchApi<{ user: User; token: string; role: string }>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }, false),

  register: (data: RegisterData) =>
    fetchApi<{ user: User; token: string; role: string }>('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }, false),

  logout: () =>
    fetchApi<{ message: string }>('/logout', { method: 'POST' }),

  getUser: () =>
    fetchApi<{ user: User }>('/user'),

  updateProfile: (data: Partial<User>) =>
    fetchApi<{ user: User; message: string }>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  changePassword: (currentPassword: string, password: string) =>
    fetchApi<{ message: string }>('/user/change-password', {
      method: 'POST',
      body: JSON.stringify({ current_password: currentPassword, password, password_confirmation: password }),
    }),
};

// Programs API
export const programsApi = {
  getAll: (params?: { category?: string; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return fetchApi<{ data: Program[] }>(`/programs${query}`, {}, false);
  },

  getById: (id: number) =>
    fetchApi<Program>(`/programs/${id}`, {}, false),

  create: (data: Partial<Program>) =>
    fetchApi<{ program: Program; message: string }>('/programs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<Program>) =>
    fetchApi<{ program: Program; message: string }>(`/programs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchApi<{ message: string }>(`/programs/${id}`, { method: 'DELETE' }),

  getCategories: () =>
    fetchApi<string[]>('/programs/categories', {}, false),
};

// Enrollments API
export const enrollmentsApi = {
  enroll: (data: EnrollmentData) =>
    fetchApi<{ enrollment: Enrollment; message: string; cor_number: string }>('/enroll', {
      method: 'POST',
      body: JSON.stringify(data),
    }, false),

  getAll: (params?: { status?: string; my_enrollments?: boolean }) => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.my_enrollments) queryParams.append('my_enrollments', '1');
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return fetchApi<{ data: Enrollment[] }>(`/enrollments${query}`);
  },

  getById: (id: number) =>
    fetchApi<Enrollment>(`/enrollments/${id}`),

  approve: (id: number) =>
    fetchApi<{ enrollment: Enrollment; message: string }>(`/enrollments/${id}/approve`, {
      method: 'POST',
    }),

  reject: (id: number) =>
    fetchApi<{ enrollment: Enrollment; message: string }>(`/enrollments/${id}/reject`, {
      method: 'POST',
    }),

  getStatistics: () =>
    fetchApi<{
      total: number;
      pending: number;
      active: number;
      completed: number;
      dropped: number;
      this_month: number;
    }>('/enrollments/statistics'),
};

// Courses API
export const coursesApi = {
  getAll: (params?: { my_courses?: boolean; program_id?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.my_courses) queryParams.append('my_courses', '1');
    if (params?.program_id) queryParams.append('program_id', params.program_id.toString());
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return fetchApi<{ data: Course[] }>(`/courses${query}`);
  },

  getById: (id: number) =>
    fetchApi<Course>(`/courses/${id}`),

  create: (data: Partial<Course>) =>
    fetchApi<{ course: Course; message: string }>('/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<Course>) =>
    fetchApi<{ course: Course; message: string }>(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchApi<{ message: string }>(`/courses/${id}`, { method: 'DELETE' }),

  getStudents: (id: number) =>
    fetchApi<{ data: User[] }>(`/courses/${id}/students`),
};

// Assignments API
export const assignmentsApi = {
  getAll: (params?: { course_id?: number; my_assignments?: boolean }) => {
    const queryParams = new URLSearchParams();
    if (params?.course_id) queryParams.append('course_id', params.course_id.toString());
    if (params?.my_assignments) queryParams.append('my_assignments', '1');
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return fetchApi<{ data: Assignment[] }>(`/assignments${query}`);
  },

  getById: (id: number) =>
    fetchApi<Assignment>(`/assignments/${id}`),

  create: (data: Partial<Assignment>) =>
    fetchApi<{ assignment: Assignment; message: string }>('/assignments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<Assignment>) =>
    fetchApi<{ assignment: Assignment; message: string }>(`/assignments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchApi<{ message: string }>(`/assignments/${id}`, { method: 'DELETE' }),

  publish: (id: number) =>
    fetchApi<{ assignment: Assignment; message: string }>(`/assignments/${id}/publish`, {
      method: 'POST',
    }),
};

// Submissions API
export const submissionsApi = {
  getAll: (params?: { assignment_id?: number; my_submissions?: boolean; for_teacher?: boolean }) => {
    const queryParams = new URLSearchParams();
    if (params?.assignment_id) queryParams.append('assignment_id', params.assignment_id.toString());
    if (params?.my_submissions) queryParams.append('my_submissions', '1');
    if (params?.for_teacher) queryParams.append('for_teacher', '1');
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return fetchApi<{ data: Submission[] }>(`/submissions${query}`);
  },

  getById: (id: number) =>
    fetchApi<Submission>(`/submissions/${id}`),

  submit: (data: FormData) =>
    fetch<{ submission: Submission; message: string }>('/submissions', {
      method: 'POST',
      body: data,
      headers: {}, // Let browser set content-type for FormData
    }),

  update: (id: number, data: { content?: string; comments?: string }) =>
    fetchApi<{ submission: Submission; message: string }>(`/submissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  returnForRevision: (id: number) =>
    fetchApi<{ message: string }>(`/submissions/${id}/return`, {
      method: 'POST',
    }),

  download: (id: number) =>
    fetch(`${API_BASE_URL}/submissions/${id}/download`, {
      headers: getHeaders(),
      credentials: 'include',
    }),
};

// Grades API
export const gradesApi = {
  getAll: (params?: { student_id?: number; my_grades?: boolean }) => {
    const queryParams = new URLSearchParams();
    if (params?.student_id) queryParams.append('student_id', params.student_id.toString());
    if (params?.my_grades) queryParams.append('my_grades', '1');
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return fetchApi<{ data: Grade[] }>(`/grades${query}`);
  },

  getById: (id: number) =>
    fetchApi<Grade>(`/grades/${id}`),

  create: (data: Partial<Grade>) =>
    fetchApi<{ grade: Grade; message: string }>('/grades', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<Grade>) =>
    fetchApi<{ grade: Grade; message: string }>(`/grades/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchApi<{ message: string }>(`/grades/${id}`, { method: 'DELETE' }),

  getStudentStats: (studentId: number) =>
    fetchApi<{
      total_graded: number;
      average_score: number;
      highest_score: number;
      lowest_score: number;
      passing_rate: number;
    }>(`/students/${studentId}/grades/stats`),
};

// Announcements API
export const announcementsApi = {
  getAll: (params?: { active?: boolean; for_me?: boolean }) => {
    const queryParams = new URLSearchParams();
    if (params?.active) queryParams.append('active', '1');
    if (params?.for_me) queryParams.append('for_me', '1');
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return fetchApi<{ data: Announcement[] }>(`/announcements${query}`);
  },

  getById: (id: number) =>
    fetchApi<Announcement>(`/announcements/${id}`),

  create: (data: Partial<Announcement>) =>
    fetchApi<{ announcement: Announcement; message: string }>('/announcements', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<Announcement>) =>
    fetchApi<{ announcement: Announcement; message: string }>(`/announcements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchApi<{ message: string }>(`/announcements/${id}`, { method: 'DELETE' }),

  togglePin: (id: number) =>
    fetchApi<{ announcement: Announcement; message: string }>(`/announcements/${id}/toggle-pin`, {
      method: 'POST',
    }),
};

// Dashboard API
export const dashboardApi = {
  getStudent: () =>
    fetchApi<StudentDashboard>('/dashboard/student'),

  getFaculty: () =>
    fetchApi<FacultyDashboard>('/dashboard/faculty'),

  getAdmin: () =>
    fetchApi<AdminDashboard>('/dashboard/admin'),
};

// Users API (Admin only)
export const usersApi = {
  getAll: (params?: { role?: string; status?: string; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.role) queryParams.append('role', params.role);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return fetchApi<{ data: User[] }>(`/users${query}`);
  },

  getById: (id: number) =>
    fetchApi<User>(`/users/${id}`),

  create: (data: Partial<User> & { password: string; role: string }) =>
    fetchApi<{ user: User; message: string }>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<User>) =>
    fetchApi<{ user: User; message: string }>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchApi<{ message: string }>(`/users/${id}`, { method: 'DELETE' }),

  getStatistics: () =>
    fetchApi<{
      total_users: number;
      total_students: number;
      total_faculty: number;
      total_admins: number;
      active_users: number;
      pending_users: number;
      new_this_month: number;
    }>('/users/statistics'),
};

// Export all APIs
export const api = {
  auth: authApi,
  programs: programsApi,
  enrollments: enrollmentsApi,
  courses: coursesApi,
  assignments: assignmentsApi,
  submissions: submissionsApi,
  grades: gradesApi,
  announcements: announcementsApi,
  dashboard: dashboardApi,
  users: usersApi,
};

export default api;
