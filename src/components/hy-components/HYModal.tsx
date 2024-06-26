import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { HiMiniXMark } from "react-icons/hi2";

interface HYModalProps {
    title?: any;
    className?: string;
    description?: any;
    content?: React.ReactNode;
    open: boolean;
    showCloseButton?: boolean;
    handleClose?: () => void;
}

const HYModal: React.FC<HYModalProps> = ({
    title,
    description,
    className,
    content,
    open,
    showCloseButton = false,
    handleClose
}) => {
    return (
        <Dialog open={open} onOpenChange={(open) => handleClose()}>
            <DialogContent className={`max-w-2xl max-h-[80vh]  ${className}`}>
                {title && (
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                )}

                {showCloseButton &&
                    <div className="absolute right-5 top-5 border rounded" onClick={() => handleClose?.()}>
                        <HiMiniXMark className="h-4 w-4 border cursor-pointer" />
                    </div>
                }

                {description && (
                    <DialogDescription>{description}</DialogDescription>
                )}
                {content}
            </DialogContent>
        </Dialog>
    );
};

export default HYModal;
