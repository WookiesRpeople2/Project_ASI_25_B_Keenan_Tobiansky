import type { NextApiRequest, NextApiResponse } from "next"
import prismaDb from "@/lib/prisma"
import { LocationApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(
  LocationApiBody,
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { locationId } = req.query as { locationId: string }
    const location = await prismaDb.location.findFirst({
      where: {
        id: locationId,
      },
    })

    if (!location) {
      return res.status(404).json("Error not found")
    }

    if (req.method === "GET") {
      return res.status(200).json(location)
    }

    if (req.method === "PATCH") {
      const data = await req.body
      const updatedLocation = await prismaDb.location.update({
        where: {
          id: locationId,
        },
        data,
      })

      if (!updatedLocation) {
        return res.status(500).json("Unable to update")
      }

      return res.status(200).json(updatedLocation)
    }

    if (req.method === "DELETE") {
      const deletedLocation = await prismaDb.location.delete({
        where: {
          id: locationId,
        },
      })

      if (!deletedLocation) {
        return res.status(500).json("Unable to delete")
      }

      return res.status(200).json(deletedLocation)
    }

    return Promise.resolve()
  },
)

export default handler
