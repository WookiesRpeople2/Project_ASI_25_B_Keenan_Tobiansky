import { sliderAtom } from "@/atoms/atoms"
import { useAtom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"
import React from "react"
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
  onValueChange: (_value: number) => void
}

export const SliderField: React.FC<SliderFieldProps> = ({
  minValue,
  maxValue,
  defaultValue,
  onValueChange,
}) => {
  useHydrateAtoms([[sliderAtom, defaultValue]])
  const [sliderValue, setSliderValue] = useAtom(sliderAtom)

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
                setSliderValue(value[0])
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{sliderValue}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
