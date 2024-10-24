import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes";
import { blogRoute } from "../modules/blog/blog.routes";
import { projectRouter } from "../modules/project/project.routes";
import { skillRouter } from "../modules/skill/skill.routes";
const router = Router()
const apiRoutes = [
    { path: '/auth', route: authRouter },
    { path: '/projects', route: projectRouter },
    { path: '/blogs', route: blogRoute },
    { path: '/skills', route: skillRouter },
]

apiRoutes.forEach(route => (
    router.use(route.path, route.route)
))

export default router