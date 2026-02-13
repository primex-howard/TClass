"use client";

import { usePathname } from "next/navigation";
import { FacultySidebar } from "./faculty-sidebar";

export function DynamicSidebar() {
  const pathname = usePathname();
  const userType = pathname?.startsWith('/admin') ? 'admin' : 'faculty';
  
  return <FacultySidebar userType={userType} />;
}
