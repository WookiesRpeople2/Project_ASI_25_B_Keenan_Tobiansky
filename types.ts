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

export type HTTPOptions<T> = {
  headers?: Record<string, string>
  body?: Record<string, T>
  mode?: string
  cache?: string
  credentials?: string
  redirect?: string
  referrerPolicy?: string
}
