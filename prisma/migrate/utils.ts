import { randAddress } from "@ngneat/falso"
import { randCompanyName } from "@ngneat/falso"
import prismaDb from "../../../locations/src/lib/prisma"
import { Fields } from "../../types"
import { Prisma } from "@prisma/client"

export const randn = (max: number) => Math.floor(Math.random() * max)

export const prepareData = async (types: Array<string>) => {
  const { street, ...info } = randAddress({
    includeCountry: true,
    includeCounty: false,
  })
  const name = randCompanyName()
  const typeIndex = randn(types.length)

  const location = {
    type: types[typeIndex],
    name,
    address: street,
    ...info,
  }

  const res = await prismaDb.location.create({
    data: location as Prisma.LocationCreateInput,
  })
  return res
}

export const typeOfPlace = async (
  locationId: string,
  type: string,
  typeObj: Fields,
) => {
  const place = { locationId, ...typeObj[type as keyof typeof typeObj] }
  const db = type.toLowerCase()
  const prismaInstance: { [key: string]: any } = prismaDb

  await prismaInstance[db].create({ data: place })
}
