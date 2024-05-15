export type User = {
	id: number;
	firstName: string;
	lastName: string;
	emailAddress: string;
	password: string;
	isActive: boolean;
	street: string;
	city: string;
	phoneNumber: string;
	roles: string[];
};
export type InsertUser = Omit<Partial<User>, "id">;
