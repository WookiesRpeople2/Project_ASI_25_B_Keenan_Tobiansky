import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react"
import { Slider } from "./ui/slider"

export const CustomSlider = () => {
  const [sliderValue, setSliderValue] = useState(0)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Slider
            defaultValue={[0]}
            max={3}
            step={1}
            onValueChange={(value) => setSliderValue(value[0])}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{sliderValue}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
