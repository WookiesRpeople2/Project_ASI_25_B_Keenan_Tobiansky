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

type MuseumFormProps = {
  form: any
}

export const MuseumForm: React.FC<MuseumFormProps> = ({ form }) => {
  const t = useTranslations()

  return (
    <>
      <FormField
        name="artisticMovement"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.artisticMovement")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("LocationForm.fields.artisticMovement")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="artType"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.artType")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("LocationForm.fields.artType")}
                {...field}
              />
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
