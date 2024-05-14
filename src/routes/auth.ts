import { Router, type NextFunction, type Request, type Response } from "express";
import { authController } from "../controllers/auth.js";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";

export const authRouter = Router();

export function validateToken(req: Request, res: Response, next: NextFunction) {
	// The headers should contain the authorization-field with value 'Bearer [token]'
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		res.json({
			status: 401,
			message: "Authorization header missing!",
			data: {},
		});
	} else {
		// Strip the word 'Bearer ' from the headervalue
		const token = authHeader.substring(7, authHeader.length);

		jwt.verify(token, config.secretKey, (err, payload) => {
			if (err) {
				res.json({
					status: 401,
					message: "Not authorized!",
					data: {},
				});
			}
			if (payload) {
				/**
				 * User heeft toegang.
				 * BELANGRIJK! Voeg UserId uit payload toe aan request,
				 * zodat die voor ieder volgend endpoint beschikbaar is.
				 * Je hebt dan altijd toegang tot de userId van de ingelogde gebruiker.
				 */
				req.userId = (payload as unknown as { userId: string }).userId;
				next();
			}
		});
	}
}

authRouter.post("/login", authController.login);

declare global {
	namespace Express {
		interface Request {
			userId?: string;
		}
	}
}
