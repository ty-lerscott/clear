"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Redirect = ({ to = "/overview" }: { to?: string }) => {
	const { isSignedIn } = useUser();

	useEffect(() => {
		if (isSignedIn) {
			redirect(to);
		}
	}, [to, isSignedIn]);

	return null;
};

export default Redirect;
