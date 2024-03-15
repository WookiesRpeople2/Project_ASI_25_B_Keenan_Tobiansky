export type Restaurant = {
  cuisine: string
  stars: number
  avgPrice: number
}

export type Museum = {
  artisticMovement: string
  artType: string
  freeOrPaid: number
}

export type Bar = {
  barType: string
  avgPrice: number
}

export type Park = {
  parkType: string
  isPublic: boolean
  freeOrPaid: number
}

export type Fields = {
  Restaurant: Restaurant
  Museum: Museum
  Bar: Bar
  Park: Park
}

export type GenericKeyOfType<
  T extends Record<string, any>,
  K extends keyof T,
> = K

export type OptionsHandler<P> = {
  params: P
}
