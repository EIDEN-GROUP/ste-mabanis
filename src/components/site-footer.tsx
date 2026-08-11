import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import logo from "@/assets/mabanis-logo.png";
import { agency } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="mx-auto grid max-w-[100rem] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-12 lg:py-24">
        <div>
          <img
            src={logo}
            alt="STE MABANIS"
            width={240}
            height={240}
            className="h-16 w-auto brightness-0 invert"
          />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            Agence immobilière indépendante installée à Agadir depuis 2008. Vente, location,
            estimation et gestion locative sur l'ensemble du Grand Agadir et du littoral.
          </p>
        </div>

        <div>
          <h2 className="text-[0.65rem] tracking-[0.22em] text-gold uppercase">Explorer</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { to: "/proprietes", label: "Propriétés" },
              { to: "/quartiers", label: "Quartiers" },
              { to: "/services", label: "Services" },
              { to: "/vendre", label: "Vendre avec nous" },
              { to: "/temoignages", label: "Témoignages" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-underline hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[0.65rem] tracking-[0.22em] text-gold uppercase">Agence</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { to: "/agence", label: "Notre histoire" },
              { to: "/equipe", label: "Nos conseillers" },
              { to: "/actualites", label: "Actualités & guides" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-underline hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[0.65rem] tracking-[0.22em] text-gold uppercase">Nous joindre</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>{agency.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href={`tel:${agency.mobile.replace(/\s/g, "")}`} className="hover:text-white">
                {agency.mobile}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href={`mailto:${agency.email}`} className="hover:text-white">
                {agency.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>{agency.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[100rem] flex-col gap-2 px-5 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} STE MABANIS — Ste Gestion et Services. Agadir, Maroc.</p>
          <p className="tracking-[0.2em] text-white/40 uppercase">mabanis.au</p>
        </div>
      </div>
    </footer>
  );
}
