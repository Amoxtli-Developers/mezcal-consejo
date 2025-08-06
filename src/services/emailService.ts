// Cliente directo de SendGrid para el frontend
export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export interface PurchaseData {
  name: string;
  email: string;
  phone: string;
  state: string;
  quantity: string;
  amount: string;
  address: {
    street: string;
    exteriorNumber: string;
    interiorNumber?: string;
    colony: string;
    municipality: string;
    postalCode: string;
  };
}

class EmailService {
  private apiKey: string;
  private apiUrl = 'https://api.sendgrid.com/v3/mail/send';

  constructor() {
    // En producción, necesitarás configurar esto a través de variables de entorno
    // o un servicio de terceros que maneje las credenciales de forma segura
    this.apiKey = process.env.NEXT_PUBLIC_SENDGRID_API_KEY || '';
  }

  private async sendEmail(emailData: any): Promise<boolean> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendContactEmail(data: EmailData): Promise<boolean> {
    const emailData = {
      personalizations: [{
        to: [{ email: 'info@mezcalconsejo.com' }],
        subject: 'Nuevo mensaje de contacto'
      }],
      from: { email: 'contacto-mezcal-consejo@amoxtli.tech' },
      content: [{
        type: 'text/html',
        value: `
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
                            <td>${data.name}</td>
                          </tr>
                          <tr>
                            <td style="font-weight:bold;color:#1a1a1a;">Correo:</td>
                            <td><a href="mailto:${data.email}" style="color:#1a1a1a;text-decoration:none;">${data.email}</a></td>
                          </tr>
                          <tr>
                            <td style="font-weight:bold;color:#1a1a1a;vertical-align:top;">Mensaje:</td>
                            <td style="line-height:1.5;">${data.message.replace(/\n/g, '<br/>')}</td>
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
        `
      }]
    };

    return await this.sendEmail(emailData);
  }

  async sendPurchaseRequest(data: PurchaseData): Promise<boolean> {
    const emailData = {
      personalizations: [{
        to: [{ email: 'info@mezcalconsejo.com' }],
        subject: 'Nueva solicitud de compra - Mezcal Consejo'
      }],
      from: { email: 'contacto-mezcal-consejo@amoxtli.tech' },
      content: [{
        type: 'text/html',
        value: `
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
                        
                        <h3 style="color:#1a1a1a;margin:20px 0 10px;">Datos del cliente</h3>
                        <table width="100%" cellpadding="5" cellspacing="0" style="font-size:16px;color:#555555;margin-bottom:20px;">
                          <tr>
                            <td style="width:120px;font-weight:bold;color:#1a1a1a;">Nombre:</td>
                            <td>${data.name}</td>
                          </tr>
                          <tr>
                            <td style="font-weight:bold;color:#1a1a1a;">Correo:</td>
                            <td><a href="mailto:${data.email}" style="color:#1a1a1a;text-decoration:none;">${data.email}</a></td>
                          </tr>
                          <tr>
                            <td style="font-weight:bold;color:#1a1a1a;">Teléfono:</td>
                            <td>${data.phone}</td>
                          </tr>
                          <tr>
                            <td style="font-weight:bold;color:#1a1a1a;">Estado:</td>
                            <td>${data.state}</td>
                          </tr>
                        </table>

                        <h3 style="color:#1a1a1a;margin:20px 0 10px;">Pedido</h3>
                        <table width="100%" cellpadding="5" cellspacing="0" style="font-size:16px;color:#555555;margin-bottom:20px;">
                          <tr>
                            <td style="width:120px;font-weight:bold;color:#1a1a1a;">Cantidad:</td>
                            <td>${data.quantity}</td>
                          </tr>
                          <tr>
                            <td style="font-weight:bold;color:#1a1a1a;">Monto:</td>
                            <td>${data.amount}</td>
                          </tr>
                        </table>

                        <h3 style="color:#1a1a1a;margin:20px 0 10px;">Dirección de entrega</h3>
                        <table width="100%" cellpadding="5" cellspacing="0" style="font-size:16px;color:#555555;">
                          <tr>
                            <td style="width:120px;font-weight:bold;color:#1a1a1a;">Calle:</td>
                            <td>${data.address.street}</td>
                          </tr>
                          <tr>
                            <td style="font-weight:bold;color:#1a1a1a;">Núm. Ext:</td>
                            <td>${data.address.exteriorNumber}</td>
                          </tr>
                          ${data.address.interiorNumber ? `
                          <tr>
                            <td style="font-weight:bold;color:#1a1a1a;">Núm. Int:</td>
                            <td>${data.address.interiorNumber}</td>
                          </tr>
                          ` : ''}
                          <tr>
                            <td style="font-weight:bold;color:#1a1a1a;">Colonia:</td>
                            <td>${data.address.colony}</td>
                          </tr>
                          <tr>
                            <td style="font-weight:bold;color:#1a1a1a;">Municipio:</td>
                            <td>${data.address.municipality}</td>
                          </tr>
                          <tr>
                            <td style="font-weight:bold;color:#1a1a1a;">Código Postal:</td>
                            <td>${data.address.postalCode}</td>
                          </tr>
                        </table>

                        <p style="margin-top:30px;font-size:14px;color:#777777;text-align:center;">
                          Esta solicitud fue enviada desde el formulario web de Mezcal Consejo.
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
        `
      }]
    };

    return await this.sendEmail(emailData);
  }
}

export const emailService = new EmailService();