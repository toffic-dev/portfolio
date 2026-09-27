import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Every page is prerendered at build time. The single request-time route is
   * `/api/contact`, which cannot be cached because a submitted message is
   * request-scoped — it is the one `(Dynamic)` entry in the build output.
   */
  reactStrictMode: true,

  /*
   * Pins Turbopack's root to this folder. Without it, a lockfile in a parent
   * directory makes Next.js guess a wider root and print a warning.
   */
  turbopack: {
    root: process.cwd(),
  },

  /*
   * Dev-only. Next blocks cross-origin requests to its dev assets and endpoints
   * (`/_next/hmr`, `/_next/static/*`, RSC payloads) unless the requesting
   * hostname is listed here, which is what the "Blocked cross-origin request"
   * warning reports. `localhost` and the hostname the server was started with
   * are always allowed; anything else needs an entry — in practice this
   * machine's LAN address, so another device (a phone on the same Wi-Fi) can
   * open the site while `npm run dev` is running.
   *
   * Hostnames only: no scheme, no port, no path. Portable across networks? Add a
   * wildcard octet instead — "192.168.100.*" matches any last octet, and
   * "*.example.com" / "**.example.com" cover one or more subdomain labels.
   *
   * `next build` and `next start` ignore this entirely, so production is
   * unaffected by what is listed here.
   */
  allowedDevOrigins: ["192.168.100.4"],
};

export default nextConfig;