import { Router } from "express";
import { blogUpdateValidationSchema, blogValidationSchema, ImageFileZodSchema, } from "./blog.validation";
import { handleZodValidation } from "../../middlewares/handleZodValidation";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middlewares/bodyParser";
import validateImageFileRequest from "../../middlewares/validateImageFileRequest";
import { BlogControllers } from "./blog.controller";


const router = Router();
router.post('/',
  // authGuard(['admin']),
  multerUpload.single('thumbnail'),
  validateImageFileRequest(ImageFileZodSchema),
  parseBody,
  handleZodValidation(blogValidationSchema),
  BlogControllers.createBlog)

router.get('/',
  BlogControllers.getAllBlogs)

router.get('/:id',
  BlogControllers.getBlogById)

router.put('/:id',
  // authGuard(['admin']),
  multerUpload.single('thumbnail'),
  validateImageFileRequest(ImageFileZodSchema),
  parseBody,
  handleZodValidation(blogUpdateValidationSchema),
  BlogControllers.updateSingleBlog)

router.delete('/:id',
  // authGuard(['admin']),
  BlogControllers.deleteBlog)


export const blogRoute = router;