import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

export async function GET() {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, service: true, createdAt: true },
    });
    return Response.json(submissions);
  } catch {
    return Response.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to DB
    const submission = await prisma.contactSubmission.create({
      data: { name, email, phone: phone || '', company: company || '', service: service || '', message },
    });

    // Send email notification
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.startsWith('re_') && process.env.ADMIN_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Teknomech MEP <no-reply@teknomech.qa>',
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Enquiry: ${service || 'General'} — ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #C0392B;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold; color: #666;">Name</td><td style="padding: 8px;">${name}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #666;">Email</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #666;">Phone</td><td style="padding: 8px;">${phone || '—'}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #666;">Company</td><td style="padding: 8px;">${company || '—'}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #666;">Service</td><td style="padding: 8px;">${service || '—'}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #666; vertical-align: top;">Message</td><td style="padding: 8px;">${message}</td></tr>
            </table>
          </div>
        `,
      });
    }

    return Response.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json({ error: 'Failed to submit contact form' }, { status: 500 });
  }
}
