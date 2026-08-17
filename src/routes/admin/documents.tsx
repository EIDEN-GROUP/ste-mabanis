import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Plus,
  FileText,
  Search,
  Download,
  Trash2,
  Upload,
  HardDrive,
  FolderOpen,
  Layers,
} from "lucide-react";
import {
  documentsQuery,
  clientsQuery,
  propertiesQuery,
  agentsQuery,
  useCreateDocument,
  useDeleteDocument,
} from "@/lib/admin/queries";
import type { DocumentCategory, StoredDocument } from "@/lib/admin/types";
import { DOCUMENT_LABELS, formatBytes, formatDate, label } from "@/lib/admin/format";
import {
  StatCard,
  Modal,
  AdminButton,
  EmptyState,
  SearchSelect,
} from "@/components/admin/primitives";
import { useCan } from "@/lib/admin/session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/documents")({
  // `q` is set by the header search so a hit lands on this screen already filtered.
  validateSearch: (search: Record<string, unknown>): { q: string | undefined } => ({
    q: typeof search["q"] === "string" && search["q"] ? search["q"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Documents   STE MABANIS" },
      { name: "description", content: "Centre documentaire de l'agence." },
    ],
  }),
  component: DocumentsPage,
});

const CATEGORIES = Object.keys(DOCUMENT_LABELS) as DocumentCategory[];

