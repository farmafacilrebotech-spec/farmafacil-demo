import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, Truck, MapPin, CreditCard, AlertCircle, ChevronRight } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { PharmacyLogo } from '../components/PharmacyLogo';

interface ClientOrdersScreenProps {
  onNavigate: (screen: string) => void;
}

type OrderStatus = 'pending' | 'processing' | 'ready' | 'delivered';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  pharmacyName: string;
  pharmacyAddress: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentStatus: 'paid' | 'pending';
  createdAt: string;
  estimatedPickup?: string;
}

// Pedidos de ejemplo del cliente
const mockClientOrders: Order[] = [
  {
    id: 'PED-001',
    pharmacyName: 'Farmacia Mediterráneo',
    pharmacyAddress: 'C/ Valencia, 123',
    items: [
      { name: 'Arkobiotics Íntima', quantity: 2, price: 18.90 },
      { name: 'Megalevure 10 Sticks', quantity: 1, price: 12.50 },
    ],
    total: 50.30,
    status: 'pending',
    paymentStatus: 'paid',
    createdAt: '2026-01-20T10:30:00',
    estimatedPickup: '2026-01-20T14:00:00',
  },
  {
    id: 'PED-089',
    pharmacyName: 'Farmacia Mediterráneo',
    pharmacyAddress: 'C/ Valencia, 123',
    items: [
      { name: 'Profaes4 Probióticos', quantity: 1, price: 24.90 },
    ],
    total: 24.90,
    status: 'ready',
    paymentStatus: 'paid',
    createdAt: '2026-01-19T16:45:00',
  },
  {
    id: 'PED-076',
    pharmacyName: 'Farmacia Mediterráneo',
    pharmacyAddress: 'C/ Valencia, 123',
    items: [
      { name: 'Eucerin Aquaphor', quantity: 1, price: 8.95 },
      { name: 'Collvital Probiotic', quantity: 2, price: 19.95 },
    ],
    total: 48.85,
    status: 'delivered',
    paymentStatus: 'paid',
    createdAt: '2026-01-15T11:20:00',
  },
  {
    id: 'PED-054',
    pharmacyName: 'Farmacia Central',
    pharmacyAddress: 'Av. Principal, 45',
    items: [
      { name: 'Paracetamol 1g', quantity: 2, price: 3.50 },
    ],
    total: 7.00,
    status: 'delivered',
    paymentStatus: 'paid',
    createdAt: '2026-01-10T09:00:00',
  },
];

const statusConfig: Record<OrderStatus, { label: string; color: string; bgColor: string; icon: React.ElementType; description: string }> = {
  pending: { 
    label: 'En preparación', 
    color: 'text-yellow-700', 
    bgColor: 'bg-yellow-100', 
    icon: Clock,
    description: 'Tu pedido está siendo preparado'
  },
  processing: { 
    label: 'En proceso', 
    color: 'text-blue-700', 
    bgColor: 'bg-blue-100', 
    icon: Package,
    description: 'Estamos procesando tu pedido'
  },
  ready: { 
    label: 'Listo para recoger', 
    color: 'text-green-700', 
    bgColor: 'bg-green-100', 
    icon: CheckCircle,
    description: '¡Tu pedido está listo!'
  },
  delivered: { 
    label: 'Entregado', 
    color: 'text-gray-600', 
    bgColor: 'bg-gray-100', 
    icon: Truck,
    description: 'Pedido completado'
  },
};

