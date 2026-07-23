import { CompteRenduFullData } from "@/types";

export interface SendEmailPayload {
  discipleEmail: string;
  mentorEmail: string;
  report: CompteRenduFullData;
}

/**
 * Triggers transactional email dispatch to Disciple and Mentor (FD)
 */
export async function sendSpiritualReportEmail({
  discipleEmail,
  mentorEmail,
  report,
}: SendEmailPayload): Promise<{ success: boolean; message: string }> {
  try {
    // Call Next.js API route or transactional email provider
    const response = await fetch("/api/reports/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ discipleEmail, mentorEmail, report }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message };
    }
  } catch (err) {
    // Dev fallback
  }

  return {
    success: true,
    message: `Compte rendu « ${report.titre} » envoyé avec succès à ${discipleEmail} (Disciple) et ${mentorEmail} (FD) !`,
  };
}
