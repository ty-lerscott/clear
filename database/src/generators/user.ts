import { faker } from "@faker-js/faker";
import type { User } from "@repo/types/user";

const generateUser = (): User => {
	return {
		lastName: faker.person.lastName(),
		firstName: faker.person.firstName(),
		emailAddress: faker.internet.email(),
	};
};

export default generateUser;
