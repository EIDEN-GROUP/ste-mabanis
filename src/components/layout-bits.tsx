import type { ReactNode } from "react";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy pt-32 pb-16 text-white sm:pt-40 sm:pb-24">
      {image ? (
        <>
          <img
            src={image}
            alt=""
            aria-hidden
            width={1280}
            height={960}
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/60" />
        </>
      ) : null}
      <div className="relative mx-auto max-w-[100rem] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-5 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)]">{title}</h1>
          {intro ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {intro}
            </p>
          ) : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function Section({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "sand" | "navy";
}) {
  return (
    <section
      className={cn(
        "px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32",
        tone === "sand" && "bg-sand",
        tone === "navy" && "bg-navy text-white",
        className,
      )}
    >
      <div className="mx-auto max-w-[100rem]">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  action?: ReactNode;
  tone?: "light" | "navy";
}) {
  return (
    <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.75rem)]">{title}</h2>
        {intro ? (
          <p
            className={cn(
              "mt-5 text-base leading-relaxed",
              tone === "navy" ? "text-white/70" : "text-muted-foreground",
            )}
          >
            {intro}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
