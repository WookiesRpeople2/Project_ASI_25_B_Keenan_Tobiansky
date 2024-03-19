import prismaDb from "@/lib/prisma"
import { ParkApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(ParkApiBody, async (req, res, params) => {
  if (req.method === "GET") {
    const park = await prismaDb.park.findFirst({
      where: {
        locationId: params.locationId,
      },
    })

    if (!park) {
      return res.status(404).json("Error not found")
    }
    return res.status(200).json(park)
  }

  if (req.method === "POST") {
    const { parkType, isPublic, freeOrPaid } = await req.body
    const location = await prismaDb.park.create({
      data: {
        parkType,
        isPublic,
        freeOrPaid,
        locationId: params.locationId,
      },
    })

    return res.status(200).json(location)
  }

  return Promise.resolve()
})

export default handler