function DocumentsPage() {
  const { q } = Route.useSearch();
  const [category, setCategory] = useState<DocumentCategory | "all">("all");
  const [search, setSearch] = useState(q ?? "");

  // Arriving from the header search   or searching again while already here.
  useEffect(() => {
    if (q) {
      setSearch(q);
      setCategory("all");
    }
  }, [q]);
  const [preview, setPreview] = useState<StoredDocument | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: documents = [] } = useQuery(documentsQuery());
  const { data: clients = [] } = useQuery(clientsQuery({}));
  const { data: properties = [] } = useQuery(propertiesQuery({}));
  const { data: agents = [] } = useQuery(agentsQuery());

  const canManage = useCan("document.manage");

  const agentsById = useMemo(() => new Map(agents.map((a) => [a.id, a])), [agents]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return documents.filter((d) => {
      if (category !== "all" && d.category !== category) return false;
      if (term && !d.name.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [documents, category, search]);

  const totalBytes = documents.reduce((s, d) => s + d.sizeBytes, 0);
  const versions = documents.reduce((s, d) => s + d.version, 0);

  // Used by the KPI explanation modals: how the library actually breaks down.
  const categoryRows = CATEGORIES.map((c) => ({
    label: label(DOCUMENT_LABELS, c),
    value: String(documents.filter((d) => d.category === c).length),
  })).filter((r) => r.value !== "0");

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Documents"
          value={String(documents.length)}
          hint="Fichiers archivés"
          icon={FolderOpen}
          index={0}
          detail={{
            what: "Le nombre de fichiers conservés dans la bibliothèque de l'agence.",
            how: "Chaque fichier déposé compte pour un document, quelle que soit sa catégorie. Remplacer un fichier existant crée une nouvelle version et n'ajoute pas de document supplémentaire.",
            why: "C'est la mémoire administrative de l'agence : mandats, compromis, diagnostics, pièces d'identité. Un dossier complet au moment de la signature évite les allers-retours avec le notaire.",
            rows: categoryRows,
          }}
        />
        <StatCard
          label="Volume total"
          value={formatBytes(totalBytes)}
          hint="Toutes catégories"
          icon={HardDrive}
          index={1}
          detail={{
            what: "L'espace de stockage occupé par l'ensemble des fichiers.",
            how: "On additionne la taille de tous les documents, toutes versions confondues. Les photos de biens en haute définition pèsent le plus lourd.",
            why: "Utile pour anticiper le coût de stockage et repérer les fichiers trop lourds : un PDF scanné à très haute résolution ralentit son ouverture par le client dans le portail.",
            rows: [
              {
                label: "Taille moyenne par fichier",
                value: documents.length
                  ? formatBytes(Math.round(totalBytes / documents.length))
                  : "—",
              },
            ],
          }}
        />
        <StatCard
          label="Catégories"
          value={String(new Set(documents.map((d) => d.category)).size)}
          hint={"Sur " + CATEGORIES.length + " possibles"}
          icon={Layers}
          index={2}
          detail={{
            what: "Le nombre de catégories de classement effectivement utilisées.",
            how: `On compte les catégories distinctes présentes parmi les documents déposés, sur les ${CATEGORIES.length} catégories prévues par le système.`,
            why: "Une catégorie jamais utilisée est souvent le signe d'un type de pièce qu'on oublie de collecter. Le filtre en dessous permet de vérifier catégorie par catégorie ce qui manque.",
            rows: categoryRows,
          }}
        />
        <StatCard
          label="Versions"
          value={String(versions)}
          hint="Historique cumulé"
          icon={FileText}
          index={3}
          detail={{
            what: "Le nombre total de versions de fichiers conservées.",
            how: "Chaque document démarre en version 1. Déposer un fichier portant le même nom incrémente sa version, et on additionne ici les numéros de version de tous les documents.",
            why: "Un document très versionné signale un dossier qui a beaucoup circulé, souvent un compromis renégocié. L'historique permet de revenir à une version antérieure en cas de litige.",
          }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {(["all", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-[0.62rem] tracking-[0.12em] uppercase transition-colors",
                category === c
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-line text-muted-foreground hover:border-gold hover:text-navy",
              )}
            >
              {c === "all" ? "Tous" : label(DOCUMENT_LABELS, c)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <label className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 size-3.5 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher…"
              className="h-10 w-44 rounded-md border border-line bg-admin-surface pl-9 pr-3 text-sm outline-none focus:border-gold sm:w-56"
            />
          </label>
          {canManage ? (
            <AdminButton onClick={() => setUploading(true)}>
              <Plus className="size-3.5" /> Importer
            </AdminButton>
          ) : null}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Aucun document"
          description="Importez des mandats, titres fonciers, compromis ou factures pour les retrouver ici."
          action={
            canManage ? (
              <AdminButton onClick={() => setUploading(true)}>
                <Upload className="size-3.5" /> Importer un fichier
              </AdminButton>
            ) : undefined
          }
        />
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-md border border-line bg-admin-surface">
          {filtered.map((doc, i) => {
            const uploader = agentsById.get(doc.uploadedById);
            return (
              <li
                key={doc.id}
                style={{ ["--i" as string]: i }}
                className="stagger-in flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-sand/40"
              >
                <button
                  type="button"
                  onClick={() => setPreview(doc)}
                  className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-sand text-gold"
                  aria-label={`Aperçu de ${doc.name}`}
                >
                  <FileText className="size-4" />
                </button>
                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => setPreview(doc)}
                    className="block max-w-full truncate text-left text-sm font-medium text-navy capitalize hover:text-gold"
                  >
                    {doc.name}
                  </button>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                    <span className="rounded-md border border-line px-1.5 py-0.5 text-[0.55rem] tracking-[0.12em] uppercase">
                      {label(DOCUMENT_LABELS, doc.category)}
                    </span>
                    <span className="tabular-nums">{formatBytes(doc.sizeBytes)}</span>
                    <span aria-hidden>·</span>
                    <span className="tabular-nums">v{doc.version}</span>
                    <span aria-hidden>·</span>
                    <span>{formatDate(doc.createdAt)}</span>
                    {uploader ? (
                      <>
                        <span aria-hidden>·</span>
                        <span>{uploader.name}</span>
                      </>
                    ) : null}
                  </p>
                </div>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Télécharger ${doc.name}`}
                  className="grid size-9 shrink-0 place-items-center rounded-md border border-line text-navy transition-colors hover:border-gold"
                >
                  <Download className="size-4" />
                </a>
                {canManage ? <DeleteDocumentButton doc={doc} /> : null}
              </li>
            );
          })}
        </ul>
      )}

      <DocumentPreviewModal doc={preview} onClose={() => setPreview(null)} />

      {uploading ? (
        <UploadModal
          clients={clients}
          properties={properties}
          onClose={() => setUploading(false)}
        />
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------- delete button */

function DeleteDocumentButton({ doc }: { doc: StoredDocument }) {
  const [confirming, setConfirming] = useState(false);
  const deleteDoc = useDeleteDocument();

  if (confirming) {
    return (
      <button
        type="button"
        onClick={() =>
          deleteDoc.mutate(doc.id, {
            onSuccess: () => setConfirming(false),
          })
        }
        className="rounded-md border border-negative/50 px-2.5 py-2 text-[0.6rem] tracking-[0.12em] text-negative uppercase transition-colors hover:bg-negative hover:text-white"
      >
        Confirmer
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      aria-label={`Supprimer ${doc.name}`}
      className="grid size-9 shrink-0 place-items-center rounded-md border border-line text-muted-foreground transition-colors hover:border-negative hover:text-negative"
    >
      <Trash2 className="size-4" />
    </button>
  );
}

/* -------------------------------------------------------------- preview modal */

function DocumentPreviewModal({
  doc,
  onClose,
}: {
  doc: StoredDocument | null;
  onClose: () => void;
}) {
  if (!doc) return null;

  return (
    <Modal open onClose={onClose} title={doc.name} size="lg">
      <div className="space-y-4">
        <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs text-muted-foreground uppercase">Catégorie</dt>
            <dd className="mt-1 font-medium text-navy">{label(DOCUMENT_LABELS, doc.category)}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground uppercase">Taille</dt>
            <dd className="mt-1 font-medium text-navy tabular-nums">
              {formatBytes(doc.sizeBytes)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground uppercase">Version</dt>
            <dd className="mt-1 font-medium text-navy tabular-nums">v{doc.version}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground uppercase">Ajouté le</dt>
            <dd className="mt-1 font-medium text-navy">{formatDate(doc.createdAt)}</dd>
          </div>
        </dl>

        <div className="flex min-h-[420px] items-center justify-center rounded-md border border-line bg-sand/50 p-6">
          {doc.mimeType === "application/pdf" && doc.url !== "#" ? (
            <iframe title={doc.name} src={doc.url} className="h-[420px] w-full" />
          ) : (
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="grid size-14 place-items-center rounded-md border border-line bg-admin-surface text-gold">
                <FileText className="size-6" />
              </span>
              <p className="text-sm text-muted-foreground">
                Aperçu non disponible pour ce type de fichier (démo : document simulé).
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

/* ---------------------------------------------------------------- upload modal */

function UploadModal({
  clients,
  properties,
  onClose,
}: {
  clients: { firstName: string; lastName: string; id: string; email?: string | undefined }[];
  properties: { title: string; reference: string; id: string }[];
  onClose: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState<DocumentCategory>("mandat");
  const [propertyId, setPropertyId] = useState("");
  const [clientId, setClientId] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const create = useCreateDocument();

  const submit = async () => {
    if (!file) return;
    await create.mutateAsync({
      name: file.name.replace(/\.(pdf|png|jpe?g|webp|docx?)$/i, ""),
      category,
      mimeType: file.type || "application/pdf",
      sizeBytes: file.size,
      url: URL.createObjectURL(file),
      propertyId: propertyId || undefined,
      clientId: clientId || undefined,
    });
    onClose();
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Importer un document"
      description="Le fichier reste en local dans cette démo ; il sera rattaché au client ou au bien choisi."
      footer={[
        <AdminButton key="cancel" variant="outline" onClick={onClose}>
          Annuler
        </AdminButton>,
        <AdminButton key="save" disabled={!file} onClick={submit}>
          <Upload className="size-3.5" /> Importer
        </AdminButton>,
      ]}
    >
      <div className="space-y-4">
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files?.[0];
            if (f) setFile(f);
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed py-10 text-center transition-colors",
            dragging ? "border-gold bg-gold/8" : "border-line hover:border-gold/60",
          )}
        >
          <Upload className={cn("size-6", file ? "text-positive" : "text-gold")} />
          {file ? (
            <>
              <p className="max-w-full truncate px-4 text-sm font-medium text-navy">{file.name}</p>
              <p className="text-xs text-muted-foreground tabular-nums">{formatBytes(file.size)}</p>
            </>
          ) : (
            <>
              <p className="text-sm text-navy">Glissez un fichier ici ou cliquez pour parcourir</p>
              <p className="text-xs text-muted-foreground">PDF, images, documents 20 Mo max</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        <SearchSelect
          label="Catégorie"
          value={category}
          onChange={(v) => setCategory(v as DocumentCategory)}
          options={CATEGORIES.map((c) => ({ value: c, label: label(DOCUMENT_LABELS, c) }))}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <SearchSelect
            label="Bien (optionnel)"
            value={propertyId}
            onChange={setPropertyId}
            clearLabel="Aucun bien"
            placeholder="Aucun bien"
            searchPlaceholder="Titre ou référence…"
            options={properties.map((p) => ({
              value: p.id,
              label: p.title,
              hint: p.reference,
            }))}
          />
          <SearchSelect
            label="Client (optionnel)"
            value={clientId}
            onChange={setClientId}
            clearLabel="Aucun client"
            placeholder="Aucun client"
            searchPlaceholder="Nom du client…"
            options={clients.map((c) => ({
              value: c.id,
              label: `${c.firstName} ${c.lastName}`,
              hint: c.email,
            }))}
          />
        </div>
      </div>
    </Modal>
  );
}
