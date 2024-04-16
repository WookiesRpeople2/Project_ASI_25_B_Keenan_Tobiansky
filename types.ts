import { Restaurant, Bar, Museum, Park } from "@prisma/client"

export type Fields = {
  Restaurant: Restaurant
  Museum: Museum
  Bar: Bar
  Park: Park
}

export type ORFields = Restaurant | Bar | Museum | Park

export type GenericKeyOfType<
  T extends Record<string, any>,
  K extends keyof T,
> = K

export type OptionsHandler = {
  [key: string]: string
}
