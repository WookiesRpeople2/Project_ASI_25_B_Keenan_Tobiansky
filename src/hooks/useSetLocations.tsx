import { useEffect } from "react"
import { useLocations } from "./useLocations"
import { Location } from "@prisma/client"

export const useSetLocations = (data: Location[]) => {
  const { state, dispatch } = useLocations()
  useEffect(() => {
    dispatch({ type: "SET_LOCATIONS", payload: data })
  }, [dispatch])

  return state
}
