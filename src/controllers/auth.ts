import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import connection from "../db/index.js";
import config from "../utils/config.js";
import { User } from "../utils/types.js";

export const authController = {
	login: async (req: Request, res: Response, next: NextFunction) => {
		const userCredentials = req.body;
		console.log("login", userCredentials);
		try {
			await connection.connect();
			const [rows] = await connection.query("SELECT * FROM `user` WHERE `emailAddress` = ?", [
				userCredentials.email,
			]);

			if (!Array.isArray(rows) || rows.length === 0) {
				res.json({
					error: {
						status: 409,
						message: "User not found",
						data: {},
					},
					success: null,
				});
				return;
			}

			const passwordMatch = await bcrypt.compare(userCredentials.password, (rows[0] as User)?.password);
			if (!passwordMatch) {
				res.json({
					error: {
						status: 409,
						message: "Password invalid",
						data: {},
					},
					success: null,
				});
				return;
			}

			const { password, ...userInfo } = rows[0] as User;
			const payload = {
				userId: userInfo.id,
			};

			const token = jwt.sign(payload, config.secretKey, { expiresIn: "12d" });

			res.json({
				status: 200,
				message: "User logged in",
				data: { ...userInfo, token },
			});
		} catch (err: unknown) {
			console.log(err);

			res.json({
				error: {
					status: 500,
					message: "An error occurred while trying to login",
					data: {},
				},
				success: null,
			});
		} finally {
			connection.release();
		}
	},
};
