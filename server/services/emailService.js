import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.SMTP_USER) return null;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

export async function sendOrderConfirmation(order) {
  const transport = getTransporter();
  if (!transport) {
    console.log('[email] SMTP not configured – skipping confirmation for', order.customer.email);
    return false;
  }

  await transport.sendMail({
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to: order.customer.email,
    subject: 'אישור הזמנה – תודה שקנית!',
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif;">
        <h2>שלום ${order.customer.name || 'לקוח/ה יקר/ה'}!</h2>
        <p>ההזמנה שלך התקבלה בהצלחה.</p>
        <p><strong>מוצר:</strong> ${order.productTitle}</p>
        <p><strong>סכום:</strong> ₪${order.amount}</p>
        <p>נעדכן אותך כשהחבילה תישלח.</p>
        <p>תודה,<br/>הצוות שלנו</p>
      </div>
    `,
  });
  return true;
}

export async function sendShippingUpdate(order) {
  const transport = getTransporter();
  if (!transport) return false;

  await transport.sendMail({
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to: order.customer.email,
    subject: 'החבילה שלך בדרך!',
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif;">
        <h2>חדשות טובות!</h2>
        <p>ההזמנה שלך (${order.productTitle}) נשלחה ותגיע בקרוב.</p>
        <p>תודה על הסבלנות!</p>
      </div>
    `,
  });
  return true;
}

export async function sendCartAbandonment(cart) {
  const transport = getTransporter();
  if (!transport) return false;

  await transport.sendMail({
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to: cart.email,
    subject: 'שכחת משהו בעגלה?',
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif;">
        <h2>עדיין מעוניינ/ת?</h2>
        <p>השארת את <strong>${cart.productTitle}</strong> בעגלה.</p>
        <p>מחיר: ₪${cart.price}</p>
        <p><a href="${process.env.CLIENT_URL}/product">השלימ/י את ההזמנה עכשיו</a></p>
      </div>
    `,
  });
  return true;
}
