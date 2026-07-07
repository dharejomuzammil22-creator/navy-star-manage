import { createFileRoute } from "@tanstack/react-router";
import { SuperPage } from "@/components/SuperPage";
import { SectionCard } from "@/components/ui-bits";
import { BarChart3, FileText, Download } from "lucide-react";
import { campusChart, courseChart } from "@/lib/mock-data";

const reports = [
  "Student Enrollment Report",
  "Campus Performance Report",
  "Trainer Attendance Report",
  "Fee Collection Report",
  "Course Analytics Report",
  "Registration Funnel Report",
  "Dropout Analysis",
  "Yearly Summary",
];

export const Route = createFileRoute("/super-admin/reports")({
  component: () => (
    <SuperPage
      title="Reports"
      subtitle="Generate and download institutional reports"
    >
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <SectionCard title="Enrollment by Campus">
          <div className="space-y-2">
            {campusChart.slice(0, 6).map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <div className="w-32 text-sm truncate">{c.name}</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(c.students / 700) * 100}%`,
                      background: "var(--gradient-navy)",
                    }}
                  />
                </div>
                <div className="w-12 text-right text-sm tabular-nums">{c.students}</div>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Course Popularity">
          <div className="space-y-2">
            {courseChart.slice(0, 6).map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <div className="w-40 text-sm truncate">{c.name}</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gold"
                    style={{ width: `${(c.students / 600) * 100}%` }}
                  />
                </div>
                <div className="w-12 text-right text-sm tabular-nums">{c.students}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      <SectionCard title="Available Reports">
        <div className="grid md:grid-cols-2 gap-3">
          {reports.map((r) => (
            <div
              key={r}
              className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-md bg-primary/10 text-primary grid place-items-center">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="text-sm font-medium">{r}</div>
              </div>
              <button className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-border text-xs hover:bg-accent">
                <Download className="h-3.5 w-3.5" /> PDF
              </button>
            </div>
          ))}
        </div>
      </SectionCard>
      <div className="hidden">
        <BarChart3 />
      </div>
    </SuperPage>
  ),
});
