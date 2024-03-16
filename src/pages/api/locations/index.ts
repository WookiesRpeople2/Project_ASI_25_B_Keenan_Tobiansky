import prismaDb from "@/lib/prisma"
import { LocationApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(LocationApiBody, async (req, res) => {
  if (req.method === "GET") {
    const locations = await prismaDb.location.findMany({})

    return res.status(200).json(locations)
  }

  if (req.method === "POST") {
    const data = await req.body
    const location = await prismaDb.location.create({
      data,
    })

    return res.status(200).json(location)
  }

  return Promise.resolve()
})

export default handler
