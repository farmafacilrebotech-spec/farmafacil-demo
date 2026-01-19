import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Search, TrendingUp, TrendingDown, Package, BarChart3, Clock, Tablet, Smartphone, AlertTriangle } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { PharmacyLogo } from '../components/PharmacyLogo';

interface PharmacySearchStatsScreenProps {
  onNavigate: (screen: string) => void;
}

interface SearchTrend {
  term: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  source: 'app' | 'kiosk' | 'both';
}

interface ProductStat {
  id: string;
  name: string;
  category: string;
  searches: number;
  views: number;
  addedToCart: number;
  purchased: number;
  conversionRate: number;
  inStock: boolean;
}

// Datos de ejemplo
const topSearches: SearchTrend[] = [
  { term: 'probióticos', count: 156, trend: 'up', change: 23, source: 'both' },
  { term: 'dolor de cabeza', count: 134, trend: 'up', change: 15, source: 'app' },
  { term: 'crema hidratante', count: 98, trend: 'stable', change: 2, source: 'both' },
  { term: 'vitamina D', count: 87, trend: 'up', change: 45, source: 'app' },
  { term: 'paracetamol', count: 76, trend: 'down', change: -8, source: 'kiosk' },
  { term: 'alergia', count: 65, trend: 'up', change: 12, source: 'both' },
  { term: 'protector solar', count: 54, trend: 'down', change: -25, source: 'app' },
  { term: 'melatonina', count: 48, trend: 'up', change: 30, source: 'app' },
  { term: 'omega 3', count: 42, trend: 'stable', change: 1, source: 'both' },
  { term: 'antihistamínico', count: 38, trend: 'up', change: 18, source: 'kiosk' },
];

const productStats: ProductStat[] = [
  { id: 'PROD-001', name: 'Arkobiotics Íntima', category: 'Probióticos', searches: 89, views: 156, addedToCart: 45, purchased: 32, conversionRate: 36, inStock: true },
  { id: 'PROD-002', name: 'Megalevure 10 Sticks', category: 'Probióticos', searches: 67, views: 120, addedToCart: 38, purchased: 28, conversionRate: 42, inStock: true },
  { id: 'PROD-003', name: 'Eucerin Aquaphor', category: 'Dermocosmética', searches: 54, views: 98, addedToCart: 42, purchased: 35, conversionRate: 65, inStock: true },
  { id: 'PROD-004', name: 'Profaes4 Probióticos', category: 'Probióticos', searches: 45, views: 87, addedToCart: 28, purchased: 18, conversionRate: 40, inStock: false },
  { id: 'PROD-005', name: 'Collvital Probiotic', category: 'Probióticos', searches: 38, views: 65, addedToCart: 22, purchased: 15, conversionRate: 39, inStock: true },
  { id: 'PROD-006', name: 'Paracetamol 1g', category: 'Dolor', searches: 112, views: 145, addedToCart: 98, purchased: 87, conversionRate: 78, inStock: true },
];

const notFoundSearches = [
  { term: 'ozempic', count: 34 },
  { term: 'wegovy', count: 28 },
  { term: 'ibuprofeno 800', count: 15 },
  { term: 'crema retinol', count: 12 },
  { term: 'aceite cbd', count: 9 },
];

