import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/ui-bits";
import { CheckCircle2, XCircle, Clock, Percent } from "lucide-react";

export const Route = createFileRoute("/student/attendance")({
  component: () => (
    <>
      <PageHeader title="My Attendance" subtitle="Overall & month-by-month attendance." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Present" value={65} icon={<CheckCircle2 className="h-5 w-5" />} tone="success" />
        <StatCard label="Leave" value={4} icon={<Clock className="h-5 w-5" />} />
        <StatCard label="Absent" value={11} icon={<XCircle className="h-5 w-5" />} />
        <StatCard label="Percentage" value="81%" icon={<Percent className="h-5 w-5" />} tone="gold" />
      </div>
      <SectionCard title="July 2026 · Classes Mon / Wed / Fri">
        <div className="grid grid-cols-7 gap-2 text-center text-xs mb-3 font-medium text-muted-foreground">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d)=>(<div key={d}>{d}</div>))}
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-xs">
          {Array.from({length:3}).map((_,i)=>(<div key={`pad-${i}`} />))}
          {Array.from({length:31}).map((_,i)=>{
            const day = i+1;
            // July 1, 2026 is a Wednesday. Day-of-week: (i + 3) % 7 where 0=Sun
            const dow = (i + 3) % 7;
            const isClassDay = dow===1 || dow===3 || dow===5; // Mon, Wed, Fri
            if(!isClassDay){
              return <div key={i} className="aspect-square rounded-md grid place-items-center bg-muted/40 text-muted-foreground/60">{day}</div>;
            }
            const state = day%7===0 ? "absent" : day%11===0 ? "leave" : "present";
            const cls =
              state==="present" ? "bg-success/20 text-success" :
              state==="leave" ? "bg-warning/20 text-warning-foreground" :
              "bg-destructive/20 text-destructive";
            return <div key={i} className={`aspect-square rounded-md grid place-items-center font-medium ${cls}`}>{day}</div>;
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-success/40" /> Present</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-warning/40" /> Leave</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-destructive/40" /> Absent</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-muted" /> Off Day</span>
        </div>
      </SectionCard>
    </>
  ),
});
