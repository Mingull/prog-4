import type { QueryError, QueryResult } from "mysql2";
import database from "../db/index.js";
import type { User } from "../utils/types.js";

export const userService = {
	create: async (
		user: User,
		callback: ({ error, success }: { error: Error | null; success: { message: string; data: User } | null }) => void
	) => {
		try {
			const conn = await database.getConnection();
			await conn.query(
				"INSERT INTO `user` (`firstName`, `lastName`, `isActive`, `emailAdress`, `password`, `phoneNumber`, `roles`, `street`, `city`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
				[
					user.firstName,
					user.lastName,
					user.isActive ? 1 : 0,
					user.emailAddress,
					user.password || "secret",
					user.phoneNumber,
					Array.isArray(user.roles) ? user.roles.join(",") : "",
					user.street || "",
					user.city || "",
				]
			);
			const [res] = await conn.query("SELECT * from `user` WHERE `id` = LAST_INSERT_ID();");
			conn.release();
			callback({
				error: null,
				success: {
					message: `User created success.`,
					data: parseEmailAddress(res),
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

const parseEmailAddress = (res: QueryResult): User => {
	const parsedRes = Array.isArray(res) ? res[0] : res;

	return {
		id: (parsedRes as unknown as { id: number }).id,
		firstName: (parsedRes as unknown as { firstName: string }).firstName,
		lastName: (parsedRes as unknown as { lastName: string }).lastName,
		emailAddress: (parsedRes as unknown as { emailAdress: string }).emailAdress,
		isActive: (parsedRes as unknown as { isActive: number }).isActive === 1,
		password: (parsedRes as unknown as { password: string }).password,
		phoneNumber: (parsedRes as unknown as { phoneNumber: string }).phoneNumber,
		roles: (parsedRes as unknown as { roles: string }).roles.split(","),
		city: (parsedRes as unknown as { city: string }).city,
		street: (parsedRes as unknown as { street: string }).street,
	};
};
