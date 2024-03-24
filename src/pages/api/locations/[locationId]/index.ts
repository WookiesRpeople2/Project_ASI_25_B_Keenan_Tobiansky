import prismaDb from "@/lib/prisma"
import { LocationApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(LocationApiBody, async (req, res, params) => {
  if (!params) {
    return res.status(400).json("Bad params")
  }

  const location = await prismaDb.location.findFirst({
    where: {
      id: params.locationId,
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
        id: params.locationId,
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
        id: params.locationId,
      },
    })

    if (!deletedLocation) {
      return res.status(500).json("Unable to delete")
    }

    return res.status(200).json(deletedLocation)
  }

  return Promise.resolve()
})

export default handler
