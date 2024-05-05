import React from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"

type CommonFormFieldsProps = {
  form: any
}

export const CommonFormFields: React.FC<CommonFormFieldsProps> = ({ form }) => {
  const t = useTranslations()

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.name")}</FormLabel>
            <FormControl>
              <Input placeholder="Little Red robin hood" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.country")}</FormLabel>
            <FormControl>
              <Input placeholder="France" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.city")}</FormLabel>
            <FormControl>
              <Input placeholder="London" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.address")}</FormLabel>
            <FormControl>
              <Input placeholder="55 rue ..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="zipCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.zipCode")}</FormLabel>
            <FormControl>
              <Input placeholder="75012" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="coordinates.0"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.coordinates.0")}</FormLabel>
            <FormControl>
              <Input placeholder="0.99" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="coordinates.1"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.coordinates.1")}</FormLabel>
            <FormControl>
              <Input placeholder="0.2" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
