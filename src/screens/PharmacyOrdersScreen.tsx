import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, Truck, CreditCard, AlertCircle, Filter, Search, Tablet, Smartphone } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { PharmacyLogo } from '../components/PharmacyLogo';

interface PharmacyOrdersScreenProps {
  onNavigate: (screen: string) => void;
}

type OrderStatus = 'pending' | 'processing' | 'ready' | 'delivered';
type OrderSource = 'client' | 'kiosk';

interface Order {
  id: string;
  clientName: string;
  clientPhone: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: OrderStatus;
  paymentStatus: 'paid' | 'pending';
  source: OrderSource;
  createdAt: string;
  updatedAt: string;
}

// Datos de ejemplo de pedidos
const mockOrders: Order[] = [
  {
    id: 'PED-001',
    clientName: 'María García',
    clientPhone: '+34 654 321 987',
    items: [
      { name: 'Arkobiotics Íntima', quantity: 2, price: 18.90 },
      { name: 'Megalevure 10 Sticks', quantity: 1, price: 12.50 },
    ],
    total: 50.30,
    status: 'pending',
    paymentStatus: 'paid',
    source: 'client',
    createdAt: '2026-01-19T13:30:00',
    updatedAt: '2026-01-19T13:30:00',
  },
  {
    id: 'PED-002',
    clientName: 'Juan López',
    clientPhone: '+34 600 111 222',
    items: [
      { name: 'Eucerin Aquaphor', quantity: 1, price: 8.95 },
    ],
    total: 8.95,
    status: 'processing',
    paymentStatus: 'pending',
    source: 'kiosk',
    createdAt: '2026-01-19T12:15:00',
    updatedAt: '2026-01-19T12:45:00',
  },
  {
    id: 'PED-003',
    clientName: 'Ana Martínez',
    clientPhone: '+34 611 223 344',
    items: [
      { name: 'Profaes4 Probióticos', quantity: 1, price: 24.90 },
      { name: 'Arkolevura 50 Cápsulas', quantity: 2, price: 15.20 },
    ],
    total: 55.30,
    status: 'ready',
    paymentStatus: 'paid',
    source: 'client',
    createdAt: '2026-01-19T11:00:00',
    updatedAt: '2026-01-19T12:30:00',
  },
  {
    id: 'PED-004',
    clientName: 'Cliente Kiosko',
    clientPhone: 'Sin registro',
    items: [
      { name: 'Collvital Probiotic', quantity: 1, price: 19.95 },
    ],
    total: 19.95,
    status: 'ready',
    paymentStatus: 'pending',
    source: 'kiosk',
    createdAt: '2026-01-19T10:30:00',
    updatedAt: '2026-01-19T11:15:00',
  },
  {
    id: 'PED-005',
    clientName: 'Pedro Sánchez',
    clientPhone: '+34 622 333 444',
    items: [
      { name: 'Sotya Carbón Activado', quantity: 1, price: 11.50 },
    ],
    total: 11.50,
    status: 'delivered',
    paymentStatus: 'paid',
    source: 'client',
    createdAt: '2026-01-19T09:00:00',
    updatedAt: '2026-01-19T10:00:00',
  },
];

const statusConfig: Record<OrderStatus, { label: string; color: string; bgColor: string; icon: React.ElementType }> = {
  pending: { label: 'Pedido', color: 'text-yellow-700', bgColor: 'bg-yellow-100', icon: Clock },
  processing: { label: 'En proceso', color: 'text-blue-700', bgColor: 'bg-blue-100', icon: Package },
  ready: { label: 'Para recoger', color: 'text-green-700', bgColor: 'bg-green-100', icon: CheckCircle },
  delivered: { label: 'Entregado', color: 'text-gray-700', bgColor: 'bg-gray-100', icon: Truck },
};

