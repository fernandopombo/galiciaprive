type SendEmailArgs = {
  to: string;
  subject: string;
  body: string;
};

export type SendEmailResult =
  | { sent: true }
  | { sent: false; reason: string };

// Envía por Resend si RESEND_API_KEY está configurada. Si no lo está, la
// comunicación se registra igualmente en el CRM pero no sale ningún email.
export async function sendEmail({
  to,
  subject,
  body,
}: SendEmailArgs): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    return { sent: false, reason: "Email no configurado (RESEND_API_KEY)" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text: body,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    return { sent: false, reason: `Error del proveedor de email: ${detail}` };
  }

  return { sent: true };
}
