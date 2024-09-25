import dynamic from "next/dynamic";

const ClientOnly = dynamic(() => import("./client"), { ssr: false });

const Page = () => {
	return <ClientOnly />;
};
export default Page;
