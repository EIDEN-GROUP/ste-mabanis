import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import heroImage from "@/assets/hero-agadir.jpg";
import { Reveal, Counter, Parallax } from "@/components/motion";
import { Section, SectionHeading } from "@/components/layout-bits";
import { SearchPanel } from "@/components/search-panel";
import { PropertyCard } from "@/components/property-card";
import { TrustStrip } from "@/components/trust-strip";
import { articles, images, locations, properties, services, testimonials, values, } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STE MABANIS Immobilier de caractère à Agadir" },
      {
        name: "description",
        content:
          "Villas, appartements et investissements sélectionnés à Agadir, Founty, la Marina et Taghazout. Vente, location, estimation et gestion locative depuis 2008.",
      },
      { property: "og:title", content: "STE MABANIS Immobilier de caractère à Agadir" },
      {
        property: "og:description",
        content:
          "Une agence indépendante d'Agadir : biens sélectionnés, estimation argumentée, accompagnement de A à Z.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = properties.filter((p) => p.featured);
  // "Nouveautés" must show the listings actually flagged as new (newest first),
  // then fall back to the most recent ones to fill the three slots.
  const latest = [
    ...properties.filter((p) => p.isNew),
    ...properties.filter((p) => !p.isNew),
  ].slice(0, 3);

  return (
    <>
      {/* Hero */}
    <section className="relative min-h-[92svh] overflow-hidden bg-black">
      <img
        src={heroImage}
        alt="Villa contemporaine face à l'océan à Agadir au coucher du soleil"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

      <div className="relative mx-auto flex min-h-[92svh] max-w-[100rem] flex-col px-5 pt-28 pb-20 sm:px-8 sm:pt-32 sm:pb-24 lg:px-12">
        {/* Text + search */}
        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,28rem)] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(24rem,30rem)]">
          {/* Left column */}
          <div className="min-w-0 max-w-3xl">
            <p className="eyebrow animate-rise">AGADIR · SOUSS-MASSA · IMMOBILIER D’EXCEPTION</p>
            <h1
              className="display animate-rise mt-6 text-[clamp(3rem,6vw,6.5rem)] leading-[0.92] text-white"
              style={{ animationDelay: "120ms" }}
            >
              L’élégance immobilière 
              <span className="block italic text-gold-soft">à Agadir.</span>
            </h1>
            <p
              className="animate-rise mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:mt-7 sm:text-lg"
              style={{ animationDelay: "240ms" }}
            >
              Des propriétés d’exception au cœur d’Agadir et du Souss-Massa. Depuis 2008, STE MABANIS sélectionne et accompagne des projets immobiliers où emplacement, architecture et qualité de vie se rencontrent.
            </p>
            <div
              className="animate-rise mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap"
              style={{ animationDelay: "340ms" }}
            >
              <Link
                to="/proprietes"
                className="inline-flex items-center justify-center gap-2 bg-gold px-7 py-4 text-[0.7rem] tracking-[0.18em] text-navy uppercase transition-colors hover:bg-white"
              >
                Découvrir les biens <ArrowRight className="size-4 shrink-0" />
              </Link>
              <Link
                to="/vendre"
                className="inline-flex items-center justify-center gap-2 border border-white/30 px-7 py-4 text-[0.7rem] tracking-[0.18em] text-white uppercase transition-colors hover:border-gold hover:text-gold"
              >
                Estimer mon bien
              </Link>
            </div>
          </div>

          {/* Right column — search panel floating over the image */}
          <div
            className="animate-rise min-w-0 lg:justify-self-end lg:w-full"
            style={{ animationDelay: "420ms" }}
          >
            <div className="border border-white/15 bg-white/95 p-5 shadow-2xl backdrop-blur-sm sm:p-7">
              <p className="mb-5 text-[0.7rem] tracking-[0.18em] text-navy uppercase">
                Trouvez votre bien idéal
              </p>
              <SearchPanel compact />
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Trust strip — straddles the hero and the section below it */}
      <div className="relative z-20 mx-auto max-w-[100rem] px-5 [--trust-strip-h:4.5rem] sm:px-8 sm:[--trust-strip-h:5.5rem] lg:px-12">
        <TrustStrip className="mt-[calc(var(--trust-strip-h)*-0.5)]" />
      </div>

      {/* Featured */}
      <Section>
        <SectionHeading
          eyebrow="Sélection du moment"
          title="Biens d'exception"
          intro="Une poignée d'adresses que nous avons visitées, vérifiées et que nous défendons personnellement."
          action={
            <Link
              to="/proprietes"
              className="link-underline inline-flex items-center gap-2 text-[0.72rem] tracking-[0.18em] uppercase"
            >
              Tout le portefeuille <ArrowUpRight className="size-4 text-gold" />
            </Link>
          }
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <PropertyCard property={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Buy / Rent split */}
      <Section tone="sand">
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            {
              to: "/proprietes" as const,
              eyebrow: "Acheter",
              title: "Trouver le bien juste",
              text: "Villas de front de mer, appartements familiaux, riads restaurés, terrains constructibles. Nous filtrons pour vous ce qui mérite une visite.",
              image: images.property1,
            },
            {
              to: "/proprietes" as const,
              eyebrow: "Louer",
              title: "S'installer sereinement",
              text: "Longue durée, meublé ou nu, résidentiel ou professionnel : baux conformes, états des lieux rigoureux et locataires sélectionnés.",
              image: images.property5,
            },
          ].map((c, i) => (
            <Reveal key={c.eyebrow} delay={i * 100}>
              <Link to={c.to} className="zoom-frame group relative block h-[26rem] sm:h-[32rem]">
                <img
                  src={c.image}
                  alt=""
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                  <p className="eyebrow">{c.eyebrow}</p>
                  <h3 className="display mt-3 text-4xl text-white sm:text-5xl">{c.title}</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">{c.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] text-gold uppercase">
                    Explorer <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Expertise */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal className="zoom-frame relative">
            <Parallax intensity={22}>
              <img
                src={images.editorial1}
                alt="Détail architectural, ombre de palmier sur une façade blanche"
                loading="lazy"
                width={1280}
                height={960}
                className="aspect-4/5 w-full object-cover"
              />
            </Parallax>
            <div className="absolute -bottom-6 -right-4 hidden bg-navy px-8 py-6 text-white sm:block">
              <p className="display text-4xl text-gold">2008</p>
              <p className="mt-1 text-[0.65rem] tracking-[0.2em] uppercase">Première agence</p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Notre expertise"
              title="Sept métiers, un seul interlocuteur"
              intro="De la première estimation à la gestion du bien dix ans plus tard, tout se traite en interne."
            />
            <div className="mt-10 grid gap-px bg-line sm:grid-cols-2">
              {services.map((s, i) => (
                <Reveal key={s.slug} delay={i * 50} className="bg-background p-6">
                  <p className="text-[0.6rem] tracking-[0.2em] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="display mt-2 text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
                </Reveal>
              ))}
              <Reveal className="flex items-center bg-navy p-6">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] text-gold uppercase"
                >
                  Détail des services <ArrowRight className="size-4" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* Locations */}
      <Section tone="navy">
        <SectionHeading
          tone="navy"
          eyebrow="Quartiers"
          title="Connaître Agadir rue par rue"
          intro="Chaque secteur a son marché, ses acheteurs et ses pièges. Voici ce que nous en savons."
          action={
            <Link
              to="/quartiers"
              className="link-underline inline-flex items-center gap-2 text-[0.72rem] tracking-[0.18em] text-gold uppercase"
            >
              Tous les quartiers <ArrowUpRight className="size-4" />
            </Link>
          }
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {locations.slice(0, 3).map((l, i) => (
            <Reveal key={l.slug} delay={i * 90}>
              <Link
                to="/quartiers/$slug"
                params={{ slug: l.slug }}
                className="zoom-frame group relative block h-96"
              >
                <img
                  src={l.image}
                  alt={l.name}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="display text-3xl text-white">{l.name}</h3>
                  <p className="mt-2 text-xs tracking-[0.14em] text-gold uppercase">
                    {l.priceRange}
                  </p>
                  <p className="mt-3 text-sm text-white/65 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {l.intro}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Pourquoi STE MABANIS"
            title="Une agence qui assume ses conseils"
          />
          <div className="grid gap-px bg-line sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70} className="bg-background p-7">
                <h3 className="display rule-gold text-2xl">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Ils nous ont fait confiance"
          title="Paroles de clients"
          action={
            <Link
              to="/temoignages"
              className="link-underline inline-flex items-center gap-2 text-[0.72rem] tracking-[0.18em] uppercase"
            >
              Tous les témoignages <ArrowUpRight className="size-4 text-gold" />
            </Link>
          }
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <Reveal key={t.name} delay={i * 90} className="bg-card p-8 shadow-card">
              <p className="display text-3xl text-gold">“</p>
              <p className="mt-2 text-[0.98rem] leading-relaxed">{t.quote}</p>
              <div className="mt-6 border-t border-line pt-4">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.role} · {t.location}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Latest properties */}
      <Section>
        <SectionHeading
          eyebrow="Dernières opportunités"
          title="Nouveautés du portefeuille"
          intro="Les biens rentrés récemment, avant leur diffusion la plus large."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {latest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <PropertyCard property={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* News */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Actualités & analyses"
          title="Comprendre le marché avant d'agir"
          action={
            <Link
              to="/actualites"
              className="link-underline inline-flex items-center gap-2 text-[0.72rem] tracking-[0.18em] uppercase"
            >
              Toutes les publications <ArrowUpRight className="size-4 text-gold" />
            </Link>
          }
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {articles.slice(0, 3).map((a, i) => (
            <Reveal key={a.slug} delay={i * 90}>
              <Link to="/actualites/$slug" params={{ slug: a.slug }} className="zoom-frame group block">
                <div className="overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="aspect-16/10 w-full object-cover"
                  />
                </div>
                <p className="mt-5 text-[0.62rem] tracking-[0.2em] text-gold uppercase">
                  {a.category} · {a.readTime}
                </p>
                <h3 className="display mt-2 text-2xl">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-36">
        <img
          src={images.locationAgadir}
          alt=""
          aria-hidden
          loading="lazy"
          width={1280}
          height={960}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-navy/70" />
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <p className="eyebrow">Parlons de votre projet</p>
          <h2 className="display mt-5 text-[clamp(2.25rem,6vw,4.5rem)]">
            Une conversation, un plan, une estimation.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/70">
            Que vous achetiez, vendiez ou louiez, la première conversation est gratuite et sans
            engagement. Elle dure rarement plus de vingt minutes et fait souvent gagner des mois.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="bg-gold px-7 py-4 text-[0.7rem] tracking-[0.18em] text-navy uppercase transition-colors hover:bg-white"
            >
              Prendre rendez-vous
            </Link>
            <Link
              to="/vendre"
              className="border border-white/30 px-7 py-4 text-[0.7rem] tracking-[0.18em] uppercase transition-colors hover:border-gold hover:text-gold"
            >
              Demander une estimation
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