export const PharmacyOrdersScreen: React.FC<PharmacyOrdersScreenProps> = ({ onNavigate }) => {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const currentPharmacyId = pharmacyId || 'FM-2024-001';

  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const [filterSource, setFilterSource] = useState<OrderSource | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filtrar pedidos
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSource = filterSource === 'all' || order.source === filterSource;
    const matchesSearch = searchTerm === '' || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSource && matchesSearch;
  });

  // Cambiar estado del pedido
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
        : order
    ));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  // Marcar como pagado
  const markAsPaid = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, paymentStatus: 'paid', updatedAt: new Date().toISOString() }
        : order
    ));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, paymentStatus: 'paid' } : null);
    }
  };

  // Contadores
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const processingCount = orders.filter(o => o.status === 'processing').length;
  const readyCount = orders.filter(o => o.status === 'ready').length;

  return (
    <MockupContainer title="Gestión de Pedidos">
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

          <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Pedidos</h1>

          {/* Contadores rápidos */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-yellow-700">{pendingCount}</p>
              <p className="text-xs text-yellow-600">Nuevos</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-blue-700">{processingCount}</p>
              <p className="text-xs text-blue-600">En proceso</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-green-700">{readyCount}</p>
              <p className="text-xs text-green-600">Para recoger</p>
            </div>
          </div>

          {/* Buscador */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por ID o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:border-[#00C8C8] focus:outline-none"
            />
          </div>

          {/* Filtros */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                filterStatus === 'all' ? 'bg-[#00C8C8] text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Todos
            </button>
            {Object.entries(statusConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setFilterStatus(key as OrderStatus)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                  filterStatus === key ? 'bg-[#00C8C8] text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {config.label}
              </button>
            ))}
          </div>

          {/* Filtro por origen */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setFilterSource('all')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium ${
                filterSource === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Filter className="w-4 h-4" />
              Todos
            </button>
            <button
              onClick={() => setFilterSource('client')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium ${
                filterSource === 'client' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              App Cliente
            </button>
            <button
              onClick={() => setFilterSource('kiosk')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium ${
                filterSource === 'kiosk' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Tablet className="w-4 h-4" />
              Kiosko
            </button>
          </div>
        </div>

        {/* Lista de pedidos */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {filteredOrders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon;
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-gray-800">{order.id}</span>
                      {order.source === 'kiosk' ? (
                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Tablet className="w-3 h-3" />
                          Kiosko
                        </span>
                      ) : (
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Smartphone className="w-3 h-3" />
                          App
                        </span>
                      )}
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${statusConfig[order.status].bgColor}`}>
                      <StatusIcon className={`w-4 h-4 ${statusConfig[order.status].color}`} />
                      <span className={`text-xs font-medium ${statusConfig[order.status].color}`}>
                        {statusConfig[order.status].label}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{order.clientName}</p>
                      <p className="text-sm text-gray-500">{order.items.length} producto(s)</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-800">€{order.total.toFixed(2)}</p>
                      {order.paymentStatus === 'paid' ? (
                        <span className="text-xs text-green-600 flex items-center gap-1 justify-end">
                          <CreditCard className="w-3 h-3" />
                          Pagado
                        </span>
                      ) : (
                        <span className="text-xs text-orange-600 flex items-center gap-1 justify-end">
                          <AlertCircle className="w-3 h-3" />
                          Pendiente pago
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No hay pedidos con estos filtros</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal de detalle del pedido */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="font-bold text-lg">Pedido {selectedOrder.id}</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Info cliente */}
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-sm text-gray-500">Cliente</p>
                  <p className="font-semibold text-gray-800">{selectedOrder.clientName}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.clientPhone}</p>
                  <div className="mt-2 flex items-center gap-2">
                    {selectedOrder.source === 'kiosk' ? (
                      <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Tablet className="w-3 h-3" />
                        Pedido desde Kiosko
                      </span>
                    ) : (
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Smartphone className="w-3 h-3" />
                        Pedido desde App
                      </span>
                    )}
                  </div>
                </div>

                {/* Productos */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Productos</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">x{item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-800">€{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-bold text-xl text-[#00C8C8]">€{selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Estado de pago */}
                <div className={`rounded-xl p-3 ${selectedOrder.paymentStatus === 'paid' ? 'bg-green-50' : 'bg-orange-50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {selectedOrder.paymentStatus === 'paid' ? (
                        <>
                          <CreditCard className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-700">Pagado</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                          <span className="font-medium text-orange-700">Pendiente de pago</span>
                        </>
                      )}
                    </div>
                    {selectedOrder.paymentStatus === 'pending' && (
                      <button
                        onClick={() => markAsPaid(selectedOrder.id)}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-lg"
                      >
                        Marcar pagado
                      </button>
                    )}
                  </div>
                </div>

                {/* Cambiar estado */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Cambiar estado del pedido</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(statusConfig).map(([key, config]) => {
                      const Icon = config.icon;
                      const isActive = selectedOrder.status === key;
                      return (
                        <button
                          key={key}
                          onClick={() => updateOrderStatus(selectedOrder.id, key as OrderStatus)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                            isActive 
                              ? 'bg-[#00C8C8] text-white' 
                              : `${config.bgColor} ${config.color} hover:opacity-80`
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {config.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Timestamps */}
                <div className="text-xs text-gray-400 space-y-1">
                  <p>Creado: {new Date(selectedOrder.createdAt).toLocaleString('es-ES')}</p>
                  <p>Actualizado: {new Date(selectedOrder.updatedAt).toLocaleString('es-ES')}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MockupContainer>
  );
};

