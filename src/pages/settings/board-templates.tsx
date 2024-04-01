import { toast } from "sonner";
import { RiDraggable } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { HiPlus, HiXMark } from "react-icons/hi2";
import { TbSettingsFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { MdEdit, MdKeyboardArrowRight, MdRemoveRedEye, MdDelete } from "react-icons/md";

import { cn } from "@/lib/utils";
import Urls from "@/redux/actions/Urls";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BoardTemplateType } from "@/interfaces";
import HYModal from "@/components/hy-components/HYModal";
import HYAlertDialog from "@/components/hy-components/HYAlertDialog";
import { deleteAction, getAction, patchAction, postAction, reducerNameFromUrl } from "@/redux/actions/AppActions";

interface BoardFormProps {
    showForm: boolean;
    isUpdate: boolean;
    templateId?: string;
    defaultValues: {
        title: string;
        stages?: {
            name: string;
            order?: string;
            color?: string;
            is_backlog?: boolean;
        }[];
    };
};

const BoardTemplates = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const reducerName = reducerNameFromUrl("boardTemplates", "GET");
    const templateList = useSelector((state: any) => state?.[reducerName])?.data?.items as BoardTemplateType[];

    /*  ######################################################################################## */

    const defaultValues = {
        title: "",
        stages: [
            { name: "Todo", color: "#2db6c8" },
            { name: "Ongoing", color: "#616ae5" },
            { name: "Done", color: "#47d785" }
        ]
    };

    const [formView, setFormView] = useReducer((prev: BoardFormProps, next: Partial<BoardFormProps>) => ({ ...prev, ...next }),
        { showForm: false, isUpdate: false, defaultValues }
    );

    /*  ######################################################################################## */

    const getTemplates = () => {
        dispatch(getAction({ boardTemplates: Urls.board_templates + "?expand=stages" }));
    }

    const handleTemplateDelete = (tempId: string) => {
        (dispatch(deleteAction(Urls.board_templates, tempId)) as any).then((res) => {
            if (res?.payload?.status === 200) {
                getTemplates();
            }
        })

    }

    const bgColor = ["from-[#6366F1]", "from-[#06B6D4]", "from-[#099a97]", "from-[#7a57d1]"];

    /*  ######################################################################################## */

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
            <div className="ml-6 mr-6 my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {templateList?.map((template, i) => {

                    const stages = template?.stages?.
                        map((template, i) => ({ _id: template?._id, color: template?.color, name: template?.name, order: template?.order }))?.
                        sort((a, b) => a?.order - b?.order);

                    return (
                        <div
                            key={template?._id}
                            className={cn(`bg-gray-200 dark:bg-[#16181D]  bg-gradient-to-r hover:shadow-inner shadow-md rounded-lg min-h-20 flex flex-col gap-1 p-3`, `${bgColor?.[i % 4]}`)}
                        >
                            <div className="flex justify-end">
                                {/* <Button size="sm" variant="ghost" className="hover:text-primary text-gray-700 dark:text-white"><MdRemoveRedEye className="size-4" /></Button> */}
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="hover:text-primary text-gray-700 dark:text-white"
                                    onClick={() => {
                                        setFormView({
                                            showForm: true,
                                            isUpdate: true,
                                            templateId: template?._id,
                                            defaultValues: {
                                                title: template?.title,
                                                stages
                                            }
                                        })
                                    }}
                                >
                                    <MdEdit className="size-4" />
                                </Button>
                                <HYAlertDialog submitAction={() => handleTemplateDelete(template?._id)}>
                                    <Button size="sm" variant="ghost" className="hover:text-destructive text-destructive">
                                        <MdDelete className="size-4" />
                                    </Button>
                                </HYAlertDialog>
                            </div>
                            <div className="text-xs capitalize py-0.5 px-2 rounded bg-white/50 dark:bg-[#16181D] max-w-min">Template</div>
                            <div className="font-semibold capitalize text-white line-clamp-2 ">{template?.title}</div>
                            <div className=" capitalize text-xs text-white line-clamp-2 w-3/4">description
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
                        templateId={formView?.templateId}
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
    templateId?: string;
    defaultValues: any;
    isUpdate?: boolean;
    handleClose: () => void;
    getTemplates: () => void;
}

const TemplateCreationForm: React.FC<TemplateCreationFormProps> = ({ defaultValues, isUpdate = false, templateId, getTemplates, handleClose }) => {

    const dispatch = useDispatch();

    const { register, handleSubmit, reset, setValue, getValues, control, formState: { errors }, } = useForm({ defaultValues });
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({ control, name: "stages" });

    /*  ######################################################################################## */

    const handleTemplateCreation = (values) => {

        const postData = {
            ...values, stages: values?.stages?.map((stage, i) => ({ ...stage, order: (i + 1).toString() }))
        };

        (dispatch(postAction({ boardTemplates: Urls.board_templates }, postData)) as any).then((res) => {
            if (res?.payload?.status === 200) {
                handleClose();
                getTemplates();
            }
        })
    }


    const handleTemplateUpdate = (values) => {
        const postData = {
            title: values.title,
            ...values, stages: values?.stages?.map((stage, i) => ({ ...stage, order: (i + 1).toString() }))
        };

        (dispatch(patchAction({ boardTemplates: Urls.board_templates }, postData, templateId)) as any).then((res) => {
            if (res?.payload?.status === 200) {
                handleClose();
                getTemplates();
            }
        })
    }


    const handleRemoveStage = (order: number) => {
        if (getValues("stages")?.length <= 2) {
            toast.warning("Delete not possible", { description: "Atleast 2 columns needed for a board templates" });
        } else { remove(order) }
    }

    /*  ######################################################################################## */



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
                                        <div
                                            key={stage?.id}
                                            draggable
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                swap(i, parseInt(e?.dataTransfer?.getData("column_id")));
                                            }}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDragStart={(e) => { e.dataTransfer.setData("column_id", (i).toString()) }}
                                            className="border rounded flex items-center p-1  text-xs"
                                        >
                                            <div className="pl-1">
                                                <RiDraggable className="size-4 cursor-grab" />
                                            </div>
                                            <div className="grid grid-cols-2 w-full px-2">
                                                <div className="flex items-center w-full ">
                                                    <Input
                                                        type="text"
                                                        autoComplete="off"
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
                                            {!isUpdate &&
                                                <Button
                                                    size="sm"
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() => handleRemoveStage(i)}
                                                    className="cursor-pointer hover:text-destructive"
                                                >
                                                    <HiXMark />
                                                </Button>
                                            }
                                        </div>
                                    )
                                })}
                                {!isUpdate &&
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
                                }
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
