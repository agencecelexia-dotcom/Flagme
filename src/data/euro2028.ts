/**
 * UEFA Euro 2028 — le fil rouge du site.
 *
 * Le tournoi se joue au Royaume-Uni et en Irlande, c'est-à-dire exactement
 * là où la tradition du drapeau brodé au nom de sa ville est née. Les villes
 * hôtes servent donc aussi de suggestions de broderie.
 */

export const EURO = {
  name: "Euro 2028",
  /** Match d'ouverture au Stade national du pays de Galles, à Cardiff. */
  kickoff: "2028-06-09T00:00:00Z",
  end: "2028-07-09T00:00:00Z",
  teams: 24,
  venues: 9,
} as const;

/** Les quatre associations organisatrices. */
export const HOST_NATIONS = ["gb-eng", "gb-sct", "gb-wls", "ie"] as const;

export type HostCity = {
  city: string;
  /** Le pays hôte auquel la ville appartient, par code catalogue. */
  countryCode: string;
  stadium: string;
};

/** Les huit villes hôtes, dans l'ordre géographique nord → sud. */
export const HOST_CITIES: HostCity[] = [
  { city: "GLASGOW", countryCode: "gb-sct", stadium: "Hampden Park" },
  { city: "NEWCASTLE", countryCode: "gb-eng", stadium: "St James' Park" },
  { city: "MANCHESTER", countryCode: "gb-eng", stadium: "Manchester City Stadium" },
  { city: "LIVERPOOL", countryCode: "gb-eng", stadium: "Everton Stadium" },
  { city: "DUBLIN", countryCode: "ie", stadium: "Dublin Arena" },
  { city: "BIRMINGHAM", countryCode: "gb-eng", stadium: "Villa Park" },
  { city: "CARDIFF", countryCode: "gb-wls", stadium: "Stade national du pays de Galles" },
  { city: "LONDON", countryCode: "gb-eng", stadium: "Wembley & Tottenham Hotspur Stadium" },
];

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  started: boolean;
};

/** Temps restant avant le coup d'envoi, découpé pour l'affichage du HUD. */
export function timeToKickoff(now: Date = new Date()): Countdown {
  const delta = new Date(EURO.kickoff).getTime() - now.getTime();

  if (delta <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, started: true };
  }

  const seconds = Math.floor(delta / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    started: false,
  };
}
