import { useNavigate, useLocation } from "react-router-dom";

export const NavItemDropdown = ({ onClick, show, ...prop }: any) => {
	const navigate = useNavigate();
	const location = useLocation();

	const name =
		prop?.item?.name ||
		prop?.item?.path?.substring(prop?.item?.path?.lastIndexOf("/") + 1);
	const parentPath = prop?.item?.path;
	const count = prop?.item?.items?.length * 28;

	const currentPath = location?.pathname;
	const path = prop?.item?.path;

	const isActive = prop?.item?.items
		?.map((item: any) => parentPath + item.path)
		.includes(currentPath);

	const itemH = count ? `h-[${count}px]` : `h-auto`;
	const title = name?.replaceAll("-", " ") || "";
	return (
		<div>
			<div className="group flex transform-gpu items-center rounded px-2 hover:bg-accent/20">
				<div
					title={name}
					onClick={onClick}
					className="flex h-9 flex-1 cursor-pointer select-none items-center gap-2 dark:text-white"
				>
					{prop?.item?.icon && (
						<div
							className={` ${
								isActive ? "text-accent" : "dark:text-white"
							} aspect-square w-7 transform-gpu rounded-[4px] p-[2px] transition-all ease-in group-hover:w-7 group-hover:text-accent`}
						>
							{prop?.item.icon}
						</div>
					)}
					{!prop?.minimize && (
						<a className="cursor-pointer text-sm font-normal capitalize group-hover:text-accent dark:text-white">
							{title}
						</a>
					)}
				</div>
				{!prop?.minimize && (
					<div
						className={` text-gray-400 transition-transform  duration-300 ease-in-out ${
							show ? " rotate-90" : " rotate-0"
						} h-5 w-5 dark:text-white/70`}
					>
						{/* <ChevronRightIcon /> */}
					</div>
				)}
				<div className=" absolute left-0 h-4 w-[4px] rounded-r-[3px] group-hover:bg-accent"></div>
			</div>
			<div
				className={`origin-top transform-gpu transition-all duration-300 origin-top-start ${
					show ? ` ${itemH}` : "h-0"
				} mt-3 flex flex-col gap-1 overflow-hidden text-black dark:text-white/90`}
			>
				{prop?.item?.items?.map((item: any, index: number) => {
					const isString = typeof item === "string";
					let path = isString ? item : item.path;
					const name = isString
						? item.substring(path?.lastIndexOf("/") + 1)
						: item?.name ||
						  item?.path?.substring(
								item?.path?.lastIndexOf("/") + 1
						  );
					const itemPath = parentPath ? parentPath + path : path;
					const isActive = itemPath === currentPath;
					const subTitle = name?.replaceAll(/[-_]/g, " ") || "";

					return (
						<div
							title={name?.replaceAll("_", " ")}
							key={`ndi_${index}`}
							onClick={() =>
								path &&
								navigate(parentPath ? parentPath + path : path)
							}
							className={`${
								prop?.minimize ? "ml-1" : "ml-9"
							} group flex cursor-pointer select-none items-center rounded px-2 py-1 capitalize hover:bg-accent/20`}
						>
							{!prop?.minimize && (
								<a
									className={` ${
										isActive
											? " font-normal text-accent"
											: " font-normal"
									} text-xs font-light capitalize group-hover:text-accent`}
								>
									{subTitle}
								</a>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const NavItem = ({ onClick, ...prop }: any) => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentPath = location?.pathname;
	const path = prop?.item?.path;

	const isActive = currentPath === path;

	const name =
		prop?.item?.name ||
		prop?.item?.path?.substring(prop?.item?.path?.lastIndexOf("/") + 1);

	const title = name?.replaceAll("-", " ") || "";

	return (
		<div
			onClick={() => {
				navigate(prop?.item?.path || "/");
				onClick();
			}}
			className={` no-select group relative flex h-12 cursor-pointer items-center gap-2 pl-6 pr-4 ${
				isActive && "bg-[#222428]  border-primary border-r-2"
			}   dark:text-white/90`}
		>
			{prop?.item?.icon && (
				<div
					className={` ${
						isActive ? "text-primary" : "group-hover:text-primary"
					} aspect-square  transform-gpu  rounded-[4px]  transition-all ease-in`}
				>
					{prop?.item?.icon}
				</div>
			)}

			{!prop?.minimize && (
				<a
					className={`${
						isActive
							? "font-medium "
							: "font-normal group-hover:text-primary"
					} select-none transform-gpu transition-all ease-in text-xs md:text-sm  capitalize `}
				>
					{title}
				</a>
			)}
		</div>
	);
};

export const NavItemTitle = (prop: any) => {
	if (prop.minimize) {
		return null;
	}
	return (
		<div className="mt-1 flex h-4 cursor-pointer  items-center px-2 text-[11px] font-normal">
			<a className="uppercase text-slate-900 dark:text-slate-400">
				{prop?.item?.name}
			</a>
		</div>
	);
};

export const NavItemDivider = (prop: any) => {
	if (prop.minimize) {
		return null;
	}
	return (
		<div className="mx-2 flex h-1 cursor-pointer items-center border-b-1 dark:border-line_dark"></div>
	);
};
