import prismaDb from "@/lib/prisma"
import { BarApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(BarApiBody, async (req, res, params) => {
  if (!params) {
    return res.status(400).json("Bad params")
  }

  const bar = await prismaDb.bar.findFirst({
    where: {
      id: params.barId,
      locationId: params.locationId,
    },
  })

  if (!bar) {
    return res.status(404).json("Not Found")
  }

  if (req.method === "GET") {
    return res.status(200).json(bar)
  }

  if (req.method === "PATCH") {
    const data = await req.body
    const updatedBar = await prismaDb.bar.update({
      where: {
        id: params.barId,
        locationId: params.locationId,
      },
      data,
    })

    if (!updatedBar) {
      return res.status(500).json("Unable to update")
    }

    return res.status(200).json(updatedBar)
  }

  if (req.method === "DELETE") {
    const deletedBar = await prismaDb.bar.delete({
      where: {
        id: params.barId,
        locationId: params.locationId,
      },
    })

    if (!deletedBar) {
      return res.status(500).json("Unable to delete")
    }

    return res.status(200).json(deletedBar)
  }

  return Promise.resolve()
})

export default handler
