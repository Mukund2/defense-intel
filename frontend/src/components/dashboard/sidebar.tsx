"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Search, FolderKanban, Kanban, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navigation: NavItem[] = [
  { label: "Search", href: "/dashboard", icon: Search },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Pipeline", href: "/dashboard/pipeline", icon: Kanban },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-border bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <Shield className="h-5 w-5 text-primary" />
        <span className="font-mono text-sm font-semibold tracking-wider text-primary">
          DEFENSE INTEL
        </span>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "border-l-2 border-primary bg-sidebar-accent text-sidebar-primary-foreground"
                      : "border-l-2 border-transparent text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-sidebar-foreground"
                    )}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6">
          <ul>
            <li>
              <Link
                href="/dashboard/settings"
                className={cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === "/dashboard/settings"
                    ? "border-l-2 border-primary bg-sidebar-accent text-sidebar-primary-foreground"
                    : "border-l-2 border-transparent text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <Settings
                  className={cn(
                    "h-4 w-4 shrink-0",
                    pathname === "/dashboard/settings"
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-sidebar-foreground"
                  )}
                />
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Separator />

      {/* User / Company */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <AvatarFallback className="bg-primary/20 text-[10px] font-semibold text-primary">
              MD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              Meridian Defense
            </p>
            <p className="text-[11px] text-muted-foreground">Operations</p>
          </div>
          <Badge className="h-4 px-1.5 text-[9px] font-bold tracking-wide bg-primary/15 text-primary border-primary/30 border">
            PRO
          </Badge>
        </div>
      </div>
    </aside>
  );
}
