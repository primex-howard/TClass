"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Calendar,
  Users,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { authApi } from "@/lib/api";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  initials: string;
}

const facultyNavItems = [
  { href: "/faculty", label: "Dashboard", icon: LayoutDashboard },
  { href: "/faculty/classes", label: "My Classes", icon: BookOpen },
  { href: "/faculty/assignments", label: "Assignments", icon: FileText },
  { href: "/faculty/students", label: "Students", icon: Users },
  { href: "/faculty/grades", label: "Grades", icon: GraduationCap },
];

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/programs", label: "Programs", icon: BookOpen },
  { href: "/admin/courses", label: "Courses", icon: FileText },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/enrollments", label: "Enrollments", icon: GraduationCap },
  { href: "/admin/departments", label: "Departments", icon: Building2 },
];

interface FacultySidebarProps {
  userType: 'faculty' | 'admin';
}

export function FacultySidebar({ userType }: FacultySidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const navItems = userType === 'admin' ? adminNavItems : facultyNavItems;
  const portalTitle = userType === 'admin' ? 'Admin Portal' : 'Faculty Portal';
  const homeHref = userType === 'admin' ? '/admin' : '/faculty';

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      router.push('/login');
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4">
        <Link href={homeHref} className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-slate-900">TClass</span>
            <span className="text-xs text-slate-500 ml-2">{portalTitle}</span>
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white border-r border-slate-200 z-50 transition-all duration-300
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
          w-64 pt-16 lg:pt-0
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
            <Link href={homeHref} className={`flex items-center gap-2 ${isCollapsed ? 'lg:hidden' : ''}`}>
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 leading-tight">TClass</span>
                <span className="text-xs text-slate-500">{portalTitle}</span>
              </div>
            </Link>
            {isCollapsed && (
              <div className="hidden lg:flex bg-blue-600 p-2 rounded-lg mx-auto">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }
                    ${isCollapsed ? 'lg:justify-center' : ''}
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className={`font-medium ${isCollapsed ? 'lg:hidden' : ''}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Account Section */}
          <div className="p-3 border-t border-slate-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full flex items-center gap-3 px-3 py-2 h-auto hover:bg-slate-50 ${isCollapsed ? 'lg:justify-center' : 'justify-start'}`}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className={`text-sm ${userType === 'admin' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {user?.initials || (userType === 'admin' ? 'AD' : 'FC')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex-1 text-left ${isCollapsed ? 'lg:hidden' : ''}`}>
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {user ? `${user.first_name} ${user.last_name}` : (userType === 'admin' ? 'Admin User' : 'Faculty User')}
                    </p>
                    <p className="text-xs text-slate-500 truncate capitalize">
                      {user?.email || `${userType}@tclass.ph`}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`${homeHref}/profile`} className="cursor-pointer">
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`${homeHref}/change-password`} className="cursor-pointer">
                    Change Password
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content Spacer for Desktop */}
      <div className={`hidden lg:block flex-shrink-0 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`} />
    </>
  );
}
