import { Badge } from "@/components/ui/badge";

interface HYStatusBadgeProps {
	status: string;
}

const HYStatusBadge = ({ status }: HYStatusBadgeProps) => {
	return (
		<Badge variant="outline" className="px-5 h-8 capitalize ">
			{status}
		</Badge>
	);
};

export default HYStatusBadge;
