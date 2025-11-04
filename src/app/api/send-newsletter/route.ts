import { marked } from "marked";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, summary, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Missing title or content" },
        { status: 400 }
      );
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY!;
    const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX!;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!;
    const FROM_NAME = process.env.MAILCHIMP_FROM_NAME!;
    const FROM_EMAIL = process.env.MAILCHIMP_FROM_EMAIL!;

    const htmlContent = marked.parse(content);

    const campaignRes = await fetch(
      `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/campaigns`,
      {
        method: "POST",
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "regular",
          recipients: { list_id: AUDIENCE_ID },
          settings: {
            subject_line: title,
            title,
            from_name: FROM_NAME,
            reply_to: FROM_EMAIL,
          },
        }),
      }
    );

    const campaignData = await campaignRes.json();
    if (!campaignRes.ok) {
      console.error(campaignData);
      throw new Error("Failed to create campaign");
    }

    const campaignId = campaignData.id;

    const htmlTemplate = `
  <div style="max-width:700px;margin:auto;padding:20px;font-family:Inter,Arial,sans-serif;color:#222;background:#ffffff;border-radius:12px;">
    <div style="text-align:center;margin-bottom:20px;">
      <img src="https://www.apbuyersagency.com.au/logo-dark.png" alt="A&P Buyers Agency" width="160" style="margin:auto;display:block;" />
    </div>

    <h1 style="color:#0f5132;text-align:center;">${title}</h1>
    <p style="text-align:center;font-style:italic;color:#555;">${
      summary || ""
    }</p>

    <hr style="border:none;height:2px;background-color:#0f5132;margin:20px 0;" />

    <div style="color:#222;line-height:1.6;">
      ${htmlContent}
    </div>

    <hr style="border:none;height:1px;background-color:#ddd;margin:30px 0;" />

    <div style="margin-top:30px;">
      <h3 style="color:#0f5132;">Stay Connected</h3>

      <p style="margin:10px 0 5px;"><strong>📘 Follow our Facebook Community:</strong></p>
      <a href="https://www.facebook.com/share/g/1FJbGmMWjk/"
         target="_blank"
         style="color:#0f5132;text-decoration:underline;">
         Off-Market Property Network Australia - A&P
      </a>

      <p style="margin:20px 0 5px;"><strong>👥 Connect with Us on Facebook:</strong></p>
      <ul style="margin:0;padding-left:20px;">
        <li><a href="https://www.facebook.com/anita.kumar.9085" target="_blank" style="color:#0f5132;text-decoration:underline;">Anita Kumar</a></li>
        <li><a href="https://www.facebook.com/pratiksha.singh.581" target="_blank" style="color:#0f5132;text-decoration:underline;">Pratiksha Singh</a></li>
      </ul>

      <p style="margin:20px 0 5px;"><strong>💬 Join Our WhatsApp Group:</strong></p>
      <a href="https://chat.whatsapp.com/G5cbBBSLohV4zeNVwD2LbR" target="_blank" style="color:#0f5132;text-decoration:underline;">
        Click here to join and get early access to exclusive listings
      </a>
    </div>

    <hr style="border:none;height:1px;background-color:#ddd;margin:30px 0;" />

    <footer style="text-align:center;font-size:13px;color:#555;">
      <img src="https://www.apbuyersagency.com.au/logo-dark.png" alt="A&P Buyers Agency" width="100" style="display:block;margin:0 auto 8px;" />
      <p><strong>A&P Buyer's Agency</strong><br>
      Australia's Trusted Buyers Agents</p>
    </footer>
  </div>
`;

    const contentRes = await fetch(
      `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/campaigns/${campaignId}/content`,
      {
        method: "PUT",
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ html: htmlTemplate }),
      }
    );

    if (!contentRes.ok) {
      throw new Error("Failed to set campaign content");
    }

    const sendRes = await fetch(
      `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/campaigns/${campaignId}/actions/send`,
      {
        method: "POST",
        headers: {
          Authorization: `apikey ${API_KEY}`,
        },
      }
    );

    if (!sendRes.ok) {
      console.error(await sendRes.json());
      throw new Error("Failed to send campaign");
    }

    return NextResponse.json({ success: true, campaignId });
  } catch (error: unknown) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "Newsletter sending failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
