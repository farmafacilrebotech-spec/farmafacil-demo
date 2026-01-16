import React, { useState } from 'react';
import { Search, Sparkles, ArrowLeft, Edit, Package } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { PharmacyLogo } from '../components/PharmacyLogo';
import { products, getProductsByCategory } from '../data/products';

interface PharmacyCatalogScreenProps {
  onNavigate: (screen: string) => void;
}

export const PharmacyCatalogScreen: React.FC<PharmacyCatalogScreenProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState<number | null>(null);

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
    <MockupContainer title="Catálogo Farmacia - Gestión">
      <div className="min-h-[600px] flex flex-col">
        {/* Header fijo */}
        <div className="p-6 pb-4 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onNavigate('pharmacy-dashboard')}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <PharmacyLogo size="sm" />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Package className="w-6 h-6 text-[#00C8C8]" />
            <h2 className="text-2xl font-bold text-gray-800">Gestión de Catálogo</h2>
          </div>

          {/* Buscador inteligente con IA */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
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
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border-2 border-gray-100 rounded-xl p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Imagen del producto */}
                  <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/Productos/default.svg';
                      }}
                    />
                  </div>

                  {/* Info producto */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {product.name}
                    </h3>
                    
                    {editingProduct === product.id ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <label className="text-xs text-gray-600">Precio (€)</label>
                            <input
                              type="number"
                              step="0.01"
                              defaultValue={product.price.toFixed(2)}
                              className="w-full px-2 py-1 border-2 border-[#00C8C8] rounded text-sm"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-xs text-gray-600">Stock</label>
                            <input
                              type="number"
                              defaultValue={product.stock}
                              className="w-full px-2 py-1 border-2 border-[#00C8C8] rounded text-sm"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingProduct(null)}
                            className="flex-1 bg-[#00C8C8] hover:bg-[#007878] text-white text-xs font-medium py-2 rounded transition-colors"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditingProduct(null)}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-2 rounded transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#00C8C8] font-bold text-lg">
                            €{product.price.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            Stock: <span className={`font-semibold ${
                              product.stock < 20 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {product.stock} uds
                            </span>
                          </p>
                        </div>
                        <button
                          onClick={() => setEditingProduct(product.id)}
                          className="bg-[#00C8C8] hover:bg-[#007878] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          <span className="text-sm font-medium">Editar</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupContainer>
  );
};

