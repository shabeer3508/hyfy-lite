import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"

interface TooltipProps {
	children: React.ReactNode;
	message: string
	className?: string
}

const HYTooltip = ({ children, message, className }: TooltipProps) => {
	return <TooltipProvider>
		<Tooltip>
			<TooltipTrigger asChild>{children}</TooltipTrigger>
			<TooltipContent className={className}>
				<p>{message}</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
}

export default HYTooltip


