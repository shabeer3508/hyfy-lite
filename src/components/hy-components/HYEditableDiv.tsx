import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { HiOutlinePencil } from "react-icons/hi";

interface HYEditableDivProps {
    className?: string
    defaultText: string,
    placeholder?: string,
    type?: "text" | "textarea",
    handleChange: (value) => void,
}

const HYEditableDiv = ({ defaultText, handleChange, className, placeholder, type = "text" }: HYEditableDivProps) => {
    const [text, setText] = useState(defaultText);
    const [isEditing, setIsEditing] = useState(false);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        handleChange(text);
    };

    return (
        <div className="flex items-center" >
            {isEditing ? (
                <>
                    {
                        type === "text" ?
                            <Input
                                type="text"
                                value={text}
                                className={`outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 p-0 h-auto ${className}`}
                                onChange={handleTextChange}
                                onBlur={handleBlur}
                                autoFocus
                            /> :
                            <Textarea
                                value={text}
                                className={`outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 p-0 h-auto ${className}`}
                                onChange={handleTextChange}
                                onBlur={handleBlur}
                                autoFocus
                            />
                    }

                </>
            ) : (
                <p className="whitespace-pre-line" onDoubleClick={handleDoubleClick}>{text ? text : placeholder}</p>
            )}

            {isEditing && type === "text" && <HiOutlinePencil className="text-gray-500" />}

        </div>
    );
}

export default HYEditableDiv