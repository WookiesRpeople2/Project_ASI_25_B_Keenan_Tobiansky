import React from "react"
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
import { useAtom } from "jotai"
import { openAtom, valueAtom } from "@/atoms/atoms"
import { useTranslations } from "next-intl"

type ComboboxProps = {
  onClick: (_value: string) => void
}

const initialValues = [
  { label: "Restaurant", value: "restaurant" },
  { label: "Bar", value: "bar" },
  { label: "Park", value: "park" },
  { label: "Museum", value: "museum" },
]

export const Combobox: React.FC<ComboboxProps> = ({ onClick }) => {
  const [open, setOpen] = useAtom(openAtom)
  const [_value, setValue] = useAtom(valueAtom)
  const t = useTranslations()

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
            : t("ComboBox.filter")}
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
              {t(`ComboBox.tabs.${selectValue.value}`)}
            </CommandItem>
          ))}
        </CommandCustom>
      </PopoverContent>
    </Popover>
  )
}
