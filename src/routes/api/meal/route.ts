import { Router } from "express";
import { mealController } from "../../../controllers/meal.js";
import { ensureAuthenticated } from "../../../middlewares/auth.js";
import { validateMeal } from "../../../validations/meal.js";

export const mealRouter = Router();

mealRouter.get("/", mealController.getAll);

mealRouter.post("/", ensureAuthenticated, validateMeal, mealController.create);

mealRouter.get("/:mealId", mealController.getById);

mealRouter.put("/:mealId", ensureAuthenticated, validateMeal, mealController.updateById);

mealRouter.delete("/:mealId", ensureAuthenticated, mealController.deleteById);
