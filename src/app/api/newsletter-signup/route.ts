import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, name } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY!;
  const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX!;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!;

  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: name || "",
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `apikey ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (response.status >= 400) {
    return NextResponse.json(
      { error: result.detail || "Subscription failed" },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}
