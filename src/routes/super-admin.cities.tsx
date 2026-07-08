import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SuperPage, SimpleTable } from "@/components/SuperPage";
import { MapPin, Plus } from "lucide-react";

const cities = [
  { name: "Karachi", campuses: 3, students: 812 },
  { name: "Lahore", campuses: 2, students: 621 },
  { name: "Islamabad", campuses: 2, students: 498 },
  { name: "Faisalabad", campuses: 1, students: 287 },
  { name: "Multan", campuses: 1, students: 244 },
  { name: "Peshawar", campuses: 1, students: 231 },
  { name: "Hyderabad", campuses: 1, students: 238 },
  { name: "Sukkur", campuses: 3, students: 316 },
];

export const Route = createFileRoute("/super-admin/cities")({
  component: CitiesPage,
});

function CitiesPage() {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <SuperPage
      title="Cities"
      subtitle="Cities served by Titan"
      actions={
        <button
          onClick={() => setMessage("Add city form opened in demo mode.")}
          className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> Add City
        </button>
      }
      stats={[
        { label: "Cities", value: cities.length, icon: <MapPin className="h-5 w-5" />, tone: "gold" },
        { label: "Campuses", value: cities.reduce((a, c) => a + c.campuses, 0) },
        { label: "Students", value: cities.reduce((a, c) => a + c.students, 0) },
        { label: "Country", value: "Pakistan" },
      ]}
    >
      {message && <div className="mb-4 rounded-md border border-success/30 bg-success/10 px-4 py-2 text-sm text-success">{message}</div>}
      <SimpleTable
        columns={["City", "Campuses", "Students"]}
        rows={cities.map((c) => [c.name, c.campuses, c.students.toLocaleString()])}
      />
    </SuperPage>
  );
}
