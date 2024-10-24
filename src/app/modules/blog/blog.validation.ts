import { string, z } from "zod";

// Define the Zod schema
export const blogValidationSchema = z.object({
  title: z.string().nonempty("Title is required"), // non-empty string
  content: z.string().nonempty("Content is required"), // non-empty string
  description: z.string().nonempty("Description is required"), // non-empty string
  tags: z.array(z.string()).nonempty("Tags are required"), // Array of strings
  category: z.string().nonempty("Category is required"), // non-empty string
});

export const blogUpdateValidationSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
});

// image validation
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
const ACCEPTED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'png',
  'jpeg',
  'jpg',
  'webp',
] as const;

export const ImageFileZodSchema = z.object({
  file: z.object({
    fieldname: string(),
    originalname: string(),
    encoding: string(),
    mimetype: z.enum(ACCEPTED_FILE_TYPES),
    path: string(),
    size: z
      .number()
      .refine(
        (size) => size <= MAX_UPLOAD_SIZE,
        'File size must be less than 3MB'
      ),
    filename: string(),
  }).optional()
});

