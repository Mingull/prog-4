import { Router } from "express";
import { userController } from "../../../controllers/user.js";
import { ensureAuthenticated } from "../../../middlewares/auth.js";
import { validateUserCreate, validateUserUpdate } from "../../../validations/user.js";

export const userRouter = Router();

userRouter.get("/", ensureAuthenticated, userController.getAll);

userRouter.post("/", validateUserCreate, userController.create);

userRouter.get("/profile", ensureAuthenticated, userController.getProfile);

userRouter.get("/:userId", ensureAuthenticated, userController.getById);

userRouter.put("/:userId", ensureAuthenticated, validateUserUpdate, userController.updateById);

userRouter.delete("/:userId", ensureAuthenticated, userController.deleteById);
