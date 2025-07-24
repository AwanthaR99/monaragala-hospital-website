import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    const data = await resend.emails.send({
      from: 'Monaragala Hospital Website <onboarding@resend.dev>', // This is a required field by Resend
      to: ['sachirathnayake9@gmail.com'], // <-- රෝහලේ ඊමේල් එක මෙතනට දාන්න
      subject: `New Message from ${name}: ${subject}`,
      reply_to: email,
      html: `<p>You have a new message from the contact form:</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}