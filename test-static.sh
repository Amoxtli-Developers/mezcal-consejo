#!/bin/bash

echo "🚀 Exportando y probando sitio estático de Mezcal Consejo..."

# Verificar si estamos en la carpeta correcta
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json"
    echo "Asegúrate de estar en la carpeta raíz del proyecto"
    exit 1
fi

# Paso 1: Exportar el sitio
echo "📦 Paso 1: Exportando sitio..."
npm run export

if [ $? -ne 0 ]; then
    echo "❌ Error durante la exportación"
    exit 1
fi

# Verificar que se creó la carpeta 'out'
if [ ! -d "out" ]; then
    echo "❌ Error: No se generó la carpeta 'out'"
    exit 1
fi

echo "✅ Exportación exitosa!"

# Paso 2: Mostrar estructura generada
echo "📁 Archivos generados:"
ls -la out/

# Paso 3: Verificar servidor 'serve'
echo ""
echo "🧪 Iniciando servidor de prueba..."

if ! command -v serve &> /dev/null; then
    echo "📦 Instalando 'serve'..."
    npm install -g serve
fi

echo ""
echo "🌐 Servidor iniciado en: http://localhost:3000"
echo "📝 Para detener: Ctrl+C"
echo "🎯 Prueba todas las funciones:"
echo "   - Verificación de edad"
echo "   - Cambio de idioma"
echo "   - Formularios (requiere configuración de EmailJS)"
echo "   - Navegación suave"
echo ""

# Iniciar servidor
serve out