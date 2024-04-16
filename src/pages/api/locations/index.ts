import prismaDb from "@/lib/prisma"
import { LocationApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"
import { serialize } from "@/middleware/serialize"

const handler = validateZod(async (req, res) => {
  if (req.method === "GET") {
    const locations = await prismaDb.location.findMany({ take: 10 })

    return res.status(200).json(locations)
  }

  if (req.method === "POST") {
    const data = await req.body
    const createdLocation = await prismaDb.location.create({
      data,
    })

    return res.status(200).json(serialize(createdLocation, ["id"]))
  }

  return Promise.resolve()
})

export default handler
