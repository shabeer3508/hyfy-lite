import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const AccountSetupPage: React.FC<{}> = ({ }) => {

    const navigate = useNavigate()

    return <div className="flex justify-center h-screen items-center dark:bg-background">
        <Card className="w-[500px] dark:bg-[#23252A]">
            <CardHeader>
                <CardTitle className="text-primary mb-5">Hyfy</CardTitle>
                <CardDescription className="">Setup Accpunt</CardDescription>
                <CardDescription>
                    email@gmail.com
                </CardDescription>
            </CardHeader>
            <CardContent className="">
                <form>
                    <div className="grid w-full items-center gap-3">
                        <Label className="text-xs dark:text-foreground">
                            Name
                        </Label>
                        <div className="flex items-center dark:bg-[#23252A] rounded px-3 border dark:border-[#FFFFFF1A] border-border mt-1">
                            <Input
                                autoFocus
                                className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 dark:bg-[#23252A]"
                                type="text"
                                id="identity"
                                required
                                autoComplete="off"
                                placeholder="Name"
                            // {...register("identity")}
                            />
                        </div>
                        <Label className="text-xs dark:text-foreground">
                            Role
                        </Label>
                        <HYCombobox
                            defaultValue="employee"
                            buttonClassName="w-full rounded-md border dark:border-[#FFFFFF1A] border-border dark:bg-[#23252A]"
                            options={[{ label: 'Manager', value: "manager" }, { label: "Employee", value: "employee" }]}
                        />
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex ">
                <Button className="w-full text-white hover:bg-primary" onClick={() => {
                    // TODO: Navigate to Project Creation page if user is admin, else navigate to Dashboard page
                    navigate("/signup/create_project")
                }}>
                    Next
                </Button>
            </CardFooter>
        </Card>
    </div>
}

export default AccountSetupPage