/* eslint-disable camelcase */
import { z } from "zod"

// ***************************
//         Backend
// ***************************

export const LocationApiBody = z.object({
  type: z.string({ required_error: "Please enter a type" }),
  name: z.string({ required_error: "Please enter a name" }),
  address: z.string({ required_error: "Please enter an address" }),
  city: z.string({ required_error: "Please enter a city" }),
  zipCode: z.string({ required_error: "Please enter a zipCode" }),
  country: z.string({ required_error: "Please enter a country" }),
  coordinates: z
    .number({ required_error: "Please enter the coordinates" })
    .array(),
})

export const typeOfSchema = {
  Restaurant: LocationApiBody.extend({
    cuisine: z.string({ required_error: "Cuisine is required" }),
    stars: z.number({ required_error: "Stars are required" }).int(),
    avgPrice: z.number({ required_error: "avgPrice is required" }),
  }),
  Park: LocationApiBody.extend({
    parkType: z.string({ required_error: "Parktype is required" }),
    isPublic: z.boolean({ required_error: "isPublic is required" }),
    freeOrPaid: z.number({ required_error: "FreeOrPaid is required" }),
  }),
  Museum: LocationApiBody.extend({
    artisticMovement: z.string({
      required_error: "ArtisticMovement is required",
    }),
    artType: z.string({ required_error: "artType is required" }),
    freeOrPaid: z.number({ required_error: "FreeOrPaid is required" }),
  }),
  Bar: LocationApiBody.extend({
    barType: z.string(),
    avgPrice: z.number(),
  }),
}

// ***************************
//         FrontEnd
// ***************************

export const LocationFormSchema = z.object({
  type: z.string().nullable(),
  name: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  country: z.string().min(1),
  coordinates: z.coerce.number().array().min(1),
})

export const typeOfFormSchema = {
  Restaurant: LocationFormSchema.extend({
    cuisine: z.string().min(1),
    stars: z.coerce.number(),
    avgPrice: z.number().gte(0),
  }),
  Park: LocationFormSchema.extend({
    parkType: z.string().min(1),
    isPublic: z.boolean(),
    freeOrPaid: z.number(),
  }),
  Museum: LocationFormSchema.extend({
    artisticMovement: z.string().min(1),
    artType: z.string().min(1),
    freeOrPaid: z.number(),
  }),
  Bar: LocationFormSchema.extend({
    barType: z.string().min(1),
    avgPrice: z.number(),
  }),
}

export const RestaurantFormSchema = z.object({
  cuisine: z.string(),
  stars: z.coerce.number(),
  avgPrice: z.number(),
})

export const ParkFormSchema = z.object({
  parkType: z.string(),
  isPublic: z.boolean(),
  freeOrPaid: z.coerce.number(),
})

export const MuseumFormSchema = z.object({
  artisticMovement: z.string(),
  artType: z.string(),
  freeOrPaid: z.number(),
})

export const BarFormschema = z.object({
  barType: z.string(),
  avgPrice: z.number(),
})
