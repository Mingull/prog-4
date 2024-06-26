import { Router } from "express";
import { baseurl } from "../../utils/config.js";
import { authRouter } from "./auth/route.js";
import { mealRouter } from "./meal/route.js";
import { userRouter } from "./users/route.js";

const router = Router();

router.get("/info", (req, res) => {
	res.json({
		status: 200,
		message: "Hier zijn de beschikbare endpoints:",
		result: {
			links: {
				auth: { login: { method: "POST", url: `${baseurl}/api/auth/login` } },
				meals: {
					all: { method: "GET", url: `${baseurl}/api/meal` },
					create: { method: "POST", url: `${baseurl}/api/meal` },
					one: { method: "GET", url: `${baseurl}/api/meal/{id}` },
					update: { method: "PUT", url: `${baseurl}/api/meal/{id}` },
					delete: { method: "DELETE", url: `${baseurl}/api/meal/{id}` },
				},
				users: {
					all: { method: "GET", url: `${baseurl}/api/user` },
					create: { method: "POST", url: `${baseurl}/api/user` },
					one: { method: "GET", url: `${baseurl}/api/user/{id}` },
					update: { method: "PUT", url: `${baseurl}/api/user/{id}` },
					delete: { method: "DELETE", url: `${baseurl}/api/user/{id}` },
				},
			},
		},
	});
});

router.use("/auth", authRouter);
router.use("/meal", mealRouter);
router.use("/user", userRouter);

export default router;
