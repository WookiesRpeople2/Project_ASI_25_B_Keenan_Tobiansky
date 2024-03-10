import { randAddress } from "@ngneat/falso"
import { randCompanyName } from "@ngneat/falso"
import { PrismaClient } from "@prisma/client"

const prismaDb = new PrismaClient()

const types = ["Restaurant", "Museum", "Bar", "Park"]

const randn = (max) => Math.floor(Math.random() * max)

const prepareData = async () => {
  const { street, ...rand } = randAddress({
    includeCountry: true,
    includeCounty: false,
  })
  const name = randCompanyName()
  const typeIndex = randn(4)

  const location = { type: types[typeIndex], name, address: street, ...rand }

  const res = await prismaDb.location.create({
    data: {
      ...location,
    },
  })
  console.log(res)
  return res
}

;(async () => {
  for (let i = 0; i < 1; i++) {
    const data = await prepareData()
    // switch (data.type) {
    // case "Restaurant":
    // console.log("R", data)
    // break
    // case "Museum":
    // console.log("M", data)
    // break
    // case "Bar":
    // console.log("B", data)
    // break
    // case "Park":
    // console.log("P", data)
    // break
    // }
  }
})()
