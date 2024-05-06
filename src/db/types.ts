export type Data = {
	id: number;
	firstName: string;
	lastName: string;
	emailAddress: string;
};
export type InsertData = {
	firstName: string;
	lastName: string;
	emailAddress: string;
};
export type UpdateData = {
	firstName?: string;
	lastName?: string;
	emailAddress?: string;
};
export type Database = {
	_data: Data[];
	_index: number;
	getAll(callback: ({ err, data }: { err: {} | null; data: Data[] }) => void): void;
	getById(
		id: number,
		callback: ({ err, data }: { err: { message: string } | null; data: Data | undefined | null }) => void
	): void;
	add(item: InsertData, callback: ({ err, data }: { err: {} | null; data: Data | undefined | null }) => void): void;
	update(
		id: number,
		item: UpdateData,
		callback: ({ err, data }: { err: {} | null; data: Data | undefined | null }) => void
	): void;
	delete(id: number, callback: ({ err, data }: { err: {} | null; data: Data | undefined | null }) => void): void;
};
