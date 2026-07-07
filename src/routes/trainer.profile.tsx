import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { PageHeader, SectionCard } from "@/components/ui-bits";
import { Drawer } from "@/components/Drawer";
import { Camera, Download, Pencil, Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/trainer/profile")({
  component: TrainerProfile,
});

function TrainerProfile() {
  const [edit, setEdit] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "Bilal Ahmed",
    email: "trainer@titan.edu.pk",
    phone: "+92 300 1234567",
    campus: "Karachi Main",
    rate: "2500",
  });
  const avatarRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  const pick = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void,
  ) => {
    const f = e.target.files?.[0];
    if (f) setter(URL.createObjectURL(f));
  };

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="Trainer account and ID card."
        actions={
          <button
            onClick={() => setEdit(true)}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
          >
            <Pencil className="h-4 w-4" /> Edit Profile
          </button>
        }
      />

      <div
        className="relative rounded-xl overflow-hidden border border-border h-44 mb-14"
        style={
          banner
            ? { backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center" }
            : { background: "var(--gradient-navy)" }
        }
      >
        <button
          onClick={() => bannerRef.current?.click()}
          className="absolute top-3 right-3 inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-black/40 backdrop-blur text-white text-xs hover:bg-black/60"
        >
          <ImageIcon className="h-3.5 w-3.5" /> Change banner
        </button>
        <input ref={bannerRef} type="file" accept="image/*" className="hidden" onChange={(e) => pick(e, setBanner)} />

        <div className="absolute -bottom-10 left-6 flex items-end gap-4">
          <div className="relative">
            <div
              className="h-24 w-24 rounded-full border-4 border-card bg-primary text-primary-foreground grid place-items-center text-2xl font-semibold overflow-hidden"
              style={avatar ? { backgroundImage: `url(${avatar})`, backgroundSize: "cover" } : undefined}
            >
              {!avatar && (form.name.split(" ").map((n) => n[0]).join("").slice(0, 2))}
            </div>
            <button
              onClick={() => avatarRef.current?.click()}
              className="absolute bottom-0 right-0 h-8 w-8 grid place-items-center rounded-full bg-primary text-primary-foreground border-2 border-card hover:bg-primary/90"
              aria-label="Change photo"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
            <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={(e) => pick(e, setAvatar)} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <SectionCard title="Details">
          <div>
            <div className="font-medium text-lg">{form.name}</div>
            <div className="text-sm text-muted-foreground">{form.email}</div>
            <div className="text-xs font-mono text-muted-foreground mt-1">EMP-202</div>
          </div>
          <div className="mt-5 grid gap-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Campus</span><span>{form.campus}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span>{form.phone}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Hourly rate</span><span>Rs {Number(form.rate).toLocaleString()}</span></div>
          </div>
        </SectionCard>
        <SectionCard title="ID Card">
          <div className="rounded-xl overflow-hidden border border-border" style={{ background: "var(--gradient-navy)" }}>
            <div className="p-5 text-sidebar-foreground">
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold">TITAN · Trainer</div>
              <div className="mt-3 font-medium text-lg">{form.name}</div>
              <div className="text-xs text-sidebar-foreground/70">EMP-202 · {form.campus}</div>
            </div>
            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs bg-black/20 text-white hover:bg-black/30"
            >
              <Download className="h-3.5 w-3.5" /> Download / Print
            </button>
          </div>
        </SectionCard>
      </div>

      <Drawer
        open={edit}
        onClose={() => setEdit(false)}
        title="Edit Profile"
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setEdit(false)} className="h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent">Cancel</button>
            <button onClick={() => setEdit(false)} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90">Save</button>
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          {(["name", "email", "phone", "campus", "rate"] as const).map((k) => (
            <label key={k} className={k === "name" || k === "email" ? "col-span-2 block" : "block"}>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{k}</span>
              <input
                value={form[k]}
                onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
                className="mt-1 w-full h-9 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </label>
          ))}
        </div>
      </Drawer>
    </>
  );
}
