import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import logo from "@/assets/titan-logo.png.asset.json";
import { Crown, ShieldCheck, GraduationCap, UserRound, Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

type Role = "super-admin" | "admin" | "trainer" | "student";

const ROLES: { id: Role; label: string; icon: React.ReactNode; hint: string }[] = [
  { id: "super-admin", label: "Super Admin", icon: <Crown className="h-4 w-4" />, hint: "zaid@titan.edu.pk" },
  { id: "admin", label: "Admin", icon: <ShieldCheck className="h-4 w-4" />, hint: "admin@titan.edu.pk" },
  { id: "trainer", label: "Trainer", icon: <GraduationCap className="h-4 w-4" />, hint: "trainer@titan.edu.pk" },
  { id: "student", label: "Student", icon: <UserRound className="h-4 w-4" />, hint: "42101-1234567-8" },
];

function Landing() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("super-admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeRole = ROLES.find((r) => r.id === role)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError("Please enter your credentials to continue.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate({ to: `/${role}` as string });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen grid lg:grid-cols-2">
        {/* Left navy panel */}
        <div
          className="relative hidden lg:flex flex-col items-center justify-center p-10 text-sidebar-foreground overflow-hidden"
          style={{ background: "var(--gradient-navy)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px, 60px 60px",
            }}
          />
          <div className="relative flex items-center gap-3">
            <img
              src={logo.url}
              alt="Titan"
              className="h-11 w-11 object-contain shrink-0 drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
            />
            <div className="leading-tight">
              <div className="font-display text-lg tracking-wide text-sidebar-foreground">TITAN</div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-sidebar-foreground/70">
                Institute · SMS
              </div>
            </div>
          </div>
        </div>

        {/* Right login form */}
        <div className="flex items-center justify-center p-8 lg:p-14">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8 flex flex-col items-center text-center">
              <Logo />
            </div>

            <div className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2">Welcome back</div>
            <h2 className="font-display text-3xl text-foreground">Sign in to Titan SMS</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Select your portal and sign in with your credentials.
            </p>

            {/* Role tabs */}
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-3 text-xs font-medium transition-all ${
                    role === r.id
                      ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-elegant)]"
                      : "border-border bg-card text-foreground hover:border-primary/40"
                  }`}
                >
                  {r.icon}
                  <span className="truncate">{r.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground">
                  {role === "student" ? "CNIC / Roll No" : "Email"}
                </label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={activeRole.hint}
                    className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-foreground">Password</label>
                  <button
                    type="button"
                    onClick={() => alert("Contact your administrator to reset your password.")}
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-md border border-input bg-background pl-9 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-border accent-primary"
                />
                Remember me on this device
              </label>

              {error && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
              >
                {loading ? "Signing in…" : (<>Sign in to {activeRole.label} <ArrowRight className="h-4 w-4" /></>)}
              </button>
            </form>

            <div className="mt-8 rounded-lg border border-border bg-card p-4">
              <div className="text-xs font-medium text-foreground mb-2">Demo credentials</div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div><span className="text-foreground">Super Admin</span> · zaid@titan.edu.pk</div>
                <div><span className="text-foreground">Admin</span> · admin@titan.edu.pk</div>
                <div><span className="text-foreground">Trainer</span> · trainer@titan.edu.pk</div>
                <div><span className="text-foreground">Student</span> · 42101-1234567-8</div>
                <div className="pt-1 text-[11px] italic">Password: any value works in demo mode.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
