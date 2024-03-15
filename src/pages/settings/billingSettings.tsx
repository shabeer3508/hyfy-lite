import { LuChevronRight } from "react-icons/lu";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import icons_success from "@/assets/icons/header-icons/Icons_success.svg";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BillingSettings = () => {
  return (
    <div className="overflow-y-auto h-full ">
      <div className="dark:text-foreground flex flex-col gap-y-[37px] m-6 w-full   ">
        <div className="flex w-4/6 h-[37px] items-center ">
          <h5 className="text-[#737377]"> Settings </h5>
          <LuChevronRight className="w-5 h-5" />
          <h5>Billing</h5>
        </div>
        <div className="flex w-4/6 h-[638px] flex-col gap-6 mb-10">
          <Card className="flex w-full h-[187px] gap-y-8 flex-col">
            <div className="flex mx-[18px] mt-[18px] h-[87px] flex-col  gap-y-4">
              <div className="text-sm text-[#737377]">Plan Details</div>
              <div className="flex w-full items-end  ">
                <div className="flex flex-col w-2/5  ">
                  <h5 className="flex text-xl">₹ 24,XXX.XX</h5>
                  <Label className="flex text-sm">
                    Platinum - Quarterly Billing
                  </Label>
                </div>
                <div className="flex w-3/5 justify-end items-end gap-4  ">
                  <Card className="flex text-sm gap-4 ">
                    <span className="text-[#9499A5]">Purchased on</span>
                    <span>24 Jun 2023</span>
                  </Card>
                  <Card className="flex text-sm gap-4 ">
                    <span className="text-[#9499A5]">Ending on</span>
                    <span>24 Jun 2025</span>
                  </Card>
                  <Card className="flex text-sm gap-1 items-center">
                    <img
                      className=" w-4 h-4 "
                      src={icons_success}
                      alt="success icon"
                    />
                    365 Days Left
                  </Card>
                </div>
              </div>
            </div>
            <div className="flex mx-[18px] mb-[18px] h-[32px] ">
              <Button className="w-[120px] h-8">Upgrade</Button>
            </div>
          </Card>
          <div className="flex w-full gap-6 ">
            <Card className="flex w-1/2 h-[231px] ">
              <div className="flex flex-col p-[18px] gap-y-4">
                <Label className="flex text-[#737377] text-sm">
                  Billing Address
                </Label>
                <title className="flex">Roshan D'zousa</title>
                <p className="flex flex-col text-[#9499A5] text-sm ">
                  <span>Techgebra Software LLP,</span>
                  <span>1st floor, Sahya, Govt Cyber park,Nellikkode,</span>
                  <span>Kozhikode, Kerala 673016</span>
                  <span>India</span>
                </p>
                <p className="flex text-[#737377] text-sm">
                  VAT Number/Tax ID: 1234AB1233A1BCD
                </p>
              </div>
            </Card>
            <Card className="flex w-1/2 h-[94px]">
              <div className="flex flex-col w-full h-full p-[18px] justify-center  gap-y-4  ">
                <div className="flex h-1/2 gap-4 ">
                  <Label className="flex w-3/4 text-sm text-[#737377]">
                    Payment Method{" "}
                  </Label>
                  <Button className="flex w-1/4 h-4">Update</Button>
                </div>
                <div className="flex h-1/2 gap-4 ">
                  <title className="flex w-3/5 text-lg">VISA</title>
                  <title className="flex w-2/5 text-lg justify-end">
                    **** **** ****5659
                  </title>
                </div>
              </div>
            </Card>
          </div>
          <Card className="flex w-full h-[172px]  ">
            <Table className="flex flex-col  gap-y-4 m-[18px] border border-red-500">
              <TableCaption className="flex">Invoices</TableCaption>
              <TableHeader className="flex">
                <TableRow className="flex  justify-between ">
                  <TableHead>Date</TableHead>
                  <TableHead>Tax invoice Number</TableHead>
                  <TableHead>Total Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="flex flex-col ">
                <TableRow className="flex gap-7">
                  <TableCell className="flex ">15 Dec 2024</TableCell>
                  <TableCell className="flex">1454464354</TableCell>
                  <TableCell className="flex">₹ 24,XXX.XX</TableCell>
                </TableRow>
                <TableRow className="flex gap-7 ">
                  <TableCell className="flex ">15 Dec 2024</TableCell>
                  <TableCell className="flex ">1454464354</TableCell>
                  <TableCell className="flex ">₹0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default BillingSettings;
