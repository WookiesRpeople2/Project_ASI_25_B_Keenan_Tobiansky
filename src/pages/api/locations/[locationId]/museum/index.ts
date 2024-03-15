import prismaDb from "@/lib/prisma"
import { MuseumApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(MuseumApiBody, async (req, res, params) => {
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
