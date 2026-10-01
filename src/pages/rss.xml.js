import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts.ts";
import { calendarDateToDate } from "../utils/calendar-date.ts";
import { isWritingVisible } from "../utils/writings.ts";

export async function GET(context) {
  const posts = (await getCollection("writings"))
    .filter(isWritingVisible)
    .sort((a, b) => b.data.pubDate.localeCompare(a.data.pubDate));

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: calendarDateToDate(post.data.pubDate),
      link: `/writings/${post.id}/`,
    })),
  });
}
