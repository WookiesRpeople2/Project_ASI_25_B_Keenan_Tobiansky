import { Location } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import React from "react"

type LocationCardProps = {
  location: Location
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location: { name, type, address, city, country, zipCode },
}) => (
  <div className="transition-transform transform hover:scale-125">
    <div className="h-full w-full rounded-md backdrop-filter backdrop-blur-sm bg-white p-8 shadow-lg">
      <h1 className="text-2xl font-bold mb-4">{name}</h1>
      <h2>{address}</h2>
      <h3>{city}</h3>
      <h4>{country}</h4>
      <h5>{zipCode}</h5>
      <Badge className="mt-2">{type}</Badge>
    </div>
  </div>
)
