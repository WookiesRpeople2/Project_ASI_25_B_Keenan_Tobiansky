import { Heading } from "@/components/Heading"
import { LocationCard } from "@/components/locationCard"
import { Parallax } from "@/components/parallax"
import { useSetLocations } from "@/hooks/useSetLocations"
import { fetchios } from "@/lib/utils"
import { Location } from "@prisma/client"
import Link from "next/link"

export const getServerSideProps = async () => {
  try {
    const { data } = await fetchios.get("locations")

    return { props: { data } }
  } catch (error) {
    return { props: { data: error } }
  }
}

const HomePage = ({ data }: { data: Location[] }) => {
  const { locations } = useSetLocations(data)

  return (
    <>
      <div className="relative">
        <Parallax
          text="WSG"
          className="w-full h-screen"
          imageUrl={[`/HomePageImage.jpg`, `/HomePageImageCut.png`]}
        />
      </div>
      <Heading
        title="Locations"
        description="see all of the registered locations"
        className="px-20"
      />
      <div className="grid grid-rows-4 grid-cols-3 gap-20 px-20 py-2">
        {locations.map((location) => (
          <Link key={location.id} href={`/${location.id}/${location.type}`}>
            <LocationCard location={location} />
          </Link>
        ))}
      </div>
    </>
  )
}

export default HomePage
