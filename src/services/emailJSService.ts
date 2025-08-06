// Servicio de email alternativo usando EmailJS para sitios estáticos
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

class EmailJSService {
  private serviceId: string;
  private publicKey: string;
  private contactTemplateId: string;
  private purchaseTemplateId: string;

  constructor() {
    // CONFIGURACIÓN DIRECTA - Claves configuradas
    this.serviceId = 'service_su1bf0k'; // ✅ Service ID configurado
    this.publicKey = 'tZVc3eIb9FZ4G9W6A';  // ✅ Public Key configurado
    this.contactTemplateId = 'template_ppf243e';  // ✅ Template para contacto
    this.purchaseTemplateId = 'template_zn6u2za'; // ✅ Template para compras
    
    // Validación ya no es necesaria - claves configuradas
    console.log('✅ EmailJS configurado con templates personalizados');
  }

  private async loadEmailJS() {
    if (typeof window !== 'undefined' && !(window as any).emailjs) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      document.head.appendChild(script);
      
      return new Promise((resolve) => {
        script.onload = () => {
          (window as any).emailjs.init(this.publicKey);
          resolve((window as any).emailjs);
        };
      });
    }
    return (window as any).emailjs;
  }

  async sendContactEmail(data: EmailData): Promise<boolean> {
    try {
      const emailjs = await this.loadEmailJS();
      
      // Usar tu template personalizado de contacto
      const result = await emailjs.send(
        this.serviceId,
        this.contactTemplateId, // template_ppf243e
        {
          from_name: 'Mezcal Consejo', // Nombre fijo del remitente
          from_email: 'contacto@amoxtli.tech', // Email fijo del remitente  
          customer_name: data.name, // Nombre del cliente
          customer_email: data.email, // Email del cliente
          message: data.message,
          to_email: 'info@mezcalconsejo.com',
          reply_to: data.email, // Para que puedas responder al cliente
        }
      );

      return result.status === 200;
    } catch (error) {
      console.error('📧 Error enviando email con template personalizado:', error);
      
      // Fallback: intentar con template por defecto
      try {
        const emailjs = await this.loadEmailJS();
        const result = await emailjs.send(
          this.serviceId,
          'template_default',
          {
            to_name: 'Mezcal Consejo',
            from_name: data.name,
            from_email: data.email,
            message: `
              Nuevo mensaje de contacto:
              
              Nombre: ${data.name}
              Email: ${data.email}
              
              Mensaje:
              ${data.message}
              
              ---
              Enviado desde el formulario de contacto de Mezcal Consejo
            `,
            reply_to: data.email,
          }
        );
        return result.status === 200;
      } catch (secondError) {
        console.error('🔗 Verifica tu configuración en https://dashboard.emailjs.com/');
        console.error('Detalles:', secondError);
        return false;
      }
    }
  }

  async sendPurchaseRequest(data: PurchaseData): Promise<boolean> {
    try {
      const emailjs = await this.loadEmailJS();
      
      const fullAddress = `${data.address.street} ${data.address.exteriorNumber}${
        data.address.interiorNumber ? ` Int. ${data.address.interiorNumber}` : ''
      }, Col. ${data.address.colony}, ${data.address.municipality}, C.P. ${data.address.postalCode}`;

      // Usar tu template personalizado de compras
      const result = await emailjs.send(
        this.serviceId,
        this.purchaseTemplateId, // template_zn6u2za
        {
          from_name: 'Mezcal Consejo', // Nombre fijo del remitente
          from_email: 'mezcal-compra@amoxtli.tech', // Email fijo del remitente
          customer_name: data.name, // Nombre del cliente
          customer_email: data.email, // Email del cliente
          phone: data.phone,
          state: data.state,
          quantity: data.quantity,
          amount: data.amount,
          address: fullAddress,
          to_email: 'info@mezcalconsejo.com',
          reply_to: data.email, // Para que puedas responder al cliente
        }
      );

      return result.status === 200;
    } catch (error) {
      console.error('📧 Error enviando solicitud de compra con template personalizado:', error);
      
      // Fallback: intentar con template por defecto
      try {
        const emailjs = await this.loadEmailJS();
        const fullAddress = `${data.address.street} ${data.address.exteriorNumber}${
          data.address.interiorNumber ? ` Int. ${data.address.interiorNumber}` : ''
        }, Col. ${data.address.colony}, ${data.address.municipality}, C.P. ${data.address.postalCode}`;

        const result = await emailjs.send(
          this.serviceId,
          'template_default',
          {
            to_name: 'Mezcal Consejo',
            from_name: data.name,
            from_email: data.email,
            message: `
              Nueva solicitud de compra:
              
              === DATOS DEL CLIENTE ===
              Nombre: ${data.name}
              Email: ${data.email}
              Teléfono: ${data.phone}
              Estado: ${data.state}
              
              === PEDIDO ===
              Cantidad: ${data.quantity}
              Monto: ${data.amount}
              
              === DIRECCIÓN ===
              ${fullAddress}
              
              ---
              Enviado desde el formulario de compra de Mezcal Consejo
            `,
            reply_to: data.email,
          }
        );
        return result.status === 200;
      } catch (secondError) {
        console.error('🔗 Verifica tu configuración en https://dashboard.emailjs.com/');
        console.error('Detalles:', secondError);
        return false;
      }
    }
  }
}

export const emailService = new EmailJSService();