#!/bin/bash

echo "🔧 Verificando corrección de tipos..."

cd /Users/salomon/Documents/Projects/mezcal-consejo

# Verificar que TypeScript compile sin errores
echo "📝 Verificando TypeScript..."
npx tsc --noEmit

if [ $? -eq 0 ]; then
    echo "✅ TypeScript: Sin errores de tipos"
else
    echo "❌ TypeScript: Hay errores de tipos"
    exit 1
fi

# Verificar que Next.js compile
echo "🔨 Verificando compilación de Next.js..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Next.js: Compilación exitosa"
    echo ""
    echo "🎉 ¡Todos los errores corregidos!"
    echo "🚀 Ahora puedes ejecutar: npm run export"
else
    echo "❌ Next.js: Error en la compilación"
    exit 1
fi