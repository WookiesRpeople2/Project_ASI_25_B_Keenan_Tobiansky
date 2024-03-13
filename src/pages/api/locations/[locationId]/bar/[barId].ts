import type { NextApiRequest, NextApiResponse } from "next"
import prismaDb from "@/lib/prisma"
import { BarApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(
  BarApiBody,
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { barId, locationId } = req.query as {
      barId: string
      locationId: string
    }
    const bar = await prismaDb.bar.findFirst({
      where: {
        id: barId,
        locationId,
      },
    })

    if (!bar) {
      return res.status(404).json("Error not found")
    }

    if (req.method === "GET") {
      return res.status(200).json(bar)
    }

    if (req.method === "PATCH") {
      const data = await req.body
      const updatedBar = await prismaDb.bar.update({
        where: {
          id: barId,
          locationId,
        },
        data,
      })

      if (!updatedBar) {
        return res.status(500).json("Unable to update")
      }

      return res.status(200).json(updatedBar)
    }

    if (req.method === "DELETE") {
      const deletedBar = await prismaDb.bar.delete({
        where: {
          id: barId,
          locationId,
        },
      })

      if (!deletedBar) {
        return res.status(500).json("Unable to delete")
      }

      return res.status(200).json(deletedBar)
    }

    return Promise.resolve()
  },
)

export default handler
