import { NextFunction, Request, Response } from "express";
import connection from "../db/index.js";
import { z } from "zod";

export async function validateUserCreate(req: Request, res: Response, next: NextFunction) {
	const schema = z.object({
		firstName: z.string().min(1),
		lastName: z.string().min(1),
		emailAddress: z.string().email(),
		password: z.string().min(6),
		isActive: z.boolean(),
		street: z.string().min(1),
		city: z.string().min(1),
		phoneNumber: z.string().min(10),
		roles: z.array(z.string()),
	});

	const validationResult = schema.safeParse(req.body);

	if (validationResult.success) {
		const [emailExists] = await connection.query("SELECT `id` FROM `user` WHERE `emailAddress` = ?", [
			req.body.emailAddress,
		]);

		if (Array.isArray(emailExists) && emailExists.length > 0) {
			res.json({
				status: 400,
				message: "Validation failed",
				data: { emailAddress: "Email address already in use" },
			});
			return;
		}
		next();
	} else {
		res.json({
			status: 400,
			message: "Validation failed",
			data: validationResult.error,
		});
	}
}

export async function validateUserUpdate(req: Request, res: Response, next: NextFunction) {
	const schema = z.object({
		firstName: z.string().min(1).optional(),
		lastName: z.string().min(1).optional(),
		emailAddress: z.string().email().optional(),
		password: z.string().min(6).optional(),
		isActive: z.boolean().optional(),
		street: z.string().min(1).optional(),
		city: z.string().min(1).optional(),
		phoneNumber: z.string().min(10).optional(),
		roles: z.array(z.string()).optional(),
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
