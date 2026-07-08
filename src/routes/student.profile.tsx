import { createFileRoute } from "@tanstack/react-router";
import { PortalProfile } from "@/components/PortalProfile";
import { SectionCard } from "@/components/ui-bits";

export const Route = createFileRoute("/student/profile")({
  component: StudentProfile,
});

function StudentProfile() {
  return (
    <PortalProfile
      title="My Profile"
      subtitle="Your personal information and enrolled courses."
      nameKey="name"
      emailKey="email"
      roleLabel="Student"
      initials="HR"
      fields={[
        { key: "name", label: "Full Name", value: "Hassan Raza" },
        { key: "email", label: "Email", value: "hassan.raza@titan.edu.pk", type: "email" },
        { key: "phone", label: "Phone", value: "+92 321 4567890", type: "tel" },
        { key: "cnic", label: "CNIC", value: "42101-1234567-8" },
        { key: "father", label: "Father", value: "Ali Raza" },
        { key: "roll", label: "Roll #", value: "TIT-2026-1023", editable: false },
        { key: "gender", label: "Gender", value: "Male" },
        { key: "age", label: "Age", value: "21", type: "number" },
        { key: "city", label: "City", value: "Karachi" },
        { key: "address", label: "Address", value: "House 42, Block 5, Gulshan-e-Iqbal, Karachi." },
      ]}
      extra={
        <SectionCard title="Enrolled Courses">
          <ul className="space-y-3 text-sm">
            <li className="rounded-lg border border-border p-3">
              <div className="font-medium">Web & Mobile App</div>
              <div className="text-xs text-muted-foreground">Batch 3 · Karachi Main · Active · Fee Rs 1,000</div>
            </li>
            <li className="rounded-lg border border-border p-3">
              <div className="font-medium">UI/UX Design</div>
              <div className="text-xs text-muted-foreground">Batch 1 · Karachi Main · Completed · Fee Rs 1,000</div>
            </li>
          </ul>
        </SectionCard>
      }
    />
  );
}
