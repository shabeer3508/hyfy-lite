import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

interface HYSelectProps {
	id: string;
	label?: string;
	options: string[];
	value?: string;
	className?: string;
	defaultValue?: any;
	field?: any;
}

const HYSelect = ({
	id,
	options,
	label,
	value,
	className,
	field,
}: HYSelectProps) => {
	return (
		<Select onValueChange={field?.onChange} defaultValue={field?.value}>
			<SelectTrigger
				className={`w-[180px] focus:ring-0 focus:ring-offset-0 dark:bg-[#111215] ${className}`}
			>
				{label && (
					<div className="whitespace-nowrap text-[#9499A5]">
						{label}
					</div>
				)}
				<SelectValue placeholder="" />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem
						key={option}
						value={option}
						className="capitalize"
					>
						{option}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default HYSelect;
