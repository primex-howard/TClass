"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { 
  ArrowLeft, 
  Eye, 
  EyeOff,
  Facebook,
  Mail,
  Lock,
  User,
  Building2,
  Users
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"student" | "faculty" | "admin">("student");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const routes = {
      student: "/student",
      faculty: "/faculty",
      admin: "/admin"
    };
    
    toast.success(`Logging in as ${userType}...`);
    setTimeout(() => {
      window.location.href = routes[userType];
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8">
        {/* Left Side - Info */}
        <div className="hidden lg:flex flex-col justify-center text-white">
          <Link href="/" className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16">
              <Image
                src="/tclass-logo.jpg"
                alt="TCLASS Logo"
                fill
                className="object-contain rounded-full"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">PGT - TCLASS</h1>
              <p className="text-blue-200">Tarlac Center for Learning And Skills Success</p>
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Welcome to<br />
            <span className="text-yellow-400">TCLASS Portal</span>
          </h2>
          
          <p className="text-blue-100 text-lg mb-8">
            Access your courses, track your progress, and manage your training 
            programs all in one place.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="font-medium">For Students</p>
                <p className="text-sm text-blue-200">View courses, submit assignments, track grades</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="font-medium">For Faculty</p>
                <p className="text-sm text-blue-200">Manage classes, grade students, create assignments</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Lock className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="font-medium">For Admin</p>
                <p className="text-sm text-blue-200">System management and oversight</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="lg:hidden flex justify-center mb-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/tclass-logo.jpg"
                  alt="TCLASS Logo"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
            </div>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Choose your account type and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* User Type Selection */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { id: "student", label: "Student", icon: Users },
                { id: "faculty", label: "Faculty", icon: Building2 },
                { id: "admin", label: "Admin", icon: Lock },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setUserType(type.id as typeof userType)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                    userType === type.id
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <type.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{type.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email / Username</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder={userType === "student" ? "student@tclass.ph" : userType === "faculty" ? "faculty@tclass.ph" : "admin@tclass.ph"}
                    className="pl-9"
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-9 pr-10"
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span className="text-slate-600">Remember me</span>
                </label>
                <button type="button" className="text-blue-600 hover:underline" onClick={() => toast.success("Password reset link sent!")}>
                  Forgot password?
                </button>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Sign In as {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full" onClick={() => toast.success("Google login coming soon!")}>
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full" onClick={() => toast.success("Facebook login coming soon!")}>
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-slate-600">Don't have an account? </span>
              <button className="text-blue-600 hover:underline font-medium" onClick={() => toast.success("Registration form coming soon!")}>
                Register here
              </button>
            </div>

            <div className="mt-4 pt-4 border-t text-center lg:hidden">
              <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-700">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
