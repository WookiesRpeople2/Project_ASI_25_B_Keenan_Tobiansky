import { Bar, Location, Museum, Park, Restaurant } from "@prisma/client"

export type TypeOfLocation = "Restaurant" | "Museum" | "Park" | "Bar"

export type TypeOfLocationLower = "bar" | "museum" | "restaurant" | "park"

export type LocationsTogether = Location & {
  restaurant?: Restaurant
  bar?: Bar
  museum?: Museum
  park?: Park
}
