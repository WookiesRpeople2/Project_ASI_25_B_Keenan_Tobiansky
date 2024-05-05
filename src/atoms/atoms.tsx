import { TypeOfLocation } from "@/types"
import { atom } from "jotai"

export const locationsAtom = atom([
  {
    id: "",
    type: "",
    name: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    coordinates: [0],
  },
])

export const tabAtom = atom<TypeOfLocation>("Restaurant")

export const openAtom = atom(false)
export const valueAtom = atom("")

export const sliderAtom = atom<number>(0)
