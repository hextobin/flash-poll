import { PollCreationRequestBody } from "@/app/types/poll";

export async function POST(req: Request) {
  const data: PollCreationRequestBody = await req.json();
  return Response.json({ success: true });
}
