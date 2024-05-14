import database from "../db/index.js";
import type { User } from "../utils/types.js";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";

export const authService = {
	login: async (
		userCredentials: User,
		callback: ({
			error,
			success,
		}: {
			error: {
				status: number;
				message: string;
				data: unknown;
			} | null;
			success: {
				status: number;
				message: string;
				data: unknown;
			} | null;
		}) => void
	) => {
		try {
			const conn = await database.getConnection();

			// 1. Kijk of deze useraccount bestaat.
			const [rows] = await conn.query(
				"SELECT `id`, `emailAdress`, `password`, `firstName`, `lastName` FROM `user` WHERE `emailAdress` = ?",
				[userCredentials.emailAddress]
			);
			conn.release();
			// 2. Er was een resultaat, check het password.
			if (
				rows &&
				Array.isArray(rows) &&
				rows.length === 1 &&
				(rows[0] as User)?.password == userCredentials.password
			) {
				// Extract the password from the userdata - we do not send that in the response.
				const { password, ...userInfo } = rows[0] as User;
				// Create an object containing the data we want in the payload.
				const payload = {
					userId: userInfo.id,
				};

				jwt.sign(payload, config.secretKey, { expiresIn: "12d" }, (err, token) => {
					callback({
						error: null,
						success: {
							status: 200,
							message: "User logged in",
							data: { ...userInfo, token },
						},
					});
				});
			} else {
				console.log("User not found or password invalid");
				callback({
					error: {
						status: 409,
						message: "User not found or password invalid",
						data: {},
					},
					success: null,
				});
			}
		} catch (err: unknown) {
			callback({
				error: {
					status: 500,
					message: "An error occurred while trying to login",
					data: {},
				},
				success: null,
			});
		}
	},
};
