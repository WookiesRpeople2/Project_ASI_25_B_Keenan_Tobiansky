import prismaDb from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { OptionsHandler } from "../../types"

export const validateZod =
  (
    bodySchema: z.ZodSchema,
    handler: (
      _req: NextApiRequest,
      _res: NextApiResponse,
      _params?: OptionsHandler,
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

      const params = req.query as OptionsHandler

      return await handler(req, res, params)
    } catch (error: any) {
      return res.status(400).json(error)
    }
  }
