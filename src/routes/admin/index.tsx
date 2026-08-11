import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Building2,
  UserPlus,
  CalendarCheck,
  Wallet,
  TrendingUp,
  Percent,
  AlertTriangle,
  Clock,
  ArrowRight,
} from "lucide-react";
import { dashboardQuery, prioritiesQuery } from "@/lib/admin/queries";
import { formatMoney, formatNumber, label, SOURCE_LABELS, STAGE_LABELS } from "@/lib/admin/format";
import {
  Panel,
  PanelHeader,
  StatCard,
  LoadingState,
  EmptyState,
} from "@/components/admin/primitives";
import {
  AreaTrendChart,
  CategoryBarChart,
  ChartLegend,
  DonutChart,
  TrendChart,
} from "@/components/admin/charts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — STE MABANIS" },
      { name: "description", content: "Indicateurs, pipeline et priorités du jour." },
    ],
  }),
  component: DashboardPage,
});

const URGENCY = {
  overdue: { tone: "text-negative border-negative/35", icon: AlertTriangle, word: "En retard" },
  today: { tone: "text-status-offer border-status-offer/35", icon: Clock, word: "Aujourd'hui" },
  soon: { tone: "text-muted-foreground border-line", icon: Clock, word: "À suivre" },
} as const;

function DashboardPage() {
  const { data, isPending } = useQuery(dashboardQuery());
  const { data: priorities = [], isPending: prioritiesPending } = useQuery(prioritiesQuery());

  if (isPending || !data) {
    return (
      <div className="space-y-6">
        <LoadingState variant="cards" rows={6} />
        <LoadingState variant="chart" />
      </div>
    );
  }

  const { kpis } = data;

  return (
    <div className="space-y-6">
      {/* ---------------------------------------------------------- KPIs */}
      <section>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-6">
          <StatCard
            index={0}
            label="Biens actifs"
            value={formatNumber(kpis.activelistings)}
            delta={kpis.deltas["activelistings"]}
            hint="en ligne"
            icon={Building2}
          />
          <StatCard
            index={1}
            label="Nouveaux leads"
            value={formatNumber(kpis.newLeads30d)}
            delta={kpis.deltas["newLeads30d"]}
            hint="30 jours"
            icon={UserPlus}
          />
          <StatCard
            index={2}
            label="Visites"
            value={formatNumber(kpis.viewings30d)}
            delta={kpis.deltas["viewings30d"]}
            hint="30 jours"
            icon={CalendarCheck}
          />
          <StatCard
            index={3}
            label="Pipeline"
            value={formatMoney(kpis.pipelineValue, true)}
            delta={kpis.deltas["pipelineValue"]}
            hint="en cours"
            icon={Wallet}
          />
          <StatCard
            index={4}
            label="Honoraires"
            value={formatMoney(kpis.revenueYtd, true)}
            delta={kpis.deltas["revenueYtd"]}
            hint="cumul"
            icon={TrendingUp}
          />
          <StatCard
            index={5}
            label="Conversion"
            value={`${kpis.conversionRate}%`}
            delta={kpis.deltas["conversionRate"]}
            hint="leads gagnés"
            icon={Percent}
          />
        </div>
      </section>

      {/* ------------------------------------------ priorities + pipeline */}
      <section className="grid gap-4 xl:grid-cols-3">
        <Panel className="xl:col-span-1">
          <PanelHeader eyebrow="À traiter" title="Priorités du jour" />
          {prioritiesPending ? (
            <LoadingState rows={4} className="p-4" />
          ) : priorities.length === 0 ? (
            <EmptyState title="Rien d'urgent" description="Toutes les échéances sont tenues." />
          ) : (
            <ul>
              {priorities.map((p, i) => {
                const u = URGENCY[p.urgency];
                const Icon = u.icon;
                return (
                  <li key={p.id} style={{ ["--i" as string]: i }} className="stagger-in">
                    <Link
                      to={p.href}
                      className="flex items-start gap-3 border-b border-line px-5 py-3.5 transition-colors last:border-0 hover:bg-sand"
                    >
                      <span
                        className={cn(
                          "mt-0.5 grid size-8 shrink-0 place-items-center border",
                          u.tone,
                        )}
                      >
                        <Icon className="size-3.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-navy">
                          {p.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {u.word} · {p.detail}
                        </span>
                      </span>
                      <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground/50" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>

        <Panel className="xl:col-span-2">
          <PanelHeader eyebrow="Acquisition" title="Leads et visites" />
          <div className="p-4">
            <TrendChart
              data={data.leadsSeries as unknown as Record<string, string | number>[]}
              xKey="month"
              series={[
                { key: "leads", name: "Leads" },
                { key: "viewings", name: "Visites" },
              ]}
              height={280}
            />
          </div>
        </Panel>
      </section>

      {/* ------------------------------------------------------- charts */}
      <section className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHeader eyebrow="Audience" title="Vues du site" />
          <div className="p-4">
            <AreaTrendChart
              data={data.viewsSeries as unknown as Record<string, string | number>[]}
              xKey="month"
              dataKey="views"
              name="Vues"
              formatter={formatNumber}
            />
          </div>
        </Panel>

        <Panel>
          <PanelHeader eyebrow="Honoraires" title="Revenus par mois" />
          <div className="p-4">
            <CategoryBarChart
              data={data.revenueSeries as unknown as Record<string, string | number>[]}
              xKey="month"
              dataKey="revenue"
              name="Honoraires"
              formatter={(v) => formatMoney(v, true)}
            />
          </div>
        </Panel>

        <Panel>
          <PanelHeader eyebrow="CRM" title="Pipeline par étape" />
          <div className="p-4">
            <CategoryBarChart
              data={data.pipelineByStage.map((p) => ({
                label: label(STAGE_LABELS, p.label),
                value: p.value,
              }))}
              xKey="label"
              dataKey="value"
              name="Leads"
              horizontal
            />
          </div>
        </Panel>

        <Panel>
          <PanelHeader eyebrow="Origine" title="Sources des leads" />
          <div className="p-4">
            <DonutChart
              data={data.sourceBreakdown.map((s) => ({
                label: label(SOURCE_LABELS, s.label),
                value: s.value,
              }))}
            />
            <ChartLegend
              items={data.sourceBreakdown.map((s) => ({
                label: label(SOURCE_LABELS, s.label),
                value: String(s.value),
              }))}
            />
          </div>
        </Panel>
      </section>
    </div>
  );
}
