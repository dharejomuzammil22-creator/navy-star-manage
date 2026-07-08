import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, SectionCard, StatCard } from "@/components/ui-bits";
import { ScanLine, Users, CheckCircle2, XCircle, Clock } from "lucide-react";
import { students } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/attendance")({
  component: AttendancePage,
});

function AttendancePage() {
  const [tab, setTab] = useState<"mark" | "view" | "multi">("mark");
  const [roll, setRoll] = useState("");
  const [message, setMessage] = useState("Enter a roll number to preview the student.");
  const found = students.find((s) => s.roll.endsWith(roll)) ?? null;

  return (
    <>
      <PageHeader title="Attendance" subtitle="Mark, view or bulk-mark student attendance." />

      <div className="inline-flex rounded-lg border border-border bg-card p-1 mb-6">
        {(["mark", "view", "multi"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 text-sm rounded-md capitalize ${
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "mark" ? "Mark" : t === "view" ? "View" : "Multi Mark"}
          </button>
        ))}
      </div>

      {tab === "mark" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <SectionCard title="Scan Roll Number">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                  placeholder="Scan or type roll #"
                  className="w-full h-10 pl-9 pr-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
              <button
                onClick={() => setMessage(found ? `${found.name} marked present.` : "No matching roll number found.")}
                className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm"
              >
                Mark
              </button>
            </div>

            {found ? (
              <div className="mt-5 rounded-lg border border-border p-4 flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary grid place-items-center text-sm font-semibold">
                  {found.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{found.name}</div>
                  <div className="text-xs text-muted-foreground">{found.course} · {found.campus}</div>
                  <div className="text-xs font-mono mt-1">{found.roll}</div>
                </div>
                {found.payment !== "Paid" && (
                  <span className="text-xs rounded-full bg-warning/20 text-warning-foreground px-2 py-0.5">
                    Fee {found.payment}
                  </span>
                )}
              </div>
            ) : (
              <div className="mt-5 rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                {message}
              </div>
            )}
          </SectionCard>

          <SectionCard title="Today · Recently Marked">
            <ul className="divide-y divide-border">
              {students.slice(0, 6).map((s) => (
                <li key={s.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-sm">{s.name}</div>
                    <div className="text-[11px] text-muted-foreground font-mono">{s.roll}</div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-success">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Present
                  </span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <div className="space-y-4">
            <StatCard label="Marked Today" value={128} icon={<CheckCircle2 className="h-5 w-5" />} tone="success" />
            <StatCard label="Absent Today" value={14} icon={<XCircle className="h-5 w-5" />} />
            <StatCard label="On Leave" value={6} icon={<Clock className="h-5 w-5" />} />
          </div>
        </div>
      )}

      {tab === "view" && (
        <SectionCard title="View Attendance by Roll Number">
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: "Present", value: 42, tone: "success" as const, icon: <CheckCircle2 className="h-5 w-5" /> },
              { label: "Leave", value: 4, tone: "default" as const, icon: <Clock className="h-5 w-5" /> },
              { label: "Absent", value: 6, tone: "default" as const, icon: <XCircle className="h-5 w-5" /> },
              { label: "Attendance %", value: "80%", tone: "gold" as const, icon: <Users className="h-5 w-5" /> },
            ].map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
          <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs">
            {Array.from({ length: 28 }).map((_, i) => {
              const state = i % 5 === 4 ? "absent" : i % 7 === 6 ? "leave" : "present";
              const cls =
                state === "present" ? "bg-success/20 text-success" :
                state === "leave" ? "bg-muted text-muted-foreground" :
                "bg-destructive/20 text-destructive";
              return (
                <div key={i} className={`aspect-square rounded-md grid place-items-center ${cls}`}>
                  {i + 1}
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {tab === "multi" && (
        <SectionCard title="Multi Attendance">
          <div className="grid gap-3">
            <input type="date" className="h-10 px-3 rounded-md border border-input bg-background text-sm max-w-xs" />
            <textarea
              placeholder="Paste roll numbers separated by commas — TIT-2026-1001, TIT-2026-1002, …"
              className="w-full h-40 px-3 py-2 rounded-md border border-input bg-background text-sm font-mono outline-none focus:ring-2 focus:ring-ring/40"
            />
            <div>
              <button
                onClick={() => setMessage("Bulk attendance marked present for entered roll numbers.")}
                className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm"
              >
                Mark All Present
              </button>
            </div>
          </div>
        </SectionCard>
      )}
    </>
  );
}
