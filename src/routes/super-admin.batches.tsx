import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SuperPage, SimpleTable } from "@/components/SuperPage";
import { StatusBadge } from "@/components/ui-bits";
import { Layers, Plus } from "lucide-react";

const batches = Array.from({ length: 12 }).map((_, i) => ({
  code: `B-${2026}-${100 + i}`,
  course: ["AI", "Web & Mobile", "Data Science", "Graphics", "Cloud", "Cyber"][i % 6],
  campus: ["Karachi Main", "Lahore Gulberg", "Islamabad F-8", "Sukkur"][i % 4],
  start: `2026-0${(i % 9) + 1}-15`,
  students: 24 + (i * 3) % 20,
  status: i % 4 === 0 ? "completed" : "active",
}));

export const Route = createFileRoute("/super-admin/batches")({
  component: BatchesPage,
});

function BatchesPage() {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <SuperPage
      title="Batches"
      subtitle={`${batches.length} batches`}
      actions={
        <button
          onClick={() => setMessage("Add batch form opened in demo mode.")}
          className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> Add Batch
        </button>
      }
      stats={[
        { label: "Batches", value: batches.length, icon: <Layers className="h-5 w-5" />, tone: "gold" },
        { label: "Active", value: batches.filter((b) => b.status === "active").length, tone: "success" },
        { label: "Completed", value: batches.filter((b) => b.status === "completed").length },
        { label: "Students", value: batches.reduce((a, b) => a + b.students, 0) },
      ]}
    >
      {message && <div className="mb-4 rounded-md border border-success/30 bg-success/10 px-4 py-2 text-sm text-success">{message}</div>}
      <SimpleTable
        columns={["Batch", "Course", "Campus", "Start", "Students", "Status"]}
        rows={batches.map((b) => [
          b.code,
          b.course,
          b.campus,
          b.start,
          b.students,
          <StatusBadge key={b.code} status={b.status} />,
        ])}
      />
    </SuperPage>
  );
}
