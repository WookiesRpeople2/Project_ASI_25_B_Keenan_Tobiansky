import React, { createContext, ReactNode, useReducer } from "react"
import { Location } from "@prisma/client"

type State = {
  locations: Location[]
}

type Action =
  | { type: "SET_LOCATIONS"; payload: Location[] }
  | { type: "CREATE_LOCATIONS"; payload: Location }
  | { type: "UPDATE_LOCATIONS"; payload: Location }
  | { type: "DELETE_LOCATIONS"; payload: { id: string } }
  | {
      type: "FILTER_LOCATIONS"
      payload: { typeOfLocation: string }
    }

type Dispatch = (_action: Action) => void

export const LocationsContext = createContext<{
  state: State
  dispatch: Dispatch
} | null>(null)

export const LocationsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_LOCATIONS":
      return {
        ...state,
        locations: action.payload,
      }

    case "CREATE_LOCATIONS":
      return {
        ...state,
        locations: [action.payload, ...state.locations],
      }

    case "UPDATE_LOCATIONS":
      return {
        ...state,
        locations: state.locations.map((location) =>
          location.id === action.payload.id ? action.payload : location,
        ),
      }

    case "DELETE_LOCATIONS":
      return {
        ...state,
        locations: state.locations.filter(
          (location) => location.id !== action.payload.id,
        ),
      }

    case "FILTER_LOCATIONS":
      return {
        ...state,
        locations: state.locations.filter(
          (location) =>
            location.type.toLowerCase() === action.payload.typeOfLocation,
        ),
      }

    default:
      return state
  }
}

export const LocationsContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(LocationsReducer, {
    locations: [],
  })

  return (
    <LocationsContext.Provider value={{ state, dispatch }}>
      {children}
    </LocationsContext.Provider>
  )
}
