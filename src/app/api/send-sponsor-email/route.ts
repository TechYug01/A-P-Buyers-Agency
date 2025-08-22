import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const { name, email, phone, organisation, message } = body;

    const response = await resend.emails.send({
      from: "A&P Buyers Agency <onboarding@resend.dev>",
      to: ["anita@apbuyersagency.com.au", "Pratiksha@apbuyersagency.com.au"],
      subject: "New Partnership Proposal from Events & Community Page",
      html: `
        <h2>New Partnership Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Organisation:</strong> ${organisation}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
