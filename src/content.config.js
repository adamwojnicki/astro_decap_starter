import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "zod";

const pages = defineCollection({
    loader: glob({ pattern: "**/*.mdoc", base: "./src/content/pages" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        slug: z.string().optional(),
    }),
});

const blog = defineCollection({
    loader: glob({ pattern: "**/*.mdoc", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        author: z.string(),
    }),
});

const menu = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/menu" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
    }),
});

export const collections = {
    pages,
    blog,
    menu,
};