import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CommandItem } from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronsUpDown, ChevronsRight } from "lucide-react"
import { CommandCustom } from "./commandCustom"

type ComboboxProps = {
  onClick: (_value: string) => void
  defaultValue: string
}

const initialValues = [
  { label: "Restaurant", value: "restaurant" },
  { label: "Bar", value: "bar" },
  { label: "Park", value: "park" },
  { label: "Museum", value: "museum" },
]

export const Combobox: React.FC<ComboboxProps> = ({
  defaultValue,
  onClick,
}) => {
  const [open, setOpen] = useState(false)
  const [_value, setValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {_value
            ? initialValues.find((selectValue) => selectValue.value === _value)
                ?.label
            : defaultValue}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <CommandCustom>
          {initialValues.map((selectValue) => (
            <CommandItem
              key={selectValue.value}
              value={selectValue.value}
              onSelect={(currentValue) => {
                const getValue = currentValue === _value ? "" : currentValue
                setValue(getValue)
                setOpen(false)
                onClick(getValue)
              }}
            >
              <ChevronsRight
                className={cn(
                  "ml-auto h-4 w-4",
                  _value === selectValue.value ? "opacity-100" : "opacity-0",
                )}
              />
              {selectValue.label}
            </CommandItem>
          ))}
        </CommandCustom>
      </PopoverContent>
    </Popover>
  )
}
