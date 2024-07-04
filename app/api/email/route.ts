import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, subject, message, name } = await req.json();
    console.log({ email, subject, message, name });

    await resend.emails.send({
      from: "LeiraSanchez.com Contact <leira@mofongojobs.com>",
      to: "leira.sq@gmail.com",
      cc: email,
      subject,
      html: `${name} ${message}`,
    });

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("api/email ", error);
    return NextResponse.json(
      {
        error,
        status: "error",
        message: "whoops! Something went wrong",
      },
      { status: 500 }
    );
  }
}
