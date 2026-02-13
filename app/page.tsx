"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Clock, 
  Star,
  Users,
  Award,
  BookOpen,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Truck,
  HardHat,
  Laptop,
  ChefHat,
  Wrench,
  FileText,
  Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { enrollmentsApi, programsApi, Program, EnrollmentData } from "@/lib/api";

interface DocRequirements {
  educational?: {
    highSchool?: string[];
    als?: string[];
    college?: string[];
  };
  general: string[];
  special?: string[];
}

interface Program {
  id: number;
  title: string;
  category: string;
  icon: React.ElementType;
  description: string;
  duration: string;
  slots: string;
  price?: string;
  scholarship?: string;
  requirements?: string[];
  qualifications?: string[];
  docRequirements?: DocRequirements;
  image: string;
  instructor?: string;
  schedule?: string;
  room?: string;
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [corDialogOpen, setCorDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [enrollmentDataState, setEnrollmentDataState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    education: '',
    address: ''
  });
  const [requirementsAgreed, setRequirementsAgreed] = useState(false);

  const programs = [
    {
      id: 1,
      title: "Rigid Highway Dump Truck NCII",
      category: "heavy-equipment",
      icon: Truck,
      description: "School Based Training - Heavy Equipment Operation under TCLASS scholarship with minimal fee of PISO per hour",
      duration: "3 months",
      slots: "Limited slots available",
      scholarship: "TCLASS Scholarship",
      image: "/programs/dump-truck.jpg",
      instructor: "Engr. Roberto Dela Cruz",
      schedule: "Mon/Wed/Fri 8:00 AM - 12:00 PM",
      room: "Heavy Equipment Yard A",
      qualifications: [
        "At least Highschool or SHS Graduate/ALS Passer/College Level or Graduate",
        "18 years old and above",
        "Physically and Mentally Fit",
        "Can comply to all requirements needed"
      ],
      docRequirements: {
        educational: {
          highSchool: ["Photocopy of Diploma", "Photocopy of Certified True Copy of Form 138 or Form 137 or Form 9"],
          als: ["ALS Certificate"],
          college: ["Photocopy of Diploma", "Photocopy of Certified True Copy of Transcript of Records", "National Certificates (If applicable)"]
        },
        general: [
          "PSA Birth Certificate (Photocopy)",
          "PSA Marriage Certificate (For female married students)",
          "Picture in White background and with collar (Studio Shot) - 3 pcs passport size, 4 pcs 1x1",
          "Original Brgy. Indigency",
          "Original Medical Certificate",
          "Voter's ID / Certification or any government issued ID with address (Photocopy)",
          "Long envelope with clear plastic envelope"
        ],
        special: [
          "Driver's license Original and Photocopy",
          "Must bring the original documents for verification",
          "Must be capable of operating a 4 wheeled vehicle"
        ]
      }
    },
    {
      id: 2,
      title: "Transit Mixer NCII",
      category: "heavy-equipment",
      icon: Truck,
      description: "School Based Training - Heavy Equipment Operation under TCLASS scholarship with minimal fee of PISO per hour",
      duration: "3 months",
      slots: "Now accepting applicants",
      scholarship: "TCLASS Scholarship",
      image: "/programs/transit-mixer.jpg",
      instructor: "Engr. Maria Santos",
      schedule: "Tue/Thu 8:00 AM - 4:00 PM",
      room: "Heavy Equipment Yard B",
      qualifications: [
        "At least Highschool or SHS Graduate/ALS Passer/College Level or Graduate",
        "18 years old and above",
        "Physically and Mentally Fit",
        "Can comply to all requirements needed"
      ],
      docRequirements: {
        educational: {
          highSchool: ["Photocopy of Diploma", "Photocopy of Certified True Copy of Form 138 or Form 137 or Form 9"],
          als: ["ALS Certificate"],
          college: ["Photocopy of Diploma", "Photocopy of Certified True Copy of Transcript of Records", "National Certificates (If applicable)"]
        },
        general: [
          "PSA Birth Certificate (Photocopy)",
          "PSA Marriage Certificate (For female married students)",
          "Picture in White background and with collar (Studio Shot) - 3 pcs passport size, 4 pcs 1x1",
          "Original Brgy. Indigency",
          "Original Medical Certificate",
          "Voter's ID / Certification or any government issued ID with address (Photocopy)",
          "Long envelope with clear plastic envelope"
        ],
        special: [
          "Driver's license Original and Photocopy",
          "Must bring the original documents for verification",
          "Must be capable of operating a 4 wheeled vehicle"
        ]
      }
    },
    {
      id: 3,
      title: "Forklift NCII",
      category: "heavy-equipment",
      icon: HardHat,
      description: "School Based Training - Heavy Equipment Operator under maYAP Scholarship with minimal fee of PISO per hour",
      duration: "2 months",
      slots: "Open for enrollment",
      scholarship: "maYAP Scholarship",
      image: "/programs/forklift.jpg",
      instructor: "Sir. Juan Reyes",
      schedule: "Mon-Fri 1:00 PM - 5:00 PM",
      room: "Workshop Room 3",
      qualifications: [
        "At least Highschool or SHS Graduate/ALS Passer/College Level or Graduate",
        "18 years old and above",
        "Physically and Mentally Fit",
        "Can comply to all requirements needed"
      ],
      docRequirements: {
        educational: {
          highSchool: ["Photocopy of Diploma", "Photocopy of Certified True Copy of Form 138 or Form 137 or Form 9"],
          als: ["ALS Certificate"],
          college: ["Photocopy of Diploma", "Photocopy of Certified True Copy of Transcript of Records", "National Certificates (If applicable)"]
        },
        general: [
          "PSA Birth Certificate (Photocopy)",
          "PSA Marriage Certificate (For female married students)",
          "Picture in White background and with collar (Studio Shot) - 3 pcs passport size, 4 pcs 1x1",
          "Original Brgy. Indigency",
          "Original Medical Certificate",
          "Voter's ID / Certification or any government issued ID with address (Photocopy)",
          "Long envelope with clear plastic envelope"
        ],
        special: [
          "Driver's license Original and Photocopy",
          "Must bring the original documents for verification"
        ]
      }
    },
    {
      id: 4,
      title: "3-Year Diploma in ICT",
      category: "ict",
      icon: Laptop,
      description: "3 Year Diploma in Information and Communication Technology",
      duration: "3 years",
      slots: "5 SLOTS LEFT!",
      scholarship: "TCLASS Program",
      image: "/programs/ict.jpg",
      instructor: "Prof. Ana Garcia",
      schedule: "Mon-Fri 8:00 AM - 5:00 PM",
      room: "ICT Laboratory 2",
      qualifications: [
        "18 YEARS OLD AND ABOVE",
        "GRADUATE OF SENIOR HIGH SCHOOL / ALS / OLD CURRICULUM",
        "MUST MEET THE INTERVIEW REQUIREMENTS"
      ],
      docRequirements: {
        general: [
          "Valid ID / Recent School ID",
          "PSA Birth Certificate",
          "SF9 / Report Card",
          "Certificate of Good Moral Conduct"
        ]
      }
    },
    {
      id: 5,
      title: "Housekeeping NCII",
      category: "services",
      icon: Award,
      description: "School Based Training under maYAP Scholarship with minimal fee of PISO per hour",
      duration: "2 months",
      slots: "Now open",
      scholarship: "maYAP Scholarship",
      image: "/programs/housekeeping.jpg",
      instructor: "Ms. Lisa Wong",
      schedule: "Mon/Wed 8:00 AM - 4:00 PM",
      room: "Training Room 5",
      qualifications: [
        "At least Highschool or SHS Graduate/ALS Passer/College Level or Graduate",
        "18 years old and above",
        "Physically and Mentally Fit",
        "Can comply to all requirements needed"
      ],
      docRequirements: {
        educational: {
          highSchool: ["Photocopy of Diploma", "Photocopy of Certified True Copy of Form 138 or Form 137 or Form 9"],
          als: ["ALS Certificate"],
          college: ["Photocopy of Diploma", "Photocopy of Certified True Copy of Transcript of Records", "National Certificates (If applicable)"]
        },
        general: [
          "PSA Birth Certificate (Photocopy)",
          "PSA Marriage Certificate (For female married students)",
          "Picture in White background and with collar (Studio Shot) - 3 pcs passport size, 4 pcs 1x1",
          "Original Brgy. Indigency",
          "Original Medical Certificate",
          "Voter's ID / Certification or any government issued ID with address (Photocopy)",
          "Long envelope with clear plastic envelope"
        ]
      }
    },
    {
      id: 6,
      title: "Health Care Services NCII",
      category: "services",
      icon: Users,
      description: "School Based Training under maYAP Scholarship with minimal fee of PISO per hour",
      duration: "6 months",
      slots: "Limited slots",
      scholarship: "maYAP Scholarship",
      image: "/programs/healthcare.jpg",
      instructor: "Dr. Pedro Martinez",
      schedule: "Tue/Thu/Fri 8:00 AM - 4:00 PM",
      room: "Medical Training Lab",
      qualifications: [
        "At least Highschool or SHS Graduate/ALS Passer/College Level or Graduate",
        "18 years old and above",
        "Physically and Mentally Fit",
        "Can comply to all requirements needed"
      ],
      docRequirements: {
        educational: {
          highSchool: ["Photocopy of Diploma", "Photocopy of Certified True Copy of Form 138 or Form 137 or Form 9"],
          als: ["ALS Certificate"],
          college: ["Photocopy of Diploma", "Photocopy of Certified True Copy of Transcript of Records", "National Certificates (If applicable)"]
        },
        general: [
          "PSA Birth Certificate (Photocopy)",
          "PSA Marriage Certificate (For female married students)",
          "Picture in White background and with collar (Studio Shot) - 3 pcs passport size, 4 pcs 1x1",
          "Original Brgy. Indigency",
          "Original Medical Certificate",
          "Voter's ID / Certification or any government issued ID with address (Photocopy)",
          "Long envelope with clear plastic envelope"
        ]
      }
    }
  ];

