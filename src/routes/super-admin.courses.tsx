import { createFileRoute } from "@tanstack/react-router";
import { SuperPage, SimpleTable } from "@/components/SuperPage";
import { courseChart } from "@/lib/mock-data";
import { BookOpen, Plus } from "lucide-react";

export const Route = createFileRoute("/super-admin/courses")({
  component: () => (
    <SuperPage
      title="Courses"
      subtitle={`${courseChart.length} courses being offered`}
      actions={
        <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add Course
        </button>
      }
      stats={[
        { label: "Total Courses", value: courseChart.length, icon: <BookOpen className="h-5 w-5" />, tone: "gold" },
        { label: "Active Batches", value: 47 },
        { label: "Enrolled", value: courseChart.reduce((a, c) => a + c.students, 0) },
        { label: "Duration (avg)", value: "6 mo" },
      ]}
    >
      <SimpleTable
        columns={["Course", "Duration", "Students", "Fee (PKR)"]}
        rows={courseChart.map((c, i) => [
          c.name,
          ["3 mo", "4 mo", "6 mo", "12 mo"][i % 4],
          c.students.toLocaleString(),
          "₨ " + (15000 + i * 2500).toLocaleString(),
        ])}
      />
    </SuperPage>
  ),
});
