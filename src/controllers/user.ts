import type { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.js";
import type { User } from "../utils/types.js";

export const userController = {
	create: (req: Request, res: Response, next: NextFunction) => {
		const user = req.body as User;
		console.info("Creating user...", user.firstName, user.lastName);
		userService.create(user, ({ error, success }) => {
			if (error) {
				console.log(error);
				return res.json({
					status: (error as unknown as { status: number }).status,
					message: error.message,
					data: {},
				});
			}
			if (success) {
				res.json({
					status: 200,
					message: success.message,
				});
			}
		});
	},
	getAll: (req: Request, res: Response, next: NextFunction) => {
		userService.getAll(({ error, success }) => {
			if (error) {
				res.json({
					status: (error as unknown as { status: number }).status,
					message: error.message,
					data: {},
				});
			}
			if (success) {
				res.status(200).json({
					status: 200,
					message: success.message,
					data: success.data,
				});
			}
		});
	},
	getProfile: (req: Request, res: Response, next: NextFunction) => {
		const userId = req.userId;
		userService.getProfile(parseInt(userId!), ({ error, success }) => {
			if (error) {
				res.json({
					status: (error as unknown as { status: number }).status,
					message: error.message,
					data: {},
				});
			}
			if (success) {
				res.status(200).json({
					status: 200,
					message: success.message,
					data: success.data,
				});
			}
		});
	},
};
