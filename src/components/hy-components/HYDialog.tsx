import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

const HYDialog = ({
	title,
	description,
	children,
	className,
	content,
}: {
	title?: any;
	className?: string;
	description?: any;
	children?: any;
	content?: any;
}) => {
	return (
		<Dialog >
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className={`max-w-2xl max-h-[80vh] ${className}`}>
				{title && (
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
					</DialogHeader>
				)}
				{description && (
					<DialogDescription>{description}</DialogDescription>
				)}
				{content}
			</DialogContent>
		</Dialog>
	);
};

export default HYDialog;
