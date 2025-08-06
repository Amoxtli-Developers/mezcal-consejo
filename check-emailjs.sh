#!/bin/bash

echo "🔍 Verificando configuración directa de EmailJS..."

# Verificar que el archivo existe
if [ ! -f "src/services/emailJSService.ts" ]; then
    echo "❌ Error: No se encontró src/services/emailJSService.ts"
    exit 1
fi

# Verificar que las claves estén configuradas
if grep -q "service_tu_id_aqui\|tu_public_key_aqui" src/services/emailJSService.ts; then
    echo "⚠️  EmailJS no está configurado"
    echo ""
    echo "🔧 Para configurar automáticamente:"
    echo "   ./configure-emailjs.sh"
    echo ""
    echo "🔧 O edita manualmente:"
    echo "   src/services/emailJSService.ts"
    echo "   Líneas 31-32"
    echo ""
    echo "🔑 Necesitas obtener de https://dashboard.emailjs.com/:"
    echo "   - Service ID (service_xxxxxxx)"
    echo "   - Public Key"
    exit 1
fi

echo "✅ EmailJS configurado correctamente"
echo "🚀 Puedes ejecutar:"
echo "   npm run export && serve out"