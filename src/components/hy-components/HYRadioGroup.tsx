import React from 'react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


interface HYRadioGroupProps {
    className?: string
    defaultValue: string,
    onChange: (value: string) => void,
    radioGroups: { label: string, value: string }[]
}

const HYRadioGroup: React.FC<HYRadioGroupProps> = ({ defaultValue, onChange, radioGroups, className }) => {
    return (
        <RadioGroup defaultValue={defaultValue} onValueChange={onChange} className={className}>
            {radioGroups?.map(rd =>
                <div key={rd.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={rd.value} id={rd.value} />
                    <Label className='cursor-pointer' htmlFor={rd.value}>{rd?.label}</Label>
                </div>)
            }
        </RadioGroup>
    )
}

export default HYRadioGroup