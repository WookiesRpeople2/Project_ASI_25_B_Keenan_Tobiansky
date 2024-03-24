/* eslint-disable camelcase */
import { z } from "zod"

// ***************************
// Backend
// ***************************

export const typeOfSchema = {
  restaurant: z.object({
    cuisine: z.string({ required_error: "Cuisine is required" }),
    stars: z.number({ required_error: "Stars are required" }).int(),
    avgPrice: z.number({ required_error: "avgPrice is required" }),
  }),
  park: z.object({
    parkType: z.string({ required_error: "Parktype is required" }),
    isPublic: z.boolean({ required_error: "isPublic is required" }),
    freeOrPaid: z.number({ required_error: "FreeOrPaid is required" }),
  }),
  museum: z.object({
    artisticMovement: z.string({
      required_error: "ArtisticMovement is required",
    }),
    artType: z.string({ required_error: "artType is required" }),
    freeOrPaid: z.number({ required_error: "FreeOrPaid is required" }),
  }),
  bar: z.object({
    barType: z.string(),
    avgPrice: z.number(),
  }),
}

export const LocationApiBody = z.object({
  type: z.string({ required_error: "Please enter a type" }),
  name: z.string({ required_error: "Please enter a name" }),
  address: z.string({ required_error: "Please enter an address" }),
  city: z.string({ required_error: "Please enter a city" }),
  zipCode: z.string({ required_error: "Please enter a zipCode" }),
  country: z.string({ required_error: "Please enter a country" }),
})
