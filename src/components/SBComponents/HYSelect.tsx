import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface HYSelectProps {
	label?: string;
	options: string[];
	value?: string;
	onChange?: (value: string) => void;
}

const HYSelect = ({ options, label, value, onChange }: HYSelectProps) => {
	return (
		<Select>
			<SelectTrigger className="w-[180px] focus:ring-0 focus:ring-offset-0">
				<div className="whitespace-nowrap text-[#9499A5]">{label}</div>
				<SelectValue placeholder="" />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option} value={option}>
						{option}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default HYSelect;
