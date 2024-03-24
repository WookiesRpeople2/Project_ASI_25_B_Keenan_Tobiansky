import prismaDb from "@/lib/prisma"
import { LocationApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"
import { serialize } from "@/middleware/serialize"

const handler = validateZod(async (req, res, params) => {
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

    return res
      .status(200)
      .json(serialize(updatedLocation, ["locationId", "id"]))
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

    return res
      .status(200)
      .json(serialize(deletedLocation, ["locationId", "id"]))
  }

  return Promise.resolve()
})

export default handler
