import React from 'react';
import { useParams } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, ArrowLeft, CreditCard, Plus, Store } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { PharmacyLogo } from '../components/PharmacyLogo';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

// Datos de ejemplo (en producción vendría de la API)
const pharmaciesData: Record<string, { name: string; address: string }> = {
  'FM-2024-001': { name: 'Farmacia Mediterráneo', address: 'C/ Valencia, 123' },
  'FM-2024-002': { name: 'Farmacia Central', address: 'Av. Principal, 45' },
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate }) => {
  const { pharmacyId, clientId } = useParams<{ pharmacyId: string; clientId: string }>();
  
  const currentPharmacyCode = pharmacyId || 'FM-2024-001';
  const currentClientId = clientId || 'CLI-7842';
  const pharmacy = pharmaciesData[currentPharmacyCode] || pharmaciesData['FM-2024-001'];

  return (
    <MockupContainer title="Perfil Cliente">
      <div className="p-6 min-h-[600px] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
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
        <div className="mb-4 flex gap-2">
          <div className="flex items-center gap-1 bg-[#00C8C8]/10 border border-[#00C8C8]/30 px-3 py-1.5 rounded-lg">
            <Store className="w-3.5 h-3.5 text-[#007878]" />
            <span className="text-xs font-mono font-bold text-[#007878]">{currentPharmacyCode}</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg">
            <User className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-xs font-mono font-bold text-gray-700">{currentClientId}</span>
          </div>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-[#00C8C8] to-[#007878] rounded-full flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Mi Perfil</h2>
          <p className="text-gray-500">Completa tus datos personales</p>
        </div>

        {/* Formulario */}
        <div className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">
              Nombre completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="María García López"
                defaultValue="María García López"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C8C8] focus:outline-none transition-colors text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                placeholder="maria@email.com"
                defaultValue="maria@email.com"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C8C8] focus:outline-none transition-colors text-sm"
              />
            </div>
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">
              Teléfono
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="tel"
                placeholder="+34 600 000 000"
                defaultValue="+34 654 321 987"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C8C8] focus:outline-none transition-colors text-sm"
              />
            </div>
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">
              Dirección
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Calle Principal, 123"
                defaultValue="Calle Mayor, 45, 28013 Madrid"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C8C8] focus:outline-none transition-colors text-sm"
              />
            </div>
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">
              Fecha de nacimiento
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                defaultValue="1990-05-15"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C8C8] focus:outline-none transition-colors text-sm"
              />
            </div>
          </div>

          {/* Botón Guardar */}
          <button className="w-full bg-[#00C8C8] hover:bg-[#007878] text-white font-semibold py-3 rounded-xl shadow-lg transition-colors mt-6">
            Guardar Cambios
          </button>
        </div>

        {/* Sección Formas de Pago */}
        <div className="mt-8 pt-6 border-t-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Formas de pago
            </h3>
            <button className="text-[#00C8C8] hover:text-[#007878] font-medium text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" />
              <span>Añadir</span>
            </button>
          </div>

          <div className="space-y-3">
            {/* Tarjeta guardada 1 */}
            <div className="bg-gradient-to-r from-[#00C8C8] to-[#007878] rounded-xl p-4 text-white">
              <div className="flex items-start justify-between mb-3">
                <CreditCard className="w-6 h-6" />
                <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                  Principal
                </span>
              </div>
              <p className="font-mono text-lg mb-2">•••• •••• •••• 4532</p>
              <div className="flex justify-between text-sm">
                <span>VISA</span>
                <span>Exp: 12/26</span>
              </div>
            </div>

            {/* Tarjeta guardada 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <CreditCard className="w-6 h-6 text-gray-600" />
              </div>
              <p className="font-mono text-lg mb-2 text-gray-800">•••• •••• •••• 8920</p>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Mastercard</span>
                <span>Exp: 08/25</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MockupContainer>
  );
};

