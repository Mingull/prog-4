import dotenv from "dotenv";
import express from "express";
import { router } from "./routers/users";
dotenv.config();

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
	res.json({
		status: 200,
		result: {
			message: "Hier zijn de beschikbare endpoints:",
			links: {
				users: { method: "GET", url: "https://ncpw-plug.azurewebsites.net/users" },
				create_user: { method: "POST", url: "https://ncpw-plug.azurewebsites.net/users/" },
				specific_user: { method: "GET", url: "https://ncpw-plug.azurewebsites.net/users/{id}" },
				update_user: { method: "PUT", url: "https://ncpw-plug.azurewebsites.net/users/{id}" },
				delete_user: { method: "DELETE", url: "https://ncpw-plug.azurewebsites.net/users/{id}" },
			},
		},
	});
});

app.use("/users", router);

app.listen(process.env.PORT, () => {
	console.log("Server is running on port " + process.env.PORT);
});
