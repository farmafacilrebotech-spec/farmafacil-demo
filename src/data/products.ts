export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  stock: number;
  category: string;
  imageUrl: string;
}

// Ruta base para imágenes locales en public/Productos
const PRODUCTOS_PATH = '/Productos';

// Imagen por defecto cuando no hay coincidencia
const DEFAULT_IMAGE = `${PRODUCTOS_PATH}/default.svg`;

export const products: Product[] = [
  // === PROBIÓTICOS Y SUPLEMENTOS (Imágenes reales disponibles) ===
  {
    id: 1,
    name: 'Arkobiotics Íntima 20 cápsulas',
    description: 'Probiótico para el bienestar íntimo femenino. 20 cápsulas',
    price: 16.95,
    stock: 45,
    category: 'probioticos',
    imageUrl: `${PRODUCTOS_PATH}/arkobiotics-intima-20-capsulas.jpg`,
  },
  {
    id: 2,
    name: 'Arkolevura 50 cápsulas',
    description: 'Levadura de cerveza viva para el equilibrio intestinal. 50 cápsulas',
    price: 12.50,
    stock: 62,
    category: 'probioticos',
    imageUrl: `${PRODUCTOS_PATH}/arkolevura-50-capsulas.jpg`,
  },
  {
    id: 3,
    name: 'Arkopharma Arkobiotics Vitaminas y Defensas',
    description: 'Probióticos con vitaminas para reforzar las defensas. 7 unidosis',
    price: 9.95,
    originalPrice: 11.95,
    discount: 15,
    stock: 28,
    category: 'probioticos',
    imageUrl: `${PRODUCTOS_PATH}/arkopharma-arkobiotics-vitaminas-y-defensas-7-unidosis.jpg`,
  },
  {
    id: 4,
    name: 'Collvital Probiotic 30 cápsulas',
    description: 'Colágeno con probióticos para piel y articulaciones. 30 cápsulas',
    price: 24.95,
    originalPrice: 29.95,
    discount: 15,
    stock: 35,
    category: 'probioticos',
    imageUrl: `${PRODUCTOS_PATH}/collvital-probiotic-30-capsulas.jpg`,
  },
  {
    id: 5,
    name: 'Eucerin Aquaphor SOS Regenerador Labial 10ml',
    description: 'Bálsamo labial regenerador intensivo para labios secos y agrietados',
    price: 8.95,
    stock: 78,
    category: 'dermocosmética',
    imageUrl: `${PRODUCTOS_PATH}/eucerin-aquaphor-sos-regenerador-labial-10-ml.jpg`,
  },
  {
    id: 6,
    name: 'Megalevure 10 sticks',
    description: 'Probiótico en sticks para la flora intestinal. 10 unidades',
    price: 7.50,
    stock: 42,
    category: 'probioticos',
    imageUrl: `${PRODUCTOS_PATH}/megalevure-10-sticks.jpg`,
  },
  {
    id: 7,
    name: 'Profaes Probióticos Dual Vit 30 sticks',
    description: 'Probióticos con doble acción y vitaminas. 30 sticks',
    price: 18.95,
    originalPrice: 22.95,
    discount: 15,
    stock: 23,
    category: 'probioticos',
    imageUrl: `${PRODUCTOS_PATH}/profaes-probioticos-dual-vit-30-sticks.jpg`,
  },
  {
    id: 8,
    name: 'Profaes4 Probióticos Mujer 30 cápsulas',
    description: 'Probióticos específicos para la salud de la mujer. 30 cápsulas',
    price: 19.95,
    stock: 52,
    category: 'probioticos',
    imageUrl: `${PRODUCTOS_PATH}/profaes4-probioticos-mujer-30-capsulas.jpg`,
  },
  {
    id: 9,
    name: 'Sotya Carbón Activado con Probióticos 90 cápsulas',
    description: 'Carbón vegetal activado con probióticos para digestión. 90 cápsulas',
    price: 14.50,
    originalPrice: 16.50,
    discount: 10,
    stock: 31,
    category: 'probioticos',
    imageUrl: `${PRODUCTOS_PATH}/sotya-carbon-activado-con-probioticos-90-capsulas.jpg`,
  },
  // === PRODUCTOS ADICIONALES (Usan imagen por defecto) ===
  {
    id: 10,
    name: 'Ibuprofeno 600mg',
    description: 'Antiinflamatorio no esteroideo. 40 comprimidos',
    price: 8.95,
    stock: 45,
    category: 'dolor',
    imageUrl: DEFAULT_IMAGE,
  },
  {
    id: 11,
    name: 'Paracetamol 1g',
    description: 'Analgésico y antipirético. 40 comprimidos',
    price: 6.50,
    stock: 62,
    category: 'dolor',
    imageUrl: DEFAULT_IMAGE,
  },
  {
    id: 12,
    name: 'Crema Solar SPF50+',
    description: 'Protección solar muy alta. 200ml',
    price: 18.95,
    originalPrice: 22.95,
    discount: 15,
    stock: 28,
    category: 'dermocosmética',
    imageUrl: DEFAULT_IMAGE,
  },
  {
    id: 13,
    name: 'Cetirizina 10mg',
    description: 'Antihistamínico para alergias. 30 comprimidos',
    price: 9.95,
    stock: 35,
    category: 'alergias',
    imageUrl: DEFAULT_IMAGE,
  },
  {
    id: 14,
    name: 'Suero Fisiológico',
    description: 'Monodosis 5ml. Pack 20 unidades',
    price: 4.95,
    originalPrice: 5.95,
    discount: 10,
    stock: 78,
    category: 'infantil',
    imageUrl: DEFAULT_IMAGE,
  },
  {
    id: 15,
    name: 'Crema Hidratante Facial',
    description: 'Hidratación intensa. 50ml',
    price: 12.95,
    originalPrice: 15.95,
    discount: 15,
    stock: 23,
    category: 'dermocosmética',
    imageUrl: DEFAULT_IMAGE,
  },
  {
    id: 16,
    name: 'Vitamina C 1000mg',
    description: 'Complemento alimenticio. 60 comprimidos',
    price: 11.95,
    stock: 52,
    category: 'probioticos',
    imageUrl: DEFAULT_IMAGE,
  },
  {
    id: 17,
    name: 'Spray Nasal Descongestivo',
    description: 'Descongestión nasal rápida. 20ml',
    price: 8.50,
    stock: 31,
    category: 'alergias',
    imageUrl: DEFAULT_IMAGE,
  },
  {
    id: 18,
    name: 'Termómetro Digital',
    description: 'Medición rápida y precisa',
    price: 14.95,
    stock: 18,
    category: 'infantil',
    imageUrl: DEFAULT_IMAGE,
  },
  {
    id: 19,
    name: 'Colirio Lubricante',
    description: 'Alivio para ojos secos. 10ml',
    price: 9.95,
    originalPrice: 11.95,
    discount: 10,
    stock: 38,
    category: 'alergias',
    imageUrl: DEFAULT_IMAGE,
  },
  {
    id: 20,
    name: 'Gel de Baño Infantil',
    description: 'Piel sensible. 500ml',
    price: 7.95,
    stock: 45,
    category: 'infantil',
    imageUrl: DEFAULT_IMAGE,
  },
];

// Función helper para obtener productos por categoría
export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
};

// Función helper para obtener producto por ID
export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

// Función helper para obtener productos con imágenes reales (no default)
export const getProductsWithRealImages = (): Product[] => {
  return products.filter(p => !p.imageUrl.includes('default'));
};
