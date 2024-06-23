import { setupServer } from "msw/node";
import { beforeEach, describe, expect, it } from "vitest";

describe("User endpoint", () => {
	const server = setupServer();
	/**
	 * Voorbeeld van een beforeEach functie.
	 * Hiermee kun je code hergebruiken of initialiseren.
	 */
	beforeEach((v) => {
		console.log("Before each test");
		// console.log(v);
	});
	// beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

	// afterAll(() => server.close());
	// afterEach(() => server.resetHandlers());

	it("Moet een nieuwe user kunnen registreren", async (v) => {
		// Arrange
		const user = {
			firstName: "John",
			lastName: "Doe",
			emailAddress: "j.doe@service.nl",
			password: "password123",
			isActive: true,
			street: "Straatnaam 123",
			city: "Plaatsnaam",
			phoneNumber: "06 12312345",
			roles: [],
		};

		// Act
		expect(1).toBe(1);
	});
});
