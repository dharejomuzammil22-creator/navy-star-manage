import { createFileRoute } from "@tanstack/react-router";
import { SuperPage, SimpleTable } from "@/components/SuperPage";
import { campusChart } from "@/lib/mock-data";
import { Building2, Plus } from "lucide-react";

export const Route = createFileRoute("/super-admin/campuses")({
  component: () => (
    <SuperPage
      title="Campuses"
      subtitle="All operating campuses"
      actions={
        <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add Campus
        </button>
      }
      stats={[
        { label: "Total Campuses", value: campusChart.length, icon: <Building2 className="h-5 w-5" />, tone: "gold" },
        { label: "Active", value: campusChart.length },
        { label: "Under Construction", value: 2 },
        { label: "Total Students", value: campusChart.reduce((a, c) => a + c.students, 0) },
      ]}
    >
      <SimpleTable
        columns={["Campus", "City", "Students", "Manager"]}
        rows={campusChart.map((c) => [
          c.name,
          c.name.split(" ")[0],
          c.students.toLocaleString(),
          "Manager " + c.name.split(" ")[0],
        ])}
      />
    </SuperPage>
  ),
});
