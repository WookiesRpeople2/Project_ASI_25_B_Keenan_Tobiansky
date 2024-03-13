import prismaDb from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

export const validateZod =
  (
    bodySchema: z.ZodSchema,
    handler: (_req: NextApiRequest, _res: NextApiResponse) => Promise<void>,
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (req.method === "POST") {
        const { locationId } = req.query as { locationId: string }
        const exsistingLocation = await prismaDb.location.findFirst({
          where: { id: locationId },
        })

        if (!exsistingLocation) {
          throw new Error("This already exsists")
        }

        req.body = await bodySchema.parseAsync(req.body)
      }

      return await handler(req, res)
    } catch (error) {
      return res.status(400).json(error)
    }
  }
