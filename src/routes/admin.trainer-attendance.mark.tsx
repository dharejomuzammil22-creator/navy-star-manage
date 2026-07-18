import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, SectionCard } from "@/components/ui-bits";
import { trainers } from "@/lib/mock-data";
import { LogIn, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin/trainer-attendance/mark")({
  component: MarkTrainerAttendance,
});

function MarkTrainerAttendance() {
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState<(typeof trainers)[number] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const flash = (m: string) => {
    setMsg(m);
    window.setTimeout(() => setMsg(null), 2500);
  };

  const verify = () => {
    if (!code.trim()) return flash("Enter Employee ID.");
    const digits = code.replace(/\D/g, "");
    const idx = digits ? Number(digits) % trainers.length : 0;
    const t = trainers[idx];
    setVerified(t);
    flash(`Verified: ${t.name}`);
  };

  return (
    <>
      <PageHeader title="Mark Trainer Attendance" subtitle="Scan or enter Employee ID to check in / out." />
      {msg && <div className="mb-4 rounded-md border border-success/30 bg-success/10 px-4 py-2 text-sm text-success">{msg}</div>}
      <div className="grid md:grid-cols-2 gap-5">
        <SectionCard title="Scan Trainer Card">
          <div className="space-y-3">
            <input
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && verify()}
              placeholder="Employee ID e.g. 15349"
              className="w-full h-11 px-3 rounded-md border border-input bg-background text-base outline-none focus:ring-2 focus:ring-ring/40"
            />
            <button
              onClick={verify}
              className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
            >
              Verify Trainer
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Trainer Information">
          {verified ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground grid place-items-center font-semibold text-lg">
                  {verified.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-base uppercase">{verified.name} ({verified.campus.slice(0, 3).toUpperCase()})</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Employee ID: {verified.id.replace(/\D/g, "") || "15349"}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => flash(`Checked in ${verified.name} at ${new Date().toLocaleTimeString()}`)}
                  className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
                >
                  <LogIn className="h-4 w-4" /> Check In
                </button>
                <button
                  onClick={() => flash(`Checked out ${verified.name} at ${new Date().toLocaleTimeString()}`)}
                  className="inline-flex items-center gap-2 h-9 px-4 rounded-md border border-destructive/40 text-destructive text-sm hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" /> Check Out
                </button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground py-8 text-center">
              Enter an Employee ID and click Verify Trainer to load their profile.
            </div>
          )}
        </SectionCard>
      </div>
    </>
  );
}