  const news = [
    {
      id: 1,
      title: "TARA NA at Maging maYAP Scholar!",
      date: "January 26, 2026",
      excerpt: "Calling all TARLAQUEÑOS! Be a scholar today under the maYAP Scholarship Program.",
      image: "/news/scholarship.jpg",
      type: "Announcement"
    },
    {
      id: 2,
      title: "Meat Processing Community-Based Training Program",
      date: "February 10, 2026",
      excerpt: "Matagumpay na naisagawa ang Meat Processing Community-Based Training Program ng Provincial Government of Tarlac...",
      image: "/news/meat-processing.jpg",
      type: "Event"
    },
    {
      id: 3,
      title: "Heavy Equipment Operator Opportunity",
      date: "February 5, 2026",
      excerpt: "OPORTUNIDAD PARA SA MGA NAGNANAIS MAGING HEAVY EQUIPMENT OPERATOR! Apply now for our scholarship programs.",
      image: "/news/heavy-equipment.jpg",
      type: "Opportunity"
    }
  ];

  const filteredPrograms = activeTab === "all" 
    ? programs 
    : programs.filter(p => p.category === activeTab);

  const openEnrollmentDialog = (program: Program) => {
    setSelectedProgram(program);
    setEnrollDialogOpen(true);
  };

  const [isEnrolling, setIsEnrolling] = useState(false);
  const [corNumber, setCorNumber] = useState("");

