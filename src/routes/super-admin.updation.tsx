import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SuperPage } from "@/components/SuperPage";
import { SectionCard } from "@/components/ui-bits";
import { RefreshCw, Upload } from "lucide-react";

export const Route = createFileRoute("/super-admin/updation")({
  component: UpdationPage,
});

function UpdationPage() {
  const [status, setStatus] = useState<string | null>(null);
  return (
    <SuperPage title="Bulk Updation" subtitle="Update records across students, trainers or slots in bulk.">
      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Upload CSV">
          <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
            <div className="mt-3 text-sm font-medium">Drop a CSV file here</div>
            <div className="text-xs text-muted-foreground">or click to browse</div>
            <input
              type="file"
              accept=".csv"
              className="mt-4 mx-auto block text-xs"
              onChange={(e) => setStatus(e.target.files?.[0]?.name ?? null)}
            />
          </div>
          {status && (
            <div className="mt-3 text-xs text-success">Selected: {status}</div>
          )}
        </SectionCard>
        <SectionCard title="Quick Actions">
          <div className="space-y-2">
            {[
              "Regenerate fee vouchers for July 2026",
              "Sync trainer schedules with campus calendar",
              "Mark all inactive students as dropout",
              "Rebuild course progress cache",
            ].map((label) => (
              <button
                key={label}
                onClick={() => setStatus(`${label} — queued (demo)`)}
                className="w-full flex items-center justify-between gap-3 h-10 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent transition-colors"
              >
                <span>{label}</span>
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </SectionCard>
      </div>
    </SuperPage>
  );
}
