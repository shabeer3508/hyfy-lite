import { useEffect } from "react";
import Urls from "@/redux/actions/Urls";
import { HiBell } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import HYAvatar from "@/components/hy-components/HYAvatar";
import HYSearch from "@/components/hy-components/HYSearch";
import { useLocation, useNavigate, } from "react-router-dom";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { getAction, reducerNameFromUrl, setProject } from "@/redux/actions/AppActions";

const TheHeader = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	const reducerName = reducerNameFromUrl("project", "GET");
	const projectList = useSelector((state: any) => state?.[reducerName]);

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;
	const authInfo = useSelector((state: any) => state.UserReducer);

	/*  ######################################################################################## */

	const getProjects = (prams?: string) => {
		let query = `?perPage=300
			&expand=owner`;

		if (prams) { query = query + prams }
		dispatch(getAction({ project: Urls.project + query }));
	};

	/*  ######################################################################################## */


	const projectOptions =
		projectList?.data?.items?.map((prjct) => ({
			value: prjct?._id,
			label: prjct?.title,
		})) ?? [];

	const showProjectSelection = !["/projects", "/teams"].includes(pathname) && projectOptions?.length > 0

	/*  ######################################################################################## */

	useEffect(() => {
		getProjects();
	}, []);

	useEffect(() => {
		if (!appProfileInfo?.project_id && projectOptions?.length > 0) {
			dispatch(setProject(projectOptions?.[0]?.value))
		}
	}, [projectList])

	/*  ######################################################################################## */

	return (
		<div className="w-full transition-all duration-200 ease-in">
			<div className="flex h-20 items-center px-6 w-full gap-2">
				<div className="font-semibold  flex items-center  dark:text-foreground">
					{showProjectSelection &&
						<HYCombobox
							name="project"
							showSearch={false}
							label={"Project :"}
							unSelectable={false}
							buttonClassName="border"
							options={projectOptions}
							defaultValue={appProfileInfo?.project_id}
							onValueChange={(value: string) => dispatch(setProject(value))}
						/>
					}
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
							name={authInfo?.user?.user_name}
						/>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default TheHeader;
