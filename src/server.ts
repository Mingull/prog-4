import dotenv from "dotenv";
import express from "express";
import { authRouter, userRouter } from "./routes/index.js";
dotenv.config();

const baseurl = (process.env.NODE_ENV = "development"
	? "http://localhost:3000"
	: "https://ncpw-plug.azurewebsites.net");
export const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/api/info", (req, res) => {
	res.json({
		status: 200,
		result: {
			message: "Hier zijn de beschikbare endpoints:",
			links: {
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

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
	console.info(`Server is running on port ${process.env.PORT}`);
});
