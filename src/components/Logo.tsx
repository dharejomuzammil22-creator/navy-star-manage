import logo from "@/assets/titan-logo.png.asset.json";

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: "light" | "dark";
}

export function Logo({ className = "", showText = true, variant = "dark" }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={logo.url}
        alt="Titan Institute crest"
        className="h-11 w-11 object-contain shrink-0"
      />
      {showText && (
        <div className="leading-tight">
          <div
            className={`font-display text-lg tracking-wide ${
              variant === "light" ? "text-sidebar-foreground" : "text-foreground"
            }`}
          >
            TITAN
          </div>
          <div
            className={`text-[10px] uppercase tracking-[0.15em] ${
              variant === "light" ? "text-sidebar-foreground/70" : "text-muted-foreground"
            }`}
          >
            Institute · SMS
          </div>
        </div>
      )}
    </div>
  );
}
