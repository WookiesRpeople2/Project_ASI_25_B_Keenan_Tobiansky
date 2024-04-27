import prismaDb from "@/lib/prisma"
import { validateZod } from "@/middleware/ValidateZod"
import { serialize } from "@/middleware/serialize"

const handler = validateZod(async (req, res) => {
  if (req.method === "GET") {
    const locations = await prismaDb.location.findMany({ take: 10 })

    return res.status(200).json(locations)
  }

  if (req.method === "POST") {
    try {
      const {
        name,
        address,
        city,
        zipCode,
        country,
        coordinates,
        type,
        ...locationData
      } = req.body
      const createdLocation = await prismaDb.location.create({
        data: {
          name,
          address,
          city,
          zipCode,
          country,
          coordinates,
          type,
          [type.toLowerCase()]: {
            create: locationData,
          },
        },
        include: {
          [type.toLowerCase()]: true,
        },
      })

      return res
        .status(200)
        .json(serialize(createdLocation, ["id", "locationId"]))
    } catch (error) {
      return res
        .status(412)
        .json("Please check that the form is filled in properly")
    }
  }

  return Promise.resolve()
})

export default handler
