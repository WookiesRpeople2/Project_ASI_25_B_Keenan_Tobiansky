import React from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "@/components/ui/command"

export const CommandCustom: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <Command>
    <CommandInput placeholder="Search..." className="h-9" />
    <CommandEmpty>No resaults found.</CommandEmpty>
    <CommandGroup>{children}</CommandGroup>
  </Command>
)
