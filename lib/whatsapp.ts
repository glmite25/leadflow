const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID!;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
const NOTIFY_TO = process.env.WHATSAPP_NOTIFY_TO!;

export async function sendNewLeadNotification(lead: {
  name: string;
  phone: string;
  email?: string | null;
  interest?: string | null;
}) {
  const message = `🆕 New Lead\n\nName: ${lead.name}\nPhone: +${lead.phone}${lead.email ? `\nEmail: ${lead.email}` : ''}${lead.interest ? `\nInterest: ${lead.interest}` : ''}`;

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: NOTIFY_TO,
        type: 'text',
        text: { body: message },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    console.error('WhatsApp notification failed:', err);
  }
}
