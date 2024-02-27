import { useEffect } from "react";
import Urls from "@/redux/actions/Urls";
import { Button } from "@/components/ui/button";
import { useNavigate, } from "react-router-dom";
import ModeToggle from "@/components/mode-toggle";
import { useDispatch, useSelector } from "react-redux";
import HYAvatar from "@/components/HYComponents/HYAvatar";
import HYSearch from "@/components/HYComponents/HYSearch";
import { HYCombobox } from "@/components/HYComponents/HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";

import { HiBell } from "react-icons/hi";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

import { getAction, reducerNameFromUrl, setProject } from "@/redux/actions/AppActions";

const TheHeader = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const reducerName = reducerNameFromUrl("project", "GET");
	const projectList = useSelector((state: any) => state?.[reducerName]);

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

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
						unSelectable={false}
						buttonClassName="border"
						options={projectOptions}
						defaultValue={appProfileInfo?.project_id}
						onValueChange={(value: string) => dispatch(setProject(value))}
					/>
				</div>
				<div className="flex grow items-center justify-end gap-1 dark:text-foreground">
					<HYSearch />
					<ModeToggle />
					<Button type="button" size="icon" variant="ghost" onClick={() => navigate("/notification")}>
						<HiBell className="w-6 h-6 text-[#707173]" />
					</Button>
					<Button type="button" size="icon" variant="ghost">
						<HiMiniQuestionMarkCircle className="w-6 h-6 text-[#707173]" />
					</Button>
					<Button
						onClick={() => navigate("/profile")}
						className="bg-transparent hover:bg-transparent"
						size="icon"
					>
						<HYAvatar
							className="size-6 "
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
