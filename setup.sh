#!/bin/bash

echo "🚀 Configurando proyecto Mezcal Consejo..."

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js primero."
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instala npm primero."
    exit 1
fi

echo "📦 Instalando dependencias..."
npm install

echo "🎉 ¡Proyecto configurado exitosamente!"
echo ""
echo "Para ejecutar el proyecto en desarrollo:"
echo "  npm run dev"
echo ""
echo "Para construir para producción:"
echo "  npm run build"
echo ""
echo "¡Disfruta desarrollando con Mezcal Consejo! 🥃"
