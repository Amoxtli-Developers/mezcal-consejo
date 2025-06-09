# Mezcal Consejo - Sitio Web

Un sitio web elegante y moderno para la marca de mezcal artesanal Mezcal Consejo, construido con Next.js 14 y las mejores tecnologías modernas.

## 🚀 Tecnologías Utilizadas

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utilitario
- **Shadcn/ui** - Componentes de UI
- **Lucide React** - Iconos
- **i18next** - Internacionalización (Español/Inglés)
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

1. **Instalar dependencias**:
```bash
npm install
```

2. **Ejecutar en desarrollo**:
```bash
npm run dev
```

3. **Construir para producción**:
```bash
npm run build
```

4. **Ejecutar en producción**:
```bash
npm start
```

El sitio estará disponible en `http://localhost:3000`

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
├── lib/
│   └── utils.ts
├── locales/
│   ├── es.json
│   └── en.json
└── i18n.ts
```

## 🎯 Características Especiales

- **Single Page Application**: Toda la navegación es suave mediante scroll
- **Navbar Sticky**: Se mantiene fijo en la parte superior
- **Imágenes Optimizadas**: Todas las imágenes utilizan Next.js Image
- **Componentes Reutilizables**: Arquitectura modular y mantenible
- **Código Limpio**: TypeScript para mejor experiencia de desarrollo

## 📝 Personalización

Para personalizar el contenido, edita los archivos de traducción:
- `src/locales/es.json` - Contenido en español
- `src/locales/en.json` - Contenido en inglés

Para cambiar imágenes, actualiza las URLs en los componentes correspondientes.

## 🎨 Customización de Estilos

Los colores y estilos se pueden modificar en:
- `tailwind.config.ts` - Configuración de Tailwind
- `src/app/globals.css` - Estilos globales

## 📧 Contacto

Para soporte o consultas sobre este proyecto, contacta a través del formulario del sitio web.

---

**Mezcal Consejo** - Tradición en cada gota 🍃
# mezcal-consejo
