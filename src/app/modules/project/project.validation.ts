import { array, object, string, z } from "zod";
export const projectValidationSchema = object({
  title: string({ required_error: "Title is required" }),
  description: string({ required_error: "Description is required" }),
  techs: array(string({ required_error: "Techs are required" })),
  github_client: string({ required_error: "github_client is required" }),
  github_server: string({ required_error: "github_server is required" }),
  url: string({ required_error: "URL is required" }),
})
export const projectUpdateValidationSchema = object({
  title: string({ required_error: "Title is required" }).optional(),
  description: string({ required_error: "Description is required" }).optional(),
  techs: array(string({ required_error: "Techs are required" })).optional(),
  github_client: string({ required_error: "github_client is required" }).optional(),
  github_server: string({ required_error: "github_server is required" }).optional(),
  url: string({ required_error: "URL is required" }).optional(),
})


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

export const voteValidationSchema = z.object({
  postId: z.string({ required_error: 'Post ID is required' }),
  userId: z.string({ required_error: 'User ID is required' }),
  voteType: z.enum(['up', 'down'], { required_error: 'Vote type is required' })
})

export const updatePostPublishStatus = z.object({
  isPublished: z.boolean({ required_error: 'Publish status is required' })
})