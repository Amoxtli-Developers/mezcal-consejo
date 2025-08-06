// app/api/purchase-request/route.ts
import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Configura tu API Key de SendGrid en las variables de entorno
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
    try {
        const { state, quantity, amount, address, name, email, phone } = await request.json();

        // Construye el correo
        const msg = {
            to: 'info@mezcalconsejo.com',
            from: 'compra-mezcal-consejo@amoxtli.tech',
            subject: 'Nueva solicitud de compra',
            text: `Solicitud de compra de ${name} (${email}, ${phone}): ${quantity === 'more' ? amount + ' unidades' : quantity + (quantity === 'case' ? ' (caja)' : ' botella(s)')} desde ${state}. Dirección: ${address}`,
            html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
          <title>Nueva solicitud de compra</title>
        </head>
        <body style="margin:0;padding:0;background-color:#fefefe;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fefefe;padding:20px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding:30px 40px;">
                      <h2 style="margin:0 0 20px;font-size:24px;color:#333333;text-align:center;">🛒 Nueva solicitud de compra</h2>
                      <table width="100%" cellpadding="5" cellspacing="0" style="font-size:16px;color:#555555;">
                        <tr>
                          <td style="font-weight:bold;color:#1a1a1a;">Nombre:</td>
                          <td>${name}</td>
                        </tr>
                        <tr>
                          <td style="font-weight:bold;color:#1a1a1a;">Correo:</td>
                          <td><a href="mailto:${email}" style="color:#1a1a1a;text-decoration:none;">${email}</a></td>
                        </tr>
                        <tr>
                          <td style="font-weight:bold;color:#1a1a1a;">Teléfono:</td>
                          <td>${phone}</td>
                        </tr>
                        <tr>
                          <td style="font-weight:bold;color:#1a1a1a;vertical-align:top;">Estado:</td>
                          <td>${state}</td>
                        </tr>
                        <tr>
                          <td style="font-weight:bold;color:#1a1a1a;">Cantidad:</td>
                          <td>${quantity === 'more'
                    ? amount + ' unidades'
                    : quantity === 'case'
                        ? '1 caja (12 botellas)'
                        : quantity + ' botella(s)'
                }</td>
                        </tr>
                        <tr>
                          <td style="font-weight:bold;color:#1a1a1a;vertical-align:top;">Dirección:</td>
                          <td style="line-height:1.5;">${address.replace(/\n/g, '<br/>')}</td>
                        </tr>
                      </table>
                      <p style="margin-top:30px;font-size:14px;color:#777777;text-align:center;">
                        Esta es una notificación automática de Mezcal Consejo.
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

        // Envía el correo
        await sgMail.send(msg);

        return NextResponse.json({ message: 'Solicitud de compra enviada correctamente' });
    } catch (error: any) {
        console.error('Error al procesar solicitud de compra:', error);
        return NextResponse.json({ error: 'Error al enviar la solicitud' }, { status: 500 });
    }
}
