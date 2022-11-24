import { Router } from "express";
import { login, register } from "../controllers/auth";
import { xssHandlerMiddleware } from "../middleware/xss-handler";

const router = Router();

router.use(xssHandlerMiddleware);

router.post("/register", register);
router.post("/login", login);

export default router;
