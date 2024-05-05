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
import { useTranslations } from "next-intl"

type ParkFormProps = {
  form: any
}

export const ParkForm: React.FC<ParkFormProps> = ({ form }) => {
  const t = useTranslations()

  return (
    <>
      <FormField
        name="parkType"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.parkType")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("LocationForm.fields.parkType")}
                {...field}
              />
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
            <FormLabel>{t("LocationForm.fields.isPublic")}</FormLabel>
            <FormControl>
              <Switch onCheckedChange={(checked) => field.onChange(checked)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="freeOrPaid"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.freeOrPaid")}</FormLabel>
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
}
