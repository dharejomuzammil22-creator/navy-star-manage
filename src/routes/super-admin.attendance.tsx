import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SuperPage, SimpleTable } from "@/components/SuperPage";
import { SectionCard, StatusBadge } from "@/components/ui-bits";
import { students } from "@/lib/mock-data";
import { ClipboardCheck, Users, CheckCircle2, XCircle, ScanLine } from "lucide-react";

export const Route = createFileRoute("/super-admin/attendance")({
  component: () => {
    const [roll, setRoll] = useState("");
    const [message, setMessage] = useState("Enter a roll number to mark attendance.");
    const present = Math.floor(students.length * 0.82);
    const needle = roll.toLowerCase().trim();
    const found = needle ? students.find((student) => student.roll.toLowerCase().includes(needle)) ?? null : null;
    return (
      <SuperPage
        title="Mark Attendance"
        subtitle="Mark student attendance by roll number."
        stats={[
          { label: "Marked Today", value: students.length, icon: <ClipboardCheck className="h-5 w-5" /> },
          { label: "Present", value: present, icon: <CheckCircle2 className="h-5 w-5" />, tone: "success" },
          { label: "Absent", value: students.length - present, icon: <XCircle className="h-5 w-5" /> },
          { label: "Students", value: students.length, icon: <Users className="h-5 w-5" />, tone: "gold" },
        ]}
      >
        <div className="grid lg:grid-cols-3 gap-6">
          <SectionCard title="Roll Number Attendance">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={roll}
                  onChange={(event) => setRoll(event.target.value)}
                  placeholder="TIT-2026-1001"
                  className="w-full h-10 pl-9 pr-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
              <button
                onClick={() => {
                  if (!roll.trim()) {
                    setMessage("Please enter a roll number first.");
                    return;
                  }
                  setMessage(found ? `${found.name} marked present.` : "No student found for this roll number.");
                }}
                className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm"
              >
                Mark
              </button>
            </div>
            <div className={`mt-4 rounded-md border border-dashed border-border p-4 text-sm ${found ? "text-foreground" : "text-muted-foreground"}`}>
              {found ? `${found.roll} · ${found.name} · ${found.course}` : message}
            </div>
          </SectionCard>

          <div className="lg:col-span-2">
            <SimpleTable
              columns={["Roll #", "Name", "Course", "Campus", "Status"]}
              rows={students.slice(0, 8).map((s, i) => [
                s.roll,
                s.name,
                s.course,
                s.campus,
                <StatusBadge key={s.id} status={i % 5 === 0 ? "pending" : "approved"} />,
              ])}
            />
          </div>
        </div>
      </SuperPage>
    );
  },
});
