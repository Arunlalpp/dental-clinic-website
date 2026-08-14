import type { MetadataRoute } from "next";

const BASE = "https://carewelldentalexperts.com"; // ← set real domain

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/treatments", "/doctors", "/contact"];
  const now = new Date();
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.8,
  }));
}
