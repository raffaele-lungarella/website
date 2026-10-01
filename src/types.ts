import type { CalendarDate } from "./utils/calendar-date.ts";

export type PageMetadata = {
  title: string;
  description?: string;
  canonicalURL?: string | URL;
  socialImage?: string | URL;
  type?: "website" | "article";
  robots?: "index, follow" | "noindex, nofollow";
  publicationDate?: CalendarDate;
  modificationDate?: CalendarDate;
};

export type Job = {
  year: { start: string | number; end: string | number };
  at: { name: string; link?: string };
  logo: string;
  role: string;
};
