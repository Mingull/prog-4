import type { QueryError } from "mysql2";
import database from "../db/index.js";
import type { User } from "../utils/types.js";

export const userService = {
	create: async (
		user: User,
		callback: ({ error, success }: { error: Error | null; success: { message: string } | null }) => void
	) => {
		try {
			const conn = await database.getConnection();
			await conn.query(
				"INSERT INTO `user` (`firstName`, `lastName`, `isActive`, `emailAdress`, `password`, `phoneNumber`, `roles`, `street`, `city`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
				[
					user.firstName,
					user.lastName,
					user.isActive,
					user.emailAddress,
					user.password,
					user.phoneNumber,
					user.roles.map((role) => role).join(","),
					user.street,
					user.city,
				]
			);
			conn.release();
			callback({
				error: null,
				success: {
					message: `User created success.`,
				},
			});
		} catch (err: unknown) {
			callback({ error: err as Error, success: null });
		}
	},
	getAll: async (
		callback: ({
			error,
			success,
		}: {
			success: { message: string; data: unknown } | null;
			error: NodeJS.ErrnoException | null;
		}) => void
	) => {
		try {
			const conn = await database.getConnection();
			const [res] = await conn.query("SELECT id, firstName, lastName FROM `user`");
			conn.release();

			callback({
				error: null,
				success: {
					message: `Found ${(res as unknown as { length: number }).length} users.`,
					data: res,
				},
			});
		} catch (err: unknown) {
			callback({ error: err as NodeJS.ErrnoException, success: null });
		}
	},
	getProfile: async (
		userId: number,
		callback: ({
			error,
			success,
		}: {
			success: { message: string; data: unknown } | null;
			error: NodeJS.ErrnoException | null;
		}) => void
	) => {
		try {
			console.info("getProfile userId:", userId);

			const conn = await database.getConnection();

			const [res] = await conn.query("SELECT id, firstName, lastName FROM `user` WHERE id = ?", [userId]);
			conn.release();

			callback({
				error: null,
				success: {
					message: `Found ${(res as unknown as { length: number }).length} user.`,
					data: res,
				},
			});
		} catch (err) {
			callback({ error: err as NodeJS.ErrnoException, success: null });
		}
	},
};
