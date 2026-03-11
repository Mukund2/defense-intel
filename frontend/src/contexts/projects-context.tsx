"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { mockProjects, type Project } from "@/lib/mock-data";

interface ProjectsContextValue {
  projects: Project[];
  addProject: (name: string, description: string, color: string) => void;
  deleteProject: (id: string) => void;
  addOpportunityToProject: (projectId: string, opportunityId: string) => void;
  removeOpportunityFromProject: (projectId: string, opportunityId: string) => void;
  getProjectForOpportunity: (opportunityId: string) => Project | undefined;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const addProject = useCallback((name: string, description: string, color: string) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name,
      description,
      color,
      opportunityIds: [],
      createdAt: new Date().toISOString().split("T")[0],
    };
    setProjects((prev) => [...prev, newProject]);
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addOpportunityToProject = useCallback((projectId: string, opportunityId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId && !p.opportunityIds.includes(opportunityId)) {
          return { ...p, opportunityIds: [...p.opportunityIds, opportunityId] };
        }
        return p;
      })
    );
  }, []);

  const removeOpportunityFromProject = useCallback((projectId: string, opportunityId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return { ...p, opportunityIds: p.opportunityIds.filter((id) => id !== opportunityId) };
        }
        return p;
      })
    );
  }, []);

  const getProjectForOpportunity = useCallback(
    (opportunityId: string) => {
      return projects.find((p) => p.opportunityIds.includes(opportunityId));
    },
    [projects]
  );

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        deleteProject,
        addOpportunityToProject,
        removeOpportunityFromProject,
        getProjectForOpportunity,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}
