import { Combobox } from "@/components/combobox/combobox"
import { Title } from "@/components/title"
import { LocationCard } from "@/components/locationCard"
import { Parallax } from "@/components/parallax"
import { fetchios } from "@/lib/utils"
import { useAtom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"
import { locationsAtom } from "@/atoms/atoms"
import React, { useCallback, useEffect } from "react"
import { useTranslations } from "next-intl"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { TypeOfLocation } from "../types"

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const { data } = await fetchios.get("locations")

  return {
    props: {
      data,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  }
}

type HomePageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  useHydrateAtoms([[locationsAtom, data]])
  const [locations, setLocations] = useAtom(locationsAtom)
  useEffect(() => {
    setLocations(data)
  }, [data])
  const t = useTranslations()
  const handleChange = (value: string) => {
    setLocations(filteredLocations(value))
  }
  console.log("reload")
  const filteredLocations = useCallback(
    (filterValue: string) => {
      if (!filterValue) {
        return data
      }

      return data.filter(
        ({ type }: { type: TypeOfLocation }) =>
          type.toLowerCase() === filterValue,
      )
    },

    [data],
  )

  return (
    <>
      <div className="relative">
        <Parallax
          text="WSG"
          className="w-full h-screen"
          imageUrl={[`/HomePageImage.jpg`, `/HomePageImageCut.png`]}
        />
      </div>
      <div className="px-20">
        <Title title={t("Home.title")} description={t("Home.description")} />
        <Combobox onClick={handleChange} />
      </div>
      <div className="grid grid-rows-4 grid-cols-3 gap-20 px-20 py-6">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </>
  )
}

export default HomePage
