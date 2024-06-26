import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import type { User } from "../utils/types.js";
import connection from "../db/index.js";

export const userController = {
	create: async (req: Request, res: Response, next: NextFunction) => {
		const user = req.body as User;
		try {
			const hashedPassword = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
			await connection.query(
				"INSERT INTO `user` (`firstName`, `lastName`, `isActive`, `emailAddress`, `password`, `phoneNumber`, `roles`, `street`, `city`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
				[
					user.firstName,
					user.lastName,
					user.isActive ? 1 : 0,
					user.emailAddress,
					hashedPassword,
					user.phoneNumber,
					user.roles.join(","),
					user.street || "",
					user.city || "",
				]
			);
			const [results] = await connection.query("SELECT * from `user` WHERE `id` = LAST_INSERT_ID()");

			if (Array.isArray(results) && results.length > 0) {
				const { password, ...userInfo } = results[0] as User;
				res.json({
					status: 200,
					message: `User created success.`,
					data: userInfo,
				});
			} else {
				res.json({
					error: { status: 500, message: "An error occurred while trying to create a user" },
					success: null,
				});
			}
		} catch (err: unknown) {
			res.json({
				status: (err as unknown as { status: number }).status,
				message: (err as Error).message,
				data: {},
			});
		} finally {
			connection.release();
		}
	},
	getAll: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const [results] = await connection.query("SELECT * FROM `user`");
			res.status(200).json({
				status: 200,
				message: `Found ${(results as unknown as { length: number }).length} users.`,
				data: (results as unknown as User[]).map((user) => {
					const { password, ...userInfo } = user;
					return userInfo;
				}),
			});
		} catch (err) {
			res.json({
				status: (err as unknown as { status: number }).status,
				message: (err as Error).message,
				data: {},
			});
		} finally {
			connection.release();
		}
	},
	getById: async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.userId;
		try {
			const [userResults] = await connection.query("SELECT * FROM `user` WHERE id = ?", [userId]);

			if (Array.isArray(userResults) && userResults.length > 0) {
				const { password, ...userInfo } = userResults[0] as User;

				// get all meals from user with cookId = userId (profile) from today and future
				const [mealsResults] = await connection.query(
					"SELECT * FROM `meal` WHERE `cookId` = ? AND `dateTime` >= CURDATE()",
					[userId]
				);

				res.json({
					status: 200,
					message: `Found user info and meals from user with id ${userId}`,
					data: { user: userInfo, maaltijden: mealsResults },
				});
			} else {
				res.json({ status: 404, message: "User not found", data: null });
			}
		} catch (err) {
			res.json({
				status: (err as unknown as { status: number }).status,
				message: (err as Error).message,
				data: {},
			});
		} finally {
			connection.release();
		}
	},
	getProfile: async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.userId;
		try {
			const [userResults] = await connection.query("SELECT * FROM `user` WHERE id = ?", [userId]);

			if (Array.isArray(userResults) && userResults.length > 0) {
				const { password, ...userInfo } = userResults[0] as User;

				// get all meals from user with cookId = userId (profile) from today and future
				const [mealsResults] = await connection.query(
					"SELECT * FROM `meal` WHERE `cookId` = ? AND `dateTime` >= CURDATE()",
					[userId]
				);

				res.json({
					status: 200,
					message: `Found user profile.`,
					data: { profile: userInfo, maaltijden: mealsResults },
				});
			} else {
				res.json({ status: 404, message: "User not found", data: null });
			}
		} catch (err) {
			res.json({
				status: (err as unknown as { status: number }).status,
				message: (err as Error).message,
				data: {},
			});
		} finally {
			connection.release();
		}
	},
	updateById: async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.userId;
		const user = req.body as User;
		try {
			await connection.query(
				"UPDATE `user` SET `firstName` = ?, `lastName` = ?, `isActive` = ?, `emailAddress` = ?, `password` = ?, `phoneNumber` = ?, `roles` = ?, `street` = ?, `city` = ? WHERE `id` = ?",
				[
					user.firstName,
					user.lastName,
					user.isActive ? 1 : 0,
					user.emailAddress,
					await bcrypt.hash(user.password, await bcrypt.genSalt(10)),
					user.phoneNumber,
					user.roles.join(","),
					user.street || "",
					user.city || "",
					userId,
				]
			);

			const [results] = await connection.query("SELECT * from `user` WHERE `id` = ?", [userId]);

			if (Array.isArray(results) && results.length > 0) {
				const { password, ...userInfo } = results[0] as User;
				res.json({
					status: 200,
					message: `User updated success.`,
					data: userInfo,
				});
			} else {
				res.json({
					error: { status: 404, message: "User not found" },
					success: null,
				});
			}
		} catch (err) {
			res.json({
				status: (err as unknown as { status: number }).status,
				message: (err as Error).message,
				data: {},
			});
		} finally {
			connection.release();
		}
	},
	deleteById: async (req: Request, res: Response, next: NextFunction) => {
		if (!req.params.userId) throw new Error("No userId provided in request params");

		const userId = parseInt(req.params.userId);
		const requestUserId = parseInt(req.userId!);
		console.log({ userId, requestUserId });
		try {
			if (userId !== requestUserId) throw { status: 403, message: "You are not allowed to delete this user" };

			const [deleteUserResults] = await connection.query("SELECT * FROM `user` WHERE id = ?", [userId]);

			if (Array.isArray(deleteUserResults) && deleteUserResults.length > 0) {
				// await connection.query("UPDATE `user` SET `isActive` = 0 WHERE `id` = ?", [userId]);
				await connection.query("DELETE FROM `user` WHERE `id` = ?", [userId]);
				res.json({
					status: 200,
					message: `User deleted success.`,
					data: {},
				});
			} else {
				res.json({
					error: { status: 404, message: "User to delete not found" },
					success: null,
				});
			}
		} catch (err) {
			res.json({
				status: (err as unknown as { status: number }).status,
				message: (err as Error).message,
				data: {},
			});
		} finally {
			connection.release();
		}
	},
};
