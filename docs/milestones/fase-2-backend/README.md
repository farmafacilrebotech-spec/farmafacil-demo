# 🔧 Fase 2 - Backend (Supabase e Integraciones)

## Estado: 🔲 Pendiente

Esta fase cubre la implementación del backend utilizando Supabase como plataforma BaaS.

---

## 📋 Índice de Milestones

| # | Milestone | Descripción | Estado |
|---|-----------|-------------|--------|
| 2.1 | [Supabase Setup](./milestone-2.1-supabase-setup.md) | Configuración del proyecto y esquema BD | 🔲 |
| 2.2 | [Autenticación](./milestone-2.2-autenticacion-usuarios.md) | Auth para farmacias (email) y clientes (OTP) | 🔲 |
| 2.3 | [Gestión Farmacias](./milestone-2.3-gestion-farmacias.md) | CRUD, branding y configuración | 🔲 |
| 2.4 | [Sistema QR](./milestone-2.4-sistema-qr.md) | Generación y validación de códigos QR | 🔲 |
| 2.5 | [Catálogos](./milestone-2.5-catalogos-productos.md) | CRUD productos, imágenes, búsqueda | 🔲 |
| 2.6 | [Pedidos y Pagos](./milestone-2.6-pedidos-pagos.md) | Sistema de pedidos e integración de pagos | 🔲 |

---

## 🏗️ Arquitectura Backend

```
Supabase Project
├── Database (PostgreSQL)
│   ├── farmacias
│   ├── clientes
│   ├── productos
│   ├── categorias
│   ├── codigos_qr
│   ├── pedidos
│   └── pedido_items
│
├── Authentication
│   ├── Email/Password (Farmacias)
│   └── Phone OTP (Clientes)
│
├── Storage
│   ├── logos/          # Logos de farmacias
│   └── productos/      # Imágenes de productos
│
├── Edge Functions
│   ├── create-payment-intent
│   ├── stripe-webhook
│   └── send-whatsapp
│
└── Realtime
    └── Suscripciones a cambios
```

---

## 🔐 Seguridad

### Row Level Security (RLS)
- Farmacias solo ven sus propios datos
- Clientes vinculados a una farmacia
- Productos filtrados por farmacia

### Políticas principales
```sql
-- Farmacias
"Farmacias ven sus datos" ON farmacias
  USING (auth.uid() = id)

-- Productos
"Productos por farmacia" ON productos
  FOR SELECT USING (true)
  FOR INSERT/UPDATE USING (farmacia_id = auth.uid())
```

---

## 📦 Dependencias a instalar

```bash
# Cliente Supabase
npm install @supabase/supabase-js

# Stripe (pagos)
npm install @stripe/stripe-js stripe

# QR Code
npm install qrcode react-qr-code

# Tipos
npm install -D @types/qrcode
```

---

## 🔑 Variables de Entorno

```env
# Supabase
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Twilio (WhatsApp)
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
```

---

## 📊 Progreso

```
Milestone 2.1 ░░░░░░░░░░░░░░░░░░░░   0%
Milestone 2.2 ░░░░░░░░░░░░░░░░░░░░   0%
Milestone 2.3 ░░░░░░░░░░░░░░░░░░░░   0%
Milestone 2.4 ░░░░░░░░░░░░░░░░░░░░   0%
Milestone 2.5 ░░░░░░░░░░░░░░░░░░░░   0%
Milestone 2.6 ░░░░░░░░░░░░░░░░░░░░   0%
───────────────────────────────────────
FASE 2      ░░░░░░░░░░░░░░░░░░░░   0%
```

---

## ⬅️ Fase Anterior

[Fase 1 - Frontend (Mocks)](../fase-1-frontend/README.md)

## ➡️ Siguiente Fase

Fase 3 - Integraciones Avanzadas (Próximamente)

---

*Fase pendiente*

