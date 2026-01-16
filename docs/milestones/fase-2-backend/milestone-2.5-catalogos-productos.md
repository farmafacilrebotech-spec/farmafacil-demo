# Milestone 2.5 - Catálogos y Productos Backend

## 📋 Índice

1. [Objetivo](#objetivo)
2. [Paso 1: CRUD de Productos](#paso-1-crud-de-productos)
3. [Paso 2: Gestión de Categorías](#paso-2-gestión-de-categorías)
4. [Paso 3: Storage para Imágenes](#paso-3-storage-para-imágenes)
5. [Paso 4: Búsqueda y Filtros](#paso-4-búsqueda-y-filtros)
6. [Paso 5: Sincronización con Frontend](#paso-5-sincronización-con-frontend)
7. [Entregables](#entregables)
8. [Siguiente Milestone](#siguiente-milestone)

---

## Objetivo

Implementar la gestión completa de productos en el backend con soporte para imágenes y búsqueda.

**Estado**: 🔲 Pendiente

---

## Paso 1: CRUD de Productos

### Descripción
Operaciones completas sobre productos.

### Funciones
```typescript
// Obtener productos de una farmacia
export const getProducts = async (pharmacyId: string, category?: string) => {
  let query = supabase
    .from('productos')
    .select('*')
    .eq('farmacia_id', pharmacyId)
    .order('nombre');
    
  if (category && category !== 'all') {
    query = query.eq('categoria', category);
  }
  
  return query;
};

// Crear producto
export const createProduct = async (product: ProductInput) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  return supabase
    .from('productos')
    .insert({
      ...product,
      farmacia_id: user.id,
    })
    .select()
    .single();
};

// Actualizar producto
export const updateProduct = async (id: string, updates: Partial<Product>) => {
  return supabase
    .from('productos')
    .update(updates)
    .eq('id', id);
};

// Eliminar producto
export const deleteProduct = async (id: string) => {
  return supabase
    .from('productos')
    .delete()
    .eq('id', id);
};
```

---

## Paso 2: Gestión de Categorías

### Descripción
Sistema de categorías por farmacia.

### Schema
```sql
CREATE TABLE categorias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmacia_id UUID REFERENCES farmacias(id),
  nombre VARCHAR(100) NOT NULL,
  color VARCHAR(7) DEFAULT '#00C8C8',
  icono VARCHAR(50),
  orden INTEGER DEFAULT 0,
  activa BOOLEAN DEFAULT true,
  UNIQUE(farmacia_id, nombre)
);

-- Categorías por defecto al crear farmacia
CREATE OR REPLACE FUNCTION crear_categorias_default()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO categorias (farmacia_id, nombre, color, orden)
  VALUES
    (NEW.id, 'Probióticos', '#007878', 1),
    (NEW.id, 'Dermocosmética', '#00C8C8', 2),
    (NEW.id, 'Dolor', '#EF4444', 3),
    (NEW.id, 'Alergias', '#F59E0B', 4),
    (NEW.id, 'Infantil', '#8B5CF6', 5);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_farmacia_created
  AFTER INSERT ON farmacias
  FOR EACH ROW
  EXECUTE FUNCTION crear_categorias_default();
```

---

## Paso 3: Storage para Imágenes

### Descripción
Bucket para imágenes de productos.

### Configuración
```sql
-- Bucket para productos
INSERT INTO storage.buckets (id, name, public)
VALUES ('productos', 'productos', true);

-- Políticas
CREATE POLICY "Farmacias suben imágenes productos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'productos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

### Función de subida
```typescript
export const uploadProductImage = async (
  productId: string,
  file: File
) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  const filePath = `${user.id}/${productId}/${file.name}`;
  
  const { error } = await supabase.storage
    .from('productos')
    .upload(filePath, file, { upsert: true });
    
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('productos')
    .getPublicUrl(filePath);
    
  // Actualizar producto con URL
  await supabase
    .from('productos')
    .update({ imagen_url: publicUrl })
    .eq('id', productId);
    
  return publicUrl;
};
```

---

## Paso 4: Búsqueda y Filtros

### Descripción
Implementar búsqueda full-text y filtros avanzados.

### Búsqueda
```typescript
export const searchProducts = async (
  pharmacyId: string,
  searchTerm: string
) => {
  return supabase
    .from('productos')
    .select('*')
    .eq('farmacia_id', pharmacyId)
    .or(`nombre.ilike.%${searchTerm}%,descripcion.ilike.%${searchTerm}%`)
    .order('nombre');
};

// Filtros avanzados
export const filterProducts = async (
  pharmacyId: string,
  filters: {
    categoria?: string;
    precioMin?: number;
    precioMax?: number;
    conStock?: boolean;
    conDescuento?: boolean;
  }
) => {
  let query = supabase
    .from('productos')
    .select('*')
    .eq('farmacia_id', pharmacyId);
    
  if (filters.categoria) {
    query = query.eq('categoria', filters.categoria);
  }
  if (filters.precioMin) {
    query = query.gte('precio', filters.precioMin);
  }
  if (filters.precioMax) {
    query = query.lte('precio', filters.precioMax);
  }
  if (filters.conStock) {
    query = query.gt('stock', 0);
  }
  if (filters.conDescuento) {
    query = query.not('descuento', 'is', null);
  }
  
  return query.order('nombre');
};
```

---

## Paso 5: Sincronización con Frontend

### Descripción
Real-time updates y cache de productos.

### Suscripción en tiempo real
```typescript
export const subscribeToProducts = (
  pharmacyId: string,
  callback: (products: Product[]) => void
) => {
  return supabase
    .channel('productos-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'productos',
        filter: `farmacia_id=eq.${pharmacyId}`,
      },
      async () => {
        // Recargar productos
        const { data } = await getProducts(pharmacyId);
        callback(data);
      }
    )
    .subscribe();
};
```

### Hook de React
```typescript
export const useProducts = (pharmacyId: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Carga inicial
    getProducts(pharmacyId).then(({ data }) => {
      setProducts(data);
      setLoading(false);
    });
    
    // Suscripción real-time
    const subscription = subscribeToProducts(pharmacyId, setProducts);
    
    return () => {
      subscription.unsubscribe();
    };
  }, [pharmacyId]);
  
  return { products, loading };
};
```

---

## Entregables

| Entregable | Estado |
|------------|--------|
| CRUD productos | 🔲 |
| Gestión categorías | 🔲 |
| Storage imágenes | 🔲 |
| Búsqueda/filtros | 🔲 |
| Sincronización RT | 🔲 |

---

## Siguiente Milestone

➡️ [Milestone 2.6 - Pedidos y Pagos](./milestone-2.6-pedidos-pagos.md)

---

*Milestone pendiente*

