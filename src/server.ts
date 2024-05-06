import dotenv from "dotenv";
import express from "express";
import { fetchPosts } from "./functions.ts";
import { router } from "./routers/users.ts";
import { database } from "./db/index.ts";
dotenv.config();

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
	res.json({ status: 200, result: "Hello World" });
});

app.use("/users", router);

app.listen(process.env.PORT, () => {
	console.log("Server is running on port " + process.env.PORT);
});
