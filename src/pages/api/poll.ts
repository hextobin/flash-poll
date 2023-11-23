import pollService from "../../services/pollService";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await pollService.POST(req, res);
  } else if (req.method === "GET") {
    await pollService.GET(req, res);
  } else if (req.method === "PUT") {
    await pollService.PUT(req, res);
  }
}
