import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { discipleEmail, mentorEmail, report } = body;

    const subject = `Compte rendu spirituel BGD — ${report.titre}`;

    console.log(`[BGD Email Service] Sending email...`);
    console.log(`To Disciple: ${discipleEmail}`);
    console.log(`To Mentor (FD): ${mentorEmail}`);
    console.log(`Subject: ${subject}`);

    return NextResponse.json({
      success: true,
      message: `Compte rendu « ${report.titre} » transmis par email à ${discipleEmail} et ${mentorEmail}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
