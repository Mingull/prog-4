import type { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.js";

export const authController = {
	login: (req: Request, res: Response, next: NextFunction) => {
		const userCredentials = req.body;
		console.log("login", userCredentials);
		authService.login(userCredentials, ({ error, success }) => {
			if (error) {
				return res.json({
					status: error.status,
					message: error.message,
					data: {},
				});
			}
			if (success) {
				res.json({
					status: success.status,
					message: success.message,
					data: success.data,
				});
			}
		});
	},
};
