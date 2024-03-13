import type { NextApiRequest, NextApiResponse } from "next"
import prismaDb from "@/lib/prisma"
import { MuseumApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(
  MuseumApiBody,
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { locationId } = req.query as {
      locationId: string
    }

    if (req.method === "POST") {
      const { artisticMovement, artType, freeOrPaid } = await req.body
      const museum = await prismaDb.museum.create({
        data: {
          artisticMovement,
          artType,
          freeOrPaid,
          locationId,
        },
      })

      return res.status(200).json(museum)
    }

    return Promise.resolve()
  },
)

export default handler
