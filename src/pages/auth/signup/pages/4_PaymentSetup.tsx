import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { useDispatch } from "react-redux";
import { postAction } from "@/redux/actions/AppActions";
import Urls from "@/redux/actions/Urls";
import { toast } from "sonner";

const BillingPage: React.FC<{}> = ({ }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const handleCouponVerification = (data) => {
        (dispatch(postAction({ signup_verify_coupon: Urls.signup_verify_coupon }, data)) as any).then(res => {
            if (res.payload?.status === 200) {
                toast.success(`${res.payload?.data?.message}`, { position: "bottom-center" });
                navigate("/signup/invite-members")
            }
        })

    }

    return <div className="flex justify-center h-screen items-center dark:bg-background">
        <Card className="w-[500px] dark:bg-card">
            <CardHeader>
                <CardTitle className="text-primary mb-5">Hyfy</CardTitle>
                <CardDescription className="text-foreground text-base">Payment</CardDescription>
            </CardHeader>
            <CardContent className="">
                <form onSubmit={handleSubmit(handleCouponVerification)}>
                    <div className="grid w-full items-center gap-3">
                        <Label className="text-xs dark:text-foreground">
                            Select billing
                        </Label>

                        <div className="flex items-center dark:bg-card rounded  border dark:border-[#FFFFFF1A] hover:dark:border-primary border-border ">
                            <div className="flex justify-between w-full text-xs p-4">
                                <div>Quarterly</div>
                                <div className="flex gap-4 text-[#9499A5]">
                                    <span>₹ X,XXX / Month</span> | <span>Total ₹ XX,XXX</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center dark:bg-card rounded  border dark:border-[#FFFFFF1A] hover:dark:border-primary border-border">
                            <div className="flex justify-between w-full text-xs p-4">
                                <div>Annual</div>
                                <div className="flex gap-4 text-[#9499A5]">
                                    <span>₹ X,XXX / Month</span> | <span>Total ₹ XX,XXX</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Separator className="my-4 border dark:border-[#FFFFFF1A]" />
                    <div className="flex flex-col gap-3">
                        <Label className="text-xs">Coupon</Label>
                        <Input
                            required
                            autoFocus
                            autoComplete="off"
                            {...register("couponCode")}
                            placeholder="Enter the coupon code you have received"
                            className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-xs border dark:border-[#FFFFFF1A] dark:bg-card"
                        />
                        <Label className="text-xs">Payment Method</Label>
                        <HYCombobox
                            disable={true}
                            defaultValue="net_banking"
                            options={[{ label: "Net Banking", value: "net_banking" }]}
                            buttonClassName="w-full dark:border-[#FFFFFF1A] border-border dark:bg-card"
                        />
                    </div>
                    <div className="mt-5">
                        <Button className="w-full text-white hover:bg-primary">
                            Verify
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
}

export default BillingPage