# Milestone 2.3 - Gestión de Farmacias

## 📋 Índice

1. [Objetivo](#objetivo)
2. [Paso 1: CRUD de Farmacias](#paso-1-crud-de-farmacias)
3. [Paso 2: Configuración de Branding](#paso-2-configuración-de-branding)
4. [Paso 3: Storage para Logos](#paso-3-storage-para-logos)
5. [Paso 4: Panel de Configuración](#paso-4-panel-de-configuración)
6. [Paso 5: Métricas y Dashboard](#paso-5-métricas-y-dashboard)
7. [Entregables](#entregables)
8. [Siguiente Milestone](#siguiente-milestone)

---

## Objetivo

Implementar la gestión completa de farmacias: perfil, branding personalizado y métricas.

**Estado**: 🔲 Pendiente

---

## Paso 1: CRUD de Farmacias

### Descripción
Operaciones básicas sobre la tabla de farmacias.

### Funciones
```typescript
// Obtener farmacia actual
export const getCurrentPharmacy = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('farmacias')
    .select('*')
    .eq('id', user.id)
    .single();
    
  return data;
};

// Actualizar farmacia
export const updatePharmacy = async (updates: Partial<Pharmacy>) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('farmacias')
    .update(updates)
    .eq('id', user.id);
    
  return data;
};
```

---

## Paso 2: Configuración de Branding

### Descripción
Permitir a las farmacias personalizar su apariencia.

### Campos de branding
```typescript
interface PharmacyBranding {
  logo_url: string;
  color_primario: string;      // #00C8C8
  color_secundario: string;    // #007878
  nombre_comercial: string;
  slogan?: string;
}
```

---

## Paso 3: Storage para Logos

### Descripción
Configurar Supabase Storage para subir logos.

### Configuración bucket
```sql
-- Crear bucket público para logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true);

-- Política de subida
CREATE POLICY "Farmacias pueden subir logos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### Función de subida
```typescript
export const uploadLogo = async (file: File) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  const filePath = `${user.id}/${file.name}`;
  
  const { data, error } = await supabase.storage
    .from('logos')
    .upload(filePath, file, { upsert: true });
    
  return supabase.storage.from('logos').getPublicUrl(filePath);
};
```

---

## Paso 4: Panel de Configuración

### Descripción
Pantalla de configuración para la farmacia.

### Secciones
- Datos de la empresa
- Logo y colores
- Horarios de atención
- Métodos de pago aceptados
- Configuración de notificaciones

---

## Paso 5: Métricas y Dashboard

### Descripción
Queries para obtener métricas del dashboard.

### Consultas
```typescript
// Pedidos de hoy
const pedidosHoy = await supabase
  .from('pedidos')
  .select('count')
  .eq('farmacia_id', pharmacyId)
  .gte('created_at', today);

// Clientes activos (último mes)
const clientesActivos = await supabase
  .from('clientes')
  .select('count')
  .eq('farmacia_id', pharmacyId)
  .gte('last_activity', lastMonth);

// Ingresos del día
const ingresos = await supabase
  .from('pedidos')
  .select('total')
  .eq('farmacia_id', pharmacyId)
  .eq('estado', 'paid')
  .gte('created_at', today);
```

---

## Entregables

| Entregable | Estado |
|------------|--------|
| CRUD farmacias | 🔲 |
| Branding | 🔲 |
| Storage logos | 🔲 |
| Panel configuración | 🔲 |
| Métricas dashboard | 🔲 |

---

## Siguiente Milestone

➡️ [Milestone 2.4 - Sistema de Códigos QR](./milestone-2.4-sistema-qr.md)

---

*Milestone pendiente*

