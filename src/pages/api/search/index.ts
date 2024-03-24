import prismaDb from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const data = await req.body

  if (req.method === "POST") {
    const locations = await prismaDb.location.findMany({
      where: {
        name: { contains: data },
      },
    })

    if (!locations || locations.length === 0) {
      return res.status(404).json("No locations found")
    }

    return res.status(200).json(locations)
  }

  return Promise.resolve()
}

export default handler
