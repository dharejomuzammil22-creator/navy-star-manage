import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatusBadge } from "@/components/ui-bits";
import { slots } from "@/lib/mock-data";
import { Plus, CalendarClock } from "lucide-react";

export const Route = createFileRoute("/admin/slots")({
  component: SlotsPage,
});

function SlotsPage() {
  return (
    <>
      <PageHeader
        title="Slots"
        subtitle="Class groups — one course, one trainer, one campus."
        actions={
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm">
            <Plus className="h-4 w-4" /> Add Slot
          </button>
        }
      />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {slots.map((s) => {
          const pct = Math.round((s.seatsUsed / s.seatsTotal) * 100);
          return (
            <div key={s.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-mono text-muted-foreground">{s.id}</div>
                  <div className="font-display text-lg mt-1">{s.course}</div>
                </div>
                <StatusBadge status={s.open ? "Open" : "Closed"} />
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarClock className="h-4 w-4" /> {s.schedule}
              </div>
              <div className="mt-2 text-sm">
                <div className="text-muted-foreground">Trainer</div>
                <div>{s.trainer}</div>
              </div>
              <div className="mt-2 text-sm">
                <div className="text-muted-foreground">Campus</div>
                <div>{s.campus}</div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Seats</span>
                  <span className="tabular-nums">{s.seatsUsed}/{s.seatsTotal}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
