import "dotenv/config";
import express from "express";
import apiRouter from "./routes/api/route.js";

// const baseurl = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://ncpw-plug.azurewebsites.net";
export const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
	console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
	next();
});
app.get("/", (req, res) => {
	res.redirect("/api/info");
});

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
	console.info(`Server is running on port ${process.env.PORT}`);
});
