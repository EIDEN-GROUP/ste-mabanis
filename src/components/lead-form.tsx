import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  full?: boolean;
};

export function LeadForm({
  fields,
  submitLabel,
  intent,
  note,
  tone = "light",
  children,
}: {
  fields: Field[];
  submitLabel: string;
  intent: string;
  note?: string;
  tone?: "light" | "navy";
  children?: ReactNode;
}) {
  const [sent, setSent] = useState(false);

  const dark = tone === "navy";

  if (sent) {
    return (
      <div
        className={cn(
          "border p-8 text-center",
          dark ? "border-white/15 bg-white/5" : "border-line bg-card",
        )}
      >
        <p className="eyebrow">Demande enregistrée</p>
        <h3 className="display mt-3 text-3xl">Merci, nous revenons vers vous.</h3>
        <p className={cn("mt-3 text-sm", dark ? "text-white/60" : "text-muted-foreground")}>
          Un conseiller STE MABANIS vous rappelle sous 24 heures ouvrées. Pour une réponse
          immédiate, écrivez-nous sur WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        toast.success("Votre demande a bien été transmise à nos conseillers.");
      }}
      className={cn(
        "border p-6 sm:p-8",
        dark ? "border-white/15 bg-white/5" : "border-line bg-card shadow-card",
      )}
    >
      <input type="hidden" name="intent" value={intent} />
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label
            key={f.name}
            className={cn("flex flex-col gap-1.5", (f.full || f.type === "textarea") && "sm:col-span-2")}
          >
            <span
              className={cn(
                "text-[0.6rem] tracking-[0.18em] uppercase",
                dark ? "text-white/50" : "text-muted-foreground",
              )}
            >
              {f.label}
              {f.required ? " *" : ""}
            </span>
            {f.type === "textarea" ? (
              <textarea
                name={f.name}
                required={f.required}
                rows={4}
                placeholder={f.placeholder}
                className={cn(
                  "border px-3 py-2.5 text-sm outline-none transition-colors focus:border-gold",
                  dark
                    ? "border-white/20 bg-transparent text-white placeholder:text-white/30"
                    : "border-line bg-background",
                )}
              />
            ) : f.type === "select" ? (
              <select
                name={f.name}
                required={f.required}
                defaultValue=""
                className={cn(
                  "h-11 border px-3 text-sm outline-none transition-colors focus:border-gold",
                  dark ? "border-white/20 bg-navy text-white" : "border-line bg-background",
                )}
              >
                <option value="" disabled>
                  Sélectionner…
                </option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                placeholder={f.placeholder}
                className={cn(
                  "h-11 border px-3 text-sm outline-none transition-colors focus:border-gold",
                  dark
                    ? "border-white/20 bg-transparent text-white placeholder:text-white/30"
                    : "border-line bg-background",
                )}
              />
            )}
          </label>
        ))}
      </div>

      {children}

      <button
        type="submit"
        className="mt-6 w-full bg-gold px-6 py-3.5 text-[0.7rem] tracking-[0.18em] text-navy uppercase transition-colors hover:bg-navy hover:text-white sm:w-auto"
      >
        {submitLabel}
      </button>

      {note ? (
        <p className={cn("mt-4 text-xs", dark ? "text-white/45" : "text-muted-foreground")}>
          {note}
        </p>
      ) : null}
    </form>
  );
}
