import { Client } from "pg";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const password = "Ste-mabanis@2026!";
const ref = "wmrjljbgubftsrbfoptq";

// Try pooler with different regions
const regions = ["us-east-1", "eu-west-1", "ap-southeast-1", "us-west-2"];

async function tryConnect(host: string) {
  const connStr = `postgresql://postgres.${ref}:${password}@${host}:6543/postgres`;
  const client = new Client({ connectionString: connStr, ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 10000 });
  try {
    await client.connect();
    console.log(`Connected via ${host}`);
    return client;
  } catch (e) {
    console.log(`Failed ${host}: ${e instanceof Error ? e.message : String(e)}`);
    return null;
  }
}

let client: any = null;
for (const region of regions) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  client = await tryConnect(host);
  if (client) break;
}

if (!client) {
  console.error("All pooler hosts failed. Trying direct...");
  // Fallback to direct (might need project on new infrastructure)
  const directConn = `postgresql://postgres:${password}@db.${ref}.supabase.co:5432/postgres`;
  const directClient = new Client({ connectionString: directConn, ssl: { rejectUnauthorized: false } });
  try {
    await directClient.connect();
    client = directClient;
    console.log("Connected via direct");
  } catch (e) {
    console.error(`Direct failed: ${e instanceof Error ? e.message : String(e)}`);
    process.exit(1);
  }
}

console.log("Connected!");

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
      await client.query(stmt);
    } catch (e: any) {
      if (e.code === "42710" || e.message?.includes("already exists")) {
        console.log(`  (skipped existing) ${stmt.slice(0, 60)}...`);
        continue;
      }
      console.error(`Failed: ${stmt.slice(0, 100)}...`);
      console.error(e);
      await client.end();
      process.exit(1);
    }
  }
  console.log(`  ✓ ${file}`);
}

await client.end();
console.log("All migrations applied");