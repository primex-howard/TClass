"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Building2,
  TrendingUp,
  DollarSign,
  Bell,
  Search,
  Menu,
  X,
  Plus,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Settings,
  FileText,
  BarChart3,
  UserPlus,
  School,
  Trash2,
  Edit
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

// Types
interface UserItem {
  id: number;
  name: string;
  email: string;
  role: "Student" | "Faculty" | "Admin";
  status: "active" | "pending" | "inactive";
  joined: string;
}

interface Department {
  id: number;
  name: string;
  head: string;
  faculty: number;
  students: number;
  classes: number;
}

interface PendingApproval {
  id: number;
  type: string;
  name: string;
  details: string;
  requested: string;
}

interface SystemAlert {
  id: number;
  level: "warning" | "info" | "success";
  message: string;
  time: string;
}

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

export default function AdminDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dialog states
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [addDepartmentOpen, setAddDepartmentOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  
  // Form states
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Student" as "Student" | "Faculty" | "Admin",
    status: "active" as "active" | "pending",
  });
  
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    head: "",
  });
  
  // Data states
  const [users, setUsers] = useState<UserItem[]>([
    { id: 1, name: "Maria Santos", email: "maria.s@tclass.ph", role: "Student", status: "active", joined: "2 mins ago" },
    { id: 2, name: "Juan Cruz", email: "juan.c@tclass.ph", role: "Student", status: "active", joined: "15 mins ago" },
    { id: 3, name: "Prof. Reyes", email: "reyes@tclass.ph", role: "Faculty", status: "active", joined: "1 hour ago" },
    { id: 4, name: "Ana Garcia", email: "ana.g@tclass.ph", role: "Student", status: "pending", joined: "2 hours ago" },
    { id: 5, name: "Prof. Lim", email: "lim@tclass.ph", role: "Faculty", status: "active", joined: "3 hours ago" },
  ]);
  
  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: "Mathematics", head: "Prof. Santos", faculty: 8, students: 320, classes: 24 },
    { id: 2, name: "Science", head: "Prof. Cruz", faculty: 10, students: 280, classes: 22 },
    { id: 3, name: "English", head: "Prof. Reyes", faculty: 6, students: 250, classes: 18 },
    { id: 4, name: "History", head: "Prof. Garcia", faculty: 5, students: 200, classes: 15 },
  ]);
  
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([
    { id: 1, type: "New Student", name: "Pedro Martinez", details: "Grade 11 - STEM", requested: "30 mins ago" },
    { id: 2, type: "Course Drop", name: "Lisa Wong", details: "Dropping Math 101", requested: "1 hour ago" },
    { id: 3, type: "Faculty Request", name: "Prof. Diaz", details: "Room change request", requested: "2 hours ago" },
  ]);
  
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([
    { id: 1, level: "warning", message: "Server maintenance scheduled for tonight", time: "10:00 PM" },
    { id: 2, level: "info", message: "New semester enrollment opens tomorrow", time: "8:00 AM" },
    { id: 3, level: "success", message: "Backup completed successfully", time: "Completed" },
  ]);
  
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "New user registration: Maria Santos", time: "2 mins ago", read: false },
    { id: 2, message: "Pending approval: Pedro Martinez", time: "30 mins ago", read: false },
    { id: 3, message: "System backup completed", time: "1 hour ago", read: true },
  ]);
  
  const [showNotifications, setShowNotifications] = useState(false);

  const stats = {
    totalStudents: 1250,
    totalFaculty: 45,
    totalClasses: 85,
    totalDepartments: departments.length,
    revenue: "₱2.4M",
    attendanceRate: "94%"
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const user: UserItem = {
      id: users.length + 1,
      ...newUser,
      joined: "Just now",
    };
    
    setUsers([user, ...users]);
    setNewUser({ name: "", email: "", role: "Student", status: "active" });
    setAddUserOpen(false);
    toast.success(`User "${user.name}" added successfully`);
  };

  const handleEditUser = () => {
    if (!selectedUser) return;
    
    setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
    setEditUserOpen(false);
    setSelectedUser(null);
    toast.success("User updated successfully");
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setDeleteConfirmOpen(false);
    toast.success(`User "${selectedUser.name}" deleted successfully`);
    setSelectedUser(null);
  };

  const handleAddDepartment = () => {
    if (!newDepartment.name || !newDepartment.head) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const dept: Department = {
      id: departments.length + 1,
      ...newDepartment,
      faculty: 0,
      students: 0,
      classes: 0,
    };
    
    setDepartments([...departments, dept]);
    setNewDepartment({ name: "", head: "" });
    setAddDepartmentOpen(false);
    toast.success(`Department "${dept.name}" added successfully`);
  };

  const handleApprove = (id: number) => {
    const approval = pendingApprovals.find(a => a.id === id);
    setPendingApprovals(pendingApprovals.filter(a => a.id !== id));
    toast.success(`"${approval?.name}" approved successfully`);
  };

  const handleReject = (id: number) => {
    const approval = pendingApprovals.find(a => a.id === id);
    setPendingApprovals(pendingApprovals.filter(a => a.id !== id));
    toast.error(`"${approval?.name}" rejected`);
  };

  const handleDismissAlert = (id: number) => {
    setSystemAlerts(systemAlerts.filter(a => a.id !== id));
    toast.success("Alert dismissed");
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
    toast.success("All notifications cleared");
  };

  const handleNavClick = (section: string) => {
    toast(`Navigating to ${section}...`, { icon: "🔗" });
  };

  const openEditDialog = (user: UserItem) => {
    setSelectedUser({ ...user });
    setEditUserOpen(true);
  };

  const openDeleteDialog = (user: UserItem) => {
    setSelectedUser(user);
    setDeleteConfirmOpen(true);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-1">Overview of school operations and management.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Students</p>
                  <p className="text-xl font-bold text-slate-900">{stats.totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Faculty</p>
                  <p className="text-xl font-bold text-slate-900">{stats.totalFaculty}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Classes</p>
                  <p className="text-xl font-bold text-slate-900">{stats.totalClasses}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Building2 className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Departments</p>
                  <p className="text-xl font-bold text-slate-900">{stats.totalDepartments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Revenue</p>
                  <p className="text-xl font-bold text-slate-900">{stats.revenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Attendance</p>
                  <p className="text-xl font-bold text-slate-900">{stats.attendanceRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="departments">Departments</TabsTrigger>
                <TabsTrigger value="approvals">Approvals</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Recent Users</CardTitle>
                        <CardDescription>Newly registered students and faculty</CardDescription>
                      </div>
                      <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add User
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New User</DialogTitle>
                            <DialogDescription>
                              Create a new user account. Fill in the details below.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input 
                                id="name" 
                                placeholder="Enter full name"
                                value={newUser.name}
                                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input 
                                id="email" 
                                type="email"
                                placeholder="Enter email address"
                                value={newUser.email}
                                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="role">Role</Label>
                              <Select 
                                value={newUser.role} 
                                onValueChange={(value: "Student" | "Faculty" | "Admin") => setNewUser({...newUser, role: value})}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Student">Student</SelectItem>
                                  <SelectItem value="Faculty">Faculty</SelectItem>
                                  <SelectItem value="Admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="status">Status</Label>
                              <Select 
                                value={newUser.status} 
                                onValueChange={(value: "active" | "pending") => setNewUser({...newUser, status: value})}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setAddUserOpen(false)}>Cancel</Button>
                            <Button onClick={handleAddUser}>Add User</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {searchQuery && (
                      <p className="text-sm text-slate-500 mb-4">
                        Showing {filteredUsers.length} result{filteredUsers.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
                      </p>
                    )}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs bg-slate-100">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-slate-900">{user.name}</p>
                                  <p className="text-xs text-slate-500">{user.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={user.role === 'Student' ? 'secondary' : 'default'}>
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {user.status === 'active' ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Clock className="h-4 w-4 text-amber-500" />
                                )}
                                <span className={user.status === 'active' ? 'text-green-600' : 'text-amber-600'}>
                                  {user.status}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-slate-500">{user.joined}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => openEditDialog(user)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => openDeleteDialog(user)} className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="departments" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Departments</CardTitle>
                        <CardDescription>Academic departments overview</CardDescription>
                      </div>
                      <Dialog open={addDepartmentOpen} onOpenChange={setAddDepartmentOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Department
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Department</DialogTitle>
                            <DialogDescription>
                              Create a new academic department.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="dept-name">Department Name</Label>
                              <Input 
                                id="dept-name" 
                                placeholder="e.g., Computer Science"
                                value={newDepartment.name}
                                onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="dept-head">Department Head</Label>
                              <Input 
                                id="dept-head" 
                                placeholder="e.g., Prof. Smith"
                                value={newDepartment.head}
                                onChange={(e) => setNewDepartment({...newDepartment, head: e.target.value})}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setAddDepartmentOpen(false)}>Cancel</Button>
                            <Button onClick={handleAddDepartment}>Add Department</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {departments.map((dept) => (
                        <div key={dept.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                              <Building2 className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900">{dept.name}</h3>
                              <p className="text-sm text-slate-600">Head: {dept.head}</p>
                            </div>
                          </div>
                          <div className="flex gap-6 text-sm">
                            <div className="text-center">
                              <p className="font-semibold text-slate-900">{dept.faculty}</p>
                              <p className="text-slate-500">Faculty</p>
                            </div>
                            <div className="text-center">
                              <p className="font-semibold text-slate-900">{dept.students}</p>
                              <p className="text-slate-500">Students</p>
                            </div>
                            <div className="text-center">
                              <p className="font-semibold text-slate-900">{dept.classes}</p>
                              <p className="text-slate-500">Classes</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="approvals" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Approvals</CardTitle>
                    <CardDescription>Items requiring your approval</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {pendingApprovals.length === 0 ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                        <p className="text-slate-600">All caught up! No pending approvals.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {pendingApprovals.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="p-2 bg-amber-100 rounded-lg">
                                <Clock className="h-5 w-5 text-amber-600" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{item.type}</Badge>
                                  <h4 className="font-medium text-slate-900">{item.name}</h4>
                                </div>
                                <p className="text-sm text-slate-600">{item.details} • {item.requested}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-green-600 border-green-200 hover:bg-green-50"
                                onClick={() => handleApprove(item.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleReject(item.id)}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => setAddUserOpen(true)}
                  >
                    <UserPlus className="h-5 w-5" />
                    <span className="text-xs">Add User</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => toast.success("Add Class dialog opened")}
                  >
                    <BookOpen className="h-5 w-5" />
                    <span className="text-xs">Add Class</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => handleNavClick("Reports")}
                  >
                    <FileText className="h-5 w-5" />
                    <span className="text-xs">Reports</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => handleNavClick("Settings")}
                  >
                    <Settings className="h-5 w-5" />
                    <span className="text-xs">Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0 group">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {alert.level === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                          {alert.level === 'info' && <Bell className="h-4 w-4 text-blue-500" />}
                          {alert.level === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                          <Badge variant={
                            alert.level === 'warning' ? 'destructive' : 
                            alert.level === 'success' ? 'default' : 'secondary'
                          }>
                            {alert.level}
                          </Badge>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDismissAlert(alert.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-slate-700">{alert.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                    </div>
                  ))}
                  {systemAlerts.length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-2">No active alerts</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Enrollment Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Enrollment Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">STEM</span>
                      <span className="font-medium">420 students</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">ABM</span>
                      <span className="font-medium">310 students</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">HUMSS</span>
                      <span className="font-medium">280 students</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '56%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">GAS</span>
                      <span className="font-medium">240 students</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '48%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      {/* Edit User Dialog -->
      <Dialog open={editUserOpen} onOpenChange={setEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input 
                  id="edit-name" 
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select 
                  value={selectedUser.role} 
                  onValueChange={(value: "Student" | "Faculty" | "Admin") => setSelectedUser({...selectedUser, role: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Faculty">Faculty</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={selectedUser.status} 
                  onValueChange={(value: "active" | "pending" | "inactive") => setSelectedUser({...selectedUser, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUserOpen(false)}>Cancel</Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Confirm Delete
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{selectedUser?.name}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
