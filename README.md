# FarmaFácil - Sistema de Gestión Farmacéutica

Sistema completo de gestión y venta para farmacias con experiencia omnicanal (web + kiosko físico).

## 🎨 Características Principales

### Para Clientes
- **Acceso mediante QR**: Escaneo de QR + verificación SMS
- **Catálogo Inteligente**: Búsqueda con IA y recomendaciones personalizadas
- **Carrito de Compras**: Dos opciones de pago:
  - Pagar online y recoger (pedido listo)
  - Reservar y pagar en farmacia (pendiente de pago)
- **Perfil Personal**: Gestión de datos y métodos de pago
- **Asistente IA**: Chat farmacéutico para consultas

### Para Farmacias
- **Dashboard de Gestión**: Métricas en tiempo real
- **Gestión de Pedidos**: Seguimiento de pedidos online
- **Catálogo de Productos**: Administración de inventario
- **Consultas IA**: Historial de interacciones con clientes

### Modo Kiosko (Tablet)
- **Interfaz táctil optimizada**: Grid 2x2 con botones grandes
- **Autoservicio**: Búsqueda, asistente, escaneo QR
- **Impresión de Tickets**: Con estados de pago
- **Pasarela de Pago**: Integrada en kiosko

## 🏗️ Arquitectura del Sistema

### Componentes Core

#### 1. Autenticación (`src/contexts/AuthContext.tsx`)
```typescript
- Login con email/password (farmacias)
- Login con QR + SMS (clientes)
- Gestión de sesiones con localStorage
- Roles: 'client' | 'pharmacy'
```

#### 2. Servicio de Pago (`src/services/paymentService.ts`)
```typescript
- createPaymentIntent(): Crea intención de pago
- processPayment(): Procesa pago con tarjeta
- createOrder(): Genera pedidos con estados
- getPaymentMethods(): Obtiene métodos guardados
- sendWhatsAppNotification(): Envía confirmaciones
```

#### 3. Modal de Pago (`src/components/PaymentModal.tsx`)
- Selección de método de pago
- Procesamiento con feedback visual
- Manejo de errores
- Seguridad cifrada

#### 4. Confirmación de Pedido (`src/components/OrderConfirmation.tsx`)
- Visualización de orden completada
- Estados: Pagado | Pendiente de pago
- Detalles del pedido
- Notificación WhatsApp confirmada

## 📱 Pantallas Implementadas

### 1. HomeScreen
- Logo y branding
- Video de presentación DEMO
- Botón "Solicitar DEMO" (contacto)
- Accesos: QR Scan y Login

### 2. LoginScreen
- Autenticación de farmacias
- Validación en tiempo real
- Recuperación de contraseña
- Demo: cualquier email + contraseña de 3+ caracteres

### 3. QRScanScreen
- Simulación de escáner QR
- Envío de código SMS
- Verificación de código
- Demo: usar código 123456

### 4. ClientDashboard
- Tarjetas de acceso rápido
- Pedidos recientes
- Navegación a perfil

### 5. ProfileScreen
- Datos personales editables
- **Gestión de formas de pago**
- Tarjetas guardadas
- Botón añadir método de pago

### 6. PharmacyDashboard
- Métricas: pedidos hoy, clientes activos
- Acceso a pedidos, consultas IA, productos
- Navegación a catálogo

### 7. CatalogScreen
- Búsqueda inteligente con IA
- Filtros por categoría
- Grid de productos
- Scroll infinito

### 8. ProductDetailScreen
- Imagen y descripción
- Precio destacado
- Recomendaciones IA
- Añadir al carrito

### 9. CartScreen (Cliente Online)
- Lista de productos con cantidades
- **Dos opciones de checkout:**
  - **"Pagar y Enviar Pedido"**: Abre modal de pago → Pedido pagado
  - **"Enviar y Pagar en Farmacia"**: Pedido pendiente de pago
- Notificación WhatsApp
- Modal de confirmación con estado

### 10. KioskScreen
- **Grid 2x2 cuadrado** con cards
- Buscar producto
- Asistente IA
- Escanear QR
- Ver carrito

### 11. KioskCartScreen
- Gestión de productos
- **Dos opciones de impresión:**
  - **"Imprimir Ticket"**: Pendiente de pago
  - **"Pagar e Imprimir Ticket"**: Abre modal de pago → Ticket pagado
- Vista previa de ticket impreso
- Estados visuales claros

### 12. AIAssistantScreen
- Chat con bubbles
- Preguntas sugeridas
- Enviar recomendación a cliente
- Input de mensaje

## 🔐 Flujos de Autenticación

