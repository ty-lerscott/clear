import type { User } from "@repo/types/user";
import StatusCodes from "@repo/config/src/status-codes";
import type { DefaultError, Response } from "@/types/api";
import { type NextRequest, NextResponse } from "next/server";
import {
	getAuth,
	clerkClient,
	type User as ClerkUser,
} from "@clerk/nextjs/server";

const normalize = (clerkUser: ClerkUser | null): User | undefined => {
	if (!clerkUser) {
		return;
	}

	const { imageUrl: avatar, firstName, lastName, emailAddresses } = clerkUser;

	const name = {
		firstName,
		lastName,
		fullName: firstName && lastName ? `${firstName} ${lastName}` : undefined,
		initials:
			firstName && lastName ? `${firstName[0]}${lastName[0]}` : undefined,
	};

	return {
		avatar,
		...name,
		emailAddress: emailAddresses[0].emailAddress,
	} as User;
};

const post = async (req: NextRequest): Promise<Response<User>> => {
	const { userId } = getAuth(req);

	if (!userId) {
		return {
			status: StatusCodes.NOT_FOUND,
			error: {
				message: "User not found",
			},
		};
	}

	const body = await req.json();

	try {
		const updatedUser = await clerkClient().users.updateUser(userId, body);

		return {
			status: StatusCodes.OK,
			data: normalize(updatedUser),
		};
	} catch (error) {
		return {
			status: StatusCodes.BAD_REQUEST,
			// @ts-ignore this may error one day if clerk changes their error response object
			error: error?.errors?.[0] as DefaultError,
		};
	}
};

export async function POST(req: NextRequest) {
	const { status, data, error } = await post(req);

	return NextResponse.json({ data, error }, { status });
}
