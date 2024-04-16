import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useLocalLocationStore } from "@/hooks/useLocalLocationStore"
import { RestaurantFormSchema } from "@/schemas/zod_schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Control, useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { SliderField } from "../sildeField"

type FormSchema = z.infer<typeof RestaurantFormSchema>

type RestaurantFormProps = {
  form: any
}

export const RestaurantForm: React.FC<RestaurantFormProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="cuisine"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Speciality</FormLabel>
            <FormControl>
              <Input placeholder="French" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="stars"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Stars</FormLabel>
            <FormControl>
              <SliderField
                maxValue={3}
                minValue={0}
                defaultValue={form.watch("stars")}
                onValueChange={(value) => field.onChange(value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="avgPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Speciality</FormLabel>
            <FormControl>
              <SliderField
                maxValue={5}
                minValue={1}
                defaultValue={form.watch("avgPrice")}
                onValueChange={(value) => field.onChange(value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
