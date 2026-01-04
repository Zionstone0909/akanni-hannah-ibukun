import { NextResponse } from "next/server";
import { sendMail } from "../../utils/sendMail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, projectType } = body;

    const result = await sendMail(name, email, message, projectType);

    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  } catch (err) {
    console.error("/api/contact error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
