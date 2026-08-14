import type { MetadataRoute } from "next";

const BASE = "https://carewelldentalexperts.com"; // ← set real domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
