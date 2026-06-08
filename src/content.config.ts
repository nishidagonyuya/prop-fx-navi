import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string(),
    targetKeyword: z.string().optional(),
    order: z.number().optional(),
    // FAQPage 構造化データ用（記事末尾にFAQセクションも自動描画）
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    // トピッククラスター：関連ガイドの slug を関連度順に手動指定
    related: z.array(z.string()).optional(),
  }),
});

export const collections = { guides };
