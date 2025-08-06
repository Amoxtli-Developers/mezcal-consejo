# 📧 EmailJS Configurado - Con Templates Personalizados

## ✅ ¡Ya Está Configurado!

Tu EmailJS ya tiene configurados tus templates personalizados:

- ✅ **Service ID**: `service_su1bf0k`
- ✅ **Public Key**: `tZVc3eIb9FZ4G9W6A`  
- ✅ **Template Contacto**: `template_ppf243e`
- ✅ **Template Compras**: `template_zn6u2za`

## 🎉 Cómo Funciona Ahora

### **Formulario de Contacto**
1. **Primero** intenta usar tu template `template_ppf243e`
2. **Si falla**, usa el template por defecto como backup
3. **Variables que envía** a tu template:
   - `from_name`: Nombre del usuario
   - `from_email`: Email del usuario 
   - `message`: Mensaje del usuario
   - `to_email`: info@mezcalconsejo.com
   - `reply_to`: Email del usuario

### **Formulario de Compras**
1. **Primero** intenta usar tu template `template_zn6u2za`
2. **Si falla**, usa el template por defecto como backup
3. **Variables que envía** a tu template:
   - `from_name`: Nombre del cliente
   - `from_email`: Email del cliente
   - `phone`: Teléfono
   - `state`: Estado
   - `quantity`: Cantidad
   - `amount`: Monto
   - `address`: Dirección completa
   - `to_email`: info@mezcalconsejo.com
   - `reply_to`: Email del cliente

## 🚀 Probar Ahora

```bash
# Exportar sitio estático
npm run export

# Servir y probar
serve out

# O todo en uno
./test-static.sh
```

## 🎯 Sistema de Fallbacks

**Máxima Confiabilidad:**
1. 🥇 **Intenta tu template personalizado** (mejor experiencia)
2. 🥈 **Si falla, usa template_default** (backup)
3. 🥉 **Logs detallados** en consola para debugging

## 🔧 Personalizar Templates (Opcional)

Si quieres editar tus templates:
1. Ve a [dashboard.emailjs.com](https://dashboard.emailjs.com)
2. **Email Templates** → Busca `template_ppf243e` o `template_zn6u2za`
3. **Edita** usando las variables mostradas arriba
4. **Test** enviando un email de prueba

## 📊 Variables Disponibles en Templates

### Template de Contacto (`template_ppf243e`):
```
{{from_name}}     - Nombre del usuario
{{from_email}}    - Email del usuario
{{message}}       - Mensaje del usuario
{{to_email}}      - info@mezcalconsejo.com
{{reply_to}}      - Email para responder
```

### Template de Compras (`template_zn6u2za`):
```
{{from_name}}     - Nombre del cliente
{{from_email}}    - Email del cliente
{{phone}}         - Teléfono
{{state}}         - Estado
{{quantity}}      - Cantidad deseada
{{amount}}        - Monto
{{address}}       - Dirección completa
{{to_email}}      - info@mezcalconsejo.com
{{reply_to}}      - Email para responder
```

## ✨ Ventajas de Esta Configuración

✅ **Templates Personalizados** - Usa tu diseño profesional  
✅ **Fallback Automático** - Nunca falla completamente  
✅ **Funciona en Estático** - Sin servidor necesario  
✅ **Fácil de Mantener** - Todo configurado de una vez  

---

## 🎊 ¡Listo!

Tu sitio ahora usa tus templates personalizados de EmailJS con fallbacks automáticos. Solo tienes que exportar y probar.

**Comando rápido:**
```bash
npm run export && serve out
```