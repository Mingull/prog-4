import { database } from "../db/index.ts";
import { Data } from "../db/types.ts";
import { Router } from "express";

export const router = Router();

router.get("/", async (req, res) => {
	database.getAll(({ data, err }) => {
		if (err) {
			res.json({ status: 500, error: err });
		} else {
			res.json({ status: 200, result: data });
		}
	});
});

router.post("/register", (req, res) => {
	database.add(req.body, ({ data, err }) => {
		if (err) {
			res.json({ status: 500, error: err });
		} else {
			res.json({ status: 200, result: data });
		}
	});
});

router.get("/:userId", async (req, res) => {
	database.getById(Number.parseInt(req.params.userId), ({ data, err }) => {
		if (data) {
			res.json({ status: 200, result: { ...data } });
		} else {
			res.json({ status: 404, error: err });
		}
	});
});

router.put("/:userId", async (req, res) => {
	database.update(Number.parseInt(req.params.userId), req.body, ({ data, err }) => {
		if (data) {
			res.json({ status: 200, result: data });
		} else {
			res.json({ status: 404, error: err });
		}
	});
});

router.delete("/:userId", async (req, res) => {
	database.delete(Number.parseInt(req.params.userId), ({ data, err }) => {
		if (data) {
			res.json({ status: 200, result: data });
		} else {
			res.json({ status: 404, error: err });
		}
	});
});

// router.get("/:userId/posts", async (req, res) => {
// 	const user = await fetchUser(req.params.userId);
// 	if (user) {
// 		res.json({ status: 200, result: { posts: user.posts } });
// 	} else {
// 		res.json({ status: 404, error: `User with id '${req.params.userId}' could not be found` });
// 	}
// });

// router.get("/:userId/comments", async (req, res) => {
// 	const user = await fetchUser(req.params.userId);
// 	if (user) {
// 		res.json({ status: 200, result: { comments: user.comments } });
// 	} else {
// 		res.json({ status: 404, error: `User with id '${req.params.userId}' could not be found` });
// 	}
// });
