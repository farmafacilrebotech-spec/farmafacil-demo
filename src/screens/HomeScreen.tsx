import React from 'react';
import { Play, QrCode, LogIn } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <MockupContainer title="Pantalla de Inicio">
      <div className="p-8 flex flex-col items-center justify-center min-h-[600px]">
        {/* Logo */}
        <div className="mb-12">
          <div className="w-24 h-24 bg-black rounded-3xl flex items-center justify-center shadow-lg mx-auto mb-4">
                <img 
                  src="https://zvxxdmfljbtlenjatqgm.supabase.co/storage/v1/object/public/farmacias-logos/Farmafacil.png"
                  alt="Logo FarmaFácil"
                  className="w-20 h-20 object-contain"
                />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4 text-center">
            FarmaFácil
          </h1>
          <p className="text-gray-500 text-center mt-2">Tu farmacia inteligente</p>
        </div>

        {/* Video de presentación */}
        <div className="w-full mb-6">
          <a
            href="https://www.youtube.com/watch?v=rtjhr3hvoB0"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-100 rounded-2xl p-6 flex flex-col items-center hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <Play className="w-12 h-12 text-[#00C8C8] mb-3" />
            <span className="text-gray-700 font-medium">Ver Demo del Producto</span>
          </a>
        </div>

        {/* Botón Solicitar DEMO */}
        <a
          href="https://calendly.com/farmafacil/bienvenida"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#00C8C8] hover:bg-[#007878] text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition-colors mb-8 text-center"
        >
          Solicitar DEMO
        </a>

        {/* Pestañas de acceso */}
        <div className="w-full grid grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('qr')}
            className="bg-white border-2 border-[#00C8C8] text-[#00C8C8] font-medium py-4 px-4 rounded-2xl hover:bg-[#00C8C8] hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <QrCode className="w-5 h-5" />
            <span>Escanear QR</span>
          </button>
          <button
            onClick={() => onNavigate('login')}
            className="bg-white border-2 border-[#00C8C8] text-[#00C8C8] font-medium py-4 px-4 rounded-2xl hover:bg-[#00C8C8] hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            <span>Login</span>
          </button>
        </div>
      </div>
    </MockupContainer>
  );
};

