import type { NextApiRequest, NextApiResponse } from "next"
import prismaDb from "@/lib/prisma"
import { RestaurantApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(
  RestaurantApiBody,
  async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    const { locationId } = req.query as {
      locationId: string
    }

    if (req.method === "POST") {
      const { cuisine, stars, avgPrice } = await req.body
      const restaurant = await prismaDb.restaurant.create({
        data: {
          cuisine,
          stars,
          avgPrice,
          locationId,
        },
      })

      return res.status(200).json(restaurant)
    }

    return Promise.resolve()
  },
)

export default handler
