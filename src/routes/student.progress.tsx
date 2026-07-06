import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/ui-bits";
import { modules } from "@/lib/mock-data";

export const Route = createFileRoute("/student/progress")({
  component: () => (
    <>
      <PageHeader title="Course Progress" subtitle="Web & Mobile App · Chapters and topics." />
      <div className="grid md:grid-cols-2 gap-4">
        {modules.map((m) => {
          const pct = Math.round((m.done / m.topics) * 100);
          return (
            <div key={m.name} className="rounded-xl border border-border bg-card p-5 flex items-center gap-5">
              <div className="relative h-16 w-16 shrink-0">
                <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="var(--muted)" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="16" fill="none"
                    stroke="oklch(0.24 0.08 265)" strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={`${pct} 100`}
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center text-sm font-semibold">{pct}%</div>
              </div>
              <div className="flex-1">
                <div className="font-medium">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.done} of {m.topics} topics</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  ),
});
