import prismaDb from "@/lib/prisma"
import { validateZod } from "@/middleware/ValidateZod"
import { serialize } from "@/middleware/serialize"

const handler = validateZod(async (req, res, params) => {
  const location = await prismaDb.location.findFirst({
    where: {
      id: params.locationId,
    },
  })

  if (!location) {
    return res.status(404).json("Not found")
  }

  if (req.method === "GET") {
    const locationWithRelatedData = await prismaDb.location.findFirst({
      where: {
        id: params.locationId,
      },
      include: {
        [location.type.toLowerCase()]: true,
      },
    })

    if (!locationWithRelatedData) {
      return res.status(404).json("Not found")
    }

    return res
      .status(200)
      .json(serialize(locationWithRelatedData, ["locationId", "id"]))
  }

  if (req.method === "PATCH") {
    const {
      name,
      address,
      city,
      zipCode,
      country,
      coordinates,
      type,
      ...locationData
    } = req.body
    const updatedLocation = await prismaDb.location.update({
      where: {
        id: params?.locationId,
      },
      data: {
        name,
        address,
        city,
        zipCode,
        country,
        coordinates,
        type,
        [type.toLowerCase()]: {
          update: locationData,
        },
      },
      include: {
        [type.toLowerCase()]: true,
      },
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
        id: params?.locationId,
      },
    })

    if (!deletedLocation) {
      return res.status(500).json("Unable to delete")
    }

    return res.status(200).json(serialize(deletedLocation, ["id"]))
  }

  return Promise.resolve()
})

export default handler
