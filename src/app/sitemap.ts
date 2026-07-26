import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Pages publiques du site, par ordre d'importance décroissante. */
const ROUTES = [
  { path: "", priority: 1 },
  { path: "/configurateur", priority: 0.9 },
  { path: "/nations", priority: 0.8 },
  { path: "/euro-2028", priority: 0.8 },
  { path: "/formats", priority: 0.7 },
  { path: "/qualite", priority: 0.7 },
  { path: "/manifeste", priority: 0.5 },
  { path: "/faq", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
