import React from 'react';
import { ArrowLeft, ShoppingCart, Sparkles } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { products } from '../data/products';

interface ProductDetailScreenProps {
  onNavigate: (screen: string) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ onNavigate }) => {
  // Producto de ejemplo (en producción vendría por navegación/contexto)
  const product = products[0]; // Arkobiotics Íntima
  
  // Productos relacionados para recomendaciones
  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <MockupContainer title="Ficha de Producto">
      <div className="min-h-[600px] flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="p-6 pb-4 bg-white border-b border-gray-100">
          <button
            onClick={() => onNavigate('catalog')}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 p-6">
          {/* Imagen del producto */}
          <div className="w-full h-64 bg-gray-100 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain p-4"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/Productos/default.svg';
              }}
            />
          </div>

          {/* Info del producto */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-lg">
                  €{product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className={`text-3xl font-bold ${product.discount ? 'text-red-600' : 'text-[#00C8C8]'}`}>
                €{product.price.toFixed(2)}
              </span>
              {product.discount && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                  -{product.discount}%
                </span>
              )}
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Descripción</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Información</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Categoría: <span className="capitalize">{product.category}</span></li>
                <li>• Stock disponible: {product.stock} unidades</li>
                <li>• Referencia: PRD-{product.id.toString().padStart(4, '0')}</li>
              </ul>
            </div>
          </div>

          {/* Botón añadir al carrito */}
          <button
            onClick={() => onNavigate('cart')}
            className="w-full bg-[#00C8C8] hover:bg-[#007878] text-white font-semibold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 mb-6"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Añadir al carrito</span>
          </button>

          {/* Recomendaciones basadas en IA */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#00C8C8]" />
              <h3 className="font-semibold text-gray-800">
                Productos Relacionados
              </h3>
            </div>
            
            <div className="space-y-3">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-gray-100 rounded-xl p-3 flex items-center gap-3 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/Productos/default.svg';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 text-sm truncate">
                      {item.name}
                    </h4>
                    <p className="text-[#00C8C8] font-bold text-sm">
                      €{item.price.toFixed(2)}
                    </p>
                  </div>
                  <button className="bg-[#00C8C8] text-white p-2 rounded-lg hover:bg-[#007878] transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MockupContainer>
  );
};
