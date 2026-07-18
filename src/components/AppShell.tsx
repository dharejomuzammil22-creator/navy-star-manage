import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Logo } from "./Logo";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  CalendarClock,
  GraduationCap,
  RefreshCw,
  UserCircle,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  Building2,
} from "lucide-react";
import { useState, type ReactNode } from "react";

interface NavItem {
  to?: string;
  label: string;
  icon?: ReactNode;
  children?: NavItem[];
}

interface AppShellProps {
  role: "admin" | "trainer" | "student";
}

const navConfig: Record<AppShellProps["role"], NavItem[]> = {
  admin: [
    { to: "/admin", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { to: "/admin/students", label: "Students", icon: <Users className="h-4 w-4" /> },
    {
      label: "Attendance",
      icon: <ClipboardCheck className="h-4 w-4" />,
      children: [
        { to: "/admin/attendance", label: "Mark Attendance" },
        { to: "/admin/attendance/view", label: "View Attendance" },
      ],
    },
    {
      label: "Administration",
      icon: <Building2 className="h-4 w-4" />,
      children: [{ to: "/admin/slots", label: "Slots" }],
    },
    {
      label: "Trainers",
      icon: <GraduationCap className="h-4 w-4" />,
      children: [
        { to: "/admin/trainers", label: "Trainers" },
        {
          label: "Attendance",
          children: [
            { to: "/admin/trainer-attendance/mark", label: "Mark Attendance" },
            { to: "/admin/trainer-attendance/view", label: "View Attendance" },
            { to: "/admin/trainer-attendance/request", label: "Attendance Request" },
          ],
        },
      ],
    },
    { to: "/admin/updation", label: "Updation", icon: <RefreshCw className="h-4 w-4" /> },
    { to: "/admin/profile", label: "Profile", icon: <UserCircle className="h-4 w-4" /> },
  ],
  trainer: [
    { to: "/trainer", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { to: "/trainer/calendar", label: "Calendar", icon: <CalendarClock className="h-4 w-4" /> },
    { to: "/trainer/attendance", label: "Attendance", icon: <ClipboardCheck className="h-4 w-4" /> },
    { to: "/trainer/profile", label: "Profile", icon: <UserCircle className="h-4 w-4" /> },
  ],
  student: [
    { to: "/student", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { to: "/student/progress", label: "Progress", icon: <RefreshCw className="h-4 w-4" /> },
    { to: "/student/attendance", label: "Attendance", icon: <ClipboardCheck className="h-4 w-4" /> },
    { to: "/student/payment", label: "Payment", icon: <CalendarClock className="h-4 w-4" /> },
    { to: "/student/assignment", label: "Assignments", icon: <Users className="h-4 w-4" /> },
    { to: "/student/quiz", label: "Quizzes", icon: <GraduationCap className="h-4 w-4" /> },
    { to: "/student/profile", label: "Profile", icon: <UserCircle className="h-4 w-4" /> },
  ],
};

const roleLabel: Record<AppShellProps["role"], { title: string; badge: string; user: string }> = {
  admin: { title: "Admin Panel", badge: "Super Admin", user: "Ayesha Malik" },
  trainer: { title: "Trainer Portal", badge: "Trainer", user: "Bilal Ahmed" },
  student: { title: "Student Portal", badge: "Student", user: "Hassan Raza" },
};

function isBranchActive(item: NavItem, pathname: string): boolean {
  if (item.to && (pathname === item.to || pathname.startsWith(item.to + "/"))) return true;
  return item.children?.some((c) => isBranchActive(c, pathname)) ?? false;
}

function NavNode({ item, pathname, depth = 0 }: { item: NavItem; pathname: string; depth?: number }) {
  const isGroup = !!item.children?.length;
  const anyActive = isBranchActive(item, pathname);
  const [open, setOpen] = useState<boolean>(anyActive);

  if (isGroup) {
    return (
      <div>
        <button
          onClick={() => setOpen((o) => !o)}
          className={`w-full flex items-center gap-3 rounded-md pr-3 py-2 text-sm transition-colors ${
            anyActive
              ? "text-sidebar-primary-foreground bg-sidebar-primary/70 font-medium"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          }`}
          style={{ paddingLeft: 12 + depth * 12 }}
        >
          {item.icon}
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="mt-1 space-y-1">
            {item.children!.map((c) => (
              <NavNode key={(c.to || c.label) + depth} item={c} pathname={pathname} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  const active = item.to === pathname;
  return (
    <Link
      to={item.to!}
      className={`flex items-center gap-3 rounded-md pr-3 py-2 text-sm transition-colors ${
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      }`}
      style={{ paddingLeft: 12 + depth * 12 }}
    >
      {item.icon}
      {item.label}
    </Link>
  );
}

export function AppShell({ role }: AppShellProps) {
  const location = useLocation();
  const nav = navConfig[role];
  const meta = roleLabel[role];

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
        <div className="px-5 py-5 border-b border-sidebar-border">
          <Logo variant="light" />
        </div>
        <div className="px-5 py-4 border-b border-sidebar-border">
          <div className="text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/60">
            {meta.title}
          </div>
          <div className="mt-1 text-sm font-medium">{meta.user}</div>
          <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-sidebar-primary/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-sidebar-primary">
            {meta.badge}
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {nav.map((item) => (
            <NavNode key={item.to || item.label} item={item} pathname={location.pathname} />
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center gap-4 px-6">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search students, roll #, CNIC…"
              className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <button
            onClick={() => alert("No new notifications.")}
            className="relative h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-accent"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-gold" />
          </button>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground grid place-items-center text-xs font-semibold">
            {meta.user
              .split(" ")
              .map((s) => s[0])
              .join("")}
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