export const ClientOrdersScreen: React.FC<ClientOrdersScreenProps> = ({ onNavigate }) => {
  const { pharmacyId, clientId } = useParams<{ pharmacyId: string; clientId: string }>();
  const currentPharmacyId = pharmacyId || 'FM-2024-001';
  const currentClientId = clientId || 'CLI-7842';

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');

  // Filtrar pedidos
  const filteredOrders = mockClientOrders.filter(order => {
    if (filterStatus === 'active') return order.status !== 'delivered';
    if (filterStatus === 'completed') return order.status === 'delivered';
    return true;
  });

  const activeOrdersCount = mockClientOrders.filter(o => o.status !== 'delivered').length;

  return (
    <MockupContainer title="Mis Pedidos">
      <div className="min-h-[600px] flex flex-col bg-gray-50">
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onNavigate(`/cliente/${currentPharmacyId}/${currentClientId}`)}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <PharmacyLogo size="sm" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">Mis Pedidos</h1>
          
          {activeOrdersCount > 0 && (
            <div className="bg-[#00C8C8]/10 border border-[#00C8C8]/30 rounded-xl p-3 mb-4">
              <p className="text-sm text-[#007878]">
                <strong>{activeOrdersCount}</strong> pedido(s) en curso
              </p>
            </div>
          )}

          {/* Filtros */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium ${
                filterStatus === 'all' ? 'bg-[#00C8C8] text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-4 py-2 rounded-xl text-sm font-medium ${
                filterStatus === 'active' ? 'bg-[#00C8C8] text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              En curso
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-xl text-sm font-medium ${
                filterStatus === 'completed' ? 'bg-[#00C8C8] text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Completados
            </button>
          </div>
        </div>

        {/* Lista de pedidos */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {filteredOrders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon;
              const isActive = order.status !== 'delivered';
              
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`bg-white rounded-2xl border-2 p-4 hover:shadow-md transition-all cursor-pointer ${
                    isActive ? 'border-[#00C8C8]/30' : 'border-gray-100'
                  }`}
                >
                  {/* Estado destacado para pedidos activos */}
                  {isActive && (
                    <div className={`${statusConfig[order.status].bgColor} rounded-xl p-3 mb-3`}>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`w-5 h-5 ${statusConfig[order.status].color}`} />
                        <div>
                          <p className={`font-semibold ${statusConfig[order.status].color}`}>
                            {statusConfig[order.status].label}
                          </p>
                          <p className="text-xs text-gray-600">
                            {statusConfig[order.status].description}
                          </p>
                        </div>
                      </div>
                      {order.estimatedPickup && order.status === 'pending' && (
                        <p className="text-xs text-gray-600 mt-2">
                          ⏰ Estimado: {new Date(order.estimatedPickup).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}h
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-gray-800">{order.id}</span>
                        {!isActive && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${statusConfig[order.status].bgColor} ${statusConfig[order.status].color}`}>
                            {statusConfig[order.status].label}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {order.pharmacyName}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(order.createdAt).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <div>
                        <p className="font-bold text-lg text-gray-800">€{order.total.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">{order.items.length} producto(s)</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No tienes pedidos</p>
                <button
                  onClick={() => onNavigate(`/catalogo/${currentPharmacyId}/${currentClientId}`)}
                  className="mt-4 bg-[#00C8C8] text-white px-6 py-2 rounded-xl font-medium"
                >
                  Ir al catálogo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal de detalle del pedido */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="font-bold text-lg">Pedido {selectedOrder.id}</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Estado */}
                <div className={`${statusConfig[selectedOrder.status].bgColor} rounded-xl p-4`}>
                  <div className="flex items-center gap-3">
                    {React.createElement(statusConfig[selectedOrder.status].icon, {
                      className: `w-8 h-8 ${statusConfig[selectedOrder.status].color}`
                    })}
                    <div>
                      <p className={`font-bold text-lg ${statusConfig[selectedOrder.status].color}`}>
                        {statusConfig[selectedOrder.status].label}
                      </p>
                      <p className="text-sm text-gray-600">
                        {statusConfig[selectedOrder.status].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Farmacia */}
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 uppercase mb-1">Recoger en</p>
                  <p className="font-semibold text-gray-800">{selectedOrder.pharmacyName}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {selectedOrder.pharmacyAddress}
                  </p>
                </div>

                {/* Productos */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Productos</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-gray-50 rounded-xl p-3">
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-500">x{item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-800">€{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-bold text-2xl text-[#00C8C8]">€{selectedOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm">
                    {selectedOrder.paymentStatus === 'paid' ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <CreditCard className="w-4 h-4" />
                        Pagado
                      </span>
                    ) : (
                      <span className="text-orange-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Pendiente de pago
                      </span>
                    )}
                  </div>
                </div>

                {/* Fecha */}
                <div className="text-xs text-gray-400 text-center">
                  Pedido realizado el {new Date(selectedOrder.createdAt).toLocaleString('es-ES')}
                </div>

                {/* Botón de acción */}
                {selectedOrder.status === 'ready' && (
                  <button className="w-full bg-[#00C8C8] hover:bg-[#007878] text-white font-semibold py-3 rounded-xl transition-colors">
                    Ver indicaciones para recoger
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </MockupContainer>
  );
};

