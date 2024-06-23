import { Router, type NextFunction, type Request, type Response } from "express";
import { z } from "zod";
import { authController } from "../../../controllers/auth.js";

export const authRouter = Router();

authRouter.post("/login", validateUserLogin, authController.login);

function validateUserLogin(req: Request, res: Response, next: NextFunction) {
	const schema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	const validationResult = schema.safeParse(req.body);

	if (validationResult.success) {
		next();
	} else {
		res.json({
			status: 400,
			message: "Validation failed",
			data: validationResult.error,
		});
	}
}

declare global {
	namespace Express {
		interface Request {
			userId?: string;
		}
	}
}
