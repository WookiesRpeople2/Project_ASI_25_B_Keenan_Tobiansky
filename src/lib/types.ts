type Address = {
  house_number: string
  road: string
  village: string
  town: string
  county: string
  state: string
  "ISO3166-2-lvl6": string
  region: string
  "ISO3166-2-lvl4": string
  postcode: string
  country: string
  country_code: string
}

type BoundingBox = [string, string, string, string]

export type Resault = {
  place_id: number
  licence: string
  osm_type: string
  osm_id: number
  lat: string
  lon: string
  class: string
  type: string
  place_rank: number
  importance: number
  addresstype: string
  name: string
  display_name: string
  address: Address
  boundingbox: BoundingBox
}
