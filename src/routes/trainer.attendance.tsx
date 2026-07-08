import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/ui-bits";
import { students } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/trainer/attendance")({
  component: TrainerAttendance,
});

type State = "P" | "L" | "A";

function TrainerAttendance() {
  const [marks, setMarks] = useState<Record<string, State>>({});
  const [saved, setSaved] = useState(false);
  const list = students.slice(0, 12);
  return (
    <>
      <PageHeader title="Class Attendance" subtitle="Mark attendance for Web & Mobile App · Batch 3" />
      <SectionCard title={`Attendance · ${new Date().toDateString()}`}>
        <ul className="divide-y divide-border">
          {list.map((s) => {
            const m = marks[s.id];
            return (
              <li key={s.id} className="py-3 flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-primary/10 text-primary grid place-items-center text-xs font-semibold">
                  {s.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{s.name}</div>
                  <div className="text-xs font-mono text-muted-foreground">{s.roll}</div>
                </div>
                <div className="flex items-center gap-1">
                  {(["P","L","A"] as State[]).map((k)=>(
                    <button
                      key={k}
                      onClick={()=>setMarks({...marks, [s.id]: k})}
                      className={`h-8 w-8 rounded-md text-xs font-medium ${
                        m===k
                          ? k==="P" ? "bg-success text-success-foreground"
                          : k==="L" ? "bg-warning text-warning-foreground"
                          : "bg-destructive text-destructive-foreground"
                          : "border border-border hover:bg-accent"
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setSaved(true)}
            className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm"
          >
            Save Attendance
          </button>
          {saved && <span className="text-sm text-success">Attendance saved.</span>}
        </div>
      </SectionCard>
    </>
  );
}
