import pollService from "../../services/pollService";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    pollService.POST(req, res);
  } else {
    // Handle other HTTP methods or return an error
  }
}
