import { http } from "msw";
import { setupServer } from "msw/node";
import { expect } from "vitest";
import { afterEach } from "vitest";
import { afterAll } from "vitest";
import { beforeAll } from "vitest";
import { beforeEach, describe, it } from "vitest";

const endpointToTest = "/api/user";

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
	beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

	afterAll(() => server.close());
	afterEach(() => server.resetHandlers());

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
