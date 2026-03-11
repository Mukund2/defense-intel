"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { ProjectsProvider } from "@/contexts/projects-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProjectsProvider>
      <div className="flex min-h-screen">
        <Sidebar />

        {/* Main content area */}
        <div className="ml-[260px] flex flex-1 flex-col">
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ProjectsProvider>
  );
}
