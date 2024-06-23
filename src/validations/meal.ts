import { NextFunction, Request, Response } from "express";
import connection from "../db/index.js";
import { z } from "zod";

export async function validateMeal(req: Request, res: Response, next: NextFunction) {
	const schema = z.object({
		name: z.string().min(1),
		description: z.string().min(1),
		price: z.number().min(0),
		imageUrl: z.string().url(),
		allergenes: z.array(z.string()),
		isActive: z.boolean(),
		isVega: z.boolean(),
		isVegan: z.boolean(),
		isToTakeHome: z.boolean(),
		dateTime: z.string(),
		maxAmountOfParticipants: z.number().min(0),
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
