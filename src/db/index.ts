import { Data, Database } from "./types";

export const database: Database = {
	_data: [
		{
			id: 0,
			firstName: "Hendrik",
			lastName: "van Dam",
			emailAddress: "hvd@server.nl",
		},
		{
			id: 1,
			firstName: "Marieke",
			lastName: "Jansen",
			emailAddress: "m@server.nl",
		},
	],
	_index: 2,
	getAll(callback) {
		setTimeout(() => {
			callback({ err: null, data: this._data });
		}, 1500);
	},
	getById(id, callback) {
		setTimeout(() => {
			if (id < 0 || id >= this._data.length) {
				callback({ err: { message: `User with id '${id}' could not be found` }, data: null });
			} else {
				callback({ err: null, data: this._data[id] });
			}
		}, 1500);
	},
	add(item, callback) {
		setTimeout(() => {
			const emailExists: boolean = this._data.some((user) => user.emailAddress === item.emailAddress);
			console.log({ emailExists });
			if (!emailExists) {
				const newItem: Data = { id: this._index++, ...item };
				this._data.push(newItem);

				callback({ err: null, data: newItem });
			} else {
				callback({ err: { message: `User with email '${item.emailAddress}' already exists` }, data: null });
			}
		}, 1500);
	},
	update(id, item, callback) {
		setTimeout(() => {
			if (id < 0 || id >= this._data.length || typeof id !== "number") {
				callback({
					err: {
						message:
							"Invalid id provided. " +
							"Id must be a number and must be within the range of the current users.",
					},
					data: null,
				});
			} else {
				const user = this._data[id];
				if (!user) return callback({ err: { message: `User with id '${id}' could not be found` }, data: null });

				console.log({ user });

				const updatedUser = { ...user, ...item };
				this._data[id] = updatedUser;

				callback({ err: null, data: updatedUser });
			}
		}, 1500);
	},
	delete(id, callback) {
		setTimeout(() => {
			if (id < 0 || id >= this._data.length) {
				callback({
					err: {
						message:
							"Invalid id provided. " +
							"Id must be a number and must be within the range of the current users.",
					},
					data: null,
				});
			} else {
				const user = this._data[id];
				if (!user) return callback({ err: { message: `User with id '${id}' could not be found` }, data: null });

				this._data = this._data.filter((user) => user.id !== id);
                this._index = this._data.length;

				callback({ err: null, data: user });
			}
		}, 1500);
	},
};
