#!/bin/bash

echo "🔧 Configurador de EmailJS para sitio estático"
echo ""

# Verificar que estamos en la carpeta correcta
if [ ! -f "src/services/emailJSService.ts" ]; then
    echo "❌ Error: No se encontró src/services/emailJSService.ts"
    echo "Asegúrate de estar en la carpeta raíz del proyecto"
    exit 1
fi

echo "📝 Para configurar EmailJS necesitas obtener 2 valores:"
echo "   1. Ve a https://dashboard.emailjs.com/"
echo "   2. Crea/configura un servicio de email"
echo "   3. Obtén tu Service ID y Public Key"
echo ""

# Solicitar Service ID
read -p "🔑 Ingresa tu Service ID (service_xxxxxxx): " SERVICE_ID

if [ -z "$SERVICE_ID" ]; then
    echo "❌ Service ID no puede estar vacío"
    exit 1
fi

# Solicitar Public Key
read -p "🔑 Ingresa tu Public Key: " PUBLIC_KEY

if [ -z "$PUBLIC_KEY" ]; then
    echo "❌ Public Key no puede estar vacío"
    exit 1
fi

echo ""
echo "🔄 Actualizando archivo emailJSService.ts..."

# Reemplazar las claves en el archivo
sed -i.bak "s/service_tu_id_aqui/$SERVICE_ID/g" src/services/emailJSService.ts
sed -i.bak "s/tu_public_key_aqui/$PUBLIC_KEY/g" src/services/emailJSService.ts

# Verificar que se aplicaron los cambios
if grep -q "$SERVICE_ID" src/services/emailJSService.ts && grep -q "$PUBLIC_KEY" src/services/emailJSService.ts; then
    echo "✅ Configuración aplicada correctamente"
    echo ""
    echo "🚀 Ahora puedes:"
    echo "   npm run export"
    echo "   serve out"
    echo ""
    echo "🧪 O usar el script automático:"
    echo "   ./test-static.sh"
    
    # Crear backup del archivo original
    rm src/services/emailJSService.ts.bak
    
else
    echo "❌ Error aplicando la configuración"
    # Restaurar backup si algo salió mal
    mv src/services/emailJSService.ts.bak src/services/emailJSService.ts
    exit 1
fi