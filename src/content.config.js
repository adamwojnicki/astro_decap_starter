import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const blog = defineCollection({
    name: "blog",
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog/" }),
    schema: z.object({
        title: z.string().min(5),
        description: z.string().min(10),
        date: z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        }),
        tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
    blog,
};