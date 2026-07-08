import { Link } from "@tanstack/react-router";
import { useRef, useState, type ReactNode } from "react";
import { Camera, Image as ImageIcon, KeyRound, LogOut, Pencil, ShieldCheck } from "lucide-react";
import { Drawer } from "./Drawer";
import { PageHeader, SectionCard } from "./ui-bits";

export interface ProfileField {
  key: string;
  label: string;
  value: string;
  editable?: boolean;
  type?: "text" | "email" | "tel" | "number";
}

export function PortalProfile({
  title,
  subtitle,
  nameKey,
  emailKey,
  roleLabel,
  roleTone = "primary",
  initials,
  fields,
  extra,
}: {
  title: string;
  subtitle: string;
  nameKey: string;
  emailKey: string;
  roleLabel: string;
  roleTone?: "primary" | "gold";
  initials: string;
  fields: ProfileField[];
  extra?: ReactNode;
}) {
  const [edit, setEdit] = useState(false);
  const [password, setPassword] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>(() =>
    fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.key] = field.value;
      return acc;
    }, {}),
  );
  const avatarRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  const pickImage = (event: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const file = event.target.files?.[0];
    if (file) setter(URL.createObjectURL(file));
  };

  const displayName = form[nameKey] || initials;
  const displayEmail = form[emailKey] || "—";
  const editableFields = fields.filter((field) => field.editable !== false);

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={
          <>
            <button
              onClick={() => setPassword(true)}
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
        <input
          ref={bannerRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => pickImage(event, setBanner)}
        />

        <div className="absolute -bottom-12 left-6 flex items-end gap-4">
          <div className="relative">
            <div
              className={`h-28 w-28 rounded-full border-4 border-card ${
                roleTone === "gold" ? "bg-gradient-to-br from-gold to-gold/60 text-primary" : "bg-primary text-primary-foreground"
              } grid place-items-center text-3xl font-semibold overflow-hidden bg-center bg-cover`}
              style={avatar ? { backgroundImage: `url(${avatar})` } : undefined}
            >
              {!avatar && initials}
            </div>
            <button
              onClick={() => avatarRef.current?.click()}
              className="absolute bottom-1 right-1 h-8 w-8 grid place-items-center rounded-full bg-primary text-primary-foreground border-2 border-card hover:bg-primary/90"
              aria-label="Change photo"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
            <input
              ref={avatarRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => pickImage(event, setAvatar)}
            />
          </div>
          <div className="pb-2">
            <div className="text-lg font-medium text-white drop-shadow">{displayName}</div>
            <div className="text-xs text-white/80 drop-shadow">{displayEmail}</div>
          </div>
        </div>
      </div>

      {saved && (
        <div className="mb-4 rounded-md border border-success/30 bg-success/10 px-4 py-2 text-sm text-success">
          {saved}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <div
              className={`mx-auto h-20 w-20 rounded-full ${
                roleTone === "gold" ? "bg-gradient-to-br from-gold to-gold/60 text-primary" : "bg-primary text-primary-foreground"
              } grid place-items-center font-semibold overflow-hidden bg-center bg-cover`}
              style={avatar ? { backgroundImage: `url(${avatar})` } : undefined}
            >
              {!avatar && initials}
            </div>
            <div className="mt-4 text-lg font-medium">{displayName}</div>
            <div className="text-sm text-muted-foreground break-all">{displayEmail}</div>
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-gold/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold">
              <ShieldCheck className="h-3 w-3" /> {roleLabel}
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
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {fields.map((field) => (
                <div key={field.key}>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{field.label}</div>
                  <div className="mt-0.5 font-medium text-foreground break-words">{form[field.key]}</div>
                </div>
              ))}
            </div>
          </SectionCard>
          {extra}
        </div>
      </div>

      <Drawer
        open={edit}
        onClose={() => setEdit(false)}
        title="Edit Profile"
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setEdit(false)} className="h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent">
              Cancel
            </button>
            <button
              onClick={() => {
                setEdit(false);
                setSaved("Profile updated successfully.");
              }}
              className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
            >
              Save
            </button>
          </div>
        }
      >
        <div className="grid sm:grid-cols-2 gap-4">
          {editableFields.map((field) => (
            <label key={field.key} className={field.key === nameKey || field.key === emailKey ? "sm:col-span-2 block" : "block"}>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{field.label}</span>
              <input
                type={field.type || "text"}
                value={form[field.key]}
                onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                className="mt-1 w-full h-9 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </label>
          ))}
        </div>
      </Drawer>

      <Drawer
        open={password}
        onClose={() => setPassword(false)}
        title="Change Password"
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setPassword(false)} className="h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent">
              Cancel
            </button>
            <button
              onClick={() => {
                setPassword(false);
                setSaved("Password updated successfully.");
              }}
              className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
            >
              Update
            </button>
          </div>
        }
      >
        <div className="space-y-3">
          {["Current Password", "New Password", "Confirm New Password"].map((label) => (
            <label key={label} className="block">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
              <input
                type="password"
                className="mt-1 w-full h-9 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </label>
          ))}
        </div>
      </Drawer>
    </>
  );
}