  // Fetch programs from API on mount
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await programsApi.getAll({ status: 'active' });
        // Transform API programs to match the local format
        const apiPrograms = response.data.map((p: Program) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          icon: getCategoryIcon(p.category),
          description: p.description,
          duration: p.duration,
          slots: p.slots,
          price: p.price,
          scholarship: p.scholarship,
          requirements: p.qualifications || p.requirements,
          qualifications: p.qualifications,
          docRequirements: p.doc_requirements,
          image: p.image || '/programs/default.jpg',
          instructor: 'TBD',
          schedule: 'TBD',
          room: 'TBD',
        }));
        // Update programs if API returns data
        if (apiPrograms.length > 0) {
          // Merge or replace - here we keep local ones as fallback
          console.log('Programs loaded from API:', apiPrograms);
        }
      } catch (error) {
        console.log('Using local programs data');
      }
    };
    fetchPrograms();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'heavy-equipment': return Truck;
      case 'ict': return Laptop;
      case 'services': return Award;
      default: return BookOpen;
    }
  };

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProgram) return;
    
    if (!requirementsAgreed) {
      toast.error("Please agree to the enrollment requirements");
      return;
    }
    
    setIsEnrolling(true);
    
    try {
      const enrollmentData: EnrollmentData = {
        program_id: selectedProgram.id,
        first_name: enrollmentDataState.firstName,
        last_name: enrollmentDataState.lastName,
        email: enrollmentDataState.email,
        phone: enrollmentDataState.phone,
        birth_date: enrollmentDataState.birthDate,
        education_level: enrollmentDataState.education,
        address: enrollmentDataState.address,
      };
      
      const response = await enrollmentsApi.enroll(enrollmentData);
      
      setCorNumber(response.cor_number);
      setEnrollDialogOpen(false);
      setCorDialogOpen(true);
      toast.success("Enrollment successful! Generating Certificate of Registration...");
    } catch (error: any) {
      toast.error(error.message || "Enrollment failed. Please try again.");
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEnrollmentDataState(prev => ({ ...prev, [field]: value }));
  };

  const generateCORNumber = () => {
    return `COR-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              0917-706-6718
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Mail className="h-3 w-3" />
              pgt.tclass@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://www.facebook.com/pgt.tclass/" target="_blank" className="hover:text-blue-200 transition-colors">
              <Facebook className="h-4 w-4" />
            </Link>
            <span className="hidden sm:inline">Follow us on Facebook</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-14 h-14">
                <Image
                  src="/tclass-logo.jpg"
                  alt="TCLASS Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-slate-900 leading-tight">PGT - Tarlac Center</h1>
                <p className="text-xs text-slate-600">for Learning And Skills Success</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#about" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#programs" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">Programs</a>
              <a href="#news" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">News</a>
              <a href="#contact" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" size="sm" className="hidden sm:flex">Login</Button>
              </Link>
              <Link href="/student">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Student Portal</Button>
              </Link>
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
              <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#programs" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>Programs</a>
              <a href="#news" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>News</a>
              <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              <div className="pt-2 border-t border-slate-100">
                <Link href="/login" className="block px-3 py-2 text-base font-medium text-blue-600">Login</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative text-white min-h-[600px] lg:min-h-[700px]">
        {/* Background Image with TCLASS Logo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/tclass.jpg')" }}
        />
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-900/70" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex items-center min-h-[600px] lg:min-h-[700px]">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-yellow-500 text-blue-900 hover:bg-yellow-400 font-semibold">EST. 2007</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              PGT - Tarlac Center for<br />
              <span className="text-yellow-400">Learning And Skills Success</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl drop-shadow-md">
              TechVoc Training Center that produces competent, employable and globally competitive graduates. 
              Under the Provincial Government of Tarlac.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-yellow-500 text-blue-900 hover:bg-yellow-400 font-semibold shadow-lg" onClick={() => openEnrollmentDialog(programs[0])}>
                <GraduationCap className="h-5 w-5 mr-2" />
                Enroll Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm">
                <BookOpen className="h-5 w-5 mr-2" />
                View Programs
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-6 lg:gap-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium">29K+ Followers</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium">TESDA Accredited</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Award className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium">Government Funded</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800">About Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Empowering Tarlaqueños Through Quality Technical Education
              </h2>
              <p className="text-slate-600 mb-6 text-lg">
                The Tarlac Center for Learning and Skills Success (TCLASS) is a premier technical vocational 
                training center under the Provincial Government of Tarlac. We are committed to providing 
                accessible, quality education that prepares our students for local and global employment.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">TESDA Accredited</h4>
                    <p className="text-sm text-slate-600">National Certificate programs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Scholarship Programs</h4>
                    <p className="text-sm text-slate-600">TCLASS & maYAP scholarships</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Industry Partners</h4>
                    <p className="text-sm text-slate-600">Employment assistance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Wrench className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Hands-on Training</h4>
                    <p className="text-sm text-slate-600">Practical skills development</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-200 shadow-xl">
                <Image
                  src="/tclass.jpg"
                  alt="TCLASS Training Center"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <p className="text-3xl font-bold text-blue-600">17+</p>
                <p className="text-sm text-slate-600">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Our Programs</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Training Programs & Scholarships
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We offer various TESDA-accredited programs under TCLASS and maYAP scholarships 
              with minimal fees or fully funded opportunities.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[
              { id: "all", label: "All Programs" },
              { id: "heavy-equipment", label: "Heavy Equipment" },
              { id: "ict", label: "ICT & Tech" },
              { id: "services", label: "Services" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center">
                  <program.icon className="h-20 w-20 text-white/80" />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-yellow-100 text-yellow-800">{program.slots}</Badge>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">{program.description}</p>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {program.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      NCII Certified
                    </span>
                  </div>
                  {(program as Program).requirements && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-slate-500 mb-2">Requirements:</p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {(program as Program).requirements?.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <ChevronRight className="h-3 w-3 text-blue-500 mt-0.5" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Button className="w-full" onClick={() => openEnrollmentDialog(program)}>
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News/Updates Section */}
      <section id="news" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">News & Updates</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Latest from TCLASS
            </h2>
            <p className="text-slate-600">
              Stay updated with our latest programs, events, and announcements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-slate-200 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-slate-400" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">{item.type}</Badge>
                    <span className="text-xs text-slate-500">{item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => toast.success(`Reading: ${item.title}`)}>
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="https://www.facebook.com/pgt.tclass/" target="_blank">
              <Button variant="outline" className="gap-2">
                <Facebook className="h-4 w-4" />
                View More on Facebook
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4 bg-blue-800 text-blue-100">Contact Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get In Touch With Us
              </h2>
              <p className="text-slate-400 mb-8">
                Visit our training center or reach out to us for inquiries about our programs and scholarships.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-800 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-200" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-slate-400">
                      IT Training Center Bldg., Right Wing,<br />
                      IT Park I, Tibag Tarlac City,<br />
                      Tarlac, Philippines, 2300
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-800 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-200" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-slate-400">
                      0917-706-6718 (For training)<br />
                      0917-848-5235 (For assessment)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-800 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-200" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-slate-400">pgt.tclass@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-800 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-200" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Office Hours</h4>
                    <p className="text-slate-400">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 text-slate-900">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Message sent! We'll get back to you soon."); }}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Juan" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Dela Cruz" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="juan@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input type="tel" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="0917XXXXXXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 resize-none" placeholder="How can we help you?" required />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12">
                  <Image
                    src="/tclass-logo.jpg"
                    alt="TCLASS Logo"
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold">PGT - TCLASS</h3>
                  <p className="text-xs">Tarlac Center for Learning And Skills Success</p>
                </div>
              </div>
              <p className="text-sm mb-4 max-w-md">
                TechVoc Training Center under the Provincial Government of Tarlac that produces 
                competent, employable and globally competitive graduates.
              </p>
              <div className="flex gap-4">
                <Link href="https://www.facebook.com/pgt.tclass/" target="_blank" className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Programs</a></li>
                <li><a href="#news" className="hover:text-white transition-colors">News</a></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Student Portal</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#programs" className="hover:text-white transition-colors">Heavy Equipment</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">ICT Diploma</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Housekeeping</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Health Care</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Scholarships</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © 2026 PGT - Tarlac Center for Learning And Skills Success. All rights reserved.
            </p>
            <p className="text-sm">
              Provincial Government of Tarlac | TESDA Accredited
            </p>
          </div>
        </div>
      </footer>

      {/* Enrollment Form Dialog */}
      <Dialog open={enrollDialogOpen} onOpenChange={setEnrollDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              Enroll Now
            </DialogTitle>
            <DialogDescription>
              Fill in your details to enroll in {selectedProgram?.title}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEnroll} className="space-y-4 pt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <Input 
                  value={enrollmentDataState.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Juan"
                  required
                  disabled={isEnrolling}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <Input 
                  value={enrollmentDataState.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Dela Cruz"
                  required
                  disabled={isEnrolling}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input 
                type="email"
                value={enrollmentDataState.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="juan@example.com"
                required
                disabled={isEnrolling}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <Input 
                type="tel"
                value={enrollmentDataState.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="0917XXXXXXX"
                required
                disabled={isEnrolling}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date of Birth</label>
              <Input 
                type="date"
                value={enrollmentDataState.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                required
                disabled={isEnrolling}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Highest Educational Attainment</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={enrollmentDataState.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                required
                disabled={isEnrolling}
              >
                <option value="">Select...</option>
                <option value="high-school">High School Graduate</option>
                <option value="college-undergrad">College Undergraduate</option>
                <option value="college-graduate">College Graduate</option>
                <option value="tesda-nc">TESDA NC Holder</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Complete Address</label>
              <Textarea 
                value={enrollmentDataState.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Street, Barangay, Municipality, Province"
                required
                disabled={isEnrolling}
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Program Details</h4>
              <p className="text-sm text-blue-800">{selectedProgram?.title}</p>
              <p className="text-sm text-blue-600">Duration: {selectedProgram?.duration}</p>
              <p className="text-sm text-blue-600">Tuition: {selectedProgram?.price}</p>
            </div>

            {/* Enrollment Requirements - Course Specific */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg max-h-96 overflow-y-auto">
              <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Enrollment Requirements
              </h4>
              
              {/* Scholarship Info */}
              {selectedProgram?.scholarship && (
                <div className="mb-3 p-2 bg-blue-100 rounded">
                  <p className="text-sm font-semibold text-blue-800">
                    {selectedProgram.scholarship}
                  </p>
                </div>
              )}

              {/* Qualifications */}
              {selectedProgram?.qualifications && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-amber-800 mb-2">QUALIFICATION:</p>
                  <ol className="space-y-1 text-sm text-amber-800 list-decimal list-inside">
                    {selectedProgram.qualifications.map((qual, idx) => (
                      <li key={idx}>{qual}</li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Documentary Requirements */}
              {selectedProgram?.docRequirements && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-amber-800 mb-2">DOCUMENTARY REQUIREMENTS:</p>
                  <p className="text-xs text-amber-600 mb-2">Original and photocopy of the following:</p>
                  
                  {/* Educational Requirements */}
                  {selectedProgram.docRequirements.educational && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-amber-700 mb-1">1.) Educational Credentials:</p>
                      {selectedProgram.docRequirements.educational.highSchool && (
                        <div className="ml-3 mb-1">
                          <p className="text-xs text-amber-700">A.) Highschool Graduate:</p>
                          <ul className="ml-3 text-xs text-amber-600 list-disc list-inside">
                            {selectedProgram.docRequirements.educational.highSchool.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedProgram.docRequirements.educational.als && (
                        <div className="ml-3 mb-1">
                          <p className="text-xs text-amber-700">B.) ALS Graduate:</p>
                          <ul className="ml-3 text-xs text-amber-600 list-disc list-inside">
                            {selectedProgram.docRequirements.educational.als.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedProgram.docRequirements.educational.college && (
                        <div className="ml-3 mb-1">
                          <p className="text-xs text-amber-700">C.) College Level / Graduate:</p>
                          <ul className="ml-3 text-xs text-amber-600 list-disc list-inside">
                            {selectedProgram.docRequirements.educational.college.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* General Requirements */}
                  {selectedProgram.docRequirements.general && (
                    <div className="mb-3">
                      {selectedProgram.docRequirements.educational && (
                        <p className="text-xs font-semibold text-amber-700 mb-1">
                          {selectedProgram.docRequirements.educational ? "2.)" : "1.)"} General Requirements:
                        </p>
                      )}
                      <ul className="ml-3 text-xs text-amber-600 list-disc list-inside">
                        {selectedProgram.docRequirements.general.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Special Requirements (for driving/heavy equipment) */}
                  {selectedProgram.docRequirements.special && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-amber-700 mb-1">
                        FOR DRIVING AND HEAVY EQUIPMENT COURSES:
                      </p>
                      <ul className="ml-3 text-xs text-amber-600 list-disc list-inside">
                        {selectedProgram.docRequirements.special.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Legacy requirements support */}
              {selectedProgram?.requirements && !selectedProgram?.docRequirements && (
                <ul className="space-y-1 text-sm text-amber-800 list-disc list-inside">
                  {selectedProgram.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              )}

              <div className="mt-4 pt-3 border-t border-amber-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requirementsAgreed}
                    onChange={(e) => setRequirementsAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    required
                  />
                  <span className="text-sm text-amber-900">
                    I confirm that I have read and understood the enrollment requirements, and I agree to submit all required documents upon enrollment.
                  </span>
                </label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEnrollDialogOpen(false)} disabled={isEnrolling}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isEnrolling || !requirementsAgreed}>
                {isEnrolling ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Complete Enrollment'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Certificate of Registration Dialog */}
      <Dialog open={corDialogOpen} onOpenChange={setCorDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="flex justify-center mb-2">
                <div className="relative w-16 h-16">
                  <Image
                    src="/tclass-logo.jpg"
                    alt="TCLASS Logo"
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
              </div>
              <h2 className="text-xl font-bold text-blue-900">CERTIFICATE OF REGISTRATION</h2>
              <p className="text-sm text-slate-600">PGT - Tarlac Center for Learning And Skills Success</p>
            </DialogTitle>
          </DialogHeader>
          <div className="border-t-4 border-blue-900 pt-6 space-y-6">
            {/* COR Number and Date */}
            <div className="flex justify-between text-sm">
              <span><strong>COR No:</strong> {corNumber || generateCORNumber()}</span>
              <span><strong>Date:</strong> {new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>

            {/* Student Information */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-3 border-b pb-2">STUDENT INFORMATION</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Student Name:</span>
                  <p className="font-semibold">{enrollmentDataState.firstName} {enrollmentDataState.lastName}</p>
                </div>
                <div>
                  <span className="text-slate-500">Email:</span>
                  <p className="font-semibold">{enrollmentDataState.email}</p>
                </div>
                <div>
                  <span className="text-slate-500">Phone:</span>
                  <p className="font-semibold">{enrollmentDataState.phone}</p>
                </div>
                <div>
                  <span className="text-slate-500">Date of Birth:</span>
                  <p className="font-semibold">{enrollmentDataState.birthDate ? new Date(enrollmentDataState.birthDate).toLocaleDateString('en-PH') : ''}</p>
                </div>
              </div>
            </div>

            {/* Class Schedule */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-3 border-b border-blue-200 pb-2">CLASS SCHEDULE</h3>
              <div className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-blue-600 text-sm">Program:</span>
                    <p className="font-semibold text-slate-900">{selectedProgram?.title}</p>
                  </div>
                  <div>
                    <span className="text-blue-600 text-sm">Duration:</span>
                    <p className="font-semibold text-slate-900">{selectedProgram?.duration}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-blue-600 text-sm">Schedule:</span>
                    <p className="font-semibold text-slate-900">{selectedProgram?.schedule}</p>
                  </div>
                  <div>
                    <span className="text-blue-600 text-sm">Room/Location:</span>
                    <p className="font-semibold text-slate-900">{selectedProgram?.room}</p>
                  </div>
                </div>
                <div>
                  <span className="text-blue-600 text-sm">Instructor/Professor:</span>
                  <p className="font-semibold text-slate-900">{selectedProgram?.instructor}</p>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">Important Reminders:</h4>
              <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                <li>Please bring a printed copy of this COR on your first day of class</li>
                <li>Report to the TCLASS office for your ID processing</li>
                <li>Submit required documents on or before first day of class:</li>
              </ul>
              
              {/* Course-Specific Requirements */}
              {selectedProgram?.docRequirements && (
                <div className="mt-3 ml-4 text-sm text-amber-800 bg-amber-100 p-3 rounded max-h-64 overflow-y-auto">
                  <p className="font-semibold mb-2">Documentary Requirements:</p>
                  
                  {/* Educational */}
                  {selectedProgram.docRequirements.educational && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-amber-700">Educational Credentials:</p>
                      <ul className="ml-3 text-xs space-y-0.5 list-disc list-inside">
                        {selectedProgram.docRequirements.educational.highSchool?.map((item, idx) => (
                          <li key={`hs-${idx}`}>{item}</li>
                        ))}
                        {selectedProgram.docRequirements.educational.als?.map((item, idx) => (
                          <li key={`als-${idx}`}>{item}</li>
                        ))}
                        {selectedProgram.docRequirements.educational.college?.map((item, idx) => (
                          <li key={`col-${idx}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* General */}
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-amber-700">General Requirements:</p>
                    <ul className="ml-3 text-xs space-y-0.5 list-disc list-inside">
                      {selectedProgram.docRequirements.general.map((item, idx) => (
                        <li key={`gen-${idx}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Special (Driving/Heavy Equipment) */}
                  {selectedProgram.docRequirements.special && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-amber-700">For Driving/Heavy Equipment Courses:</p>
                      <ul className="ml-3 text-xs space-y-0.5 list-disc list-inside">
                        {selectedProgram.docRequirements.special.map((item, idx) => (
                          <li key={`spec-${idx}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              {/* Legacy requirements */}
              {selectedProgram?.requirements && !selectedProgram?.docRequirements && (
                <div className="mt-3 ml-4 text-sm text-amber-800 bg-amber-100 p-3 rounded">
                  <p className="font-semibold mb-2">Initial Requirements:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    {selectedProgram.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside mt-3">
                <li>Must bring original documents for verification</li>
                <li>Classes start on the scheduled date. Be on time!</li>
              </ul>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-slate-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <div className="text-xs text-slate-500">QR Code</div>
                </div>
                <p className="text-xs text-slate-500">Scan to verify enrollment</p>
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-center gap-4">
            <Button onClick={() => window.print()} variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Print COR
            </Button>
            <Button onClick={() => setCorDialogOpen(false)} className="bg-blue-600 hover:bg-blue-700">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
