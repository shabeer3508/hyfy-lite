import { HiPlus, HiXMark } from "react-icons/hi2";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TbSettingsFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import { MdEdit, MdKeyboardArrowRight, MdRemoveRedEye, MdDelete } from "react-icons/md";

import Urls from "@/redux/actions/Urls";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BoardTemplateType } from "@/interfaces";
import HYModal from "@/components/hy-components/HYModal";
import { getAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import { RiDraggable } from "react-icons/ri";
import { toast } from "sonner";

interface BoardFormProps {
    showForm: boolean;
    isUpdate: boolean;
    defaultValues: {
        title: string;
        stages?: {
            name: string;
            order: string;
            color?: string;
            is_backlog?: boolean;
        }[];
    };
};

const BoardTemplates = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const defaultValues = {
        title: "",
        stages: [
            { name: "Todo", color: "#2db6c8", order: "1" },
            { name: "Ongoing", color: "#616ae5", order: "2" },
            { name: "Done", color: "#47d785", order: "3" }
        ]
    };

    const [formView, setFormView] = useReducer((prev: BoardFormProps, next: Partial<BoardFormProps>) => ({ ...prev, ...next }),
        { showForm: false, isUpdate: false, defaultValues }
    );

    const reducerName = reducerNameFromUrl("boardTemplates", "GET");
    const templateList = useSelector((state: any) => state?.[reducerName])?.data?.items as BoardTemplateType[];

    const getTemplates = () => {
        dispatch(getAction({ boardTemplates: Urls.board_templates }));
    }

    useEffect(() => {
        getTemplates();
    }, [])

    return (
        <div>
            <div className="flex mx-6 items-center justify-between min-h-10 gap-3 ">
                <div className="flex gap-3 items-center">
                    <div
                        onClick={() => navigate("/settings")}
                        className="flex  hover:text-[#3E72F8] items-center gap-3 cursor-pointer"
                    >
                        <div className="mt-0.5">
                            <TbSettingsFilled className="size-5" />
                        </div>
                        <div className="text-[#737377] text-xl font-medium">Settings</div>
                    </div>

                    <div className="items-center flex mt-1">
                        <MdKeyboardArrowRight className="size-5 text-[#737377] " />
                    </div>
                    <div className="text-xl">Board Templates</div>
                </div>
                <div>
                    <Button onClick={() => setFormView({ showForm: true, isUpdate: false, defaultValues })}>Create Template</Button>
                </div>
            </div>
            <div className="ml-6 mr-6 my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                {templateList?.map(template => {
                    const cardbg = `from-[#06B6D4]`
                    return (
                        <div key={template?._id} className={`bg-[#E9F2FF] dark:bg-[#16181D]  bg-gradient-to-r ${cardbg} hover:shadow-inner shadow-md rounded-lg min-h-20 flex flex-col gap-1 p-2`}>
                            <div className="text-xs capitalize py-0.5 px-2 rounded bg-white dark:bg-[#16181D] max-w-min">Template</div>
                            <div className="font-bold capitalize  text-white line-clamp-2">{template?.title}</div>
                            <div className="flex justify-end">
                                <Button size="sm" variant="ghost" className="hover:text-primary text-gray-700 dark:text-white"><MdRemoveRedEye className="size-4" /></Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="hover:text-primary text-gray-700 dark:text-white"
                                    onClick={() => setFormView({ showForm: true, isUpdate: true, defaultValues: { title: template?.title } })}
                                >
                                    <MdEdit className="size-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:text-destructive text-destructive"><MdDelete className="size-4" /></Button>
                            </div>
                        </div>
                    )
                })}

                {templateList?.map(template => {
                    const cardbg = `from-[#6366F1]`
                    return (
                        <div key={template?._id} className={`bg-[#E9F2FF] dark:bg-[#16181D] bg-gradient-to-r ${cardbg} hover:shadow-inner shadow-md rounded-lg min-h-20 flex flex-col gap-1 p-2`}>
                            <div className="text-xs capitalize py-0.5 px-2 rounded bg-white dark:bg-[#16181D] max-w-min">Template</div>
                            <div className="font-bold capitalize text-white">{template?.title}</div>
                            <div className="flex justify-end">
                                <Button size="sm" variant="ghost" className="hover:text-primary text-gray-700 dark:text-white"><MdRemoveRedEye className="size-4" /></Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="hover:text-primary text-gray-700 dark:text-white"
                                    onClick={() => setFormView({ showForm: true, isUpdate: true, defaultValues: { title: template?.title } })}
                                >
                                    <MdEdit className="size-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:text-destructive text-destructive"><MdDelete className="size-4" /></Button>
                            </div>
                        </div>
                    )
                })}
            </div>

            <HYModal
                showCloseButton
                open={formView.showForm}
                handleClose={() => setFormView({ showForm: false })}
                content={
                    <TemplateCreationForm
                        getTemplates={getTemplates}
                        isUpdate={formView.isUpdate}
                        defaultValues={formView?.defaultValues}
                        handleClose={() => setFormView({ showForm: false })}
                    />
                }
            />
        </div>
    );
};
export default BoardTemplates;


