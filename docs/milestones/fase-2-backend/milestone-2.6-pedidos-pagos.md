# Milestone 2.6 - Pedidos y Pagos

## 📋 Índice

1. [Objetivo](#objetivo)
2. [Paso 1: Sistema de Pedidos](#paso-1-sistema-de-pedidos)
3. [Paso 2: Integración Stripe/Redsys](#paso-2-integración-striperedsys)
4. [Paso 3: Webhooks de Pago](#paso-3-webhooks-de-pago)
5. [Paso 4: Notificaciones WhatsApp](#paso-4-notificaciones-whatsapp)
6. [Paso 5: Histórico y Reportes](#paso-5-histórico-y-reportes)
7. [Entregables](#entregables)
8. [Siguiente Fase](#siguiente-fase)

---

## Objetivo

Implementar el sistema completo de pedidos con integración de pagos y notificaciones.

**Estado**: 🔲 Pendiente

---

## Paso 1: Sistema de Pedidos

### Descripción
CRUD completo de pedidos con estados y transiciones.

### Estados del pedido
```typescript
type OrderStatus = 
  | 'pending'      // Creado, pendiente de pago
  | 'paid'         // Pagado
  | 'processing'   // En preparación
  | 'ready'        // Listo para recoger/enviar
  | 'delivered'    // Entregado
  | 'cancelled';   // Cancelado
```

### Schema completo
```sql
CREATE TABLE pedidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero VARCHAR(20) UNIQUE NOT NULL, -- FM-2024-00001
  farmacia_id UUID REFERENCES farmacias(id) NOT NULL,
  cliente_id UUID REFERENCES clientes(id),
  
  -- Totales
  subtotal DECIMAL(10,2) NOT NULL,
  descuento DECIMAL(10,2) DEFAULT 0,
  iva DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  
  -- Estado
  estado VARCHAR(20) DEFAULT 'pending',
  estado_pago VARCHAR(20) DEFAULT 'pending',
  
  -- Pago
  metodo_pago VARCHAR(50), -- stripe, redsys, tpv, efectivo
  pago_id VARCHAR(255),    -- ID externo del pago
  
  -- Entrega
  tipo_entrega VARCHAR(20) DEFAULT 'recogida', -- recogida, envio
  direccion_envio TEXT,
  
  -- Metadata
  notas TEXT,
  origen VARCHAR(20) DEFAULT 'web', -- web, kiosko, app
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Función para generar número de pedido
CREATE OR REPLACE FUNCTION generar_numero_pedido()
RETURNS TRIGGER AS $$
DECLARE
  year TEXT;
  seq INTEGER;
BEGIN
  year := to_char(NOW(), 'YYYY');
  SELECT COALESCE(MAX(
    CAST(SPLIT_PART(numero, '-', 3) AS INTEGER)
  ), 0) + 1 INTO seq
  FROM pedidos
  WHERE numero LIKE 'FM-' || year || '-%';
  
  NEW.numero := 'FM-' || year || '-' || LPAD(seq::TEXT, 5, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_numero_pedido
  BEFORE INSERT ON pedidos
  FOR EACH ROW
  EXECUTE FUNCTION generar_numero_pedido();
```

### Funciones CRUD
```typescript
// Crear pedido
export const createOrder = async (
  pharmacyId: string,
  clientId: string,
  items: CartItem[],
  options: OrderOptions
) => {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const iva = subtotal * 0.21;
  const total = subtotal + iva - (options.descuento || 0);
  
  // Crear pedido
  const { data: order } = await supabase
    .from('pedidos')
    .insert({
      farmacia_id: pharmacyId,
      cliente_id: clientId,
      subtotal,
      iva,
      total,
      tipo_entrega: options.tipoEntrega,
      origen: options.origen,
    })
    .select()
    .single();
    
  // Crear items
  await supabase
    .from('pedido_items')
    .insert(items.map(item => ({
      pedido_id: order.id,
      producto_id: item.id,
      cantidad: item.quantity,
      precio_unitario: item.price,
    })));
    
  return order;
};
```

---

## Paso 2: Integración Stripe/Redsys

### Descripción
Integrar pasarela de pagos para pagos con tarjeta.

### Stripe (recomendado para desarrollo)
```bash
npm install @stripe/stripe-js stripe
```

### Edge Function para crear PaymentIntent
```typescript
// supabase/functions/create-payment-intent/index.ts
import Stripe from 'stripe';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

Deno.serve(async (req) => {
  const { orderId, amount } = await req.json();
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Centavos
    currency: 'eur',
    metadata: { orderId },
  });
  
  return new Response(
    JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    { headers: { 'Content-Type': 'application/json' } }
  );
});
```

### Componente de pago
```typescript
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const StripePayment: React.FC<{ clientSecret: string }> = ({ 
  clientSecret 
}) => {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm />
    </Elements>
  );
};
```

---

## Paso 3: Webhooks de Pago

### Descripción
Manejar eventos de pago desde Stripe.

### Edge Function para webhook
```typescript
// supabase/functions/stripe-webhook/index.ts
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
const supabase = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_SERVICE_KEY')
);

Deno.serve(async (req) => {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  
  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    Deno.env.get('STRIPE_WEBHOOK_SECRET')
  );
  
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata.orderId;
    
    // Actualizar pedido
    await supabase
      .from('pedidos')
      .update({
        estado: 'paid',
        estado_pago: 'paid',
        pago_id: paymentIntent.id,
      })
      .eq('id', orderId);
      
    // Notificar
    await notifyOrderPaid(orderId);
  }
  
  return new Response('OK');
});
```

---

## Paso 4: Notificaciones WhatsApp

### Descripción
Enviar confirmaciones por WhatsApp Business API.

### Integración con Twilio
```typescript
// supabase/functions/send-whatsapp/index.ts
const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
const fromNumber = 'whatsapp:+14155238886'; // Sandbox

export const sendWhatsApp = async (to: string, message: string) => {
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: fromNumber,
        To: `whatsapp:${to}`,
        Body: message,
      }),
    }
  );
  
  return response.json();
};

// Mensaje de confirmación
export const notifyOrderCreated = async (order: Order, phone: string) => {
  const message = `
🏥 *FarmaFácil - Nuevo Pedido*

📋 Pedido: ${order.numero}
💰 Total: €${order.total.toFixed(2)}
📦 Estado: ${order.estado === 'paid' ? '✅ Pagado' : '⏳ Pendiente de pago'}

${order.tipo_entrega === 'recogida' 
  ? '📍 Recógelo en tu farmacia' 
  : '🚚 Te lo enviamos a casa'}

¡Gracias por confiar en nosotros!
  `.trim();
  
  return sendWhatsApp(phone, message);
};
```

---

## Paso 5: Histórico y Reportes

### Descripción
Consultas para reportes y análisis.

### Queries de reportes
```typescript
// Ventas del día
export const getDailySales = async (pharmacyId: string, date: Date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  
  return supabase
    .from('pedidos')
    .select('total, estado')
    .eq('farmacia_id', pharmacyId)
    .gte('created_at', start.toISOString())
    .lte('created_at', end.toISOString());
};

// Productos más vendidos
export const getTopProducts = async (pharmacyId: string, days: number) => {
  return supabase.rpc('get_top_products', {
    p_farmacia_id: pharmacyId,
    p_days: days,
  });
};

// RPC function
CREATE OR REPLACE FUNCTION get_top_products(
  p_farmacia_id UUID,
  p_days INTEGER DEFAULT 30
)
RETURNS TABLE (
  producto_id UUID,
  nombre VARCHAR,
  total_vendido INTEGER,
  ingresos DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pi.producto_id,
    p.nombre,
    SUM(pi.cantidad)::INTEGER as total_vendido,
    SUM(pi.cantidad * pi.precio_unitario) as ingresos
  FROM pedido_items pi
  JOIN productos p ON p.id = pi.producto_id
  JOIN pedidos o ON o.id = pi.pedido_id
  WHERE o.farmacia_id = p_farmacia_id
    AND o.created_at >= NOW() - (p_days || ' days')::INTERVAL
    AND o.estado != 'cancelled'
  GROUP BY pi.producto_id, p.nombre
  ORDER BY total_vendido DESC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql;
```

---

## Entregables

| Entregable | Estado |
|------------|--------|
| Sistema pedidos | 🔲 |
| Integración Stripe | 🔲 |
| Webhooks pago | 🔲 |
| WhatsApp Business | 🔲 |
| Reportes | 🔲 |

---

## 🎉 Fase 2 Completada

Al completar este milestone, la **Fase 2 - Backend (Supabase)** estará lista.

### Resumen de la Fase 2

| Milestone | Título | Estado |
|-----------|--------|--------|
| 2.1 | Configuración Supabase | 🔲 |
| 2.2 | Autenticación | 🔲 |
| 2.3 | Gestión Farmacias | 🔲 |
| 2.4 | Sistema QR | 🔲 |
| 2.5 | Catálogos | 🔲 |
| 2.6 | Pedidos y Pagos | 🔲 |

---

## Siguiente Fase

➡️ **Fase 3 - Integraciones Avanzadas**

- WhatsApp Business API
- TPV físico
- IA para recomendaciones
- Analytics avanzados

---

*Milestone pendiente*

