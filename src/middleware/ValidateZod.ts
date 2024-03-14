import prismaDb from "@/lib/prisma"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

type Params = {
  [key: string]: string
}

export const validateZod =
  (
    bodySchema: z.ZodSchema,
    handler: (
      _req: NextApiRequest,
      _res: NextApiResponse,
      _params: Params,
    ) => Promise<void>,
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { locationId } = req.query as { locationId: string }
      if (req.method === "POST") {
        const exsistingLocation = await prismaDb.location.findFirst({
          where: { id: locationId },
        })

        if (!exsistingLocation) {
          throw new Error("This already exsists")
        }

        req.body = await bodySchema.parseAsync(req.body)
      }

      const params = req.query as Params

      return await handler(req, res, params)
    } catch (error: any) {
      return res.status(400).json(error)
    }
  }
