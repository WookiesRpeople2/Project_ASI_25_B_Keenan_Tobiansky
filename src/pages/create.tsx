import { tabAtom } from "@/atoms/atoms"
import { FormSchema, LocationForm } from "@/components/forms/locationForm"
import { Title } from "@/components/title"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { types } from "@/components/forms/utils"
import { TypeOfLocation } from "@/types"
import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { GetServerSideProps } from "next"
import { useForm } from "react-hook-form"
import { typeOfFormSchema } from "@/schemas/zod_schemas"
import { zodResolver } from "@hookform/resolvers/zod"

export const getServerSideProps = (async ({ locale }) => ({
  props: {
    messages: (await import(`../../messages/${locale}.json`)).default,
  },
})) satisfies GetServerSideProps
const extraFields = {
  cuisine: "",
  stars: 0,
  avgPrice: 0.1,
  parkType: "",
  isPublic: false,
  freeOrPaid: 0,
  artisticMovement: "",
  artType: "",
  barType: "",
}
const Create = () => {
  const [activeTab, setActiveTab] = useAtom(tabAtom)
  const t = useTranslations()
  const form = useForm<FormSchema>({
    resolver: zodResolver(typeOfFormSchema[activeTab]),
    defaultValues: {
      type: activeTab,
      name: "",
      address: "",
      city: "",
      zipCode: "",
      country: "",
      coordinates: [0, 0],
      ...extraFields,
    },
  })
  const handleOnValuechange = (value: TypeOfLocation) => {
    form.reset({
      type: value,
      name: "",
      address: "",
      city: "",
      zipCode: "",
      country: "",
      coordinates: [0, 0],
      ...extraFields,
    })
    setActiveTab(value)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title title={t("Create.title")} />
      <Tabs
        onValueChange={(value) => handleOnValuechange(value as TypeOfLocation)}
        defaultValue="Restaurant"
        className="w-2/4"
      >
        <TabsList className="flex justify-center items-center">
          {types.map((type, index) => (
            <TabsTrigger key={index} value={type}>
              {t(`Create.tab.${type}`)}
            </TabsTrigger>
          ))}
        </TabsList>
        <LocationForm type={activeTab} form={form} />
      </Tabs>
    </div>
  )
}

export default Create
