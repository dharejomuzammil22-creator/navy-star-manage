import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { PageHeader, SectionCard } from "@/components/ui-bits";
import { Drawer } from "@/components/Drawer";
import { Pencil, KeyRound, LogOut, ShieldCheck, Camera, Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/super-admin/profile")({
  component: ProfilePage,
});

const permissions = [
  "manage.users", "manage.roles", "manage.students", "manage.trainers",
  "manage.campuses", "manage.courses", "manage.batches", "manage.slots",
  "manage.attendance", "manage.registrations", "manage.payments",
  "view.reports", "view.activity", "manage.settings", "manage.notifications",
];

function ProfilePage() {
  const [edit, setEdit] = useState(false);
  const [pw, setPw] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  const pick = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const f = e.target.files?.[0];
    if (f) setter(URL.createObjectURL(f));
  };

  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Your Super Admin account"
        actions={
          <>
            <button
              onClick={() => setPw(true)}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent"
            >
              <KeyRound className="h-4 w-4" /> Change Password
            </button>
            <button
              onClick={() => setEdit(true)}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
            >
              <Pencil className="h-4 w-4" /> Edit Profile
            </button>
          </>
        }
      />

      <div
        className="relative rounded-xl overflow-hidden border border-border h-48 mb-16"
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

        <div className="absolute -bottom-12 left-6 flex items-end gap-4">
          <div className="relative">
            <div
              className="h-28 w-28 rounded-full border-4 border-card bg-gradient-to-br from-gold to-gold/60 text-primary grid place-items-center text-3xl font-semibold overflow-hidden"
              style={avatar ? { backgroundImage: `url(${avatar})`, backgroundSize: "cover" } : undefined}
            >
              {!avatar && "ZR"}
            </div>
            <button
              onClick={() => avatarRef.current?.click()}
              className="absolute bottom-1 right-1 h-8 w-8 grid place-items-center rounded-full bg-primary text-primary-foreground border-2 border-card hover:bg-primary/90"
              aria-label="Change photo"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
            <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={(e) => pick(e, setAvatar)} />
          </div>
          <div className="pb-2">
            <div className="text-lg font-medium text-white drop-shadow">Zaid Rehman</div>
            <div className="text-xs text-white/80 drop-shadow">zaid@titan.edu.pk</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <div className="text-lg font-medium">Zaid Rehman</div>
            <div className="text-sm text-muted-foreground">zaid@titan.edu.pk</div>
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-gold/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold">
              <ShieldCheck className="h-3 w-3" /> SUPER_ADMIN
            </div>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 h-9 px-3 rounded-md border border-destructive/30 text-destructive text-sm hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" /> Logout
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Profile Information">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {[
                ["Full Name", "Zaid Rehman"],
                ["Email", "zaid@titan.edu.pk"],
                ["Phone", "+92 300 1234567"],
                ["Role", "SUPER_ADMIN"],
                ["Campus", "All Campuses"],
                ["Country", "Pakistan"],
                ["City", "Karachi"],
                ["Joined", "Jan 2025"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</div>
                  <div className="mt-0.5 font-medium text-foreground">{v}</div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Permissions">
            <div className="flex flex-wrap gap-2">
              {permissions.map((p) => (
                <span key={p} className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2.5 py-1 text-xs font-medium">
                  <ShieldCheck className="h-3 w-3" /> {p}
                </span>
              ))}
            </div>
          </SectionCard>
        </div>
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
          {["Full Name", "Email", "Phone", "City"].map((l) => (
            <label key={l} className="block">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{l}</span>
              <input className="mt-1 w-full h-9 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40" />
            </label>
          ))}
        </div>
      </Drawer>

      <Drawer
        open={pw}
        onClose={() => setPw(false)}
        title="Change Password"
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setPw(false)} className="h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent">Cancel</button>
            <button onClick={() => setPw(false)} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90">Update</button>
          </div>
        }
      >
        <div className="space-y-3">
          {["Current Password", "New Password", "Confirm New Password"].map((l) => (
            <label key={l} className="block">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{l}</span>
              <input type="password" className="mt-1 w-full h-9 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40" />
            </label>
          ))}
        </div>
      </Drawer>
    </>
  );
}
