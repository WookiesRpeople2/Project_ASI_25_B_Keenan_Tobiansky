import prismaDb from "@/lib/prisma"
import { MuseumApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(MuseumApiBody, async (req, res, params) => {
  if (req.method === "GET") {
    const museum = await prismaDb.museum.findFirst({
      where: {
        locationId: params.locationId,
      },
    })

    if (!museum) {
      return res.status(404).json("Error not found")
    }

    return res.status(200).json(museum)
  }

  if (req.method === "POST") {
    const { artisticMovement, artType, freeOrPaid } = await req.body
    const museum = await prismaDb.museum.create({
      data: {
        artisticMovement,
        artType,
        freeOrPaid,
        locationId: params.locationId,
      },
    })

    return res.status(200).json(museum)
  }

  return Promise.resolve()
})

export default handler
