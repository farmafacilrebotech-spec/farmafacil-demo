import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Search, MessageSquare, QrCode, ShoppingCart, Lock, X, Maximize, Minimize } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';

interface KioskScreenProps {
  onNavigate: (screen: string) => void;
}

export const KioskScreen: React.FC<KioskScreenProps> = ({ onNavigate }) => {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const currentPharmacyId = pharmacyId || 'FM-2024-001';

  const [showExitModal, setShowExitModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Código de salida para el kiosko
  const EXIT_CODE = '1234';

  // Detectar si estamos en pantalla completa
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Entrar en pantalla completa automáticamente
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

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.log('Fullscreen toggle failed');
    }
  };

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
        
        {/* Botón de salida (candado) - esquina superior izquierda */}
        <button
          onClick={() => setShowExitModal(true)}
          className="absolute top-4 left-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
          title="Salir del modo kiosko"
        >
          <Lock className="w-5 h-5 text-white/70" />
        </button>

        {/* Botón de pantalla completa - esquina superior derecha */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
          title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        >
          {isFullscreen ? (
            <Minimize className="w-5 h-5 text-white/70" />
          ) : (
            <Maximize className="w-5 h-5 text-white/70" />
          )}
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

            <button
              onClick={() => onNavigate(`/qr/${currentPharmacyId}`)}
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
