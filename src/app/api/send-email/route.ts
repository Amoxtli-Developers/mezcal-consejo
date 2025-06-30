import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request): Promise<Response> {
  try {
    const { name, email, message } = await request.json();

    const msg = {
      to: 'mtzelisalomon@gmail.com',
      from: 'contacto-mezcal-consejo@amoxtli.tech',
      subject: 'Nuevo mensaje de contacto',
      text: `Mensaje de ${name} (${email}): ${message}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
          <title>Nuevo mensaje de contacto</title>
        </head>
        <body style="margin:0;padding:0;background-color:#fefefe;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fefefe;padding:20px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding:30px 40px;">
                      <h2 style="margin:0 0 20px;font-size:24px;color:#333333;text-align:center;">📬 Nuevo mensaje de contacto</h2>
                      <table width="100%" cellpadding="5" cellspacing="0" style="font-size:16px;color:#555555;">
                        <tr>
                          <td style="width:120px;font-weight:bold;color:#1a1a1a;">Nombre:</td>
                          <td>${name}</td>
                        </tr>
                        <tr>
                          <td style="font-weight:bold;color:#1a1a1a;">Correo:</td>
                          <td><a href="mailto:${email}" style="color:#1a1a1a;text-decoration:none;">${email}</a></td>
                        </tr>
                        <tr>
                          <td style="font-weight:bold;color:#1a1a1a;vertical-align:top;">Mensaje:</td>
                          <td style="line-height:1.5;">${message.replace(/\n/g, '<br/>')}</td>
                        </tr>
                      </table>
                      <p style="margin-top:30px;font-size:14px;color:#777777;text-align:center;">
                        Este correo es una notificación automática de su formulario de contacto.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color:#f0f9ff;padding:15px 40px;text-align:center;font-size:12px;color:#777777;">
                      &copy; ${new Date().getFullYear()} Mezcal Consejo. Todos los derechos reservados.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    await sgMail.send(msg);
    return NextResponse.json({ message: 'Email enviado exitosamente' });
  } catch (error: any) {
    console.error('Error enviando correo:', error?.response?.body || error.message || error);
    return NextResponse.json({ error: 'Error al enviar el email' }, { status: 500 });
  }
}
