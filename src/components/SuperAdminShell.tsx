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
  ScrollText,
  Bell,
  Settings,
  UserCircle,
  LogOut,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

interface LeafItem {
  to: string;
  label: string;
  icon: ReactNode;
}
interface GroupItem {
  key: string;
  label: string;
  icon: ReactNode;
  children: LeafItem[];
}
type NavItem = LeafItem | GroupItem;

function isGroup(n: NavItem): n is GroupItem {
  return (n as GroupItem).children !== undefined;
}

const nav: NavItem[] = [
  { to: "/super-admin", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { to: "/super-admin/students", label: "Students", icon: <Users className="h-4 w-4" /> },
  {
    key: "attendance",
    label: "Attendance",
    icon: <ClipboardCheck className="h-4 w-4" />,
    children: [
      { to: "/super-admin/attendance", label: "Mark Attendance", icon: <ClipboardCheck className="h-3.5 w-3.5" /> },
      { to: "/super-admin/attendance/view", label: "View Attendance", icon: <ScrollText className="h-3.5 w-3.5" /> },
    ],
  },
  {
    key: "administration",
    label: "Administration",
    icon: <Shield className="h-4 w-4" />,
    children: [
      { to: "/super-admin/slots", label: "Slots", icon: <CalendarClock className="h-3.5 w-3.5" /> },
    ],
  },
  {
    key: "trainers",
    label: "Trainers",
    icon: <GraduationCap className="h-4 w-4" />,
    children: [
      { to: "/super-admin/trainers", label: "Trainers", icon: <GraduationCap className="h-3.5 w-3.5" /> },
      { to: "/super-admin/trainer-attendance", label: "Trainer Attendance", icon: <UserCheck className="h-3.5 w-3.5" /> },
      { to: "/super-admin/trainer-attendance-request", label: "Attendance Request", icon: <ScrollText className="h-3.5 w-3.5" /> },
    ],
  },
  { to: "/super-admin/updation", label: "Updation", icon: <RefreshCw className="h-4 w-4" /> },
  { to: "/super-admin/profile", label: "Profile", icon: <UserCircle className="h-4 w-4" /> },
];

export function SuperAdminShell() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const activeGroup = useMemo(() => {
    for (const item of nav) {
      if (isGroup(item)) {
        if (item.children.some((c) => location.pathname === c.to || location.pathname.startsWith(c.to + "/"))) {
          return item.key;
        }
      }
    }
    return null;
  }, [location.pathname]);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  useEffect(() => {
    if (activeGroup) setOpenGroups((o) => ({ ...o, [activeGroup]: true }));
  }, [activeGroup]);

  const isLeafActive = (to: string) =>
    location.pathname === to || (to !== "/super-admin" && location.pathname === to);

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
            if (!isGroup(item)) {
              const active = item.to === "/super-admin"
                ? location.pathname === "/super-admin" || location.pathname === "/super-admin/"
                : location.pathname === item.to || location.pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all ${
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  {item.icon}
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            }

            const groupActive = activeGroup === item.key;
            const open = !!openGroups[item.key] || (collapsed && groupActive);

            if (collapsed) {
              // In collapsed mode, render children directly stacked with tooltips
              return (
                <div key={item.key} className="space-y-0.5">
                  <div
                    title={item.label}
                    className={`flex items-center justify-center rounded-md px-2 py-2 text-sm ${
                      groupActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/70"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {item.children.map((c) => {
                    const active = isLeafActive(c.to);
                    return (
                      <Link
                        key={c.to}
                        to={c.to}
                        title={c.label}
                        className={`flex items-center justify-center rounded-md px-2 py-1.5 text-sm ${
                          active
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent"
                        }`}
                      >
                        {c.icon}
                      </Link>
                    );
                  })}
                </div>
              );
            }

            return (
              <div key={item.key}>
                <button
                  type="button"
                  onClick={() => setOpenGroups((o) => ({ ...o, [item.key]: !o[item.key] }))}
                  className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all ${
                    groupActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  {item.icon}
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-0" : "-rotate-90"}`} />
                </button>
                {open && (
                  <div className="mt-0.5 ml-4 pl-3 border-l border-sidebar-border space-y-0.5">
                    {item.children.map((c) => {
                      const active = isLeafActive(c.to);
                      return (
                        <Link
                          key={c.to}
                          to={c.to}
                          className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] transition-colors ${
                            active
                              ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                              : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          }`}
                        >
                          {c.icon}
                          <span className="truncate">{c.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
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
          <button
            onClick={() => alert("No new notifications.")}
            className="relative h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-accent"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-gold" />
          </button>
          <Link to="/super-admin/profile" className="h-9 w-9 rounded-full bg-gradient-to-br from-gold to-gold/70 text-primary grid place-items-center text-xs font-semibold hover:opacity-90">
            ZR
          </Link>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
