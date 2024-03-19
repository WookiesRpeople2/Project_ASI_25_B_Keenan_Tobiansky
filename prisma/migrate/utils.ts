import { randAddress } from "@ngneat/falso"
import { randCompanyName } from "@ngneat/falso"
import prismaDb from "../../src/lib/prisma"
import { Fields, GenericKeyOfType } from "../../types"
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
  type: GenericKeyOfType<Fields, keyof Fields>,
  typeObj: Fields,
) => {
  const location = { locationId, ...typeObj[type] }
  const db = type.toLowerCase()
  const prismaInstance: { [key: string]: any } = prismaDb

  await prismaInstance[db].create({ data: location })
}
