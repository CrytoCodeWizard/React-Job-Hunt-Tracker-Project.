import { Router } from "express";
import jobsController from "../controllers/jobs";

const router = Router();

router.get("/", jobsController.findAll);
router.get("/:id", jobsController.findOne);

router.delete("/:id", jobsController.remove);
router.patch("/:id", jobsController.patch);

router.post("/", jobsController.create);

export default router;
