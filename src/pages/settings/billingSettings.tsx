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
import icons_dwnld from "@/assets/icons/header-icons/icons_dwnld.svg";
import { HiOutlineDownload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const BillingSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-auto max-h-[calc(100vh-100px)]">
      <div className="dark:text-foreground flex flex-col gap-6 ml-6 w-full ">
        <div className="flex w-4/6 mt-2  items-center  ">
          <Button variant="outline" className="w- p-0">
            <MdKeyboardArrowLeft
              onClick={() => navigate("/settings")}
              className=" size-7  cursor-pointer  "
            />

            <h5 className="ml-4 text-[#737377] text-xl">Settings</h5>
          </Button>
          <MdKeyboardArrowRight className="text-[#737377] size-7 " />
          <h5 className=" text-xl">Billing</h5>
        </div>

        <div className="flex w-4/6  flex-col gap-6 mb-10 ">
          <Card className="flex w-full  gap-y-8 flex-col dark:bg-[#131417] ">
            <div className="flex mx-[18px] mt-[18px]  flex-col  gap-y-4 ">
              <div className="text-sm text-[#737377] font-medium">
                Plan Details
              </div>
              <div className="flex w-full items-end">
                <div className="flex flex-col w-1/4  gap-y-2 flex-wrap">
                  <h5 className="flex  text-xl whitespace-nowrap">
                    ₹ 24,XXX.XX
                  </h5>
                  <div className="flex flex-wrap text-sm">
                    Platinum - Quarterly Billing
                  </div>
                </div>
                <div className="flex w-3/4 justify-end items-end gap-4 flex-wrap  ">
                  <Card className="flex items-center dark:bg-[#272729] my-[9px] h-8 border border-[#FFFFFF33]">
                    <div className="flex  text-sm gap-4 mx-4 my-[7.5px] ">
                      <span className="flex text-[#9499A5] ">Purchased on</span>
                      <span className="flex ">24 Jun 2023</span>
                    </div>
                  </Card>
                  <Card className="flex text-sm items-center dark:bg-[#272729] my-[9px] h-8 border border-[#FFFFFF33] ">
                    <div className="flex  text-sm gap-4 mx-4 my-[7.5px]">
                      <span className="text-[#9499A5]">Ending on</span>
                      <span>24 Jun 2025</span>
                    </div>
                  </Card>
                  <Card className="flex  dark:bg-[#272729] my-[9px] h-8 border border-[#FFFFFF33]">
                    <div className="flex  text-sm items-center mx-4 my-[7.5px] ">
                      <img
                        className=" w-4 h-4 "
                        src={icons_success}
                        alt="success icon"
                      />
                      <div>365 Days Left</div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
            <div className="flex mx-[18px] mb-[18px] ">
              <Button className="flex text-[#FFFFFF]  ">Upgrade</Button>
            </div>
          </Card>

          <div className="flex w-full gap-6 ">
            <Card className="flex w-1/2 min-h-[231px] dark:bg-[#131417] ">
              <div className="flex flex-col p-[18px] gap-y-4">
                <div className="flex text-[#737377] text-sm font-medium">
                  Billing Address
                </div>
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

            <Card className="flex w-1/2 lg:h-[94px] md:min-h-[94px] dark:bg-[#131417]  ">
              <div className="flex flex-col w-full   m-[18px]   ">
                <div className="flex h-1/2 justify-between items-center  ">
                  <div className="flex font-medium text-sm text-[#737377]">
                    Payment Method
                  </div>
                  <Button
                    variant="ghost"
                    className="flex  text-[#3E72F8] px-0 py-0 "
                  >
                    Update
                  </Button>
                </div>
                <div className="flex h-1/2 justify-between items-center">
                  <div className="flex">VISA</div>
                  <div className="flex text-end">**** **** ****5659</div>
                </div>
              </div>
            </Card>
          </div>

          <Card className=" w-full dark:bg-[#131417]">
            <div className=" m-[18px] ">
              <div className="mx-2 text-[#737377] font-medium">Invoices</div>
              <Table className="">
                <TableHeader className="">
                  <TableRow className=" border-none">
                    <TableHead>Date</TableHead>
                    <TableHead>Tax invoice Number</TableHead>
                    <TableHead>Total Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="">
                  <TableRow className="border-none ">
                    <TableCell className=" ">15 Dec 2024</TableCell>
                    <TableCell className="">1454464354</TableCell>
                    <TableCell className="">₹ 24,XXX.XX</TableCell>
                    <TableCell className="text-[#9499A5]">
                      <HiOutlineDownload className="h-6 w-6 stroke-1" />
                    </TableCell>
                  </TableRow>
                  <TableRow className=" border-none ">
                    <TableCell className=" ">15 Dec 2024</TableCell>
                    <TableCell className=" ">1454464354</TableCell>
                    <TableCell className=" ">₹0</TableCell>
                    <TableCell className="text-[#9499A5]">
                      <HiOutlineDownload className="h-6 w-6 stroke-1" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default BillingSettings;
