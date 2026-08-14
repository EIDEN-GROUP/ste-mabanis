const SUPABASE_URL = "https://wmrjljbgubftsrbfoptq.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtcmpsamJndWJmdHNyYmZvcHRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjUyMzEyNiwiZXhwIjoyMTAyMDk5MTI2fQ.NtUcIXpfDWQTUcKAG0xlJBLWLceBP0e3545fodr-F1c";
const PROJECT_REF = "wmrjljbgubftsrbfoptq";

const { readFileSync } = require("node:fs");
const { join } = require("node:path");

async function runSql(sql) {
  // Use Supabase Management API
  const resp = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: sql })
  });
  const text = await resp.text();
  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status}: ${text}`);
  }
  return text;
}

const migrations = [
  "supabase/migrations/0001_schema.sql",
  "supabase/migrations/0002_rls.sql",
  "supabase/migrations/0003_content_marketing.sql"
];

for (const file of migrations) {
  const sql = readFileSync(join(process.cwd(), file), "utf8");
  console.log(`Applying ${file}...`);
  const statements = sql.split(";").map(s => s.trim()).filter(s => s.length > 0 && !s.startsWith("--"));
  for (const stmt of statements) {
    try {
      await runSql(stmt);
    } catch (e) {
      if (e.message?.includes("already exists") || e.message?.includes("duplicate")) {
        console.log(`  (skipped existing) ${stmt.slice(0, 60)}...`);
        continue;
      }
      console.error(`Failed: ${stmt.slice(0, 100)}...`);
      console.error(e);
      process.exit(1);
    }
  }
  console.log(`  ✓ ${file}`);
}

console.log("All migrations applied");