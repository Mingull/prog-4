import { Post } from "./Post";
import { Role } from "./Unions";

export type User = {
	id: string;
	username: string;
	email: string;
	role: Role;
	posts: Post[];
};
