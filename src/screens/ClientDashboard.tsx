import React from 'react';
import { useParams } from 'react-router-dom';
import { Package, Sparkles, ShoppingBag, ShoppingCart, User, Store } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { PharmacyLogo } from '../components/PharmacyLogo';

interface ClientDashboardProps {
  onNavigate: (screen: string) => void;
}

// Datos de ejemplo de farmacias (en producción vendría de la API)
const pharmaciesData: Record<string, { name: string; address: string }> = {
  'FM-2024-001': { name: 'Farmacia Mediterráneo', address: 'C/ Valencia, 123' },
  'FM-2024-002': { name: 'Farmacia Central', address: 'Av. Principal, 45' },
  'FM-2024-003': { name: 'Farmacia del Sol', address: 'Plaza Mayor, 8' },
};

// Datos de ejemplo de clientes (en producción vendría de la API)
const clientsData: Record<string, { name: string; email: string }> = {
  'CLI-7842': { name: 'María García', email: 'maria@email.com' },
  'CLI-5291': { name: 'Juan López', email: 'juan@email.com' },
  'CLI-3847': { name: 'Ana Martínez', email: 'ana@email.com' },
};

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ onNavigate }) => {
  // Leer parámetros de la URL
  const { pharmacyId, clientId } = useParams<{ pharmacyId: string; clientId: string }>();
  
  // Obtener datos de la farmacia y cliente (con fallback para demo)
  const pharmacy = pharmaciesData[pharmacyId || 'FM-2024-001'] || pharmaciesData['FM-2024-001'];
  const client = clientsData[clientId || 'CLI-7842'] || clientsData['CLI-7842'];
  const currentPharmacyCode = pharmacyId || 'FM-2024-001';
  const currentClientId = clientId || 'CLI-7842';

  const cards = [
    { icon: Package, title: 'Mis Pedidos', color: '#00C8C8', screen: `/cliente-pedidos/${currentPharmacyCode}/${currentClientId}` },
    { icon: Sparkles, title: 'Recomendaciones IA', color: '#00C8C8', screen: `/asistente-ia/${currentPharmacyCode}` },
    { icon: ShoppingBag, title: 'Catálogo', color: '#00C8C8', screen: `/catalogo/${currentPharmacyCode}/${currentClientId}` },
    { icon: ShoppingCart, title: 'Carrito', color: '#00C8C8', screen: `/carrito/${currentPharmacyCode}/${currentClientId}` },
  ];

  return (
    <MockupContainer title="Dashboard Cliente">
      <div className="p-6 min-h-[600px]">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">¡Hola, {client.name.split(' ')[0]}!</h1>
              <p className="text-gray-500">Bienvenida a tu espacio personal</p>
            </div>
            <PharmacyLogo size="sm" />
          </div>
        </div>

        {/* Tarjeta de identificación del cliente */}
        <div className="mb-4 bg-white border border-gray-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{client.name}</p>
              <p className="text-sm text-gray-500">{client.email}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">ID Cliente</p>
              <p className="font-mono font-bold text-gray-700 text-sm">{currentClientId}</p>
            </div>
          </div>
        </div>

        {/* Tarjeta de Farmacia Actual */}
        <div className="mb-6 bg-gradient-to-r from-[#00C8C8]/10 to-[#007878]/10 border border-[#00C8C8]/30 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00C8C8] rounded-xl flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Farmacia actual</p>
              <p className="font-semibold text-gray-800">{pharmacy.name}</p>
              <p className="text-sm text-gray-500">{pharmacy.address}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Código</p>
              <p className="font-mono font-bold text-[#007878] text-sm">{currentPharmacyCode}</p>
            </div>
          </div>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {cards.slice(0, 4).map((card, index) => {
            const Icon = card.icon;
            return (
              <button
                key={index}
                onClick={() => onNavigate(card.screen)}
                className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all hover:border-gray-200 flex flex-col items-center justify-center text-center min-h-[140px]"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: card.color + '20' }}
                >
                  <Icon className="w-6 h-6" style={{ color: card.color }} />
                </div>
                <span className="text-gray-800 font-medium text-sm">
                  {card.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Botón destacado - Perfil */}
        <button
          onClick={() => onNavigate(`/perfil/${currentPharmacyCode}/${currentClientId}`)}
          className="w-full bg-gradient-to-r from-[#00C8C8] to-[#007878] text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <User className="w-5 h-5" />
          <span>Ir a mi perfil</span>
        </button>

        {/* Sección de pedidos recientes */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Últimos pedidos
          </h3>
          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-gray-50 rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div>
                    <p className="font-medium text-gray-800">Pedido #{1000 + item}</p>
                    <p className="text-sm text-gray-500">Hace 3 días</p>
                  </div>
                </div>
                <span className="text-[#00C8C8] font-semibold">€24.50</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupContainer>
  );
};
