import { tabAtom } from "@/atoms/atoms"
import { LocationForm } from "@/components/forms/locationForm"
import { Title } from "@/components/title"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { types } from "@/components/forms/utils"
import { TypeOfLocation } from "@/types"
import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    messages: (await import(`../../messages/${locale}.json`)).default,
  },
})
const Create = () => {
  const [activeTab, setActiveTab] = useAtom(tabAtom)
  const t = useTranslations()

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title title={t("Create.title")} />
      <Tabs
        onValueChange={(value) => setActiveTab(value as TypeOfLocation)}
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
        <LocationForm type={activeTab} />
      </Tabs>
    </div>
  )
}

export default Create