interface TemplateCreationFormProps {
    defaultValues: any;
    isUpdate?: boolean;
    handleClose: () => void;
    getTemplates: () => void;
}

const TemplateCreationForm: React.FC<TemplateCreationFormProps> = ({ defaultValues, isUpdate = false, getTemplates, handleClose }) => {

    const { register, handleSubmit, reset, setValue, getValues, control, formState: { errors }, } = useForm({ defaultValues });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "stages",
    });
    // const { update } = useFieldArray({ name: 'stages' });


    const handleTemplateCreation = (values) => {
        console.log("🚀 ~ handleTemplateCreation ~ values:", values);
        // handleClose()
        // getTemplates();
    }


    const handleTemplateUpdate = (values) => {
        console.log("🚀 ~ handleTemplateUpdate ~ values:", values)
        // handleClose()
        // getTemplates();
    }


    const handleRemoveStage = (order: number) => {
        if (getValues("stages")?.length <= 2) {
            toast.warning("Delete not possible", { description: "Atleast 2 columns needed for a board templates" });
        } else {
            remove(order)
        }
    }



    return (
        <div>
            <div className="font-semibold">{isUpdate ? "Update" : "Create"} Template</div>
            <div>
                <form onSubmit={handleSubmit(isUpdate ? handleTemplateUpdate : handleTemplateCreation)}>
                    <div className="py-3 space-y-2">
                        <div>
                            <Label>Title</Label>
                            <Input required {...register("title", { required: true })} className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label>Stages</Label>
                            </div>
                            <div className="space-y-2">
                                {fields?.map((stage, i) => {
                                    return (
                                        <div key={stage?.id} draggable className="border rounded flex items-center p-1  text-xs">
                                            <div className="pl-1">
                                                <RiDraggable className="size-4 cursor-grab" />
                                            </div>
                                            <div className="grid grid-cols-2 w-full px-2">
                                                <div className="flex items-center w-full ">
                                                    <Input
                                                        autoComplete="off"
                                                        type="text"
                                                        {...register(`stages.${i}.name`)}
                                                        className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-xs"
                                                    />
                                                </div>
                                                <div className="flex justify-end">
                                                    <div className="w-1/2">
                                                        <Input
                                                            type="color"
                                                            {...register(`stages.${i}.color`)}
                                                            className="cursor-pointer border-0"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                type="button"
                                                variant="ghost"
                                                onClick={() => handleRemoveStage(i)}
                                                className="cursor-pointer hover:text-destructive"
                                            >
                                                <HiXMark />
                                            </Button>
                                        </div>
                                    )
                                })}
                                <Button
                                    size="sm"
                                    type="button"
                                    variant="outline"
                                    className="border-primary"
                                    onClick={() => append({
                                        name: `Column - ${getValues("stages")?.length + 1}`,
                                        color: "#ffffff",
                                        order: (getValues("stages")?.length + 1).toString()
                                    })}
                                >
                                    <HiPlus className="text-primary strok-2 size-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 flex justify-end w-full">
                        <Button>{isUpdate ? "Update" : "Save"}</Button>
                    </div>
                </form>
            </div >
        </div >
    )
}
