import React from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SliderField } from "../sildeField"
import { useTranslations } from "next-intl"

type BarFormProps = {
  form: any
}

export const BarForm: React.FC<BarFormProps> = ({ form }) => {
  const t = useTranslations()

  return (
    <>
      <FormField
        name="barType"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.barType")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("LocationForm.fields.barType")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="avgPrice"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.avgPrice")}</FormLabel>
            <FormControl>
              <SliderField
                maxValue={5}
                minValue={0.1}
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
