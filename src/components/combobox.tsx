"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronsDownUp, ChevronsRight } from "lucide-react"

type ComboboxObject = {
  value: string
  label: string
}

type ComboboxProps = {
  selectValues: ComboboxObject[]
  onClick: (value: string) => void
  defaultValue: string
}

export const Combobox: React.FC<ComboboxProps> = ({
  selectValues,
  defaultValue,
  onClick,
}) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? selectValues.find((selectValue) => selectValue.value === value)
                ?.label
            : defaultValue}
          <ChevronsDownUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {selectValues.map((selectValue) => (
              <CommandItem
                key={selectValue.value}
                value={selectValue.value}
                onSelect={(currentValue) => {
                  const getValue = currentValue === value ? "" : currentValue
                  setValue(getValue)
                  setOpen(false)
                  onClick(getValue)
                }}
              >
                <ChevronsRight
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === selectValue.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {selectValue.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
