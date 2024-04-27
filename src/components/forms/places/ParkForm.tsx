import React from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { SliderField } from "../sildeField"

type ParkFormProps = {
  form: any
}

export const ParkForm: React.FC<ParkFormProps> = ({ form }) => (
  <>
    <FormField
      name="parkType"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Park Type</FormLabel>
          <FormControl>
            <Input placeholder="Amusement Park" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="isPublic"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-4">
            <FormLabel>Is public</FormLabel>
            <FormControl>
              <Switch onCheckedChange={(checked) => field.onChange(checked)} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="freeOrPaid"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <SliderField
              minValue={0}
              maxValue={5}
              defaultValue={form.watch("freeOrPaid")}
              onValueChange={(value) => field.onChange(value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
)
