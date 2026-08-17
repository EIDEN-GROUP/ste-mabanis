/**
 * Supabase database schema types — hand-maintained mirror of the migrations in
 * supabase/migrations (0001, 0002, 0003). Once a live project exists, regenerate
 * the authoritative version with:
 *
 *   npx supabase gen types typescript --project-id <ref> > src/server/db/types.ts
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type StaffRole = "agent" | "manager" | "admin" | "directrice" | "commercial" | "assistant";
export type PropertyStatus =
  "draft" | "available" | "reserved" | "under_offer" | "sold" | "rented" | "archived";
export type TransactionKind = "vente" | "location";
export type MediaKind = "photo" | "floor_plan" | "video";
export type ClientRole = "buyer" | "seller" | "tenant" | "landlord" | "investor";
export type LeadTemperature = "cold" | "warm" | "hot";
export type LeadSource =
  "site_web" | "recommandation" | "portail" | "reseaux_sociaux" | "telephone" | "walk_in";
export type PipelineStage =
  "new" | "contacted" | "qualified" | "viewing" | "offer" | "negotiation" | "won" | "lost";
export type ActivityKind =
  "note" | "call" | "email" | "whatsapp" | "viewing" | "offer" | "stage_change" | "document";
export type AppointmentKind = "viewing" | "valuation" | "signature" | "call" | "meeting";
export type AppointmentStatus = "scheduled" | "confirmed" | "done" | "cancelled" | "no_show";
export type DocumentCategory =
  "mandat" | "titre_foncier" | "compromis" | "contrat" | "facture" | "diagnostic" | "autre";
export type TaskPriority = "low" | "normal" | "high" | "urgent";
export type TaskStatus = "todo" | "doing" | "done";
export type TaskEntity = "property" | "client" | "lead" | "appointment";
export type TransactionStage =
  "interest" | "visit" | "offer" | "negotiation" | "agreement" | "contract" | "payment" | "closing";
export type NotificationKind = "lead" | "appointment" | "task" | "transaction" | "system";
export type CampaignChannel = "email" | "whatsapp" | "portail" | "reseaux_sociaux";
export type CampaignStatus = "draft" | "scheduled" | "sent";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          role: string;
          staff_role: StaffRole;
          email: string;
          password_hash: string | null;
          avatar_url: string | null;
          created_at: string;
          slug: string | null;
          phone: string | null;
          initials: string | null;
          expertise: string | null;
          bio: string | null;
          languages: string[] | null;
          years: number | null;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
        Relationships: [];
      };
      properties: {
        Row: {
          id: string;
          reference: string;
          slug: string;
          title: string;
          status: PropertyStatus;
          transaction: TransactionKind;
          type: string;
          city: string;
          neighborhood: string;
          price: number;
          surface: number;
          bedrooms: number;
          bathrooms: number;
          description: string;
          features: string[];
          agent_id: string | null;
          owner_client_id: string | null;
          sold_at: string | null;
          views_30d: number;
          lead_count: number;
          created_at: string;
          updated_at: string;
          year: number | null;
          land_surface: number | null;
          price_note: string | null;
          map_query: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["properties"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["properties"]["Row"]>;
        Relationships: [];
      };
      property_media: {
        Row: {
          id: string;
          property_id: string;
          kind: MediaKind;
          url: string;
          label: string | null;
          position: number;
          is_cover: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["property_media"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["property_media"]["Row"]>;
        Relationships: [];
      };
      clients: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          roles: ClientRole[];
          temperature: LeadTemperature;
          score: number;
          source: LeadSource;
          city: string | null;
          budget_min: number | null;
          budget_max: number | null;
          notes: string | null;
          agent_id: string | null;
          created_at: string;
          last_contacted_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["clients"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["clients"]["Row"]>;
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          client_id: string;
          property_id: string | null;
          stage: PipelineStage;
          temperature: LeadTemperature;
          score: number;
          source: LeadSource;
          value: number;
          agent_id: string | null;
          next_action: string | null;
          next_action_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["leads"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["leads"]["Row"]>;
        Relationships: [];
      };
      activities: {
        Row: {
          id: string;
          kind: ActivityKind;
          subject: string;
          body: string | null;
          client_id: string | null;
          property_id: string | null;
          lead_id: string | null;
          agent_id: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["activities"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["activities"]["Row"]>;
        Relationships: [];
      };
      appointments: {
        Row: {
          id: string;
          kind: AppointmentKind;
          status: AppointmentStatus;
          title: string;
          starts_at: string;
          ends_at: string;
          property_id: string | null;
          client_id: string | null;
          agent_id: string | null;
          location: string | null;
          report_interest: number | null;
          report_outcome: string | null;
          report_next_action: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["appointments"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["appointments"]["Row"]>;
        Relationships: [];
      };
      documents: {
        Row: {
          id: string;
          name: string;
          category: DocumentCategory;
          mime_type: string;
          size_bytes: number;
          version: number;
          storage_path: string;
          property_id: string | null;
          client_id: string | null;
          transaction_id: string | null;
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["documents"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["documents"]["Row"]>;
        Relationships: [];
      };
      tasks: {
        Row: {
          id: string;
          title: string;
          status: TaskStatus;
          priority: TaskPriority;
          due_at: string | null;
          assignee_id: string | null;
          entity_kind: TaskEntity | null;
          entity_id: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["tasks"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["tasks"]["Row"]>;
        Relationships: [];
      };
      transactions: {
        Row: {
          id: string;
          reference: string;
          stage: TransactionStage;
          property_id: string;
          buyer_client_id: string | null;
          seller_client_id: string | null;
          agent_id: string | null;
          amount: number;
          commission: number;
          opened_at: string;
          closed_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["transactions"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["transactions"]["Row"]>;
        Relationships: [];
      };
      payments: {
        Row: {
          id: string;
          transaction_id: string;
          label: string;
          amount: number;
          due_at: string;
          paid_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["payments"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["payments"]["Row"]>;
        Relationships: [];
      };
      notifications: {
        Row: {
          id: string;
          recipient_id: string | null;
          kind: NotificationKind;
          title: string;
          body: string;
          href: string | null;
          read: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["notifications"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["notifications"]["Row"]>;
        Relationships: [];
      };
      articles: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: string;
          date: string;
          read_time: number;
          excerpt: string;
          image: string | null;
          body: string;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["articles"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["articles"]["Row"]>;
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          role: string;
          quote: string;
          location: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["testimonials"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Row"]>;
        Relationships: [];
      };
      locations: {
        Row: {
          id: string;
          slug: string;
          name: string;
          city: string;
          image: string | null;
          intro: string;
          editorial: string;
          lifestyle: string;
          investment: string;
          price_range: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["locations"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["locations"]["Row"]>;
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string;
          points: string[];
          sort_order: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["services"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["services"]["Row"]>;
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
        Relationships: [];
      };
      marketing_campaigns: {
        Row: {
          id: string;
          name: string;
          subject: string;
          channel: CampaignChannel;
          status: CampaignStatus;
          audience: string;
          audience_count: number;
          sent_at: string | null;
          opens: number;
          clicks: number;
          conversions: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["marketing_campaigns"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["marketing_campaigns"]["Row"]>;
        Relationships: [];
      };
      featured_properties: {
        Row: {
          property_id: string;
          since: string;
          until: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["featured_properties"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["featured_properties"]["Row"]>;
        Relationships: [];
      };
      automation_rules: {
        Row: {
          key: string;
          enabled: boolean;
          runs: number;
          last_run: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["automation_rules"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["automation_rules"]["Row"]>;
        Relationships: [];
      };
      automation_runs: {
        Row: {
          id: string;
          rule: string;
          title: string;
          detail: string;
          at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["automation_runs"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["automation_runs"]["Row"]>;
        Relationships: [];
      };
      match_sends: {
        Row: {
          id: string;
          client_id: string;
          property_ids: string[];
          sent_by: string | null;
          sent_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["match_sends"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["match_sends"]["Row"]>;
        Relationships: [];
      };
      page_views: {
        Row: {
          id: string;
          path: string;
          viewed_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["page_views"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["page_views"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      property_status: PropertyStatus;
      transaction_kind: TransactionKind;
      media_kind: MediaKind;
      client_role: ClientRole;
      lead_temperature: LeadTemperature;
      lead_source: LeadSource;
      pipeline_stage: PipelineStage;
      activity_kind: ActivityKind;
      appointment_kind: AppointmentKind;
      appointment_status: AppointmentStatus;
      document_category: DocumentCategory;
      task_priority: TaskPriority;
      task_status: TaskStatus;
      task_entity: TaskEntity;
      transaction_stage: TransactionStage;
      notification_kind: NotificationKind;
      staff_role: StaffRole;
      campaign_channel: CampaignChannel;
      campaign_status: CampaignStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
