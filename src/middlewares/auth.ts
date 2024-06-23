import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";
import connection from "../db/index.js";

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.json({
			status: 401,
			message: "Authorization header missing!",
			data: {},
		});
	}

	try {
		const token = authHeader.substring(7, authHeader.length);

		const payload = jwt.verify(token, config.secretKey);

		if (payload) {
			// check if the user exists in the database
			// if not, return 401
			// if yes, set req.userId = payload.userId
			// and call next()
			const [userResults] = await connection.query("SELECT * FROM `user` WHERE id = ?", [
				(payload as unknown as { userId: string }).userId,
			]);
			if (!(Array.isArray(userResults) && userResults.length > 0)) {
				return res.json({
					status: 401,
					message: "Unauthorized",
					data: {},
				});
			}
			req.userId = (payload as unknown as { userId: string }).userId;
			next();
		}
	} catch (e) {
		res.json({
			status: 401,
			message: "Unauthorized",
			data: {},
		});
	}
}
