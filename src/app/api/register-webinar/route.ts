import { NextResponse } from "next/server";
import { Resend } from "resend";
import twilio from "twilio";

const resend = new Resend(process.env.RESEND_API_KEY);
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(req: Request) {
  try {
    const { name, email, phone, webinar } = await req.json();

    if (!name || !email || !phone || !webinar) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM as string,
      to: email,
      subject: `You're Registered for ${webinar.title} — A&P Buyers Agency`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; background-color: #f9fafb; padding: 32px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            
            <div style="text-align: center; padding: 24px;">
              <img src="https://www.apbuyersagency.com.au/logo-dark.png" alt="A&P Buyers Logo" style="height: 50px; margin-bottom: 16px;" />
              <h1 style="color: #166534; font-size: 22px;">You're Registered!</h1>
              <p style="color: #374151; font-size: 16px;">Hi <b>${name}</b>,</p>
              <p style="color: #374151; font-size: 15px;">Thank you for joining our upcoming webinar:</p>
              <p style="font-size: 17px; font-weight: 600; color: #15803d;">${webinar.title}</p>

              <div style="margin: 16px 0; color: #4b5563; font-size: 15px;">
                <p><b>Date:</b> ${webinar.date}</p>
                <p><b>Time:</b> ${webinar.time}</p>
              </div>

              <p style="color: #374151; font-size: 15px;">${webinar.description}</p>

              <a href="${webinar.url}" target="_blank" style="display:inline-block; margin-top: 20px; background-color: #15803d; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none;">
                Joining Link
              </a>
            </div>

            <div style="border-top: 2px solid #15803d; padding: 16px; text-align: center; background: #f0fdf4;">
              <p style="font-size: 14px; color: #166534; margin: 0;">
                — The A&P Buyers Agency's Team —
              </p>
              <p style="font-size: 13px; color: #64748b; margin: 4px 0 0;">
                Australia's Trusted Buyers Agents
              </p>
            </div>
          </div>
        </div>
      `,
    });

    await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:${phone}`,
      body: `Hello ${name}! 👋\n\nYou're successfully registered for *${webinar.title}*.\n\n📅 Date: ${webinar.date}\n🕖 Time: ${webinar.time}\n\n${webinar.description}\n\nJoin here: ${webinar.url}\n\n— A&P Buyers Agency's Team 🏡`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending registration:", error);
    return NextResponse.json(
      { error: "Failed to send confirmation." },
      { status: 500 }
    );
  }
}
