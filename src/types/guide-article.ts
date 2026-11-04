import { z } from "zod";

export const articleBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("paragraph"), text: z.string() }),
  z.object({ type: z.literal("heading"), level: z.union([z.literal(2), z.literal(3)]), text: z.string() }),
  z.object({ type: z.literal("quote"), text: z.string() }),
  z.object({ type: z.literal("list"), ordered: z.boolean(), items: z.array(z.string()) }),
]);

export const guideArticleSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  category: z.string().min(1),
  readingTime: z.number().int().positive(),
  blocks: z.array(articleBlockSchema),
  related: z.array(z.string()),
  image: z.string().min(1),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
});

export type ArticleBlock = z.infer<typeof articleBlockSchema>;
export type GuideArticle = z.infer<typeof guideArticleSchema>;
