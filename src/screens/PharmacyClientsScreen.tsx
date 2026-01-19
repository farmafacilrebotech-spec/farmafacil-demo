import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, User, Phone, Search, Package, MessageSquare, Gift, Calendar, Mail, MapPin, Clock, Sparkles, ShoppingBag, ChevronRight } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { PharmacyLogo } from '../components/PharmacyLogo';

interface PharmacyClientsScreenProps {
  onNavigate: (screen: string) => void;
}

interface ClientOrder {
  id: string;
  date: string;
  total: number;
  items: number;
  status: 'delivered' | 'ready' | 'processing' | 'pending';
}

interface ClientQuery {
  id: string;
  date: string;
  question: string;
  answered: boolean;
}

interface ClientPromotion {
  id: string;
  name: string;
  discount: string;
  validUntil: string;
  used: boolean;
}

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  registeredAt: string;
  lastVisit: string;
  totalOrders: number;
  totalSpent: number;
  orders: ClientOrder[];
  queries: ClientQuery[];
  promotions: ClientPromotion[];
}

// Datos de ejemplo de clientes
const mockClients: Client[] = [
  {
    id: 'CLI-7842',
    name: 'María García',
    phone: '+34 654 321 987',
    email: 'maria@email.com',
    address: 'C/ Valencia, 45, 3º',
    registeredAt: '2025-06-15',
    lastVisit: '2026-01-19',
    totalOrders: 12,
    totalSpent: 387.50,
    orders: [
      { id: 'PED-001', date: '2026-01-19', total: 50.30, items: 3, status: 'pending' },
      { id: 'PED-089', date: '2026-01-10', total: 24.90, items: 1, status: 'delivered' },
      { id: 'PED-076', date: '2025-12-28', total: 89.00, items: 4, status: 'delivered' },
    ],
    queries: [
      { id: 'CON-001', date: '2026-01-19', question: '¿Puedo tomar ibuprofeno si estoy tomando aspirina?', answered: false },
      { id: 'CON-045', date: '2026-01-05', question: '¿Cuánto tiempo puedo tomar omeprazol?', answered: true },
    ],
    promotions: [
      { id: 'PROMO-01', name: '10% en probióticos', discount: '10%', validUntil: '2026-02-28', used: false },
      { id: 'PROMO-02', name: '5€ dto. compra +30€', discount: '5€', validUntil: '2026-01-31', used: false },
    ],
  },
  {
    id: 'CLI-5291',
    name: 'Juan López',
    phone: '+34 600 111 222',
    email: 'juan@email.com',
    address: 'Av. Principal, 12',
    registeredAt: '2025-09-20',
    lastVisit: '2026-01-18',
    totalOrders: 5,
    totalSpent: 156.80,
    orders: [
      { id: 'PED-002', date: '2026-01-18', total: 8.95, items: 1, status: 'processing' },
      { id: 'PED-067', date: '2025-12-15', total: 45.00, items: 2, status: 'delivered' },
    ],
    queries: [
      { id: 'CON-003', date: '2026-01-19', question: '¿Los probióticos se toman con el estómago vacío?', answered: false },
    ],
    promotions: [
      { id: 'PROMO-03', name: '15% en cosmética', discount: '15%', validUntil: '2026-01-25', used: false },
    ],
  },
  {
    id: 'CLI-3847',
    name: 'Ana Martínez',
    phone: '+34 611 223 344',
    email: 'ana@email.com',
    address: 'Plaza Mayor, 8, 1ºA',
    registeredAt: '2025-03-10',
    lastVisit: '2026-01-17',
    totalOrders: 23,
    totalSpent: 892.30,
    orders: [
      { id: 'PED-003', date: '2026-01-17', total: 55.30, items: 3, status: 'ready' },
      { id: 'PED-095', date: '2026-01-12', total: 32.50, items: 2, status: 'delivered' },
      { id: 'PED-082', date: '2026-01-03', total: 78.90, items: 5, status: 'delivered' },
    ],
    queries: [
      { id: 'CON-005', date: '2026-01-19', question: '¿La melatonina crea dependencia?', answered: false },
      { id: 'CON-034', date: '2025-12-20', question: '¿Puedo dar probióticos a mi hijo de 3 años?', answered: true },
      { id: 'CON-028', date: '2025-12-10', question: '¿Qué vitaminas son mejores en invierno?', answered: true },
    ],
    promotions: [],
  },
  {
    id: 'CLI-9156',
    name: 'Pedro Sánchez',
    phone: '+34 622 333 444',
    email: 'pedro@email.com',
    address: 'C/ Colón, 78',
    registeredAt: '2025-11-01',
    lastVisit: '2026-01-19',
    totalOrders: 3,
    totalSpent: 67.45,
    orders: [
      { id: 'PED-005', date: '2026-01-19', total: 11.50, items: 1, status: 'delivered' },
      { id: 'PED-056', date: '2025-12-22', total: 34.95, items: 2, status: 'delivered' },
    ],
    queries: [],
    promotions: [
      { id: 'PROMO-04', name: 'Bienvenida: 20% primera compra', discount: '20%', validUntil: '2026-02-01', used: true },
    ],
  },
  {
    id: 'CLI-4523',
    name: 'Laura Fernández',
    phone: '+34 633 444 555',
    email: 'laura@email.com',
    address: 'C/ San Vicente, 23',
    registeredAt: '2024-08-15',
    lastVisit: '2026-01-15',
    totalOrders: 45,
    totalSpent: 1567.80,
    orders: [
      { id: 'PED-098', date: '2026-01-15', total: 125.00, items: 6, status: 'delivered' },
      { id: 'PED-091', date: '2026-01-08', total: 45.30, items: 3, status: 'delivered' },
    ],
    queries: [
      { id: 'CON-055', date: '2026-01-10', question: '¿Hay interacción entre el magnesio y el hierro?', answered: true },
    ],
    promotions: [
      { id: 'PROMO-VIP', name: 'Cliente VIP: 5% permanente', discount: '5%', validUntil: '2026-12-31', used: false },
    ],
  },
  {
    id: 'CLI-6789',
    name: 'Carlos Ruiz',
    phone: '+34 644 555 666',
    email: 'carlos@email.com',
    address: 'Av. del Puerto, 156',
    registeredAt: '2025-07-22',
    lastVisit: '2026-01-14',
    totalOrders: 8,
    totalSpent: 234.60,
    orders: [
      { id: 'PED-087', date: '2026-01-14', total: 28.90, items: 2, status: 'delivered' },
    ],
    queries: [
      { id: 'CON-048', date: '2026-01-14', question: '¿Qué protector solar recomiendas para piel grasa?', answered: true },
    ],
    promotions: [],
  },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pedido', color: 'bg-yellow-100 text-yellow-700' },
  processing: { label: 'En proceso', color: 'bg-blue-100 text-blue-700' },
  ready: { label: 'Para recoger', color: 'bg-green-100 text-green-700' },
  delivered: { label: 'Entregado', color: 'bg-gray-100 text-gray-600' },
};

