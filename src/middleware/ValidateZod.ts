import prismaDb from "@/lib/prisma"
import { LocationApiBody, typeOfSchema } from "@/schemas/zod_schemas"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { OptionsHandler } from "../../types"

export const validateZod =
  (
    handler: (
      _req: NextApiRequest,
      _res: NextApiResponse,
      _params?: OptionsHandler,
    ) => Promise<void>,
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { locationId, type } = req.query as {
        locationId: string
        type: "bar" | "restaurant" | "museum" | "park"
      }

      if (req.method === "POST") {
        if (type) {
          req.body = await typeOfSchema[type].parseAsync(req.body)
        }

        req.body = await LocationApiBody.parseAsync(req.body)
      }

      const params = req.query as OptionsHandler

      return await handler(req, res, params)
    } catch (error: any) {
      return res.status(400).json(error)
    }
  }
