import { Router } from "express";
import { handleZodValidation } from "../../middlewares/handleZodValidation";
import { skillValidationSchema } from "./skill.validation";
import { SkillControllers } from "./skill.controller";

const router = Router();
router.put('/:id',
  // authGuard(['admin']),
  handleZodValidation(skillValidationSchema),
  SkillControllers.createSkill)

router.get('/:id',
  SkillControllers.getAllSkills)

export const skillRouter = router;