import React from 'react';
import { Search, MessageSquare, QrCode, ShoppingCart } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';

interface KioskScreenProps {
  onNavigate: (screen: string) => void;
}

export const KioskScreen: React.FC<KioskScreenProps> = ({ onNavigate }) => {
  return (
    <MockupContainer title="Kiosko Cliente (Modo Tablet)">
      <div className="min-h-[600px] bg-gradient-to-br from-[#00C8C8] to-[#007878] p-8 flex flex-col">
        {/* Logo y bienvenida */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-black rounded-3xl flex items-center justify-center shadow-lg mx-auto mb-4">
          <img 
                  src="https://zvxxdmfljbtlenjatqgm.supabase.co/storage/v1/object/public/farmacias-logos/Farmafacil.png"
                  alt="Logo FarmaFácil"
                  className="w-20 h-20 object-contain"
                />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Bienvenido a FarmaFácil
          </h1>
          <p className="text-white text-lg opacity-90">
            ¿Qué necesitas hoy?
          </p>
        </div>

        {/* Botones principales - Grid 2x2 */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
            <button
              onClick={() => onNavigate('catalog')}
              className="bg-white hover:bg-gray-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 aspect-square flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 bg-[#00C8C8] rounded-2xl flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 text-center mb-1">
                Buscar producto
              </h3>
              <p className="text-xs text-gray-600 text-center">
                Buscador inteligente
              </p>
            </button>

            <button
              onClick={() => onNavigate('ai-assistant')}
              className="bg-white hover:bg-gray-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 aspect-square flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 bg-[#00C8C8] rounded-2xl flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 text-center mb-1">
                Asistente IA
              </h3>
              <p className="text-xs text-gray-600 text-center">
                Consulta farmacéutica
              </p>
            </button>

            <button
              onClick={() => onNavigate('qr')}
              className="bg-white hover:bg-gray-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 aspect-square flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 bg-[#00C8C8] rounded-2xl flex items-center justify-center mb-4">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 text-center mb-1">
                Escanear QR
              </h3>
              <p className="text-xs text-gray-600 text-center">
                Tus pedidos anteriores
              </p>
            </button>

            <button
              onClick={() => onNavigate('kiosk-cart')}
              className="bg-white hover:bg-gray-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 aspect-square flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 bg-[#00C8C8] rounded-2xl flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 text-center mb-1">
                Mi carrito
              </h3>
              <p className="text-xs text-gray-600 text-center">
                Imprimir ticket
              </p>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-white text-sm opacity-75 mt-8">
          <p>¿Necesitas ayuda? Consulta con nuestro personal</p>
        </div>
      </div>
    </MockupContainer>
  );
};

