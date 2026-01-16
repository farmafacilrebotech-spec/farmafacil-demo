# Milestone 1.5 - Carritos y Checkout

## 📋 Índice

1. [Objetivo](#objetivo)
2. [Paso 1: CartScreen - Carrito del Cliente](#paso-1-cartscreen---carrito-del-cliente)
3. [Paso 2: KioskCartScreen - Carrito del Kiosko](#paso-2-kioskcartscreen---carrito-del-kiosko)
4. [Paso 3: PaymentModal - Modal de Pago Online](#paso-3-paymentmodal---modal-de-pago-online)
5. [Paso 4: TPVModal - Modal de Pago TPV](#paso-4-tpvmodal---modal-de-pago-tpv)
6. [Paso 5: OrderConfirmation - Confirmación de Pedido](#paso-5-orderconfirmation---confirmación-de-pedido)
7. [Entregables](#entregables)
8. [Siguiente Milestone](#siguiente-milestone)

---

## Objetivo

Implementar los flujos de carrito y checkout tanto para clientes online como para el modo kiosko en farmacia.

**Estado**: ✅ Completado

---

## Paso 1: CartScreen - Carrito del Cliente

### Descripción
Carrito de compra para clientes con dos opciones de checkout: pagar online o pagar en farmacia.

### Archivo: `src/screens/CartScreen.tsx`

### Elementos implementados
- Lista de productos en carrito
- Imagen, nombre y precio por producto
- Controles de cantidad (+/-)
- Botón eliminar producto
- Resumen: subtotal, envío, total
- Dos CTAs:
  - 💳 "Pagar y Enviar Pedido" → Modal de pago
  - 🏪 "Enviar y Pagar en Farmacia" → Pedido pendiente

### Diseño
```
┌─────────────────────────────┐
│  ← Volver            [Logo] │
│  🛒 Mi Carrito (3 productos)│
├─────────────────────────────┤
│                             │
│  ┌─────────────────────────┐│
│  │ 📷 │ Arkobiotics x2     ││
│  │    │ €16.95             ││
│  │    │ [-] 2 [+]    [🗑️] ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │ 📷 │ Megalevure x1      ││
│  │    │ €7.50              ││
│  │    │ [-] 1 [+]    [🗑️] ││
│  └─────────────────────────┘│
│                             │
├─────────────────────────────┤
│  Subtotal:          €41.40  │
│  Envío:             €0.00   │
│  ─────────────────────────  │
│  Total:             €41.40  │
│                             │
│  [💳 Pagar y Enviar Pedido] │
│                             │
│  [🏪 Enviar y Pagar en Farm]│
│                             │
│  📱 Recibirás confirmación  │
│     por WhatsApp            │
└─────────────────────────────┘
```

### Flujos de checkout
```
┌──────────────────┐     ┌──────────────────┐
│ Pagar Online     │     │ Pagar en Farmacia│
└────────┬─────────┘     └────────┬─────────┘
         │                        │
         ▼                        ▼
┌──────────────────┐     ┌──────────────────┐
│ PaymentModal     │     │ Crear pedido     │
│ (Stripe/Redsys)  │     │ estado: pending  │
└────────┬─────────┘     └────────┬─────────┘
         │                        │
         ▼                        ▼
┌──────────────────┐     ┌──────────────────┐
│ OrderConfirmation│     │ OrderConfirmation│
│ estado: paid     │     │ estado: pending  │
└──────────────────┘     └──────────────────┘
```

### Resultado
- ✅ Carrito completo con gestión de cantidad
- ✅ Dos flujos de checkout
- ✅ Resumen de totales

---

## Paso 2: KioskCartScreen - Carrito del Kiosko

### Descripción
Carrito para el modo kiosko con opciones de impresión de ticket.

### Archivo: `src/screens/KioskCartScreen.tsx`

### Elementos implementados
- Lista de productos similar al carrito cliente
- Controles de cantidad
- Total destacado
- Dos CTAs:
  - 🖨️ "Imprimir Ticket (Pendiente de Pago)"
  - 💳 "Pagar con TPV e Imprimir"
- Vista de ticket impreso (simulación)

### Diseño del carrito
```
┌─────────────────────────────┐
│  ← Volver            [Logo] │
│  🛒 Mi Carrito              │
│  3 productos                │
├─────────────────────────────┤
│                             │
│  [Lista de productos...]    │
│                             │
├─────────────────────────────┤
│  ┌─────────────────────────┐│
│  │ Total:         €41.40   ││
│  └─────────────────────────┘│
│                             │
│  [🖨️ Imprimir (Pendiente)] │
│                             │
│  [💳 Pagar TPV e Imprimir]  │
│                             │
│  🖨️ El ticket se imprimirá │
│     automáticamente         │
└─────────────────────────────┘
```

### Vista del ticket impreso
```
┌─────────────────────────────┐
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │
│  │      🏥 FarmaFácil      │ │
│  │    Farmacia Centro      │ │
│  │    18/12/2024 15:30     │ │
│  │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │ │
│  │  PRODUCTOS:             │ │
│  │  Arkobiotics x2         │ │
│  │    2 x €16.95 = €33.90  │ │
│  │  Megalevure x1          │ │
│  │    1 x €7.50  = €7.50   │ │
│  │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │ │
│  │  TOTAL:        €41.40   │ │
│  │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │ │
│  │  ✓ PEDIDO PAGADO        │ │
│  │  (o ⏳ PENDIENTE PAGO)  │ │
│  │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │ │
│  │  Gracias por confiar    │ │
│  │  en FarmaFácil          │ │
│  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │
│                             │
│  [ Volver al Carrito ]      │
└─────────────────────────────┘
```

### Resultado
- ✅ Carrito optimizado para kiosko
- ✅ Integración con TPV
- ✅ Vista previa de ticket

---

## Paso 3: PaymentModal - Modal de Pago Online

### Descripción
Modal para procesar pagos online con tarjeta de crédito.

### Archivo: `src/components/PaymentModal.tsx`

### Props
```typescript
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}
```

### Elementos implementados
- Overlay oscuro con animación
- Formulario de tarjeta:
  - Número de tarjeta (16 dígitos)
  - Fecha de expiración (MM/YY)
  - CVV (3 dígitos)
  - Nombre del titular
- Botón "Pagar €XX.XX"
- Simulación de procesamiento (2s)
- Estados: cargando, éxito, error

### Diseño
```
┌─────────────────────────────┐
│      💳 Pago con Tarjeta    │
├─────────────────────────────┤
│                             │
│  Número de tarjeta          │
│  ┌─────────────────────┐   │
│  │ 4242 4242 4242 4242 │   │
│  └─────────────────────┘   │
│                             │
│  ┌──────────┐ ┌──────────┐ │
│  │ MM/YY    │ │ CVV      │ │
│  │ 12/25    │ │ 123      │ │
│  └──────────┘ └──────────┘ │
│                             │
│  Nombre del titular         │
│  ┌─────────────────────┐   │
│  │ MARIA GARCIA        │   │
│  └─────────────────────┘   │
│                             │
│  [ 💳 Pagar €41.40 ]        │
│                             │
│        [Cancelar]           │
└─────────────────────────────┘
```

### Simulación de pago (demo)
```typescript
// 90% éxito, 10% error (para testing)
const simulatePayment = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  if (Math.random() > 0.1) {
    onSuccess();
  } else {
    onError('Tarjeta rechazada');
  }
};
```

### Resultado
- ✅ Modal de pago funcional
- ✅ Validación de campos
- ✅ Simulación realista

---

## Paso 4: TPVModal - Modal de Pago TPV

### Descripción
Modal que simula el proceso de pago con terminal físico (TPV).

### Archivo: `src/components/TPVModal.tsx`

### Props
```typescript
interface TPVModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}
```

### Estados del TPV
1. **Esperando**: "Acerque la tarjeta al TPV..."
2. **Leyendo**: "Leyendo tarjeta..."
3. **Procesando**: "Procesando pago..."
4. **Éxito**: "✓ Pago completado"
5. **Error**: "✗ Pago rechazado"

### Diseño
```
┌─────────────────────────────┐
│       💳 Pago con TPV       │
├─────────────────────────────┤
│                             │
│         ┌─────────┐        │
│         │   💳    │        │
│         │  ════   │        │
│         │  ════   │        │
│         └─────────┘        │
│                             │
│    Total: €41.40            │
│                             │
│    Acerque la tarjeta       │
│    al terminal...           │
│                             │
│    [Simular pago exitoso]   │
│    [Simular error]          │
│                             │
│         [Cancelar]          │
└─────────────────────────────┘
```

### Resultado
- ✅ Simulación de TPV realista
- ✅ Múltiples estados visuales
- ✅ Botones de simulación para demo

---

## Paso 5: OrderConfirmation - Confirmación de Pedido

### Descripción
Pantalla/modal de confirmación tras completar un pedido.

### Archivo: `src/components/OrderConfirmation.tsx`

### Props
```typescript
interface OrderConfirmationProps {
  order: Order;
  onClose: () => void;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'paid' | 'pending';
  createdAt: Date;
}
```

### Elementos implementados
- Icono de éxito animado (✓)
- Número de pedido
- Estado del pago (badge):
  - 🟢 PAGADO
  - 🟡 PENDIENTE DE PAGO
- Resumen del pedido
- Mensaje de notificación WhatsApp
- Botón "Volver al inicio"

### Diseño
```
┌─────────────────────────────┐
│                             │
│           ✓                 │
│     ¡Pedido Enviado!        │
│                             │
│     Pedido #FM-1234         │
│                             │
│   ┌─────────────────────┐  │
│   │   🟢 PAGADO         │  │
│   │ (o 🟡 PENDIENTE)    │  │
│   └─────────────────────┘  │
│                             │
│   📋 Resumen:               │
│   • Arkobiotics x2          │
│   • Megalevure x1           │
│   ─────────────────────     │
│   Total: €41.40             │
│                             │
│   📱 Te hemos enviado       │
│   confirmación por WhatsApp │
│                             │
│   [ Volver al Inicio ]      │
└─────────────────────────────┘
```

### Estados visuales
```typescript
// Badge de estado
const statusStyles = {
  paid: 'bg-green-100 text-green-800 border-green-300',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
};

const statusText = {
  paid: '✓ PEDIDO PAGADO',
  pending: '⏳ PENDIENTE DE PAGO',
};
```

### Resultado
- ✅ Confirmación visual clara
- ✅ Diferenciación de estados
- ✅ Información del pedido

---

## Entregables

| Entregable | Archivo | Estado |
|------------|---------|--------|
| Carrito cliente | `CartScreen.tsx` | ✅ |
| Carrito kiosko | `KioskCartScreen.tsx` | ✅ |
| Modal pago online | `PaymentModal.tsx` | ✅ |
| Modal pago TPV | `TPVModal.tsx` | ✅ |
| Confirmación pedido | `OrderConfirmation.tsx` | ✅ |

---

## Siguiente Milestone

➡️ [Milestone 1.6 - Componentes y Servicios](./milestone-1.6-componentes-servicios.md)

---

*Milestone completado: Diciembre 2024*

