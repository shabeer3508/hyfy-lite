import { useEffect } from "react";
import Urls from "@/redux/actions/Urls";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import { useDispatch, useSelector } from "react-redux";
import HYAvatar from "@/components/HYComponents/HYAvatar";
import HYSearch from "@/components/HYComponents/HYSearch";
import { useNavigate, useSearchParams } from "react-router-dom";
import helpIcon from "../assets/icons/header-icons/icon_help.svg";
import { HYCombobox } from "@/components/HYComponents/HYCombobox";
import notiIcon from "../assets/icons/header-icons/icon_notification.svg";
import { getAction, reducerNameFromUrl } from "@/redux/actions/AppActions";

const TheHeader = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	const reducerName = reducerNameFromUrl("project", "GET");
	const projectList = useSelector((state: any) => state?.[reducerName]);

	/*  ######################################################################################## */

	const getProjects = (prams?: string) => {
		let query = "?expand=owner";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ project: Urls.project + query }));
	};

	/*  ######################################################################################## */

	const projectOptions =
		projectList?.data?.items?.map((prjct) => ({
			value: prjct?.id,
			label: prjct?.title,
		})) ?? [];

	/*  ######################################################################################## */

	useEffect(() => {
		getProjects();
	}, []);

	/*  ######################################################################################## */

	return (
		<div className="w-full transition-all duration-200 ease-in ">
			<div className="flex h-20 items-center px-6">
				<div className="font-semibold  flex items-center  dark:text-foreground">
					<HYCombobox
						name="project"
						showSearch={false}
						onValueChange={(value) => {
							if (value) {
								searchParams.set("selectedProject", value);
								setSearchParams(searchParams);
							} else {
								searchParams.delete("selectedProject");
								setSearchParams(searchParams);
							}
						}}
						defaultValue={projectOptions?.[0]?.value}
						options={projectOptions}
						buttonClassName="border-0"
					/>
				</div>
				<div className="flex grow items-center justify-end gap-5 dark:text-foreground">
					<HYSearch />
					<ModeToggle />
					<img
						src={notiIcon}
						alt="notification icon"
						className="h-5 cursor-pointer"
					/>
					<img
						src={helpIcon}
						alt="help icon"
						className="h-5 cursor-pointer"
					/>
					<Button
						onClick={() => navigate("/profile")}
						variant="ghost"
					>
						<HYAvatar
							className=" size-8 "
							url="https://github.com/shadcn.png"
							name={"John Doe"}
						/>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default TheHeader;
