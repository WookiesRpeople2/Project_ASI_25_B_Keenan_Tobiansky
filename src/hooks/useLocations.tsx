import { useContext } from "react"
import { LocationsContext } from "@/context/locationsContext"

export const useLocations = () => {
  const context = useContext(LocationsContext)

  if (!context) {
    throw Error("no workspace Context")
  }

  return context
}
