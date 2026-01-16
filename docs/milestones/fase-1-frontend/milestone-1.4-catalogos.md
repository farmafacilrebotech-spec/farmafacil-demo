# Milestone 1.4 - Catálogos y Productos

## 📋 Índice

1. [Objetivo](#objetivo)
2. [Paso 1: Modelo de Datos - Products](#paso-1-modelo-de-datos---products)
3. [Paso 2: CatalogScreen - Catálogo Cliente](#paso-2-catalogscreen---catálogo-cliente)
4. [Paso 3: PharmacyCatalogScreen - Gestión Catálogo](#paso-3-pharmacycatalogscreen---gestión-catálogo)
5. [Paso 4: ProductDetailScreen - Ficha de Producto](#paso-4-productdetailscreen---ficha-de-producto)
6. [Paso 5: Imágenes Reales de Productos](#paso-5-imágenes-reales-de-productos)
7. [Entregables](#entregables)
8. [Siguiente Milestone](#siguiente-milestone)

---

## Objetivo

Implementar el sistema de catálogo de productos con visualización, filtros y ficha detallada.

**Estado**: ✅ Completado

---

## Paso 1: Modelo de Datos - Products

### Descripción
Definir la estructura de datos para productos y funciones helper.

### Archivo: `src/data/products.ts`

### Interface del producto
```typescript
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;  // Precio original (para descuentos)
  discount?: number;       // % de descuento
  stock: number;
  category: string;
  imageUrl: string;
}
```

### Categorías definidas
```typescript
const categories = [
  'probioticos',      // Probióticos y suplementos
  'dermocosmética',   // Cremas, labiales, etc.
  'dolor',            // Analgésicos
  'alergias',         // Antihistamínicos
  'infantil',         // Productos para bebés/niños
];
```

### Funciones helper
```typescript
// Obtener productos por categoría
export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
};

// Obtener producto por ID
export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};
```

### Resultado
- ✅ Modelo de datos definido
- ✅ 20 productos de ejemplo
- ✅ Funciones de filtrado

---

## Paso 2: CatalogScreen - Catálogo Cliente

### Descripción
Pantalla de catálogo para clientes con búsqueda, filtros y grid de productos.

### Archivo: `src/screens/CatalogScreen.tsx`

### Elementos implementados
- Barra de búsqueda con IA
- Chips de promociones personalizadas
- Filtros por categoría (tabs)
- Grid 2 columnas de productos
- Tarjetas con imagen, nombre, precio y botón añadir
- Badge de descuento si aplica

### Diseño
```
┌─────────────────────────────┐
│  ← Volver            [Logo] │
│         Catálogo            │
├─────────────────────────────┤
│  [15% dermo✨] [2x1 vit✨]  │
│                             │
│  ┌─────────────────────┐   │
│  │ 🔍 Buscar con IA... │   │
│  └─────────────────────┘   │
│                             │
│  [Todos][Prob][Dermo][Dolor]│
│                             │
│  ┌─────────┐ ┌─────────┐   │
│  │ 📷      │ │ 📷 -15% │   │
│  │ Nombre  │ │ Nombre  │   │
│  │ €16.95  │ │ €18.95  │   │
│  │[Añadir] │ │[Añadir] │   │
│  └─────────┘ └─────────┘   │
│                             │
│  ┌─────────┐ ┌─────────┐   │
│  │ 📷      │ │ 📷      │   │
│  │ ...     │ │ ...     │   │
│  └─────────┘ └─────────┘   │
└─────────────────────────────┘
```

### Funcionalidades
- Scroll infinito (overflow-y-auto)
- Hover effects en tarjetas
- Fallback de imagen si falla la carga
- Precios con descuento tachados

### Resultado
- ✅ Grid de productos responsive
- ✅ Filtros funcionales
- ✅ UI atractiva con promociones

---

## Paso 3: PharmacyCatalogScreen - Gestión Catálogo

### Descripción
Pantalla de gestión de catálogo para farmacias con edición de precios y stock.

### Archivo: `src/screens/PharmacyCatalogScreen.tsx`

### Elementos implementados
- Lista de productos (vista diferente al cliente)
- Imagen, nombre, precio y stock por producto
- Indicador visual de stock bajo (rojo)
- Botón editar por producto
- Modal inline de edición (precio + stock)

### Diseño
```
┌─────────────────────────────┐
│  ← Volver            [Logo] │
│  📦 Gestión de Catálogo     │
├─────────────────────────────┤
│  ┌─────────────────────┐   │
│  │ 🔍 Buscar...        │   │
│  └─────────────────────┘   │
│                             │
│  [Todos][Prob][Dermo][Dolor]│
│                             │
│  ┌─────────────────────────┐│
│  │ 📷 │ Arkobiotics        ││
│  │    │ €16.95             ││
│  │    │ Stock: 45 uds ✓    ││
│  │    │           [Editar] ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │ 📷 │ Producto 2         ││
│  │    │ €12.50             ││
│  │    │ Stock: 5 uds ⚠️    ││
│  │    │           [Editar] ││
│  └─────────────────────────┘│
└─────────────────────────────┘
```

### Modo edición inline
```
┌─────────────────────────────┐
│ 📷 │ Arkobiotics            │
│    │ Precio: [16.95]        │
│    │ Stock:  [45   ]        │
│    │ [Guardar] [Cancelar]   │
└─────────────────────────────┘
```

### Resultado
- ✅ Vista de gestión para farmacias
- ✅ Edición inline de precio/stock
- ✅ Alertas visuales de stock bajo

---

## Paso 4: ProductDetailScreen - Ficha de Producto

### Descripción
Pantalla de detalle de producto con imagen, descripción, recomendaciones IA y botón de compra.

### Archivo: `src/screens/ProductDetailScreen.tsx`

### Elementos implementados
- Imagen grande del producto
- Nombre y precio destacado
- Badge de descuento si aplica
- Descripción expandida
- Información adicional (formato, categoría, stock)
- Botón "Añadir al carrito"
- Sección de productos relacionados (IA)

### Diseño
```
┌─────────────────────────────┐
│  ← Volver                   │
├─────────────────────────────┤
│  ┌─────────────────────┐   │
│  │                     │   │
│  │    📷 IMAGEN        │   │
│  │    PRODUCTO         │   │
│  │                     │   │
│  └─────────────────────┘   │
│                             │
│  Arkobiotics Íntima         │
│  €16.95        (-15% €19.95)│
│                             │
│  ┌─────────────────────┐   │
│  │ Descripción         │   │
│  │ Probiótico para...  │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ Información         │   │
│  │ • Categoría: Prob.  │   │
│  │ • Stock: 45 uds     │   │
│  └─────────────────────┘   │
│                             │
│  [ 🛒 Añadir al carrito ]   │
│                             │
│  ✨ Productos Relacionados  │
│  ┌────┐ ┌────┐ ┌────┐      │
│  │ 📷 │ │ 📷 │ │ 📷 │      │
│  │€12 │ │€18 │ │€9  │      │
│  └────┘ └────┘ └────┘      │
└─────────────────────────────┘
```

### Resultado
- ✅ Ficha de producto completa
- ✅ Imagen con fallback
- ✅ Recomendaciones relacionadas
- ✅ CTA de añadir al carrito

---

## Paso 5: Imágenes Reales de Productos

### Descripción
Configurar las imágenes reales de productos almacenadas localmente.

### Estructura de archivos
```
public/
└── Productos/
    ├── arkobiotics-intima-20-capsulas.jpg
    ├── arkolevura-50-capsulas.jpg
    ├── arkopharma-arkobiotics-vitaminas-y-defensas-7-unidosis.jpg
    ├── collvital-probiotic-30-capsulas.jpg
    ├── eucerin-aquaphor-sos-regenerador-labial-10-ml.jpg
    ├── megalevure-10-sticks.jpg
    ├── profaes-probioticos-dual-vit-30-sticks.jpg
    ├── profaes4-probioticos-mujer-30-capsulas.jpg
    ├── sotya-carbon-activado-con-probioticos-90-capsulas.jpg
    └── default.svg    # Fallback para productos sin imagen
```

### Uso en el mock
```typescript
const PRODUCTOS_PATH = '/Productos';

export const products: Product[] = [
  {
    id: 1,
    name: 'Arkobiotics Íntima 20 cápsulas',
    imageUrl: `${PRODUCTOS_PATH}/arkobiotics-intima-20-capsulas.jpg`,
    // ...
  },
  // Productos sin imagen real
  {
    id: 10,
    name: 'Ibuprofeno 600mg',
    imageUrl: `${PRODUCTOS_PATH}/default.svg`,
    // ...
  },
];
```

### Manejo de errores
```typescript
<img
  src={product.imageUrl}
  alt={product.name}
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = '/Productos/default.svg';
  }}
/>
```

### Resultado
- ✅ Imágenes reales en el catálogo
- ✅ Fallback SVG elegante
- ✅ Compatible con Next.js/Vite

---

## Entregables

| Entregable | Archivo | Estado |
|------------|---------|--------|
| Modelo de productos | `products.ts` | ✅ |
| Catálogo cliente | `CatalogScreen.tsx` | ✅ |
| Gestión catálogo | `PharmacyCatalogScreen.tsx` | ✅ |
| Ficha de producto | `ProductDetailScreen.tsx` | ✅ |
| Imágenes productos | `public/Productos/` | ✅ |

---

## Siguiente Milestone

➡️ [Milestone 1.5 - Carritos y Checkout](./milestone-1.5-carritos-checkout.md)

---

*Milestone completado: Diciembre 2024*

