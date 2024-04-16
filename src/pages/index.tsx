import { Combobox } from "@/components/combobox"
import { Heading } from "@/components/Heading"
import { LocationCard } from "@/components/locationCard"
import { Parallax } from "@/components/parallax"
import { useLocations } from "@/hooks/useLocations"
import { useSetLocations } from "@/hooks/useSetLocations"
import { fetchios } from "@/lib/utils"
import { Location } from "@prisma/client"
import Link from "next/link"
import { useEffect } from "react"

export const getServerSideProps = async () => {
  try {
    const { data } = await fetchios.get("locations")

    return { props: { data } }
  } catch (error) {
    return { props: { data: error } }
  }
}

const selectedValues = [
  { label: "Restaurant", value: "restaurant" },
  { label: "Bar", value: "bar" },
  { label: "Park", value: "park" },
  { label: "Museum", value: "museum" },
]

const HomePage = ({ data }: { data: Location[] }) => {
  const { state, dispatch } = useLocations()

  useEffect(() => {
    dispatch({ type: "SET_LOCATIONS", payload: data })
  }, [dispatch])

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
        <Heading
          title="Locations"
          description="see all of the registered locations"
        />
        <Combobox
          selectValues={selectedValues}
          onClick={handleChange}
          defaultValue="filter"
        />
      </div>
      <div className="grid grid-rows-4 grid-cols-3 gap-20 px-20 py-6">
        {state.locations.map((location) => (
          <Link
            key={location.id}
            href={`/locations/${location.id}/${location.type.toLowerCase()}`}
          >
            <LocationCard location={location} />
          </Link>
        ))}
      </div>
    </>
  )
}

export default HomePage
