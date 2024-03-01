import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface HYAvatarProps {
	// TODO
	className?: string;
	url?: string;
	name?: string;
	color?: string;
}

function getInitials(name) {
	const initials =
		name
			?.split(" ")
			?.map((word) => word[0])
			?.join("") ?? " ";
	return initials.length > 1 ? initials.substring(0, 2) : initials;
}

const HYAvatar = ({ url, name, className, color }: HYAvatarProps) => {
	const initials = getInitials(name);
	return (
		<Avatar className={`size-8 ${className}`} title={name}>
			<AvatarImage src={url} alt="@shadcn" draggable={false} />
			<AvatarFallback className={`text-xs uppercase ${color}`}>
				{initials}
			</AvatarFallback>
		</Avatar>
	);
};

export default HYAvatar;
