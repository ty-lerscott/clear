import { faker } from "@faker-js/faker";
import { PiWaveSawtoothBold } from "react-icons/pi";

import Client from "./client";
import { Card } from "@/ui/card";
import type { JobPosting } from "./columns";
import { kebabToTitleCase, cn } from "@/utils";

const statuses = [
	"ready",
	"generating",
	"applied",
	"interviewing",
	"negotiating",
	"got-the-job",
	"no-answer",
	"rejected",
	"withdrew",
];

const randomStatus = () => faker.helpers.arrayElement(statuses);

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
			<div className="grid grid-cols-[repeat(29,_minmax(0,_1fr))] gap-4">
				{statuses
					.filter(
						(status) =>
							!["generating", "no-answer", "rejected", "withdrew"].includes(
								status,
							),
					)
					.map((status) => {
						const count = data.filter((job) => job.status === status).length;

						return (
							<Card
								className={cn(
									"flex flex-col col-span-4 items-center justify-center py-2",
									count
										? "border-primary text-primary"
										: "border-muted text-muted",
								)}
								key={status}
							>
								<span className="font-semibold text-2xl">{count || "--"}</span>
								<h2 className={cn("-mt-1 font-semibold text-xs uppercase")}>
									{kebabToTitleCase(status)}
								</h2>
							</Card>
						);
					})}
				<div className="col-span-1 h-full flex items-center justify-center relative">
					<PiWaveSawtoothBold className="rotate-90 text-muted absolute top-5" />
					<PiWaveSawtoothBold className="rotate-90 text-muted absolute top-8" />
				</div>
				{statuses
					.filter((status) => ["no-answer", "rejected"].includes(status))
					.map((status) => {
						const count = data.filter((job) => job.status === status).length;

						return (
							<Card
								className={cn(
									"flex flex-col col-span-4 items-center justify-center py-2",
									count
										? "border-primary text-primary"
										: "border-muted text-muted",
								)}
								key={status}
							>
								<span className="font-semibold text-2xl">{count || "--"}</span>
								<h2 className={cn("-mt-1 font-semibold text-xs uppercase")}>
									{kebabToTitleCase(status)}
								</h2>
							</Card>
						);
					})}
			</div>

			<Client data={data} />
		</div>
	);
};
export default Page;
