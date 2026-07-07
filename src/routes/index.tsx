import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import logo from "@/assets/titan-logo.png.asset.json";
import { ShieldCheck, GraduationCap, UserRound, ArrowRight, Crown } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Left navy panel + right form */}
      <div className="min-h-screen grid lg:grid-cols-2">
        <div className="relative hidden lg:flex flex-col justify-between p-10 text-sidebar-foreground overflow-hidden"
             style={{ background: "var(--gradient-navy)" }}>
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
               style={{
                 backgroundImage:
                   "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
                 backgroundSize: "40px 40px, 60px 60px",
               }} />
          <Logo variant="light" />
          <div className="relative">
            <img src={logo.url} alt="" className="h-52 w-52 object-contain mb-8 drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]" />
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3">Estd. 2025</div>
            <h1 className="font-display text-4xl leading-tight">
              Titan Student <br /> Management System
            </h1>
            <p className="mt-4 max-w-md text-sm text-sidebar-foreground/70">
              One connected platform for admins, trainers and students at the
              Taj Institute of Technology & Applied Networks — across every city and campus.
            </p>
          </div>
          <div className="relative flex items-center gap-6 text-xs text-sidebar-foreground/60">
            <span>© 2026 TITAN · TAJ INSTITUTE</span>
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span>Version 1.0</span>
          </div>
        </div>

        <div className="flex items-center justify-center p-8 lg:p-14">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8"><Logo /></div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2">Welcome back</div>
            <h2 className="font-display text-3xl text-foreground">Sign in to Titan SMS</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose your portal to continue. Demo access — no password required.
            </p>

            <div className="mt-8 space-y-3">
              <PortalCard
                to="/super-admin"
                icon={<Crown className="h-5 w-5" />}
                title="Super Admin"
                desc="Full control · every module, every campus, every role"
                accent
              />

                to="/admin"
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Admin Panel"
                desc="Office staff · manage students, slots, fees & trainers"
                accent
              />
              <PortalCard
                to="/trainer"
                icon={<GraduationCap className="h-5 w-5" />}
                title="Trainer Portal"
                desc="Teachers · attendance, assignments, quizzes, progress"
              />
              <PortalCard
                to="/student"
                icon={<UserRound className="h-5 w-5" />}
                title="Student Portal"
                desc="Learners · progress, attendance, fees, submissions"
              />
            </div>

            <div className="mt-10 rounded-lg border border-border bg-card p-4">
              <div className="text-xs font-medium text-foreground mb-2">Demo credentials</div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div><span className="text-foreground">Admin</span> · admin@titan.edu.pk</div>
                <div><span className="text-foreground">Trainer</span> · trainer@titan.edu.pk</div>
                <div><span className="text-foreground">Student</span> · 42101-1234567-8</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortalCard({
  to,
  icon,
  title,
  desc,
  accent,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group flex items-center gap-4 rounded-xl border p-4 transition-all hover:shadow-[var(--shadow-elegant)] ${
        accent
          ? "border-primary/30 bg-gradient-to-r from-primary/[0.04] to-transparent"
          : "border-border bg-card"
      }`}
    >
      <div className="h-11 w-11 rounded-lg bg-primary text-primary-foreground grid place-items-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground truncate">{desc}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}
