import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/mabanis-logo.png.asset.json";
import { agency } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/proprietes", label: "Propriétés" },
  { to: "/quartiers", label: "Quartiers" },
  { to: "/services", label: "Services" },
  { to: "/vendre", label: "Vendre" },
  { to: "/agence", label: "L'agence" },
  { to: "/equipe", label: "Équipe" },
  { to: "/actualites", label: "Actualités" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || !overHero;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500",
          solid
            ? "border-b border-line bg-background/95 py-3 backdrop-blur-md"
            : "border-b border-white/10 py-5",
        )}
      >
        <div className="mx-auto flex max-w-[100rem] items-center gap-6 px-5 sm:px-8 lg:px-12">
          <Link to="/" className="shrink-0" aria-label="STE MABANIS — accueil">
            <img
              src={logo.url}
              alt="STE MABANIS"
              width={200}
              height={200}
              className={cn(
                "h-11 w-auto transition-all duration-500 sm:h-12",
                solid ? "" : "brightness-0 invert",
              )}
            />
          </Link>

          <nav className="ml-auto hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "link-underline text-[0.78rem] tracking-[0.1em] uppercase transition-colors",
                  solid ? "text-navy/75 hover:text-navy" : "text-white/80 hover:text-white",
                )}
                activeProps={{ className: solid ? "text-navy" : "text-white" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <a
              href={`tel:${agency.mobile.replace(/\s/g, "")}`}
              className={cn(
                "hidden items-center gap-2 text-xs tracking-wide xl:inline-flex",
                solid ? "text-navy/70" : "text-white/75",
              )}
            >
              <Phone className="size-3.5 text-gold" />
              {agency.mobile}
            </a>
            <Link
              to="/contact"
              className="hidden bg-gold px-5 py-2.5 text-[0.7rem] tracking-[0.16em] text-navy uppercase transition-colors hover:bg-navy hover:text-white sm:inline-block"
            >
              Nous contacter
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className={cn("lg:hidden", solid ? "text-navy" : "text-white")}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[60] bg-navy transition-[opacity,visibility] duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="flex items-center justify-between px-5 py-5 sm:px-8">
          <img
            src={logo.url}
            alt="STE MABANIS"
            width={200}
            height={200}
            className="h-11 w-auto brightness-0 invert"
          />
          <button type="button" onClick={() => setOpen(false)} aria-label="Fermer le menu">
            <X className="size-6 text-white" />
          </button>
        </div>
        <nav className="flex flex-col px-5 pt-6 sm:px-8">
          {nav.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className="display border-b border-white/10 py-4 text-3xl text-white"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-8 bg-gold px-6 py-4 text-center text-xs tracking-[0.18em] text-navy uppercase"
          >
            Nous contacter
          </Link>
          <a
            href={`tel:${agency.mobile.replace(/\s/g, "")}`}
            className="mt-4 text-center text-sm text-white/70"
          >
            {agency.mobile}
          </a>
        </nav>
      </div>
    </>
  );
}
