import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"

interface HYAlertDialogProps {
    title?: string;
    submitText?: string;
    description?: string;
    closeText?: string;
    children?: any
    submitAction: () => void;
}

/**
 *  Uncontrolled Alert Dialog
 */

const HYAlertDialog: React.FC<HYAlertDialogProps> = ({
    children,
    submitAction,
    description,
    closeText = "Cancel",
    submitText = "Continue",
    title = "Are you sure ?",
}) => {
    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-base">{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{closeText}</AlertDialogCancel>
                    <AlertDialogAction className="dark:text-white" onClick={() => submitAction()}>{submitText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default HYAlertDialog  