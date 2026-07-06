import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/ui-bits";

export const Route = createFileRoute("/admin/updation")({
  component: UpdationPage,
});

function UpdationPage() {
  return (
    <>
      <PageHeader title="Updation" subtitle="Bulk-update status for a group of students by roll number." />
      <SectionCard title="Bulk Status Update">
        <div className="grid gap-4 max-w-3xl">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Roll Numbers</label>
            <textarea
              className="mt-1 w-full h-40 px-3 py-2 rounded-md border border-input bg-background text-sm font-mono outline-none focus:ring-2 focus:ring-ring/40"
              placeholder="TIT-2026-1001, TIT-2026-1002, TIT-2026-1003"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">New Status</label>
              <select className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                {["pending", "approved", "rejected", "passed", "failed", "enrolled", "completed"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Message (optional)</label>
              <input className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm" />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm">Update All</button>
            <button className="h-10 px-4 rounded-md border border-border text-sm">Preview</button>
          </div>
          <div className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">
            Last run: 128 updated, 3 not found.
          </div>
        </div>
      </SectionCard>
    </>
  );
}
