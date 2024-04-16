import { useState } from "react"
import { FormLabel } from "../ui/form"
import { Slider } from "../ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

type SliderFieldProps = {
  maxValue: number
  minValue: number
  defaultValue: number
  onValueChange: (value: number) => void
}

export const SliderField: React.FC<SliderFieldProps> = ({
  minValue,
  maxValue,
  defaultValue,
  onValueChange,
}) => {
  const [value, setValue] = useState<number>(defaultValue)
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Slider
              defaultValue={[defaultValue]}
              min={minValue}
              max={maxValue}
              step={1}
              onValueChange={(value) => {
                onValueChange(value[0])
                setValue(value[0])
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{value}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
