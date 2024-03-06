import { Badge } from "@/components/ui/badge";

interface HYStatusBadgeProps {
	status: string;
}

const HYStatusBadge = ({ status }: HYStatusBadgeProps) => {
	return (
		<Badge variant="outline" className="px-5 h-8 capitalize " onClick={(e) => e.stopPropagation()}>
			{status}
		</Badge>
	);
};

export default HYStatusBadge;
