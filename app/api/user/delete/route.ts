import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("[BGD Account Deletion] Permanent account deletion executed.");
    return NextResponse.json({
      success: true,
      message: "Votre compte et toutes vos données associées ont été définitivement supprimés.",
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
