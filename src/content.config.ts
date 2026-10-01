import { type CollectionEntry, defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { isCalendarDate } from "./utils/calendar-date.ts";

const calendarDate = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.string().refine(isCalendarDate, {
    message: "Expected a valid calendar date in YYYY-MM-DD format",
  }),
);

const writings = defineCollection({
  loader: glob({ base: "./src/content/writings", pattern: "**/*.{md,mdx}" }),
  schema: () =>
    z
      .object({
        title: z.string(),
        description: z.string().min(1),
        pubDate: calendarDate,
        updatedDate: calendarDate.optional(),
        draft: z.boolean().default(false),
      })
      .superRefine(({ pubDate, updatedDate }, context) => {
        if (updatedDate && updatedDate < pubDate) {
          context.addIssue({
            code: "custom",
            path: ["updatedDate"],
            message: "updatedDate must not be earlier than pubDate",
          });
        }
      }),
});

export const collections = { writings };

export type WritingPost = CollectionEntry<"writings">["data"];
