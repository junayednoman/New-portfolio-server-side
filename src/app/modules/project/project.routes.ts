import { Router } from "express";
import { ImageFileZodSchema, projectUpdateValidationSchema, projectValidationSchema, } from "./project.validation";
import { handleZodValidation } from "../../middlewares/handleZodValidation";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middlewares/bodyParser";
import validateImageFileRequest from "../../middlewares/validateImageFileRequest";
import { projectControllers } from "./project.controller";

const router = Router();
router.post('/',
  // authGuard(['admin']),
  multerUpload.single('thumbnail'),
  validateImageFileRequest(ImageFileZodSchema),
  parseBody,
  handleZodValidation(projectValidationSchema),
  projectControllers.createProject)

router.get('/',
  projectControllers.getAllProjects)

router.get('/:id',
  projectControllers.getProjectById)

router.put('/:id',
  // authGuard(['admin']),
  multerUpload.single('thumbnail'),
  validateImageFileRequest(ImageFileZodSchema),
  parseBody,
  handleZodValidation(projectUpdateValidationSchema),
  projectControllers.updateSingleProject)
router.delete('/:id',
  // authGuard(['admin']),
  projectControllers.deleteProject)

export const projectRouter = router;