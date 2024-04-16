import { BarClient } from "@/components/places/barClient"
import { MuseumClient } from "@/components/places/museumClient"
import { ParkClient } from "@/components/places/parkClient"
import { RestaurantClient } from "@/components/places/restaurantClient"
import { fetchios } from "@/lib/utils"
import { Bar, Museum, Park, Restaurant, Location } from "@prisma/client"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { ParsedUrlQuery } from "querystring"

import dynamic from "next/dynamic"
const DynamicMap: any = dynamic(() => import("@/components/map/map"), {
  ssr: false,
})

type InitialValues = Location & {
  restaurant: Restaurant
  bar: Bar
  museum: Museum
  park: Park
}

export const getServerSideProps: GetServerSideProps<{
  data: InitialValues
  params?: ParsedUrlQuery
}> = async ({ params }: { params?: ParsedUrlQuery }) => {
  try {
    const { data }: { data: InitialValues } = await fetchios.get(
      `locations/${params?.locationId}`,
    )

    return {
      props: {
        data,
        params,
      },
    }
  } catch (error: any) {
    return {
      props: {
        data: error,
      },
    }
  }
}

type LocationPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const LocationPage: React.FC<LocationPageProps> = ({ data, params }) => {
  const { name, address, city, country, type, zipCode, coordinates, ...rest } =
    data
  const { bar, museum, park, restaurant } = rest

  const getClient = () => {
    switch (params?.type) {
      case "restaurant":
        return (
          <RestaurantClient
            cuisine={restaurant.cuisine}
            stars={restaurant.stars}
            avgPrice={restaurant.avgPrice}
          />
        )
      case "bar":
        return <BarClient barType={bar.barType} avgPrice={bar.avgPrice} />
      case "park":
        return (
          <ParkClient
            parkType={park.parkType}
            freeOrPaid={park.freeOrPaid}
            isPublic={park.isPublic}
          />
        )
      case "museum":
        return (
          <MuseumClient
            artisticMovement={museum.artisticMovement}
            artType={museum.artType}
            freeOrPaid={museum.freeOrPaid}
          />
        )
    }
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div>
        <h1 className="text-7xl font-bold mb-4">{name}</h1>
        <div className="ml-auto">
          <p className="text-gray-600">{address}</p>
          <p className="text-gray-600">
            {city}, {country}, {zipCode}
          </p>
          {getClient()}
        </div>
      </div>
      <div className="w-7/12 my-10">
        <DynamicMap
          name={name}
          coordinates={[coordinates[0], coordinates[1]]}
        />
      </div>
    </div>
  )
}

export default LocationPage
