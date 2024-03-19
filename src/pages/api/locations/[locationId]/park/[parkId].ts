import prismaDb from "@/lib/prisma"
import { ParkApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(ParkApiBody, async (req, res, params) => {
  const park = await prismaDb.park.findFirst({
    where: {
      id: params.parkId,
    },
  })

  if (!park) {
    return res.status(404).json("Error not found")
  }

  if (req.method === "POST") {
    const data = await req.body
    const location = await prismaDb.park.create({
      data,
    })

    return res.status(200).json(location)
  }

  if (req.method === "PATCH") {
    const data = await req.body
    const updatedPark = await prismaDb.restaurant.update({
      where: {
        id: params.parkId,
        locationId: params.locationId,
      },
      data,
    })

    if (!updatedPark) {
      return res.status(500).json("Unable to update")
    }

    return res.status(200).json(updatedPark)
  }

  if (req.method === "DELETE") {
    const deletedPark = await prismaDb.restaurant.delete({
      where: {
        id: params.parkId,
        locationId: params.locationId,
      },
    })

    if (!deletedPark) {
      return res.status(500).json("Unable to delete")
    }

    return res.status(200).json(deletedPark)
  }

  return Promise.resolve()
})

export default handler
