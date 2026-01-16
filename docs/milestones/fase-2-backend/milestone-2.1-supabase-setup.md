# Milestone 2.1 - Configuración de Supabase

## 📋 Índice

1. [Objetivo](#objetivo)
2. [Paso 1: Crear Proyecto en Supabase](#paso-1-crear-proyecto-en-supabase)
3. [Paso 2: Configurar Cliente Supabase en React](#paso-2-configurar-cliente-supabase-en-react)
4. [Paso 3: Definir Esquema de Base de Datos](#paso-3-definir-esquema-de-base-de-datos)
5. [Paso 4: Configurar Row Level Security (RLS)](#paso-4-configurar-row-level-security-rls)
6. [Paso 5: Variables de Entorno](#paso-5-variables-de-entorno)
7. [Entregables](#entregables)
8. [Siguiente Milestone](#siguiente-milestone)

---

## Objetivo

Configurar el proyecto de Supabase como backend, definir el esquema de base de datos y establecer las políticas de seguridad.

**Estado**: 🔲 Pendiente

---

## Paso 1: Crear Proyecto en Supabase

### Descripción
Crear un nuevo proyecto en Supabase Dashboard.

### Tareas
- [ ] Registrarse en supabase.com
- [ ] Crear nuevo proyecto "farmafacil-prod"
- [ ] Seleccionar región (EU West)
- [ ] Configurar contraseña de base de datos
- [ ] Obtener URL y API Keys

### Datos del proyecto
```
URL: https://xxxxx.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Service Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Paso 2: Configurar Cliente Supabase en React

### Descripción
Instalar y configurar el cliente de Supabase en la aplicación React.

### Comandos
```bash
npm install @supabase/supabase-js
```

### Archivo: `src/lib/supabase.ts`
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

---

## Paso 3: Definir Esquema de Base de Datos

### Descripción
Crear las tablas principales del sistema.

### Tablas a crear
```sql
-- Farmacias
CREATE TABLE farmacias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telefono VARCHAR(20),
  direccion TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clientes
CREATE TABLE clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmacia_id UUID REFERENCES farmacias(id),
  nombre VARCHAR(255),
  telefono VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Productos
CREATE TABLE productos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmacia_id UUID REFERENCES farmacias(id),
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  stock INTEGER DEFAULT 0,
  categoria VARCHAR(100),
  imagen_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pedidos
CREATE TABLE pedidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmacia_id UUID REFERENCES farmacias(id),
  cliente_id UUID REFERENCES clientes(id),
  total DECIMAL(10,2) NOT NULL,
  estado VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Items de pedido
CREATE TABLE pedido_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id UUID REFERENCES pedidos(id),
  producto_id UUID REFERENCES productos(id),
  cantidad INTEGER NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL
);
```

---

## Paso 4: Configurar Row Level Security (RLS)

### Descripción
Establecer políticas de seguridad para cada tabla.

### Políticas básicas
```sql
-- Habilitar RLS
ALTER TABLE farmacias ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

-- Política: farmacias solo ven sus datos
CREATE POLICY "Farmacias ven sus datos" ON farmacias
  FOR ALL USING (auth.uid() = id);

-- Política: productos visibles por farmacia
CREATE POLICY "Productos por farmacia" ON productos
  FOR SELECT USING (true)
  FOR INSERT USING (farmacia_id = auth.uid())
  FOR UPDATE USING (farmacia_id = auth.uid());
```

---

## Paso 5: Variables de Entorno

### Descripción
Configurar variables de entorno para desarrollo y producción.

### Archivo: `.env.local`
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Archivo: `.env.example`
```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## Entregables

| Entregable | Estado |
|------------|--------|
| Proyecto Supabase | 🔲 |
| Cliente configurado | 🔲 |
| Esquema de BD | 🔲 |
| Políticas RLS | 🔲 |
| Variables de entorno | 🔲 |

---

## Siguiente Milestone

➡️ [Milestone 2.2 - Autenticación de Usuarios](./milestone-2.2-autenticacion-usuarios.md)

---

*Milestone pendiente*

