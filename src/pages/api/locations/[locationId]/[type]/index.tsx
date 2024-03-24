import prismaDb from "@/lib/prisma"
import { validateZod } from "@/middleware/ValidateZod"
import { serialize } from "@/middleware/serialize"

const handler = validateZod(async (req, res, params) => {
  const prismaInstance: { [key: string]: any } = prismaDb
  if (req.method === "GET") {
    const locationType = await prismaDb.location.findFirst({
      where: {
        id: params.locationId,
      },
      include: {
        [params.type]: true,
      },
    })

    if (!locationType) {
      return res.status(404).json("Not found")
    }

    return res.status(200).json(serialize(locationType, ["locationId, id"]))
  }

  if (req.method === "POST") {
    const data = await req.body
    const createdLocationType = await prismaInstance[params.type].create({
      where: {
        locationId: params.locationId,
      },
      data: {
        ...data,
        locationId: params.locationId,
      },
    })
  }

  if (req.method === "PATCH") {
    const data = await req.body
    const updatedLocation = await prismaInstance[params.type].update({
      where: {
        locationId: params.locationId,
      },
      data,
    })

    if (!updatedLocation) {
      return res.status(500).json("Unable to update")
    }

    return res
      .status(200)
      .json(serialize(updatedLocation, ["locationId", "id"]))
  }

  return Promise.resolve()
})

export default handler
