import { z } from "zod";

export const skillValidationSchema = z.object({
  frontend: z.array(z.string()).nonempty("Skills are required"),
  backend: z.array(z.string()).nonempty("Skills are required"),
  id: z.string().nonempty("ID is required"),
})