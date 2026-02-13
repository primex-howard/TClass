import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { StudentSidebar } from "@/components/student-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TClass - Student Portal",
  description: "TClass Student Learning Management System",
};

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="flex min-h-screen bg-slate-50">
        <StudentSidebar />
        <main className="flex-1 min-h-screen lg:pt-0 pt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
