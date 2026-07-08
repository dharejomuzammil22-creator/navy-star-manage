import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SuperPage, SimpleTable } from "@/components/SuperPage";
import { StatusBadge } from "@/components/ui-bits";
import { slots } from "@/lib/mock-data";
import { CalendarClock, Plus } from "lucide-react";

export const Route = createFileRoute("/super-admin/slots")({
  component: SlotsPage,
});

function SlotsPage() {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <SuperPage
      title="Slots"
      subtitle={`${slots.length} slots scheduled across campuses`}
      actions={
        <button
          onClick={() => setMessage("Add slot form opened in demo mode.")}
          className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> Add Slot
        </button>
      }
      stats={[
        { label: "Total Slots", value: slots.length, icon: <CalendarClock className="h-5 w-5" /> },
        { label: "Open", value: slots.filter((s) => s.open).length, tone: "success" },
        { label: "Full", value: slots.filter((s) => !s.open).length },
        { label: "Seats Used", value: slots.reduce((a, s) => a + s.seatsUsed, 0), tone: "gold" },
      ]}
    >
      {message && <div className="mb-4 rounded-md border border-success/30 bg-success/10 px-4 py-2 text-sm text-success">{message}</div>}
      <SimpleTable
        columns={["ID", "Course", "Trainer", "Campus", "Schedule", "Seats", "Status"]}
        rows={slots.map((s) => [
          s.id,
          s.course,
          s.trainer,
          s.campus,
          s.schedule,
          `${s.seatsUsed}/${s.seatsTotal}`,
          <StatusBadge key={s.id} status={s.open ? "open" : "completed"} />,
        ])}
      />
    </SuperPage>
  );
}
