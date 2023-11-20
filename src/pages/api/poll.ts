import pollService from "../../services/pollService";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    pollService.POST(req, res);
  } else if (req.method === "GET") {
    pollService.GET(req, res);
  }
}
