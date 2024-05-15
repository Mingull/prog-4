import { Router, type NextFunction, type Request, type Response } from "express";
import { userController } from "../controllers/user.js";
import type { User } from "../utils/types.js";
import { validateToken } from "./auth.js";

export const userRouter = Router();

userRouter.get("/", userController.getAll);

userRouter.post("/", validateUserCreate, userController.create);

userRouter.get("/profile", validateToken, userController.getProfile);

userRouter.put("/:userId", validateToken);

// userRouter.delete("/:userId", async (req, res) => {
// 	database.delete(Number.parseInt(req.params.userId), ({ data, err }) => {
// 		if (data) {
// 			res.json({ status: 200, result: data });
// 		} else {
// 			res.json({ status: 404, error: err });
// 		}
// 	});
// });

function validateUserCreate(req: Request, res: Response, next: NextFunction) {
	const user = req.body as User;
	if (!user) {
		res.status(400).json({ status: 400, message: "No user data provided", data: {} });
		return;
	}
	if (!user.firstName) {
		res.status(400).json({ status: 400, message: "Missing or incorrect firstName field", data: {} });
		return;
	}
	if (!user.lastName) {
		res.status(400).json({ status: 400, message: "Missing or incorrect lastName field", data: {} });
		return;
	}
	if (!user.emailAddress || !user.emailAddress.includes("@")) {
		res.status(400).json({ status: 400, message: "Missing or incorrect emailAddress field", data: {} });
		return;
	}

	next();
}
