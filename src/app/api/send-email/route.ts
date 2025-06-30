import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request): Promise<Response> {
  try {
    const { name, email, message } = await request.json();

    const msg = {
      to: 'sof.db@outlook.com',
      from: 'email-service@amoxtli.tech', // debe estar verificado
      subject: 'Nuevo mensaje de contacto',
      text: `Mensaje de ${name} (${email}): ${message}`,
      html: `
        <div>
          <h3>Mensaje de contacto</h3>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Correo:</strong> ${email}</p>
          <p><strong>Mensaje:</strong> ${message}</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    return NextResponse.json({ message: 'Email enviado exitosamente' });
  } catch (error: any) {
    console.error('Error enviando correo:', error?.response?.body || error.message || error);
    return NextResponse.json({ error: 'Error al enviar el email' }, { status: 500 });
  }
}
