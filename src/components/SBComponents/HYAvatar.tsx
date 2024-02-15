import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface HYAvatarProps {
	// TODO
	url?: string;
	name?: string;
}

function getInitials(name) {
	const initials = name
		.split(" ")
		.map((word) => word[0])
		.join("");
	return initials.length > 1 ? initials.substring(0, 2) : initials;
}

const HYAvatar = ({ url, name }: HYAvatarProps) => {
	const initials = getInitials(name);
	return (
		<Avatar className="size-8">
			<AvatarImage src={url} alt="@shadcn" />
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
	);
};

export default HYAvatar;
