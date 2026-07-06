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
      <SectionCard title="July 2026">
        <div className="grid grid-cols-7 gap-2 text-center text-xs">
          {Array.from({length:31}).map((_,i)=>{
            const state = i%6===5 ? "absent" : i%9===8 ? "leave" : "present";
            const cls =
              state==="present" ? "bg-success/20 text-success" :
              state==="leave" ? "bg-muted text-muted-foreground" :
              "bg-destructive/20 text-destructive";
            return <div key={i} className={`aspect-square rounded-md grid place-items-center ${cls}`}>{i+1}</div>;
          })}
        </div>
      </SectionCard>
    </>
  ),
});
