import fs from "fs";
import { Comment, Post, User } from "./types";

export const fetchUsers = async () => {
	const users = JSON.parse(fs.readFileSync("./src/db/users.json", "utf-8")) as User[];
	const posts = JSON.parse(fs.readFileSync("./src/db/posts.json", "utf-8")) as Post[];
	const comments = JSON.parse(fs.readFileSync("./src/db/comments.json", "utf-8")) as Comment[];

	const results = users.map((user) => {
		const userPosts = posts
			.map((post) => {
				const postComments = comments.filter((comment) => comment.postId === post.id);
				return {
					...post,
					comments: postComments.map((comment) => ({ id: comment.id, content: comment.content })),
				};
			})
			.filter((post) => post.authorId === user.id);
		return { ...user, posts: userPosts };
	});

	return results;
};

export const fetchUser = async (userId: string) => {
	const users = JSON.parse(fs.readFileSync("./src/db/users.json", "utf-8")) as User[];
	const posts = JSON.parse(fs.readFileSync("./src/db/posts.json", "utf-8")) as Post[];
	const comments = JSON.parse(fs.readFileSync("./src/db/comments.json", "utf-8")) as Comment[];

	const user = users.find((user) => user.id === userId);

	if (!user) return null;

	const results = {
		...user,
		posts: posts.filter((post) => post.authorId === userId),
		comments: comments.filter((comment) => comment.authorId === userId),
	};

	return results;
};

export const fetchPosts = async () => {
	const posts = JSON.parse(fs.readFileSync("./src/db/posts.json", "utf-8")) as Post[];
	const comments = JSON.parse(fs.readFileSync("./src/db/comments.json", "utf-8")) as Comment[];

	const results = posts.map((post) => {
		const postComments = comments.filter((comment) => comment.postId === post.id);
		return { ...post, comments: postComments.map((comment) => ({ id: comment.id, content: comment.content })) };
	});

	return results;
};
