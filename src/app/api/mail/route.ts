import { connectToMailServer } from "@/utils/mail";

// POST /api/mail
export async function POST(req: Request) {
  try {
    const { from, to, subject, html } = await req.json();
    if (!from || !to || !subject || !html) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const transporter = connectToMailServer();
    const mail = transporter.sendMail({ from, to, subject, html });
    return Response.json({ mail }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to send mail data" },
      { status: 500 }
    );
  }
}
