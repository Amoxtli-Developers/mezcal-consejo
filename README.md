# Mezcal Consejo - Sitio Web Estático

Un sitio web elegante y moderno para la marca de mezcal artesanal Mezcal Consejo, construido con Next.js 14 y optimizado para exportación como sitio estático.

## 🚀 Tecnologías Utilizadas

- **Next.js 14** - Framework de React (con salida estática)
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utilitario
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos
- **i18next** - Internacionalización (Español/Inglés)
- **EmailJS** - Servicio de email para sitios estáticos
- **Swiper** - Carrusel para la sección "Nuestra Historia"
- **React Hook Form** - Formulario de contacto
- **js-cookie** - Manejo de cookies para verificación de edad

## 🎨 Características de Diseño

- **Paleta de colores**: Azul marino como color primario, textos en variantes de negro suave, fondo casi blanco
- **Tipografía**: Inter (sans-serif elegante y limpia)
- **Estilo**: Elegante y limpio con distribución generosa de espacio blanco
- **Bordes**: Sharp (no redondeados) para botones y cards
- **Animaciones**: Transiciones suaves entre secciones
- **Responsive**: Diseño completamente adaptable

## 📱 Secciones del Sitio

1. **Hero Section** - Video de fondo, título principal y call-to-action
2. **Sobre el Mezcal** - Información sobre la tradición del mezcal
3. **Nuestra Historia** - Carrusel con la historia de la marca
4. **Producto** - Detalles del mezcal con imagen grande y especificaciones
5. **Galería** - Grid de 6 imágenes relacionadas con la producción
6. **Contacto** - Formulario funcional de contacto
7. **Footer** - Links, redes sociales y información de contacto

## 🔒 Verificación de Edad

El sitio incluye una verificación de edad obligatoria que:
- Solicita la fecha de nacimiento del usuario
- Verifica que sea mayor de 18 años
- Guarda la verificación en una cookie por 30 días
- Bloquea el acceso si el usuario es menor de edad

## 🌐 Internacionalización

- **Idioma por defecto**: Español
- **Idioma alternativo**: Inglés
- **Selector de idioma**: Disponible en el navbar
- **Detección automática**: Detecta el idioma del navegador

## 🖼️ Logo y Assets

El proyecto utiliza el logo local de Mezcal Consejo:
- **Ubicación**: `/public/assets/logo/logo.png`
- **Uso**: Navbar y Footer
- **Navbar**: 50x40px con prioridad de carga
- **Footer**: 50x40px con filtro invertido para fondo oscuro

Para cambiar el logo, simplemente reemplaza el archivo `logo.png` en la carpeta `/public/assets/logo/`.

## 🚀 Instalación y Uso

### 🛠️ Configuración Inicial

1. **Instalar dependencias**:
```bash
npm install
```

2. **Configurar EmailJS** (obligatorio para formularios):
   - Lee la guía completa en `EMAILJS_SETUP.md`
   - Crea cuenta en [EmailJS](https://www.emailjs.com/)
   - Configura tus variables en `.env.local`

### 💻 Desarrollo

```bash
# Ejecutar en desarrollo
npm run dev
```

### 📦 Exportar Sitio Estático

```bash
# Exportar sitio estático
npm run export

# Los archivos estarán en la carpeta 'out'
```

### 🌐 Despliegue

Puedes desplegar la carpeta `out` en:
- Netlify (arrastra y suelta)
- Vercel
- GitHub Pages
- Firebase Hosting
- Cualquier hosting de archivos estáticos

### 🧪 Pruebas Locales del Sitio Exportado

```bash
# Instalar servidor local
npm install -g serve

# Servir archivos estáticos
serve out
```

## 🛠️ Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── textarea.tsx
│   ├── AgeVerification.tsx
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── OurStorySection.tsx
│   ├── ProductSection.tsx
│   ├── GallerySection.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── services/
│   ├── emailJSService.ts
│   └── emailService.ts (backup)
├── lib/
│   └── utils.ts
├── locales/
│   ├── es.json
│   └── en.json
└── i18n.ts
```

## 🎯 Características Especiales

- **Sitio Estático Completo**: Exportable sin dependencias de servidor
- **Formularios Funcionales**: Integrados con EmailJS
- **Single Page Application**: Toda la navegación es suave mediante scroll
- **Navbar Sticky**: Se mantiene fijo en la parte superior
- **Imágenes Optimizadas**: Todas las imágenes utilizan Next.js Image
- **Componentes Reutilizables**: Arquitectura modular y mantenible
- **Código Limpio**: TypeScript para mejor experiencia de desarrollo
- **PWA Ready**: Optimizado para Progressive Web App

## 📝 Personalización

Para personalizar el contenido, edita los archivos de traducción:
- `src/locales/es.json` - Contenido en español
- `src/locales/en.json` - Contenido en inglés

Para cambiar imágenes, actualiza las URLs en los componentes correspondientes.

## 🎨 Customización de Estilos

Los colores y estilos se pueden modificar en:
- `tailwind.config.ts` - Configuración de Tailwind
- `src/app/globals.css` - Estilos globales

## 📚 Archivos Importantes

- `EMAILJS_SETUP.md` - Guía completa para configurar EmailJS
- `.env.local` - Variables de entorno (crea tu propio archivo)
- `next.config.js` - Configuración de Next.js para exportación
- `src/services/emailJSService.ts` - Servicio de email para sitios estáticos

## ⚠️ Notas Importantes

- **EmailJS es obligatorio** para que funcionen los formularios
- Las variables de entorno deben tener prefijo `NEXT_PUBLIC_`
- El sitio exportado NO requiere Node.js para funcionar
- Todas las imágenes deben tener `unoptimized: true`

## 📧 Contacto

Para soporte o consultas sobre este proyecto, contacta a través del formulario del sitio web.

---

**Mezcal Consejo** - Tradición en cada gota 🍃
# mezcal-consejo
