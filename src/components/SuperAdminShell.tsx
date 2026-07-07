import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Logo } from "./Logo";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Shield,
  CalendarClock,
  GraduationCap,
  UserCheck,
  Building2,
  MapPin,
  BookOpen,
  Layers,
  UserPlus,
  Wallet,
  BarChart3,
  UserCog,
  KeyRound,
  ScrollText,
  Bell,
  Settings,
  UserCircle,
  LogOut,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, type ReactNode } from "react";

interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
}

const nav: NavItem[] = [
  { to: "/super-admin", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { to: "/super-admin/students", label: "Students", icon: <Users className="h-4 w-4" /> },
  { to: "/super-admin/attendance", label: "Attendance", icon: <ClipboardCheck className="h-4 w-4" /> },
  { to: "/super-admin/administration", label: "Administration", icon: <Shield className="h-4 w-4" /> },
  { to: "/super-admin/slots", label: "Slots", icon: <CalendarClock className="h-4 w-4" /> },
  { to: "/super-admin/trainers", label: "Trainers", icon: <GraduationCap className="h-4 w-4" /> },
  { to: "/super-admin/trainer-attendance", label: "Trainer Attendance", icon: <UserCheck className="h-4 w-4" /> },
  { to: "/super-admin/campuses", label: "Campuses", icon: <Building2 className="h-4 w-4" /> },
  { to: "/super-admin/cities", label: "Cities", icon: <MapPin className="h-4 w-4" /> },
  { to: "/super-admin/courses", label: "Courses", icon: <BookOpen className="h-4 w-4" /> },
  { to: "/super-admin/batches", label: "Batches", icon: <Layers className="h-4 w-4" /> },
  { to: "/super-admin/registrations", label: "Registrations", icon: <UserPlus className="h-4 w-4" /> },
  { to: "/super-admin/payments", label: "Payments", icon: <Wallet className="h-4 w-4" /> },
  { to: "/super-admin/reports", label: "Reports", icon: <BarChart3 className="h-4 w-4" /> },
  { to: "/super-admin/users", label: "Users", icon: <UserCog className="h-4 w-4" /> },
  { to: "/super-admin/roles", label: "Roles & Permissions", icon: <KeyRound className="h-4 w-4" /> },
  { to: "/super-admin/activity", label: "Activity Logs", icon: <ScrollText className="h-4 w-4" /> },
  { to: "/super-admin/notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
  { to: "/super-admin/settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  { to: "/super-admin/profile", label: "Profile", icon: <UserCircle className="h-4 w-4" /> },
];

export function SuperAdminShell() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      <aside
        className={`${
          collapsed ? "w-16" : "w-64"
        } shrink-0 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border transition-all duration-200`}
      >
        <div className="px-3 py-5 border-b border-sidebar-border flex items-center justify-between gap-2">
          {!collapsed && <Logo variant="light" />}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="h-8 w-8 grid place-items-center rounded-md hover:bg-sidebar-accent text-sidebar-foreground/80"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {!collapsed && (
          <div className="px-5 py-4 border-b border-sidebar-border">
            <div className="text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/60">
              Super Admin
            </div>
            <div className="mt-1 text-sm font-medium">Zaid Rehman</div>
            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gold">
              SUPER_ADMIN
            </div>
          </div>
        )}

        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {nav.map((item) => {
            const active =
              location.pathname === item.to ||
              (item.to !== "/super-admin" && location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:translate-x-0.5"
                }`}
              >
                {item.icon}
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-sidebar-border">
          <Link
            to="/"
            title={collapsed ? "Sign out" : undefined}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && "Sign out"}
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center gap-4 px-6">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search anything…"
              className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <button className="relative h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-accent">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-gold" />
          </button>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gold to-gold/70 text-primary grid place-items-center text-xs font-semibold">
            ZR
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
