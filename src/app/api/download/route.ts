import { createReadStream } from "fs";
import path from "path";

export async function GET(req: Request) {
  const fileUrl = "https://github.com/KistDeov/AiServiceApp/releases/download/1.2.2/aimail-Setup-1.2.2.exe";
  return new Response(null, {
    status: 302,
    headers: {
      Location: fileUrl,
    },
  });
}