import dotenv from "dotenv";
import mysql from "mysql2/promise";
dotenv.config();

export const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	connectionLimit: 10,
	waitForConnections: true,
	queueLimit: 0,
	multipleStatements: true,
});

pool.on("connection", (conn) => {
	console.info(`Connected to database '${conn.config.database}' on '${conn.config.host}:${conn.config.port}'`);
});

pool.on("acquire", function (conn) {
	console.info("Connection %d acquired", conn.threadId);
});

pool.on("release", function (conn) {
	console.info("Connection %d released", conn.threadId);
});
export default pool;
