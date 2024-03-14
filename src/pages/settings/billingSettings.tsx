import { LuChevronRight } from "react-icons/lu";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table"

const BillingSettings = () => {
  return (
    <div className="dark:text-foreground flex flex-col gap-y-[37px] m-6 w-full  ">
      <div className="flex w-4/6 h-[37px] items-center ">
        <h5 className="text-[#737377]"> Settings </h5>
        <LuChevronRight className="w-5 h-5" />
        <h5>Billing</h5>
      </div>
      <div className="flex w-4/6 h-[638px] flex-col gap-6">
        <Card className="flex flex-col w-full gap-8">
          <div className="flex flex-col px-[18px] pt-[18px] gap ">
            <Label className="flex text-sm text-[#737377] w-[164px] h-[21px]">
              Plan details
            </Label>
            <div className="flex ">
              <div className="flex flex-col w-1/2">
                <h5 className="w-[266px] [21px] text-xl">24,XXX.XX</h5>
                <Label className="w-[266px] h-[21px] text-sm">
                  Platinum-Quarterly Billing
                </Label>
              </div>

              <div className="flex w-1/2 justify-end ">
                <Card className="w-[223px] h-8 border border-[#FFFFFF33]">
                  purchased on
                </Card>
                <Card className="w-[198px] h-8 border-[#FFFFFF33]">
                  Ending on
                </Card>
                <Card className="w-[149px] h-8 border-[#FFFFFF33]">
                  365 days left
                </Card>
              </div>
            </div>
          </div>
          <div className="flex px-[18px] pb-[18px]">
            <Button className="w-[120px] h-8">Upgrade</Button>
          </div>
        </Card>
        <Card className="flex ">
          <div className="flex flex-col">
            <div className="flex">Billing Address</div>
            <div className="flex">Roshan D'zousa</div>
            <div className="flex">
              Techgebra Software LLP, 1st floor, Sahya, Govt Cyber park
              Nellikkode, Kozhikode, Kerala 673016 India
            </div>
            <div className="flex">VAT Number/Tax ID: 1234AB1233A1BCD</div>
          </div>
        </Card>
        <Card>
          <div className="flex">
            <div className="flex">Payment Method Update </div>
            <div className="flex">VISA **** **** ****5659</div>
          </div>
        </Card>

        {/* <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Tax invoice Number</TableHead>
                    <TableHead>Total Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">15 Dec 2024</TableCell>
                    <TableCell>1454464354</TableCell>
                    <TableCell>₹ 24,XXX.XX</TableCell>
                    <TableCell className=""></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">15 Dec 2024</TableCell>
                    <TableCell>1454464354</TableCell>
                    <TableCell>₹0</TableCell>
                    <TableCell className=""></TableCell>
                </TableRow>
            </TableBody>
        </Table> */}
      </div>
    </div>
  );
};
export default BillingSettings;
