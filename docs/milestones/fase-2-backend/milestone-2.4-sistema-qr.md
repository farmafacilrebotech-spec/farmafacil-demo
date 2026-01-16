# Milestone 2.4 - Sistema de Códigos QR

## 📋 Índice

1. [Objetivo](#objetivo)
2. [Paso 1: Tabla de Códigos QR](#paso-1-tabla-de-códigos-qr)
3. [Paso 2: Generación de QR](#paso-2-generación-de-qr)
4. [Paso 3: Validación y Escaneo](#paso-3-validación-y-escaneo)
5. [Paso 4: Vinculación Cliente-Farmacia](#paso-4-vinculación-cliente-farmacia)
6. [Paso 5: QR Dinámicos vs Estáticos](#paso-5-qr-dinámicos-vs-estáticos)
7. [Entregables](#entregables)
8. [Siguiente Milestone](#siguiente-milestone)

---

## Objetivo

Implementar el sistema de códigos QR para vincular clientes con farmacias.

**Estado**: 🔲 Pendiente

---

## Paso 1: Tabla de Códigos QR

### Descripción
Crear tabla para almacenar códigos QR.

### Schema
```sql
CREATE TABLE codigos_qr (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmacia_id UUID REFERENCES farmacias(id) NOT NULL,
  codigo VARCHAR(50) UNIQUE NOT NULL,
  tipo VARCHAR(20) DEFAULT 'estatico', -- estatico, dinamico
  activo BOOLEAN DEFAULT true,
  usos INTEGER DEFAULT 0,
  max_usos INTEGER, -- null = ilimitado
  expira_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vinculaciones cliente-farmacia via QR
CREATE TABLE qr_escaneos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_id UUID REFERENCES codigos_qr(id),
  cliente_id UUID REFERENCES clientes(id),
  escaneado_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Paso 2: Generación de QR

### Descripción
Generar códigos QR únicos para cada farmacia.

### Librería
```bash
npm install qrcode react-qr-code
```

### Función de generación
```typescript
import QRCode from 'qrcode';

export const generatePharmacyQR = async (pharmacyId: string) => {
  // Crear código único
  const code = `FF-${pharmacyId.slice(0,8)}-${Date.now()}`;
  
  // Guardar en BD
  const { data } = await supabase
    .from('codigos_qr')
    .insert({
      farmacia_id: pharmacyId,
      codigo: code,
      tipo: 'estatico',
    })
    .select()
    .single();
  
  // Generar imagen QR
  const qrDataUrl = await QRCode.toDataURL(
    `https://farmafacil.app/qr/${code}`,
    { width: 300 }
  );
  
  return { code, qrDataUrl };
};
```

---

## Paso 3: Validación y Escaneo

### Descripción
Validar códigos QR cuando un cliente los escanea.

### Función de validación
```typescript
export const validateQRCode = async (code: string) => {
  const { data: qr } = await supabase
    .from('codigos_qr')
    .select('*, farmacias(*)')
    .eq('codigo', code)
    .eq('activo', true)
    .single();
    
  if (!qr) {
    throw new Error('Código QR no válido');
  }
  
  // Verificar expiración
  if (qr.expira_at && new Date(qr.expira_at) < new Date()) {
    throw new Error('Código QR expirado');
  }
  
  // Verificar usos máximos
  if (qr.max_usos && qr.usos >= qr.max_usos) {
    throw new Error('Código QR agotado');
  }
  
  return qr;
};
```

---

## Paso 4: Vinculación Cliente-Farmacia

### Descripción
Asociar cliente con farmacia tras escanear QR.

### Flujo de vinculación
```typescript
export const linkClientToPharmacy = async (
  qrCode: string,
  clientPhone: string
) => {
  // 1. Validar QR
  const qr = await validateQRCode(qrCode);
  
  // 2. Buscar o crear cliente
  let { data: cliente } = await supabase
    .from('clientes')
    .select()
    .eq('telefono', clientPhone)
    .single();
    
  if (!cliente) {
    const { data } = await supabase
      .from('clientes')
      .insert({
        farmacia_id: qr.farmacia_id,
        telefono: clientPhone,
      })
      .select()
      .single();
    cliente = data;
  }
  
  // 3. Registrar escaneo
  await supabase.from('qr_escaneos').insert({
    qr_id: qr.id,
    cliente_id: cliente.id,
  });
  
  // 4. Incrementar contador
  await supabase
    .from('codigos_qr')
    .update({ usos: qr.usos + 1 })
    .eq('id', qr.id);
    
  return { cliente, farmacia: qr.farmacias };
};
```

---

## Paso 5: QR Dinámicos vs Estáticos

### Descripción
Soporte para diferentes tipos de QR.

### Tipos de QR

| Tipo | Descripción | Uso |
|------|-------------|-----|
| Estático | QR fijo para la farmacia | Cartelería, tarjetas |
| Dinámico | QR temporal para promociones | Campañas, eventos |
| Único | QR de un solo uso | Recetas, prescripciones |

### Generación de QR dinámico
```typescript
export const generateDynamicQR = async (
  pharmacyId: string,
  options: {
    maxUsos?: number;
    expiraEnHoras?: number;
    promocionId?: string;
  }
) => {
  const expiraAt = options.expiraEnHoras
    ? new Date(Date.now() + options.expiraEnHoras * 3600000)
    : null;
    
  return generateQR(pharmacyId, {
    tipo: 'dinamico',
    max_usos: options.maxUsos,
    expira_at: expiraAt,
  });
};
```

---

## Entregables

| Entregable | Estado |
|------------|--------|
| Tabla códigos QR | 🔲 |
| Generación QR | 🔲 |
| Validación/escaneo | 🔲 |
| Vinculación cliente | 🔲 |
| QR dinámicos | 🔲 |

---

## Siguiente Milestone

➡️ [Milestone 2.5 - Catálogos y Productos](./milestone-2.5-catalogos-productos.md)

---

*Milestone pendiente*