export const PharmacySearchStatsScreen: React.FC<PharmacySearchStatsScreenProps> = ({ onNavigate }) => {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const currentPharmacyId = pharmacyId || 'FM-2024-001';

  const [activeTab, setActiveTab] = useState<'searches' | 'products' | 'notfound'>('searches');

  const totalSearches = topSearches.reduce((acc, s) => acc + s.count, 0);

  return (
    <MockupContainer title="Estadísticas de Búsqueda">
      <div className="min-h-[600px] flex flex-col bg-gray-50">
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onNavigate(`/farmacia/${currentPharmacyId}`)}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <PharmacyLogo size="sm" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00C8C8] to-[#007878] rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Estadísticas</h1>
              <p className="text-sm text-gray-500">Productos buscados y tendencias</p>
            </div>
          </div>

          {/* Resumen rápido */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-[#00C8C8]/10 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-[#00C8C8]">{totalSearches}</p>
              <p className="text-xs text-gray-600">Búsquedas hoy</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-green-600">+18%</p>
              <p className="text-xs text-gray-600">vs. ayer</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-orange-600">{notFoundSearches.length}</p>
              <p className="text-xs text-gray-600">Sin resultados</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('searches')}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium flex items-center justify-center gap-1 ${
                activeTab === 'searches' ? 'bg-[#00C8C8] text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Search className="w-4 h-4" />
              Búsquedas
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium flex items-center justify-center gap-1 ${
                activeTab === 'products' ? 'bg-[#00C8C8] text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Package className="w-4 h-4" />
              Productos
            </button>
            <button
              onClick={() => setActiveTab('notfound')}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium flex items-center justify-center gap-1 ${
                activeTab === 'notfound' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Sin resultado
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'searches' && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500 mb-3">Términos más buscados (últimas 24h)</p>
              {topSearches.map((search, index) => (
                <div key={search.term} className="bg-white rounded-xl p-3 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-gray-800">{search.term}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{search.count} búsquedas</span>
                          {search.source === 'app' && (
                            <span className="flex items-center gap-0.5 text-blue-600">
                              <Smartphone className="w-3 h-3" /> App
                            </span>
                          )}
                          {search.source === 'kiosk' && (
                            <span className="flex items-center gap-0.5 text-purple-600">
                              <Tablet className="w-3 h-3" /> Kiosko
                            </span>
                          )}
                          {search.source === 'both' && (
                            <span className="text-gray-400">Ambos</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      search.trend === 'up' ? 'text-green-600' : 
                      search.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {search.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                      {search.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                      {search.change > 0 ? '+' : ''}{search.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 mb-3">Rendimiento de productos más buscados</p>
              {productStats.map((product) => (
                <div key={product.id} className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                    {!product.inStock && (
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                        Sin stock
                      </span>
                    )}
                  </div>
                  
                  {/* Funnel de conversión */}
                  <div className="flex items-center justify-between text-center">
                    <div className="flex-1">
                      <p className="text-lg font-bold text-gray-800">{product.searches}</p>
                      <p className="text-xs text-gray-500">Búsquedas</p>
                    </div>
                    <div className="text-gray-300">→</div>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-gray-800">{product.views}</p>
                      <p className="text-xs text-gray-500">Vistas</p>
                    </div>
                    <div className="text-gray-300">→</div>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-gray-800">{product.addedToCart}</p>
                      <p className="text-xs text-gray-500">Al carrito</p>
                    </div>
                    <div className="text-gray-300">→</div>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-green-600">{product.purchased}</p>
                      <p className="text-xs text-gray-500">Comprado</p>
                    </div>
                  </div>
                  
                  {/* Barra de conversión */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">Conversión</span>
                      <span className={`font-medium ${product.conversionRate >= 50 ? 'text-green-600' : 'text-orange-600'}`}>
                        {product.conversionRate}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${product.conversionRate >= 50 ? 'bg-green-500' : 'bg-orange-500'}`}
                        style={{ width: `${product.conversionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notfound' && (
            <div className="space-y-2">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-4">
                <p className="text-sm text-orange-700">
                  <strong>¡Oportunidad!</strong> Estos productos se buscan pero no están en tu catálogo.
                </p>
              </div>
              {notFoundSearches.map((search, index) => (
                <div key={search.term} className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                      </span>
                      <div>
                        <p className="font-medium text-gray-800">{search.term}</p>
                        <p className="text-xs text-gray-500">{search.count} búsquedas sin resultado</p>
                      </div>
                    </div>
                    <button className="bg-[#00C8C8] hover:bg-[#007878] text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
                      Añadir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MockupContainer>
  );
};

