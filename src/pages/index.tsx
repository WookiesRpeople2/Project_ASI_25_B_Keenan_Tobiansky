import { Combobox } from "@/components/combobox/combobox"
import { Title } from "@/components/title"
import { LocationCard } from "@/components/locationCard"
import { Parallax } from "@/components/parallax"
import { useLocations } from "@/hooks/useLocations"
import { fetchios } from "@/lib/utils"
import { Location } from "@prisma/client"
import { useEffect } from "react"

export const getServerSideProps = async () => {
  try {
    const { data } = await fetchios.get("locations")

    return { props: { data } }
  } catch (error) {
    return { props: { data: error } }
  }
}
const HomePage = ({ data }: { data: Location[] }) => {
  const { state, dispatch } = useLocations()
  useEffect(() => {
    dispatch({ type: "SET_LOCATIONS", payload: data })
  }, [dispatch, data])
  const handleChange = (value: string) => {
    const filteredLocations = value
      ? data.filter((location) => location.type.toLowerCase() === value)
      : data
    dispatch({ type: "SET_LOCATIONS", payload: filteredLocations })
  }

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
        <Title
          title="Locations"
          description="see all of the registered locations"
        />
        <Combobox onClick={handleChange} defaultValue="filter" />
      </div>
      <div className="grid grid-rows-4 grid-cols-3 gap-20 px-20 py-6">
        {state.locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </>
  )
}

export default HomePage
