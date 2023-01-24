import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => (typeof val === "string" && !val.includes(":")) ? new Date(`${val} 00:00:00`) : new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str.includes(":") ? str : `${ str } 00:00:00`) : undefined)),
		heroImage: z.string().optional(),
	}),
});

export const collections = { blog };
