import { Router } from "express";
import { authControllers } from "./auth.controller";
import { UserLoginValidationSchema } from "./auth.validation";
import { handleZodValidation } from "../../middlewares/handleZodValidation";

const router = Router()
router.post('/login',
    handleZodValidation(UserLoginValidationSchema),
    authControllers.loginUser)



export const authRouter = router