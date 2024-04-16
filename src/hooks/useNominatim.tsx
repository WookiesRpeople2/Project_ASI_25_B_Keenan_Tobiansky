import { Fetchios } from "@/lib/fethios/fetchios"

export const useNominatim = async (search: string) => {
  const nominatim = new Fetchios("https://nominatim.openstreetmap.org/")

  const res = await nominatim.get(
    `search?q=${search}&format=json&polygon=1&addressdetails=1`,
  )

  if (res.statusCode !== 200) {
    throw new Error("An error occored")
  }

  const { data } = res

  return data
}
