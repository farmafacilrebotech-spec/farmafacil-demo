import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Sparkles, ArrowLeft, Plus, Store, User } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { PharmacyLogo } from '../components/PharmacyLogo';
import { getProductsByCategory } from '../data/products';

interface CatalogScreenProps {
  onNavigate: (screen: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({ onNavigate }) => {
  const { pharmacyId, clientId } = useParams<{ pharmacyId: string; clientId: string }>();
  const [activeCategory, setActiveCategory] = useState('all');

  const currentPharmacyCode = pharmacyId || 'FM-2024-001';
  const currentClientId = clientId || 'CLI-7842';

  // Promociones personalizadas del cliente
  const promotions = [
    { id: 1, text: '15% dto. en dermocosmética', color: 'bg-purple-100 text-purple-800' },
    { id: 2, text: '2x1 en vitaminas', color: 'bg-green-100 text-green-800' },
  ];

  const categories = [
    { id: 'all', label: 'Todos', color: '#00C8C8' },
    { id: 'probioticos', label: 'Probióticos', color: '#007878' },
    { id: 'dermocosmética', label: 'Dermocosmética', color: '#00C8C8' },
    { id: 'dolor', label: 'Dolor', color: '#007878' },
    { id: 'alergias', label: 'Alergias', color: '#00C8C8' },
    { id: 'infantil', label: 'Infantil', color: '#007878' },
  ];

  const filteredProducts = getProductsByCategory(activeCategory);

  return (
    <MockupContainer title="Catálogo Cliente">
      <div className="min-h-[600px] flex flex-col">
        {/* Header fijo */}
        <div className="p-6 pb-4 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onNavigate('client-dashboard')}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <PharmacyLogo size="sm" />
          </div>

          {/* IDs de contexto */}
          <div className="mb-3 flex gap-2">
            <div className="flex items-center gap-1 bg-[#00C8C8]/10 border border-[#00C8C8]/30 px-3 py-1.5 rounded-lg">
              <Store className="w-3.5 h-3.5 text-[#007878]" />
              <span className="text-xs font-mono font-bold text-[#007878]">{currentPharmacyCode}</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg">
              <User className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-xs font-mono font-bold text-gray-700">{currentClientId}</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Catálogo</h2>

          {/* Promociones personalizadas */}
          <div className="mb-4 flex gap-2 overflow-x-auto">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className={`${promo.color} px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap flex items-center gap-2`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{promo.text}</span>
              </div>
            ))}
          </div>

          {/* Buscador inteligente con IA */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar con IA..."
              className="w-full pl-12 pr-12 py-3 border-2 border-[#00C8C8] rounded-xl focus:outline-none focus:border-[#007878] transition-colors"
            />
            <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#00C8C8] w-5 h-5" />
          </div>

          {/* Filtros rápidos */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
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
        <div className="flex-1 overflow-y-auto p-6 pt-4">
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onNavigate('product-detail')}
                className="bg-white border-2 border-gray-100 rounded-xl p-3 hover:shadow-lg transition-all cursor-pointer"
              >
                {/* Imagen del producto con badge de descuento */}
                <div className="w-full h-24 bg-gray-50 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain p-1"
                    onError={(e) => {
                      // Fallback si la imagen no carga
                      const target = e.target as HTMLImageElement;
                      target.src = '/Productos/default.svg';
                    }}
                  />
                  {product.discount && (
                    <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                {/* Info producto */}
                <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">
                  {product.name}
                </h3>
                <div className="mb-2">
                  {product.originalPrice ? (
                    <div className="flex items-center gap-1">
                      <p className="text-gray-400 line-through text-xs">
                        €{product.originalPrice.toFixed(2)}
                      </p>
                      <p className="text-red-600 font-bold text-base">
                        €{product.price.toFixed(2)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-[#00C8C8] font-bold text-base">
                      €{product.price.toFixed(2)}
                    </p>
                  )}
                </div>
                <button 
                  onClick={() => onNavigate('product-detail')}
                  className="w-full bg-[#00C8C8] hover:bg-[#007878] text-white text-xs font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupContainer>
  );
};

