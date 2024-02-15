import { HiOutlineInbox } from "react-icons/hi2";

const index = () => {
	return (
		<div className="dark:text-foreground flex justify-center h-[calc(100vh-100px)] items-center">
			<div className="flex flex-col justify-center items-center text-center gap-3">
				<div>
					<HiOutlineInbox className="text-primary h-20 w-20 " />
				</div>
				<div className="text-primary text-3xl font-semibold">
					Nothing here!
				</div>
				<div className="dark:text-foreground">
					You have not been assigned any tasks
				</div>
			</div>
		</div>
	);
};

export default index;
