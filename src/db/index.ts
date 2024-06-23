import dotenv from "dotenv";
import mysql from "mysql2/promise";
dotenv.config();

export const connection = await mysql
	.createPool({
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT as string),
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		connectionLimit: 10,
		waitForConnections: true,
		queueLimit: 0,
		multipleStatements: true,
	})
	.getConnection();

connection.on("connection", (conn) => {
	console.info(`Connected to database '${conn.config.database}' on '${conn.config.host}:${conn.config.port}'`);
});

connection.on("acquire", function (conn) {
	console.info("Connection %d acquired", conn.threadId);
});

connection.on("release", function (conn) {
	console.info("Connection %d released", conn.threadId);
});

connection.on("release", function (conn) {
	console.info("Connection releaded");
});

connection.on("enqueue", function () {
	console.info("Waiting for available connection slot");
});

connection.on("error", function (err) {
	console.error("Error occurred:", err);
});

connection.on("end", function () {
	console.info("Connection ended");
});
export default connection;
