import type { NextApiRequest, NextApiResponse } from "next"
import prismaDb from "@/lib/prisma"
import { BarApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(
  BarApiBody,
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { locationId } = req.query as {
      locationId: string
    }

    if (req.method === "POST") {
      const { barType, avgPrice } = await req.body
      const createdBar = await prismaDb.bar.create({
        data: {
          barType,
          avgPrice,
          locationId,
        },
      })

      return res.status(200).json(createdBar)
    }

    return Promise.resolve()
  },
)

export default handler