export const PharmacyClientsScreen: React.FC<PharmacyClientsScreenProps> = ({ onNavigate }) => {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const currentPharmacyId = pharmacyId || 'FM-2024-001';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'queries' | 'promotions'>('orders');

  // Filtrar clientes por teléfono o nombre
  const filteredClients = mockClients.filter(client => {
    const normalizedSearch = searchTerm.replace(/\s/g, '').toLowerCase();
    const normalizedPhone = client.phone.replace(/\s/g, '').toLowerCase();
    const normalizedName = client.name.toLowerCase();
    
    return normalizedPhone.includes(normalizedSearch) || normalizedName.includes(normalizedSearch);
  });

  return (
    <MockupContainer title="Clientes">
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
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Clientes</h1>
              <p className="text-sm text-gray-500">{mockClients.length} clientes registrados</p>
            </div>
          </div>

          {/* Buscador por teléfono */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por teléfono o nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C8C8] focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Lista de clientes */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{client.name}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {client.phone}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>

                <div className="mt-3 flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Package className="w-3 h-3" />
                    <span>{client.totalOrders} pedidos</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MessageSquare className="w-3 h-3" />
                    <span>{client.queries.length} consultas</span>
                  </div>
                  {client.promotions.filter(p => !p.used).length > 0 && (
                    <div className="flex items-center gap-1 text-green-600">
                      <Gift className="w-3 h-3" />
                      <span>{client.promotions.filter(p => !p.used).length} promo activa</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredClients.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No se encontraron clientes</p>
                <p className="text-sm text-gray-400">Prueba con otro teléfono o nombre</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal de detalle del cliente */}
        {selectedClient && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header del modal */}
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#00C8C8] to-[#007878] text-white">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => setSelectedClient(null)}
                    className="text-white/80 hover:text-white"
                  >
                    ✕
                  </button>
                  <span className="font-mono text-sm bg-white/20 px-2 py-1 rounded">{selectedClient.id}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedClient.name}</h2>
                    <p className="text-white/90 text-sm flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {selectedClient.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info del cliente */}
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{selectedClient.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Desde {new Date(selectedClient.registeredAt).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 col-span-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{selectedClient.address}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between bg-white rounded-xl p-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#00C8C8]">{selectedClient.totalOrders}</p>
                    <p className="text-xs text-gray-500">Pedidos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">€{selectedClient.totalSpent.toFixed(0)}</p>
                    <p className="text-xs text-gray-500">Gastado</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{new Date(selectedClient.lastVisit).toLocaleDateString('es-ES')}</p>
                    <p className="text-xs text-gray-500">Última visita</p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 bg-white">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-1 ${
                    activeTab === 'orders' ? 'text-[#00C8C8] border-b-2 border-[#00C8C8]' : 'text-gray-500'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Pedidos ({selectedClient.orders.length})
                </button>
                <button
                  onClick={() => setActiveTab('queries')}
                  className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-1 ${
                    activeTab === 'queries' ? 'text-[#00C8C8] border-b-2 border-[#00C8C8]' : 'text-gray-500'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  Consultas ({selectedClient.queries.length})
                </button>
                <button
                  onClick={() => setActiveTab('promotions')}
                  className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-1 ${
                    activeTab === 'promotions' ? 'text-[#00C8C8] border-b-2 border-[#00C8C8]' : 'text-gray-500'
                  }`}
                >
                  <Gift className="w-4 h-4" />
                  Promos ({selectedClient.promotions.filter(p => !p.used).length})
                </button>
              </div>

              {/* Contenido de las tabs */}
              <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'orders' && (
                  <div className="space-y-2">
                    {selectedClient.orders.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Sin pedidos</p>
                    ) : (
                      selectedClient.orders.map((order) => (
                        <div key={order.id} className="bg-gray-50 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono font-bold text-sm text-gray-800">{order.id}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${statusLabels[order.status].color}`}>
                              {statusLabels[order.status].label}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(order.date).toLocaleDateString('es-ES')}
                            </span>
                            <span className="font-semibold text-gray-800">
                              €{order.total.toFixed(2)} · {order.items} art.
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === 'queries' && (
                  <div className="space-y-2">
                    {selectedClient.queries.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Sin consultas</p>
                    ) : (
                      selectedClient.queries.map((query) => (
                        <div key={query.id} className="bg-gray-50 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(query.date).toLocaleDateString('es-ES')}
                            </span>
                            {query.answered ? (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                Revisada
                              </span>
                            ) : (
                              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                                Pendiente
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700">{query.question}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === 'promotions' && (
                  <div className="space-y-2">
                    {selectedClient.promotions.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Sin promociones</p>
                    ) : (
                      selectedClient.promotions.map((promo) => (
                        <div 
                          key={promo.id} 
                          className={`rounded-xl p-3 ${promo.used ? 'bg-gray-100' : 'bg-green-50 border border-green-200'}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-semibold text-sm ${promo.used ? 'text-gray-500' : 'text-green-700'}`}>
                              {promo.name}
                            </span>
                            <span className={`text-lg font-bold ${promo.used ? 'text-gray-400' : 'text-green-600'}`}>
                              {promo.discount}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">
                              Válido hasta: {new Date(promo.validUntil).toLocaleDateString('es-ES')}
                            </span>
                            {promo.used ? (
                              <span className="text-gray-400">Usada</span>
                            ) : (
                              <span className="text-green-600 font-medium">Activa ✓</span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </MockupContainer>
  );
};

