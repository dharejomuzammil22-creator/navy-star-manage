import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard, StatusBadge } from "@/components/ui-bits";
import { assignments } from "@/lib/mock-data";

export const Route = createFileRoute("/student/assignment")({
  component: () => (
    <>
      <PageHeader title="Assignments" subtitle="Read, submit and track your work." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total" value={13} />
        <StatCard label="Submitted" value={9} tone="success" />
        <StatCard label="Approved" value={7} tone="gold" />
        <StatCard label="Not Approved" value={2} />
      </div>
      <SectionCard title="All Assignments">
        <ul className="divide-y divide-border">
          {[...assignments, ...assignments].map((a, i) => (
            <li key={i} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.course} · Due {a.due}</div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={i%3===0 ? "Approved" : i%3===1 ? "Not Submitted" : "Late"} />
                <button className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs">Open</button>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  ),
});
