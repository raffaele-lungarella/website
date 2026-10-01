import type { CollectionEntry } from "astro:content";

export function isWritingVisible(post: CollectionEntry<"writings">): boolean {
  return import.meta.env.DEV || !post.data.draft;
}
