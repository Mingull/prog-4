const secretKey = process.env.JWT_SECRET || "secret";
const baseurl = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "prog-4.mingull.nl";
export default {
	secretKey,
	baseurl,
};

export { baseurl, secretKey };
