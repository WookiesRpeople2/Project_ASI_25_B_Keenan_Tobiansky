import type { NextApiRequest, NextApiResponse } from "next"
import prismaDb from "@/lib/prisma"
import { ParkApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(
  ParkApiBody,
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { parkId, locationId } = req.query as {
      parkId: string
      locationId: string
    }
    const park = await prismaDb.park.findFirst({
      where: {
        id: parkId,
        locationId,
      },
    })

    if (!park) {
      return res.status(404).json("Error not found")
    }

    if (req.method === "GET") {
      return res.status(200).json(park)
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
          id: parkId,
          locationId,
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
          id: parkId,
          locationId,
        },
      })

      if (!deletedPark) {
        return res.status(500).json("Unable to delete")
      }

      return res.status(200).json(deletedPark)
    }

    return Promise.resolve()
  },
)

export default handler
