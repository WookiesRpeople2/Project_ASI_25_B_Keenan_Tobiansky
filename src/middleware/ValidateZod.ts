import { typeOfSchema } from "@/schemas/zod_schemas"
import { NextApiRequest, NextApiResponse } from "next"

type Params = {
  [key: string]: string
}

export const validateZod =
  (
    handler: (
      _req: NextApiRequest,
      _res: NextApiResponse,
      _params: Params,
    ) => Promise<void>,
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { type } = req.body as {
        type: "Bar" | "Restaurant" | "Museum" | "Park"
      }

      if (req.method === "POST") {
        req.body = await typeOfSchema[type].parseAsync(req.body)
      }

      const params = req.query as Params

      return await handler(req, res, params)
    } catch (error: any) {
      return res.status(400).json(error)
    }
  }
