import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Search, MessageSquare, QrCode, ShoppingCart, Lock, X, Smartphone } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';

interface KioskScreenProps {
  onNavigate: (screen: string) => void;
}

// Datos de farmacias
const pharmaciesData: Record<string, { name: string; address: string; logoUrl: string }> = {
  'FM-2024-001': { 
    name: 'Farmacia Mediterráneo', 
    address: 'C/ Valencia, 123',
    logoUrl: 'https://zvxxdmfljbtlenjatqgm.supabase.co/storage/v1/object/public/farmacias-logos/logos/1763991491076-prueba.png'
  },
  'FM-2024-002': { 
    name: 'Farmacia Central', 
    address: 'Av. Principal, 45',
    logoUrl: 'https://zvxxdmfljbtlenjatqgm.supabase.co/storage/v1/object/public/farmacias-logos/Farmafacil.png'
  },
};

// URL base para producción
const BASE_URL = 'https://farmafacil-demo.vercel.app';

export const KioskScreen: React.FC<KioskScreenProps> = ({ onNavigate }) => {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const currentPharmacyId = pharmacyId || 'FM-2024-001';
  const pharmacy = pharmaciesData[currentPharmacyId] || pharmaciesData['FM-2024-001'];
  const qrUrl = `${BASE_URL}/qr/${currentPharmacyId}`;

  const [showExitModal, setShowExitModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Código de salida para el kiosko
  const EXIT_CODE = '1234';

  // Entrar en pantalla completa automáticamente al montar
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        }
      } catch (err) {
        console.log('Fullscreen not available');
      }
    };
    enterFullscreen();
  }, []);

  // Prevenir salida de pantalla completa con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExitAttempt = () => {
    if (password === EXIT_CODE) {
      setShowExitModal(false);
      setPassword('');
      // Salir de pantalla completa si está activa
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      onNavigate('pharmacy-dashboard');
    } else {
      setError('Código incorrecto');
      setPassword('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleExitAttempt();
    }
  };

  return (
    <MockupContainer title="Kiosko Cliente (Modo Tablet)">
      <div className="min-h-[600px] bg-gradient-to-br from-[#00C8C8] to-[#007878] p-8 flex flex-col relative">
        
        {/* Botón de salida (candado) - esquina superior izquierda - MUY discreto */}
        <button
          onClick={() => setShowExitModal(true)}
          className="absolute top-4 left-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all opacity-30 hover:opacity-60"
          title="Salir del modo kiosko"
        >
          <Lock className="w-4 h-4 text-white/50" />
        </button>

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
              onClick={() => onNavigate(`/kiosko-catalogo/${currentPharmacyId}`)}
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
              onClick={() => onNavigate(`/kiosko-asistente/${currentPharmacyId}`)}
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

            {/* Botón QR - Muestra modal con el QR de la farmacia */}
            <button
              onClick={() => setShowQRModal(true)}
              className="bg-white hover:bg-gray-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 aspect-square flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 bg-[#00C8C8] rounded-2xl flex items-center justify-center mb-4">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 text-center mb-1">
                Accede a tu cuenta
              </h3>
              <p className="text-xs text-gray-600 text-center">
                Escanea con tu móvil
              </p>
            </button>

            <button
              onClick={() => onNavigate(`/kiosko-carrito/${currentPharmacyId}`)}
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

        {/* Modal QR de la farmacia */}
        {showQRModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 w-96 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 text-lg">Accede a tu cuenta</h3>
                <button 
                  onClick={() => setShowQRModal(false)}
                  className="text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 text-[#00C8C8] mb-2">
                  <Smartphone className="w-5 h-5" />
                  <span className="font-medium">Escanea con tu móvil</span>
                </div>
                <p className="text-sm text-gray-500">
                  Accede a tu cuenta y revisa tus pedidos anteriores
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-white rounded-2xl p-4 flex flex-col items-center border-2 border-gray-100">
                <div className="relative">
                  <QRCodeSVG
                    value={qrUrl}
                    size={200}
                    level="H"
                    includeMargin={true}
                    bgColor="#FFFFFF"
                    fgColor="#1F2937"
                  />
                  {/* Logo superpuesto */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 bg-white rounded-full p-1 shadow-md">
                      <img
                        src={pharmacy.logoUrl}
                        alt={pharmacy.name}
                        className="w-full h-full object-contain rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="font-semibold text-gray-800">{pharmacy.name}</p>
                  <p className="text-xs text-gray-500">{pharmacy.address}</p>
                  <p className="text-xs font-mono text-[#007878] mt-1">{currentPharmacyId}</p>
                </div>
              </div>

              <div className="mt-4 bg-blue-50 rounded-xl p-3">
                <p className="text-xs text-blue-700 text-center">
                  📱 Abre la cámara de tu móvil y escanea el código QR para acceder a tu cuenta
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal de salida con contraseña */}
        {showExitModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-80 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <h3 className="font-bold text-gray-800">Salir del Kiosko</h3>
                </div>
                <button 
                  onClick={() => {
                    setShowExitModal(false);
                    setPassword('');
                    setError('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">
                Introduce el código de administrador para salir del modo kiosko.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-4">
                  <p className="text-sm text-red-600 text-center">{error}</p>
                </div>
              )}

              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                onKeyPress={handleKeyPress}
                placeholder="Código de salida"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C8C8] focus:outline-none text-center text-2xl font-mono tracking-widest mb-4"
                autoFocus
              />

              <button
                onClick={handleExitAttempt}
                className="w-full bg-[#00C8C8] hover:bg-[#007878] text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Desbloquear
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                💡 Demo: código <span className="font-mono">1234</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </MockupContainer>
  );
};
