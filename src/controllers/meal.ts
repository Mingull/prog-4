import { NextFunction, Request, Response } from "express";
import connection from "../db/index.js";

export const mealController = {
	create: async (req: Request, res: Response, next: NextFunction) => {
		const meal = req.body;
		try {
			await connection.query(
				"INSERT INTO `meal` (`name`, `description`, `cookId`, `price`, `imageUrl`, `allergenes`, `isActive`, `isVega`, `isVegan`, `isToTakeHome`, `dateTime`, `maxAmountOfParticipants`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",

				[
					meal.name,
					meal.description,
					req.userId,
					meal.price,
					meal.imageUrl,
					meal.allergenes.join(","),
					meal.isActive ? 1 : 0,
					meal.isVega ? 1 : 0,
					meal.isVegan ? 1 : 0,
					meal.isToTakeHome ? 1 : 0,
					new Date(meal.dateTime),
					meal.maxAmountOfParticipants,
				]
			);
			const [results] = await connection.query("SELECT * from `meal` WHERE `id` = LAST_INSERT_ID()");

			if (Array.isArray(results) && results.length > 0) {
				res.json({
					status: 200,
					message: `Meal created success.`,
					data: results[0],
				});
			} else {
				res.json({
					error: { status: 500, message: "An error occurred while trying to create a meal" },
					success: null,
				});
			}
		} catch (err) {
			console.log(err);
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
			const [results] = await connection.query("SELECT * FROM `meal`");
			res.status(200).json({
				status: 200,
				message: `Found ${(results as unknown as { length: number }).length} meals.`,
				data: results,
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
		const mealId = req.params.mealId;
		try {
			const [mealResults] = await connection.query("SELECT * FROM `meal` WHERE id = ?", [mealId]);

			if (Array.isArray(mealResults) && mealResults.length > 0) {
				res.json({
					status: 200,
					message: `Found meal with id ${mealId}.`,
					data: mealResults[0],
				});
			} else {
				res.json({
					status: 404,
					message: "Meal not found.",
					data: {},
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
	updateById: async (req: Request, res: Response, next: NextFunction) => {
		if (!req.params.mealId) throw new Error("No mealId provided in request params");
		const meal = req.body;
		const mealId = req.params.mealId;
		try {
			await connection.query(
				"UPDATE `meal` SET `name` = ?, `description` = ?, `price` = ?, `imageUrl` = ?, `allergenes` = ?, `isActive` = ?, `isVega` = ?, `isVegan` = ?, `isToTakeHome` = ?, `dateTime` = ?, `maxAmountOfParticipants` = ? WHERE `id` = ?",
				[
					meal.name,
					meal.description,
					meal.price,
					meal.imageUrl,
					meal.allergenes.join(","),
					meal.isActive ? 1 : 0,
					meal.isVega ? 1 : 0,
					meal.isVegan ? 1 : 0,
					meal.isToTakeHome ? 1 : 0,
					new Date(meal.dateTime),
					meal.maxAmountOfParticipants,
					mealId,
				]
			);
			const [results] = await connection.query("SELECT * from `meal` WHERE `id` = ?", [mealId]);

			if (Array.isArray(results) && results.length > 0) {
				res.json({
					status: 200,
					message: `Meal updated success.`,
					data: results[0],
				});
			} else {
				res.json({
					status: 500,
					message: "An error occurred while trying to update a meal",
					data: {},
				});
			}
		} catch (err) {
			console.log(err);
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
		if (!req.params.mealId) throw new Error("No mealId provided in request params");

		const mealId = req.params.mealId;
		try {
			const [deleteMealResults] = await connection.query("SELECT * FROM `meal` WHERE id = ?", [mealId]);

			if (Array.isArray(deleteMealResults) && deleteMealResults.length > 0) {
				await connection.query("DELETE FROM `meal` WHERE `id` = ?", [mealId]);
				res.json({
					status: 200,
					message: `Meal deleted success.`,
					data: {},
				});
			} else {
				res.json({
					error: { status: 404, message: "Meal to delete not found" },
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
