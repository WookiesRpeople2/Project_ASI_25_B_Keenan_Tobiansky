import type { NextApiRequest, NextApiResponse } from "next"
import prismaDb from "@/lib/prisma"
import { ParkApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(ParkApiBody, async (req, res, params) => {
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
