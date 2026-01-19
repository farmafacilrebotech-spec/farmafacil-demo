import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Sparkles, ArrowLeft, Plus, ShoppingCart } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { PharmacyLogo } from '../components/PharmacyLogo';
import { getProductsByCategory } from '../data/products';

interface KioskCatalogScreenProps {
  onNavigate: (screen: string) => void;
}

export const KioskCatalogScreen: React.FC<KioskCatalogScreenProps> = ({ onNavigate }) => {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);

  const currentPharmacyId = pharmacyId || 'FM-2024-001';

  const categories = [
    { id: 'all', label: 'Todos', color: '#00C8C8' },
    { id: 'probioticos', label: 'Probióticos', color: '#007878' },
    { id: 'dermocosmética', label: 'Dermocosmética', color: '#00C8C8' },
    { id: 'dolor', label: 'Dolor', color: '#007878' },
    { id: 'alergias', label: 'Alergias', color: '#00C8C8' },
    { id: 'infantil', label: 'Infantil', color: '#007878' },
  ];

  const filteredProducts = getProductsByCategory(activeCategory);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <MockupContainer title="Kiosko - Catálogo">
      <div className="min-h-[600px] flex flex-col bg-gradient-to-b from-[#00C8C8]/5 to-white">
        {/* Header fijo */}
        <div className="p-4 pb-3 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => onNavigate(`/kiosko/${currentPharmacyId}`)}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver</span>
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate(`/kiosko-carrito/${currentPharmacyId}`)}
                className="relative bg-[#00C8C8] text-white px-4 py-2 rounded-xl flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Carrito</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <PharmacyLogo size="sm" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">Buscar Productos</h2>

          {/* Buscador inteligente con IA */}
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="¿Qué necesitas? Busca con IA..."
              className="w-full pl-12 pr-12 py-3 border-2 border-[#00C8C8] rounded-xl focus:outline-none focus:border-[#007878] transition-colors text-lg"
            />
            <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#00C8C8] w-5 h-5" />
          </div>

          {/* Filtros rápidos */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: activeCategory === cat.id ? cat.color : undefined,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de productos scrolleable */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border-2 border-gray-100 rounded-2xl p-3 hover:shadow-lg transition-all"
              >
                {/* Imagen del producto */}
                <div className="w-full h-28 bg-gray-50 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/Productos/default.svg';
                    }}
                  />
                  {product.discount && (
                    <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                {/* Info producto */}
                <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2 min-h-[40px]">
                  {product.name}
                </h3>
                
                <div className="mb-2">
                  {product.originalPrice ? (
                    <div className="flex items-center gap-1">
                      <p className="text-gray-400 line-through text-xs">
                        €{product.originalPrice.toFixed(2)}
                      </p>
                      <p className="text-red-600 font-bold text-lg">
                        €{product.price.toFixed(2)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-[#00C8C8] font-bold text-lg">
                      €{product.price.toFixed(2)}
                    </p>
                  )}
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#00C8C8] hover:bg-[#007878] text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Añadir</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer con acceso al carrito */}
        {cartCount > 0 && (
          <div className="p-4 bg-white border-t border-gray-200 shadow-lg">
            <button
              onClick={() => onNavigate(`/kiosko-carrito/${currentPharmacyId}`)}
              className="w-full bg-gradient-to-r from-[#00C8C8] to-[#007878] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Ver carrito ({cartCount} productos)</span>
            </button>
          </div>
        )}
      </div>
    </MockupContainer>
  );
};

