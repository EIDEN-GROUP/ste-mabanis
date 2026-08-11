// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Same codebase, two deployment models — pick with an environment variable:
//   DEPLOY_TARGET=vercel       → nitro "vercel" preset (.vercel/output build output)
//   DEPLOY_TARGET=node-server  → nitro "node-server" preset (.output/server, runs under PM2)
// Inside the Lovable sandbox the preset is forced to cloudflare-module by the
// wrapper package; everywhere else this value is authoritative.
const deployTarget = process.env["DEPLOY_TARGET"] === "vercel" ? "vercel" : "node-server";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: { preset: deployTarget },
});
