"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Calendar, CheckCircle, Clock, FileText, GraduationCap, MessageSquare, Upload, BookMarked, Trash2, Truck, Home, Search, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Course {
  id: number;
  name: string;
  instructor: string;
  schedule: string;
  progress: number;
}

interface Assignment {
  id: number;
  title: string;
  subject: string;
  due: string;
  status: "pending" | "completed" | "submitted";
}

interface Announcement {
  id: number;
  title: string;
  date: string;
  type: string;
}

interface Submission {
  id: number;
  assignment: string;
  subject: string;
  submittedAt: string;
  status: "graded" | "pending";
  grade?: string;
}

export default function StudentLandingPage() {
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [libraryDialogOpen, setLibraryDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Rigid Highway Dump Truck NCII", instructor: "Engr. Dela Cruz", schedule: "Mon/Wed/Fri 8:00 AM", progress: 75 },
    { id: 2, name: "Transit Mixer NCII", instructor: "Engr. Santos", schedule: "Mon/Wed/Fri 1:00 PM", progress: 60 },
    { id: 3, name: "Forklift NCII", instructor: "Sir. Reyes", schedule: "Tue/Thu 8:00 AM", progress: 85 },
    { id: 4, name: "Housekeeping NCII", instructor: "Ms. Garcia", schedule: "Tue/Thu 1:00 PM", progress: 70 },
  ]);

  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, title: "Pre-Operation Inspection Checklist", subject: "Dump Truck Operations", due: "Tomorrow", status: "pending" },
    { id: 2, title: "Safety Protocol Assessment", subject: "Heavy Equipment", due: "In 3 days", status: "pending" },
    { id: 3, title: "Room Cleaning Practical Exam", subject: "Housekeeping", due: "Next week", status: "completed" },
  ]);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: 1, title: "Heavy Equipment Assessment Schedule", date: "2 hours ago", type: "Assessment" },
    { id: 2, title: "TCLASS Scholarship Renewal", date: "Yesterday", type: "Scholarship" },
    { id: 3, title: "New Workshop Equipment Arrival", date: "2 days ago", type: "General" },
  ]);

  const [submissions, setSubmissions] = useState<Submission[]>([
    { id: 1, assignment: "Equipment Identification Test", subject: "Dump Truck NCII", submittedAt: "2 days ago", status: "graded", grade: "95%" },
    { id: 2, assignment: "Safety Checklist Submission", subject: "Forklift NCII", submittedAt: "5 days ago", status: "pending" },
  ]);

  const [messages, setMessages] = useState<{id: number, recipient: string, subject: string, sentAt: string}[]>([]);




  const handleSubmitWork = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const assignmentValue = formData.get("assignment") as string;
    
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    const assignmentNames: Record<string, string> = {
      "math5": "Math Problem Set #5",
      "essay": "Essay: Modern Poetry",
      "lab": "Lab Report"
    };

    const newSubmission: Submission = {
      id: Date.now(),
      assignment: assignmentNames[assignmentValue] || "Assignment",
      subject: assignmentValue === "math5" ? "Mathematics" : assignmentValue === "essay" ? "English" : "Science",
      submittedAt: "Just now",
      status: "pending"
    };

    setSubmissions([newSubmission, ...submissions]);
    
    setAssignments(assignments.map(a => 
      a.title === assignmentNames[assignmentValue] ? { ...a, status: "submitted" as const } : a
    ));

    toast.success("Assignment submitted successfully!");
    setSubmitDialogOpen(false);
    setSelectedFile(null);
    e.currentTarget.reset();
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const recipient = formData.get("recipient") as string;
    const subject = formData.get("subject") as string;
    
    const recipientNames: Record<string, string> = {
      "delacruz": "Engr. Dela Cruz (Dump Truck)",
      "santos": "Engr. Santos (Transit Mixer)",
      "reyes": "Sir. Reyes (Forklift)",
      "garcia": "Ms. Garcia (Housekeeping)"
    };

    const newMessage = {
      id: Date.now(),
      recipient: recipientNames[recipient],
      subject,
      sentAt: "Just now"
    };

    setMessages([newMessage, ...messages]);
    toast.success(`Message sent to ${recipientNames[recipient]}!`);
    setMessageDialogOpen(false);
    e.currentTarget.reset();
  };

  const handleScheduleView = () => {
    toast.success("Opening full schedule... Redirecting to calendar page");
    setScheduleDialogOpen(false);
  };

  const handleLibraryAccess = () => {
    toast.success("Accessing Digital Library...");
    setLibraryDialogOpen(false);
  };

  const handleViewAll = (type: string) => {
    const routes: Record<string, string> = {
      "courses": "/student/courses",
      "assignments": "/student/assignments"
    };
    if (routes[type]) {
      window.location.href = routes[type];
    } else {
      toast.success(`Viewing all ${type}`);
    }
  };

  const toggleAssignmentStatus = (id: number) => {
    setAssignments(assignments.map(a => 
      a.id === id ? { ...a, status: a.status === "completed" ? "pending" as const : "completed" as const } : a
    ));
    toast.success("Assignment status updated");
  };

  const deleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
    toast.success("Announcement dismissed");
  };

  const handleFileSelect = () => {
    setSelectedFile("assignment_document.pdf");
    toast.success("File selected: assignment_document.pdf");
  };



  const pendingCount = assignments.filter(a => a.status === "pending").length;
  const completedCount = assignments.filter(a => a.status === "completed").length;

  // Get user name from localStorage or default
  const [userName, setUserName] = useState("Juan");
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.first_name);
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [notificationCount, setNotificationCount] = useState(3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for: ${searchQuery}`);
    }
  };

  const handleNotificationClick = () => {
    setNotificationCount(0);
    toast.success("All notifications marked as read");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Section Header */}
      <section className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left - Title */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Welcome back, {userName}!</h1>
            <p className="text-sm text-slate-600 mt-0.5 hidden sm:block">Here&apos;s what&apos;s happening with your studies today.</p>
          </div>
          
          {/* Center - Search Bar */}
          <div className="flex-1 flex justify-center w-full sm:w-auto order-3 sm:order-2">
            <form onSubmit={handleSearch} className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
              <Input 
                placeholder="Search..." 
                className="pl-10 sm:pl-11 pr-4 h-10 sm:h-11 w-full text-sm sm:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          
          {/* Right - Notification */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 order-2 sm:order-3 ml-auto sm:ml-0">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative h-10 w-10 touch-manipulation"
              onClick={handleNotificationClick}
            >
              <Bell className="h-5 w-5 text-slate-600" />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </Button>
          </div>
        </div>
      </section>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Enrolled Courses</p>
                  <p className="text-2xl font-bold text-slate-900">{courses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <FileText className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Pending Tasks</p>
                  <p className="text-2xl font-bold text-slate-900">{pendingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Completed</p>
                  <p className="text-2xl font-bold text-slate-900">{completedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Submissions</p>
                  <p className="text-2xl font-bold text-slate-900">{submissions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>My Courses</CardTitle>
                    <CardDescription>Your enrolled courses this semester</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleViewAll("courses")}>View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => {
                    const getCourseIcon = (courseName: string) => {
                      if (courseName.includes("Dump Truck") || courseName.includes("Transit Mixer") || courseName.includes("Forklift")) {
                        return <Truck className="h-6 w-6 text-amber-600" />;
                      }
                      if (courseName.includes("Housekeeping") || courseName.includes("Health Care")) {
                        return <Home className="h-6 w-6 text-emerald-600" />;
                      }
                      return <BookOpen className="h-6 w-6 text-blue-600" />;
                    };
                    const getCourseBg = (courseName: string) => {
                      if (courseName.includes("Dump Truck") || courseName.includes("Transit Mixer") || courseName.includes("Forklift")) {
                        return "bg-amber-100";
                      }
                      if (courseName.includes("Housekeeping") || courseName.includes("Health Care")) {
                        return "bg-emerald-100";
                      }
                      return "bg-blue-100";
                    };
                    return (
                      <div key={course.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => toast.success(`Opening ${course.name} - Course Details`)}>
                        <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 ${getCourseBg(course.name)} rounded-lg flex items-center justify-center`}>
                            {getCourseIcon(course.name)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{course.name}</h3>
                            <p className="text-sm text-slate-600">{course.instructor} • {course.schedule}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-900">{course.progress}%</p>
                          <div className="w-24 h-2 bg-slate-200 rounded-full mt-1">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${course.progress}%` }}></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                </div>
              </CardContent>
            </Card>

            {/* Assignments */}
            <Card className="mt-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Assignments</CardTitle>
                    <CardDescription>Track your upcoming deadlines</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleViewAll("assignments")}>View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${assignment.status === 'completed' ? 'bg-green-100' : assignment.status === 'submitted' ? 'bg-blue-100' : 'bg-amber-100'}`}>
                          <FileText className={`h-5 w-5 ${assignment.status === 'completed' ? 'text-green-600' : assignment.status === 'submitted' ? 'text-blue-600' : 'text-amber-600'}`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">{assignment.title}</h4>
                          <p className="text-sm text-slate-600">{assignment.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={assignment.status === 'completed' ? 'default' : assignment.status === 'submitted' ? 'secondary' : 'outline'}>
                          {assignment.status === 'completed' ? 'Completed' : assignment.status === 'submitted' ? 'Submitted' : assignment.due}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => toggleAssignmentStatus(assignment.id)}>
                          {assignment.status === 'completed' ? 'Mark Pending' : 'Mark Done'}
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                </div>
              </CardContent>
            </Card>

            {/* Recent Submissions */}
            <Card className="mt-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Submissions</CardTitle>
                    <CardDescription>Your submitted work and grades</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${submission.status === 'graded' ? 'bg-green-100' : 'bg-amber-100'}`}>
                          <Upload className={`h-5 w-5 ${submission.status === 'graded' ? 'text-green-600' : 'text-amber-600'}`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">{submission.assignment}</h4>
                          <p className="text-sm text-slate-600">{submission.subject} • {submission.submittedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {submission.grade && (
                          <Badge variant="default" className="text-lg">{submission.grade}</Badge>
                        )}
                        <Badge variant={submission.status === 'graded' ? 'default' : 'secondary'}>
                          {submission.status === 'graded' ? 'Graded' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {submissions.length === 0 && (
                    <p className="text-center text-slate-500 py-4">No submissions yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Announcements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0 group">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">{announcement.type}</Badge>
                        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => deleteAnnouncement(announcement.id)}>
                          <Trash2 className="h-3 w-3 text-slate-400" />
                        </Button>
                      </div>
                      <h4 className="font-medium text-slate-900 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => toast.success(`Reading: ${announcement.title}`)}>{announcement.title}</h4>
                      <p className="text-sm text-slate-500 mt-1">{announcement.date}</p>
                    </div>
                  ))}
                  {announcements.length === 0 && (
                    <p className="text-center text-slate-500 py-4">No announcements</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Calendar Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today&apos;s Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-3 cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded transition-colors" onClick={() => toast.success("Opening Rigid Highway Dump Truck class details...")}>
                    <div className="text-center min-w-[3rem]">
                      <p className="text-xs text-slate-500">8:00</p>
                      <p className="text-xs text-slate-500">AM</p>
                    </div>
                    <div className="flex-1 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                      <p className="font-medium text-slate-900">Rigid Highway Dump Truck NCII</p>
                      <p className="text-sm text-slate-600">Heavy Equipment Workshop</p>
                    </div>
                  </div>
                  <div className="flex gap-3 cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded transition-colors" onClick={() => toast.success("Opening Forklift Operations class details...")}>
                    <div className="text-center min-w-[3rem]">
                      <p className="text-xs text-slate-500">1:00</p>
                      <p className="text-xs text-slate-500">PM</p>
                    </div>
                    <div className="flex-1 p-3 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                      <p className="font-medium text-slate-900">Housekeeping NCII</p>
                      <p className="text-sm text-slate-600">Skills Training Room C</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {/* Submit Work Dialog */}
                  <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span className="text-xs">Submit Work</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Submit Assignment</DialogTitle>
                        <DialogDescription>Upload your completed assignment for review.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmitWork}>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="assignment">Select Assignment</Label>
                            <Select name="assignment" required>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose an assignment" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="math5">Pre-Operation Inspection Checklist</SelectItem>
                                <SelectItem value="essay">Safety Protocol Assessment</SelectItem>
                                <SelectItem value="lab">Room Cleaning Practical Exam</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="file">Upload File</Label>
                            <div 
                              className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:bg-slate-50 cursor-pointer transition-colors"
                              onClick={handleFileSelect}
                            >
                              {selectedFile ? (
                                <div className="flex items-center justify-center gap-2">
                                  <CheckCircle className="h-8 w-8 text-green-500" />
                                  <span className="text-sm text-green-600">{selectedFile}</span>
                                </div>
                              ) : (
                                <>
                                  <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                                  <p className="text-sm text-slate-600">Click to upload or drag and drop</p>
                                  <p className="text-xs text-slate-400 mt-1">PDF, DOCX up to 10MB</p>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="comments">Comments (Optional)</Label>
                            <Textarea name="comments" placeholder="Add any comments for your instructor..." />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => { setSubmitDialogOpen(false); setSelectedFile(null); }}>Cancel</Button>
                          <Button type="submit">Submit Assignment</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* Message Dialog */}
                  <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        <span className="text-xs">Message</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Send Message</DialogTitle>
                        <DialogDescription>Send a message to your instructor.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSendMessage}>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="recipient">Recipient</Label>
                            <Select name="recipient" required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select recipient" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="delacruz">Engr. Dela Cruz (Dump Truck)</SelectItem>
                                <SelectItem value="santos">Engr. Santos (Transit Mixer)</SelectItem>
                                <SelectItem value="reyes">Sir. Reyes (Forklift)</SelectItem>
                                <SelectItem value="garcia">Ms. Garcia (Housekeeping)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input name="subject" placeholder="Enter message subject" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea name="message" placeholder="Type your message here..." required />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setMessageDialogOpen(false)}>Cancel</Button>
                          <Button type="submit">Send Message</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* Schedule Dialog */}
                  <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span className="text-xs">Schedule</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Class Schedule</DialogTitle>
                        <DialogDescription>Your weekly class schedule.</DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="space-y-3">
                          {['Monday', 'Wednesday', 'Friday'].map((day) => (
                            <div key={day} className="flex gap-3 p-3 bg-amber-50 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors" onClick={() => toast.success(`Opening ${day} schedule details...`)}>
                              <div className="text-center min-w-[4rem]">
                                <p className="text-sm font-medium text-slate-900">{day}</p>
                                <p className="text-xs text-slate-500">8:00 AM</p>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-slate-900">Rigid Highway Dump Truck NCII</p>
                                <p className="text-sm text-slate-600">Heavy Equipment Workshop • Engr. Dela Cruz</p>
                              </div>
                            </div>
                          ))}
                          {['Tuesday', 'Thursday'].map((day) => (
                            <div key={day} className="flex gap-3 p-3 bg-emerald-50 rounded-lg cursor-pointer hover:bg-emerald-100 transition-colors" onClick={() => toast.success(`Opening ${day} schedule details...`)}>
                              <div className="text-center min-w-[4rem]">
                                <p className="text-sm font-medium text-slate-900">{day}</p>
                                <p className="text-xs text-slate-500">1:00 PM</p>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-slate-900">Housekeeping NCII</p>
                                <p className="text-sm text-slate-600">Skills Training Room C • Ms. Garcia</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>Close</Button>
                        <Button onClick={handleScheduleView}>View Full Schedule</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Library Dialog */}
                  <Dialog open={libraryDialogOpen} onOpenChange={setLibraryDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                        <BookMarked className="h-5 w-5" />
                        <span className="text-xs">Library</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Digital Library</DialogTitle>
                        <DialogDescription>Access online resources and e-books.</DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => toast.success("Opening e-book catalog...")}>
                            <div className="flex items-center gap-3">
                              <BookOpen className="h-5 w-5 text-blue-600" />
                              <div>
                                <p className="font-medium">E-Books</p>
                                <p className="text-sm text-slate-500">500+ digital books available</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => toast.success("Opening research database...")}>
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-green-600" />
                              <div>
                                <p className="font-medium">Research Database</p>
                                <p className="text-sm text-slate-500">Academic journals and papers</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => toast.success("Opening past exams...")}>
                            <div className="flex items-center gap-3">
                              <Calendar className="h-5 w-5 text-purple-600" />
                              <div>
                                <p className="font-medium">Past Exams</p>
                                <p className="text-sm text-slate-500">Review previous test materials</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setLibraryDialogOpen(false)}>Close</Button>
                        <Button onClick={handleLibraryAccess}>Access Library</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
}