### Cliente (QR + SMS)
1. Escanear QR en farmacia
2. Introducir teléfono
3. Recibir código SMS
4. Verificar código (demo: 123456)
5. Acceso a dashboard cliente

### Farmacia (Email + Password)
1. Introducir email
2. Introducir contraseña (demo: 3+ caracteres)
3. Validación
4. Acceso a dashboard farmacia

## 💳 Flujos de Pago

### Compra Online con Pago
```
Carrito → "Pagar y Enviar Pedido" → Modal de Pago
→ Seleccionar método → Procesar pago (2s simulación)
→ Confirmación: "Pedido Pagado" → WhatsApp enviado
```

### Compra Online sin Pago (Pagar en farmacia)
```
Carrito → "Enviar y Pagar en Farmacia" → Crear pedido
→ Confirmación: "Pendiente de Pago" → WhatsApp enviado
```

### Compra en Kiosko con Pago
```
Kiosko Cart → "Pagar e Imprimir Ticket" → Modal de Pago
→ Procesar pago → Imprimir ticket con "PEDIDO PAGADO"
```

### Compra en Kiosko sin Pago
```
Kiosko Cart → "Imprimir Ticket" 
→ Imprimir ticket con "PENDIENTE DE PAGO"
```

## 🎯 Estados de Pedidos

### Order Status
- `pending_payment`: Pendiente de pago (pagar en farmacia)
- `paid`: Pagado online
- `ready_for_pickup`: Listo para recoger
- `completed`: Completado

### Payment Status
- `pending`: Pendiente
- `paid`: Pagado

## 🛠️ Tecnologías

- **React 18** + TypeScript
- **Vite** (build tool)
- **Tailwind CSS** (estilos)
- **Lucide React** (iconografía)
- **Context API** (gestión de estado)
- **localStorage** (persistencia)

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Compilar
npm run build

# Preview de producción
npm run preview
```

## 🎨 Diseño

### Colores Corporativos
- Principal: `#00C8C8`
- Secundario: `#007878`
- Complementarios: Blanco, grises

### Tipografía
Sistema nativo (Inter / Roboto / SF Pro)

### Componentes
- Bordes redondeados (rounded-xl, rounded-2xl)
- Sombras suaves (shadow-lg, shadow-xl)
- Transiciones suaves (transition-all, transition-colors)
- Hover effects en todos los elementos interactivos

## 📦 Estructura del Proyecto

```
src/
├── components/
│   ├── MockupContainer.tsx      # Contenedor de pantallas
│   ├── PaymentModal.tsx         # Modal de pago
│   └── OrderConfirmation.tsx    # Confirmación de pedido
├── contexts/
│   └── AuthContext.tsx          # Contexto de autenticación
├── services/
│   └── paymentService.ts        # Lógica de pagos y pedidos
├── screens/
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── QRScanScreen.tsx
│   ├── ClientDashboard.tsx
│   ├── ProfileScreen.tsx
│   ├── PharmacyDashboard.tsx
│   ├── CatalogScreen.tsx
│   ├── ProductDetailScreen.tsx
│   ├── CartScreen.tsx
│   ├── KioskScreen.tsx
│   ├── KioskCartScreen.tsx
│   └── AIAssistantScreen.tsx
└── App.tsx                      # Router y navegación
```

## 🔄 Navegación

Sistema de navegación flotante en esquina inferior izquierda con acceso rápido a todas las pantallas.

## 📝 Notas de Implementación

### Simulaciones (Demo)
- Autenticación: sin backend, validación básica
- Pagos: simulación de 2s, 90% éxito
- SMS: código fijo 123456
- WhatsApp: log en consola

### Producción
Para implementar en producción, reemplazar:
- `AuthContext`: integrar con backend real (JWT, OAuth)
- `paymentService`: integrar Stripe/Redsys/PayPal
- SMS: Twilio, AWS SNS o similar
- WhatsApp: API oficial de WhatsApp Business

## 👥 Roles y Permisos

- **Cliente**: Dashboard, perfil, catálogo, carrito, IA
- **Farmacia**: Dashboard, pedidos, catálogo, consultas IA
- **Kiosko**: Acceso público, modo autoservicio

## 🎁 Extras Implementados

- Loading states en todos los formularios
- Manejo de errores con feedback visual
- Validaciones en tiempo real
- Animaciones y transiciones
- Responsive design
- Tickets imprimibles con formato profesional
- Mensajes de éxito/error contextuales

## 📞 Soporte

Para consultas o personalizaciones, contacta al equipo de desarrollo.

---

**FarmaFácil** - Transformando la experiencia farmacéutica 💊

