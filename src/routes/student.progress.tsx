import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ui-bits";
import { modules } from "@/lib/mock-data";
import { ChevronDown, ChevronRight, Check, Circle } from "lucide-react";

export const Route = createFileRoute("/student/progress")({
  component: ProgressPage,
});

function ProgressPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState<Record<string, boolean>>({});

  const toggle = (name: string) => setOpen((o) => ({ ...o, [name]: !o[name] }));
  const toggleTopic = (key: string) => setDone((d) => ({ ...d, [key]: !d[key] }));

  return (
    <>
      <PageHeader title="Course Progress" subtitle="Web & Mobile App · click a module to view topics." />
      <div className="grid md:grid-cols-2 gap-4">
        {modules.map((m) => {
          const pct = Math.round((m.done / m.topics) * 100);
          const isOpen = !!open[m.name];
          return (
            <div key={m.name} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                type="button"
                onClick={() => toggle(m.name)}
                className="w-full p-5 flex items-center gap-5 text-left hover:bg-muted/40 transition-colors"
              >
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
                {isOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </button>
              {isOpen && (
                <ul className="border-t border-border divide-y divide-border">
                  {Array.from({ length: m.topics }).map((_, i) => {
                    const key = `${m.name}-${i}`;
                    const isDone = done[key] ?? i < m.done;
                    return (
                      <li key={key}>
                        <button
                          onClick={() => toggleTopic(key)}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-muted/40 transition-colors text-left"
                        >
                          {isDone ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className={isDone ? "line-through text-muted-foreground" : ""}>
                            Topic {i + 1} · {m.name.split(" ").slice(0, 2).join(" ")}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
