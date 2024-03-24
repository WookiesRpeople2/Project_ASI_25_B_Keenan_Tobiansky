import prismaDb from "@/lib/prisma"
import { BarApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(BarApiBody, async (req, res, params) => {

  if (req.method === "GET") {
    const bar = await prismaDb.bar.findFirst({
      where: {
        locationId: params.locationId,
      },
    })

    if (!bar) {
      return res.status(404).json("Not Found")
    }

    return res.status(200).json(bar)
  }

  if (req.method === "POST") {
    const { barType, avgPrice } = await req.body
    const createdBar = await prismaDb.bar.create({
      data: {
        barType,
        avgPrice,
        locationId: params.locationId,
      },
    })

    return res.status(200).json(createdBar)
  }

  return Promise.resolve()
})

export default handler
