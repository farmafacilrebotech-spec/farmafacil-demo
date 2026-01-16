import React from 'react';
import { Package, MessageSquare, TrendingUp, Users, ShoppingBag, ArrowLeft } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';

interface PharmacyDashboardProps {
  onNavigate: (screen: string) => void;
}

export const PharmacyDashboard: React.FC<PharmacyDashboardProps> = ({ onNavigate }) => {
  return (
    <MockupContainer title="Dashboard Farmacia">
      <div className="p-6 min-h-[600px] overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Farmacia Centro</h1>
          <p className="text-gray-500">Panel de gestión</p>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#00C8C8] to-[#007878] rounded-2xl p-4 text-white">
            <Package className="w-8 h-8 mb-2 opacity-80" />
            <p className="text-2xl font-bold">24</p>
            <p className="text-sm opacity-90">Pedidos hoy</p>
          </div>
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-4">
            <Users className="w-8 h-8 mb-2 text-[#00C8C8]" />
            <p className="text-2xl font-bold text-gray-800">156</p>
            <p className="text-sm text-gray-500">Clientes activos</p>
          </div>
        </div>

        {/* Tarjetas de acceso */}
        <div className="space-y-3 mb-6">
          {/* Pedidos recientes */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#00C8C8] bg-opacity-10 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-[#00C8C8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Pedidos recientes</h3>
                  <p className="text-sm text-gray-500">8 pendientes de confirmar</p>
                </div>
              </div>
              <span className="text-[#00C8C8] font-bold">→</span>
            </div>
          </div>

          {/* Consultas del asistente */}
          <div
            onClick={() => onNavigate('ai-assistant')}
            className="bg-white border-2 border-gray-100 rounded-2xl p-4 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#007878] bg-opacity-10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-[#007878]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Consultas del asistente</h3>
                  <p className="text-sm text-gray-500">12 consultas hoy</p>
                </div>
              </div>
              <span className="text-[#007878] font-bold">→</span>
            </div>
          </div>

          {/* Productos más buscados */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#00C8C8] bg-opacity-10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#00C8C8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Productos buscados</h3>
                  <p className="text-sm text-gray-500">Ver tendencias</p>
                </div>
              </div>
              <span className="text-[#00C8C8] font-bold">→</span>
            </div>
          </div>

          {/* Clientes activos */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#007878] bg-opacity-10 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#007878]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Clientes activos</h3>
                  <p className="text-sm text-gray-500">156 registrados</p>
                </div>
              </div>
              <span className="text-[#007878] font-bold">→</span>
            </div>
          </div>
        </div>

        {/* Botón destacado - Catálogo */}
        <button
          onClick={() => onNavigate('pharmacy-catalog')}
          className="w-full bg-gradient-to-r from-[#00C8C8] to-[#007878] text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Gestionar Catálogo</span>
        </button>
      </div>
    </MockupContainer>
  );
};

