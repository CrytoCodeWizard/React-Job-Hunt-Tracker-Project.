import { Router } from "express";
import jobsController from "../controllers/jobs";
import { xssHandlerMiddleware as xssHandlerMiddleware } from "../middleware/xss-handler";

const router = Router();

router.get("/", jobsController.findAll);
router.get("/:id", jobsController.findOne);

router.delete("/:id", jobsController.remove);
router.patch("/:id", xssHandlerMiddleware, jobsController.patch);

router.post("/", xssHandlerMiddleware, jobsController.create);
router.delete("/", jobsController.removeAll);

export default router;
