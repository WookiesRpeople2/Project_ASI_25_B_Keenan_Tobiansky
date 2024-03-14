import type { NextApiRequest, NextApiResponse } from "next"
import prismaDb from "@/lib/prisma"
import { MuseumApiBody } from "@/schemas/zod_schemas"
import { validateZod } from "@/middleware/ValidateZod"

const handler = validateZod(MuseumApiBody, async (req, res, params) => {
  const museum = await prismaDb.museum.findFirst({
    where: {
      id: params.museumId,
      locationId: params.locationId,
    },
  })

  if (!museum) {
    return res.status(404).json("Error not found")
  }

  if (req.method === "GET") {
    return res.status(200).json(museum)
  }

  if (req.method === "PATCH") {
    const data = await req.body
    const updatedMuseum = await prismaDb.museum.update({
      where: {
        id: params.museumId,
        locationId: params.locationId,
      },
      data,
    })

    if (!updatedMuseum) {
      return res.status(500).json("Unable to update")
    }

    return res.status(200).json(updatedMuseum)
  }

  if (req.method === "DELETE") {
    const deletedMuseum = await prismaDb.museum.delete({
      where: {
        id: params.museumId,
        locationId: params.locationId,
      },
    })

    if (!deletedMuseum) {
      return res.status(500).json("Unable to delete")
    }

    return res.status(200).json(deletedMuseum)
  }

  return Promise.resolve()
})

export default handler
