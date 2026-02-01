import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "zod";

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog/" }),
    schema: z.object({
        title: z.string().min(5),
        description: z.string().min(10),
        date: z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        }),
        author: z.string(),
        tags: z.array(z.string()).optional(),
    }),
});

const menu = defineCollection({
    loader: file("./src/content/restaurant-menu/restaurant-menu.json"),
    schema: z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        price: z.number(),
    }),
});

export const collections = {
    blog,
    menu,
};