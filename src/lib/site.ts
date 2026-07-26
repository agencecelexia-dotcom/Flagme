/**
 * Adresse publique du site, utilisée par le sitemap, robots.txt et les
 * métadonnées de partage. À remplacer par le domaine réel via
 * NEXT_PUBLIC_SITE_URL au déploiement.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://flagme.fr";
