import type { NextApiRequest, NextApiResponse } from "next"
import prismaDb from "@/lib/prisma"
import { RestaurantApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(
  RestaurantApiBody,
  async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    const { restaurantId, locationId } = req.query as {
      restaurantId: string
      locationId: string
    }
    const restaurant = await prismaDb.restaurant.findFirst({
      where: {
        id: restaurantId,
        locationId,
      },
    })

    if (!restaurant) {
      return res.status(404).json("Error not found")
    }

    if (req.method === "GET") {
      return res.status(200).json(restaurant)
    }

    if (req.method === "PATCH") {
      const data = await req.body
      const location = await prismaDb.restaurant.update({
        where: {
          id: restaurantId,
          locationId,
        },
        data,
      })

      if (!location) {
        return res.status(500).json("Unable to update")
      }

      return res.status(200).json(location)
    }

    if (req.method === "DELETE") {
      const location = await prismaDb.restaurant.delete({
        where: {
          id: restaurantId,
          locationId,
        },
      })

      if (!location) {
        return res.status(500).json("Unable to delete")
      }

      return res.status(200).json(location)
    }

    return Promise.resolve()
  },
)

export default handler
