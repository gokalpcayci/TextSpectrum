import * as z from "zod";

export const formSchema = z.object({
  sentence: z
    .string()
    .min(5, "Sentence must be at least 10 characters")
    .max(160, "Sentence is too long (max 160 characters)"),
});
