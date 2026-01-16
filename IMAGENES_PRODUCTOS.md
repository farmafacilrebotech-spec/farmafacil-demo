# Generación de Imágenes para Productos FarmaFácil

## 📋 Lista de Productos que Necesitan Imágenes

A continuación se listan los 20 productos del catálogo. Para cada uno, genera una imagen con IA y súbela al storage de Supabase con el nombre exacto indicado.

### URL del Storage
```
https://zvxxdmfljbtlenjatqgm.supabase.co/storage/v1/object/public/catalogo-farmacias/catalogo-ia/
```

### Productos a Generar

1. **ibuprofeno-600mg.png**
   - Prompt: "Caja de medicamento Ibuprofeno 600mg, fondo blanco limpio, estilo fotorrealista, iluminación profesional de farmacia"

2. **paracetamol-1g.png**
   - Prompt: "Caja de medicamento Paracetamol 1g, 40 comprimidos, fondo blanco, fotografía de producto farmacéutico"

3. **crema-solar-spf50.png**
   - Prompt: "Bote de crema solar SPF 50+, 200ml, color blanco y azul, fondo blanco, fotografía de producto"

4. **cetirizina-10mg.png**
   - Prompt: "Caja de antihistamínico Cetirizina 10mg, fondo blanco, fotografía farmacéutica profesional"

5. **suero-fisiologico.png**
   - Prompt: "Pack de monodosis de suero fisiológico, envase azul y blanco, fondo blanco limpio"

6. **omeprazol-20mg.png**
   - Prompt: "Caja de medicamento Omeprazol 20mg cápsulas, fondo blanco, estilo farmacia"

7. **crema-hidratante-facial.png**
   - Prompt: "Tarro de crema hidratante facial elegante, 50ml, color blanco y dorado, fondo blanco"

8. **vitamina-c-1000mg.png**
   - Prompt: "Bote de vitamina C 1000mg, comprimidos efervescentes, naranja brillante, fondo blanco"

9. **spray-nasal.png**
   - Prompt: "Spray nasal descongestivo, envase azul, fondo blanco limpio, fotografía de producto"

10. **termometro-digital.png**
    - Prompt: "Termómetro digital blanco en su caja, moderno y profesional, fondo blanco"

11. **colirio-lubricante.png**
    - Prompt: "Frasco de colirio lubricante para ojos, azul y blanco, 10ml, fondo blanco"

12. **gel-bano-infantil.png**
    - Prompt: "Bote de gel de baño infantil 500ml, colores suaves pastel, diseño infantil, fondo blanco"

13. **serum-facial-antiedad.png**
    - Prompt: "Frasco de serum facial antiedad premium, 30ml, elegante, color ámbar, fondo blanco"

14. **jarabe-tos.png**
    - Prompt: "Botella de jarabe para la tos 150ml, color ámbar, con cuchara dosificadora, fondo blanco"

15. **locion-antimosquitos.png**
    - Prompt: "Spray antimosquitos 100ml, color verde, diseño veraniego, fondo blanco"

16. **probioticos-intestinales.png**
    - Prompt: "Bote de probióticos, cápsulas, diseño médico profesional, fondo blanco"

17. **mascarilla-facial-purificante.png**
    - Prompt: "Tubo de mascarilla facial verde, arcilla, 75ml, diseño elegante, fondo blanco"

18. **melatonina-1-9mg.png**
    - Prompt: "Bote de melatonina 1.9mg, color azul oscuro o morado, diseño nocturno, fondo blanco"

19. **toallitas-humedas-bebe.png**
    - Prompt: "Pack de toallitas húmedas para bebé, colores suaves, diseño infantil, fondo blanco"

20. **colirio-antihistaminico.png**
    - Prompt: "Frasco de colirio antihistamínico, diseño farmacéutico, fondo blanco limpio"

## 🎨 Recomendaciones para Generación con IA

### Herramientas Sugeridas
- **DALL-E 3** (OpenAI)
- **Midjourney**
- **Stable Diffusion**
- **Leonardo.ai**

### Parámetros Recomendados
- **Resolución**: 512x512px o 1024x1024px
- **Formato**: PNG con fondo transparente o blanco
- **Estilo**: Fotorrealista, iluminación profesional de estudio
- **Ángulo**: Frontal, ligeramente en 3/4
- **Fondo**: Blanco limpio (#FFFFFF)

### Prompt Base Común
```
Professional pharmaceutical product photography, white background, 
studio lighting, realistic, high quality, clean composition, 
front view, commercial product shot
```

## 📤 Proceso de Subida a Supabase

### Opción 1: Dashboard de Supabase
1. Ir a tu proyecto en Supabase
2. Navegar a Storage → `catalogo-farmacias` → `catalogo-ia`
3. Subir cada imagen con el nombre exacto especificado

### Opción 2: CLI de Supabase
```bash
supabase storage upload catalogo-farmacias/catalogo-ia ibuprofeno-600mg.png
```

### Opción 3: API (Node.js)
```javascript
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function uploadImage(filePath, fileName) {
  const { data, error } = await supabase.storage
    .from('catalogo-farmacias')
    .upload(`catalogo-ia/${fileName}`, filePath)
  
  if (error) console.error('Error:', error)
  else console.log('Uploaded:', fileName)
}
```

## ✅ Verificación

Una vez subidas todas las imágenes, las URLs serán:
```
https://zvxxdmfljbtlenjatqgm.supabase.co/storage/v1/object/public/catalogo-farmacias/catalogo-ia/[nombre-producto].png
```

El código ya está configurado para cargar automáticamente estas imágenes. Incluye fallback si alguna imagen no carga.

## 🔄 Sistema de Fallback

Si una imagen no carga, se muestra automáticamente un placeholder con emoji 💊 para mantener la experiencia visual coherente.

