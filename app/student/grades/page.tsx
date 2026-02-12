"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  Bell, 
  Search, 
  Menu, 
  X, 
  ArrowLeft,
  TrendingUp,
  Award,
  BookOpen,
  Calculator,
  Download,
  Eye,
  FileText,
  Star,
  ChevronDown,
  ChevronUp,
  Percent
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

interface GradeBreakdown {
  id: number;
  assignment: string;
  type: string;
  score: number;
  maxPoints: number;
  percentage: number;
  date: string;
}

interface SubjectGrade {
  id: number;
  name: string;
  code: string;
  instructor: string;
  currentGrade: number;
  letterGrade: string;
  gpa: number;
  credits: number;
  progress: number;
  breakdown: GradeBreakdown[];
}

export default function GradesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationCount] = useState(3);
  const [selectedSubject, setSelectedSubject] = useState<SubjectGrade | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [gpaDialogOpen, setGpaDialogOpen] = useState(false);

  // GPA Calculator state
  const [courseInputs, setCourseInputs] = useState([
    { credits: 3, grade: 4.0 },
    { credits: 3, grade: 3.5 },
    { credits: 3, grade: 4.0 },
    { credits: 3, grade: 3.0 },
  ]);

  const [subjects] = useState<SubjectGrade[]>([
    {
      id: 1,
      name: "Mathematics 101",
      code: "MATH101",
      instructor: "Prof. Santos",
      currentGrade: 92,
      letterGrade: "A-",
      gpa: 3.7,
      credits: 3,
      progress: 75,
      breakdown: [
        { id: 1, assignment: "Quiz 1", type: "Quiz", score: 18, maxPoints: 20, percentage: 90, date: "Jan 15" },
        { id: 2, assignment: "Problem Set 1", type: "Assignment", score: 95, maxPoints: 100, percentage: 95, date: "Jan 22" },
        { id: 3, assignment: "Midterm Exam", type: "Exam", score: 88, maxPoints: 100, percentage: 88, date: "Feb 5" },
        { id: 4, assignment: "Problem Set 2", type: "Assignment", score: 92, maxPoints: 100, percentage: 92, date: "Feb 12" },
      ]
    },
    {
      id: 2,
      name: "English Literature",
      code: "ENG102",
      instructor: "Prof. Cruz",
      currentGrade: 88,
      letterGrade: "B+",
      gpa: 3.3,
      credits: 3,
      progress: 60,
      breakdown: [
        { id: 1, assignment: "Reading Response 1", type: "Assignment", score: 85, maxPoints: 100, percentage: 85, date: "Jan 18" },
        { id: 2, assignment: "Essay Draft", type: "Essay", score: 90, maxPoints: 100, percentage: 90, date: "Feb 1" },
        { id: 3, assignment: "Participation", type: "Participation", score: 88, maxPoints: 100, percentage: 88, date: "Ongoing" },
      ]
    },
    {
      id: 3,
      name: "Science Lab",
      code: "SCI103",
      instructor: "Prof. Reyes",
      currentGrade: 95,
      letterGrade: "A",
      gpa: 4.0,
      credits: 4,
      progress: 85,
      breakdown: [
        { id: 1, assignment: "Lab Safety Quiz", type: "Quiz", score: 20, maxPoints: 20, percentage: 100, date: "Jan 10" },
        { id: 2, assignment: "Lab Report 1", type: "Lab Report", score: 95, maxPoints: 100, percentage: 95, date: "Jan 24" },
        { id: 3, assignment: "Lab Report 2", type: "Lab Report", score: 92, maxPoints: 100, percentage: 92, date: "Feb 7" },
        { id: 4, assignment: "Practical Exam", type: "Exam", score: 96, maxPoints: 100, percentage: 96, date: "Feb 10" },
      ]
    },
    {
      id: 4,
      name: "History",
      code: "HIS104",
      instructor: "Prof. Garcia",
      currentGrade: 85,
      letterGrade: "B",
      gpa: 3.0,
      credits: 3,
      progress: 45,
      breakdown: [
        { id: 1, assignment: "Timeline Project", type: "Project", score: 88, maxPoints: 100, percentage: 88, date: "Jan 20" },
        { id: 2, assignment: "Research Paper", type: "Essay", score: 82, maxPoints: 100, percentage: 82, date: "Feb 3" },
      ]
    },
    {
      id: 5,
      name: "Computer Programming",
      code: "CS101",
      instructor: "Prof. Lim",
      currentGrade: 96,
      letterGrade: "A",
      gpa: 4.0,
      credits: 4,
      progress: 90,
      breakdown: [
        { id: 1, assignment: "Coding Exercise 1", type: "Assignment", score: 100, maxPoints: 100, percentage: 100, date: "Jan 12" },
        { id: 2, assignment: "Coding Exercise 2", type: "Assignment", score: 95, maxPoints: 100, percentage: 95, date: "Jan 26" },
        { id: 3, assignment: "Midterm Project", type: "Project", score: 93, maxPoints: 100, percentage: 93, date: "Feb 8" },
      ]
    },
    {
      id: 6,
      name: "Technical Drawing",
      code: "TECH201",
      instructor: "Prof. Torres",
      currentGrade: 82,
      letterGrade: "B-",
      gpa: 2.7,
      credits: 3,
      progress: 55,
      breakdown: [
        { id: 1, assignment: "Basic Shapes", type: "Drawing", score: 85, maxPoints: 100, percentage: 85, date: "Jan 16" },
        { id: 2, assignment: "Orthographic Views", type: "Drawing", score: 79, maxPoints: 100, percentage: 79, date: "Feb 2" },
      ]
    },
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for "${searchQuery}"...`);
    } else {
      toast.error("Please enter a search term");
    }
  };

  const handleNotificationClick = () => {
    toast.success("All notifications marked as read");
  };

  const openDetailsDialog = (subject: SubjectGrade) => {
    setSelectedSubject(subject);
    setDetailsDialogOpen(true);
  };

  const calculateGPA = () => {
    const totalPoints = courseInputs.reduce((sum, course) => sum + (course.credits * course.grade), 0);
    const totalCredits = courseInputs.reduce((sum, course) => sum + course.credits, 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  const handleDownloadTranscript = () => {
    toast.success("Transcript downloaded successfully!");
  };

  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate overall stats
  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  const currentGPA = (subjects.reduce((sum, s) => sum + (s.gpa * s.credits), 0) / totalCredits).toFixed(2);
  const averageScore = Math.round(subjects.reduce((sum, s) => sum + s.currentGrade, 0) / subjects.length);

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600";
    if (grade >= 80) return "text-blue-600";
    if (grade >= 70) return "text-amber-600";
    return "text-red-600";
  };

  const getGradeBgColor = (grade: number) => {
    if (grade >= 90) return "bg-green-100";
    if (grade >= 80) return "bg-blue-100";
    if (grade >= 70) return "bg-amber-100";
    return "bg-red-100";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">TClass</span>
              </Link>
              <Badge variant="secondary" className="hidden sm:inline-flex">Student Portal</Badge>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/student" className="text-sm font-medium text-slate-600 hover:text-slate-900">Dashboard</Link>
              <Link href="/student/courses" className="text-sm font-medium text-slate-600 hover:text-slate-900">Courses</Link>
              <Link href="/student/assignments" className="text-sm font-medium text-slate-600 hover:text-slate-900">Assignments</Link>
              <Link href="/student/grades" className="text-sm font-medium text-blue-600">Grades</Link>
              <Link href="/student/calendar" className="text-sm font-medium text-slate-600 hover:text-slate-900">Calendar</Link>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <form onSubmit={handleSearch} className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search..." 
                  className="pl-9 w-48"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <Button variant="ghost" size="icon" className="relative" onClick={handleNotificationClick}>
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </Button>
              <Avatar className="hidden sm:flex">
                <AvatarFallback className="bg-blue-100 text-blue-700">JD</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-3 space-y-1">
              <Link href="/student" className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50">Dashboard</Link>
              <Link href="/student/courses" className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50">Courses</Link>
              <Link href="/student/assignments" className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50">Assignments</Link>
              <Link href="/student/grades" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-blue-50">Grades</Link>
              <Link href="/student/calendar" className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50">Calendar</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link & Title */}
        <div className="mb-8">
          <Link href="/student" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Grades</h1>
              <p className="text-slate-600 mt-1">View your academic performance and grades</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setGpaDialogOpen(true)}>
                <Calculator className="h-4 w-4 mr-2" />
                GPA Calculator
              </Button>
              <Button onClick={handleDownloadTranscript}>
                <Download className="h-4 w-4 mr-2" />
                Transcript
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Current GPA</p>
                  <p className="text-2xl font-bold text-slate-900">{currentGPA}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Percent className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Average Score</p>
                  <p className="text-2xl font-bold text-slate-900">{averageScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Credits</p>
                  <p className="text-2xl font-bold text-slate-900">{totalCredits}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search subjects..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Grades Table */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Breakdown by Subject</CardTitle>
            <CardDescription>{filteredSubjects.length} subjects this semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Current Grade</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{subject.name}</p>
                          <p className="text-xs text-slate-500">{subject.code}</p>
                        </div>
                      </TableCell>
                      <TableCell>{subject.instructor}</TableCell>
                      <TableCell>{subject.credits}</TableCell>
                      <TableCell>
                        <div className="w-24">
                          <Progress value={subject.progress} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${getGradeColor(subject.currentGrade)}`}>
                            {subject.currentGrade}%
                          </span>
                          <Badge className={`${getGradeBgColor(subject.currentGrade)} ${getGradeColor(subject.currentGrade)} border-0`}>
                            {subject.letterGrade}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{subject.gpa.toFixed(1)}</span>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openDetailsDialog(subject)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredSubjects.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900">No subjects found</h3>
                <p className="text-slate-600">Try adjusting your search terms</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detailed Grade Dialog */}
        <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Detailed Grades
              </DialogTitle>
              <DialogDescription>{selectedSubject?.name} - Grade Breakdown</DialogDescription>
            </DialogHeader>
            {selectedSubject && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-sm text-slate-500">Current Grade</p>
                    <p className={`text-2xl font-bold ${getGradeColor(selectedSubject.currentGrade)}`}>
                      {selectedSubject.currentGrade}%
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-sm text-slate-500">Letter Grade</p>
                    <p className="text-2xl font-bold text-slate-900">{selectedSubject.letterGrade}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-sm text-slate-500">GPA Points</p>
                    <p className="text-2xl font-bold text-slate-900">{selectedSubject.gpa}</p>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Assignment</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>%</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedSubject.breakdown.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.assignment}</p>
                              <p className="text-xs text-slate-500">{item.date}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.type}</Badge>
                          </TableCell>
                          <TableCell>
                            {item.score} / {item.maxPoints}
                          </TableCell>
                          <TableCell>
                            <span className={getGradeColor(item.percentage)}>{item.percentage}%</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* GPA Calculator Dialog */}
        <Dialog open={gpaDialogOpen} onOpenChange={setGpaDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                GPA Calculator
              </DialogTitle>
              <DialogDescription>Calculate your estimated GPA</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-3">
                {courseInputs.map((course, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <div className="flex-1">
                      <Label className="text-xs">Credits</Label>
                      <Input 
                        type="number" 
                        min="1" 
                        max="6"
                        value={course.credits}
                        onChange={(e) => {
                          const newInputs = [...courseInputs];
                          newInputs[index].credits = parseInt(e.target.value) || 0;
                          setCourseInputs(newInputs);
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-xs">Grade Points</Label>
                      <Input 
                        type="number" 
                        step="0.1"
                        min="0"
                        max="4"
                        value={course.grade}
                        onChange={(e) => {
                          const newInputs = [...courseInputs];
                          newInputs[index].grade = parseFloat(e.target.value) || 0;
                          setCourseInputs(newInputs);
                        }}
                      />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="mt-5"
                      onClick={() => {
                        const newInputs = courseInputs.filter((_, i) => i !== index);
                        setCourseInputs(newInputs);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setCourseInputs([...courseInputs, { credits: 3, grade: 3.0 }])}
                >
                  Add Course
                </Button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-slate-600">Estimated GPA</p>
                <p className="text-3xl font-bold text-blue-600">{calculateGPA()}</p>
              </div>

              <div className="mt-4 text-xs text-slate-500">
                <p className="font-medium mb-1">Grade Point Scale:</p>
                <p>A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, D = 1.0, F = 0.0</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setGpaDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
