import { type JobPosting, columns } from "./columns";
import { DataTable } from "./data-table";
import { faker } from "@faker-js/faker";

const randomStatus = () =>
	faker.helpers.arrayElement([
		"ready",
		"pending",
		"applied",
		"interviewing",
		"negotiating",
		"got-the-job",
		"no-answer",
		"rejected",
		"rejected-myself",
	]);

const randomLocation = () =>
	faker.helpers.arrayElement([
		"in-office",
		"remote",
		"hybrid",
		`${faker.location.city()}, ${faker.location.state({ abbreviated: true })}`,
	]);

const Page = () => {
	const data = Array.from({ length: 10 }, () => ({
		id: faker.string.uuid(),
		title: faker.person.jobTitle(),
		company: faker.company.name(),
		location: randomLocation(),
		jobBoard: faker.helpers.arrayElement(["linkedin", ""]),
		salary: {
			min: faker.number.int({ min: 20000, max: 150000 }),
			max: faker.number.int({ min: 150000, max: 250000 }),
			currency: "USD",
		},
		status: randomStatus(),
		lastModified: faker.date.recent().toISOString(),
	})) as JobPosting[];

	return (
		<div>
			<DataTable columns={columns} data={data} />
		</div>
	);
};
export default Page;
