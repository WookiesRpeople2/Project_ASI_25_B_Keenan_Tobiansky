import { LocationFormSchema } from "@/schemas/zod_schemas"
import { z } from "zod"
import { create } from "zustand"

type Location = z.infer<typeof LocationFormSchema>

type State = {
  location: Location
}

type Actions = {
  setLocation: (location: State["location"]) => void
}

export const useLocalLocationStore = create<State & Actions>((set) => ({
  location: {} as Location,
  setLocation: (location) => set(() => ({ location })),
}))
