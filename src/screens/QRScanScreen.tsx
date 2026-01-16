import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { QrCode, Smartphone, ArrowLeft, Store, CheckCircle } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { PharmacyLogo } from '../components/PharmacyLogo';

interface QRScanScreenProps {
  onNavigate: (screen: string) => void;
}

// Datos de ejemplo de farmacias (en producción vendría de la API)
const pharmaciesData: Record<string, { name: string; address: string; phone: string }> = {
  'FM-2024-001': { name: 'Farmacia Mediterráneo', address: 'C/ Valencia, 123', phone: '963 456 789' },
  'FM-2024-002': { name: 'Farmacia Central', address: 'Av. Principal, 45', phone: '963 111 222' },
  'FM-2024-003': { name: 'Farmacia del Sol', address: 'Plaza Mayor, 8', phone: '963 333 444' },
};

// Base de datos mock de clientes por teléfono (en producción vendría de la API)
const clientsByPhone: Record<string, { id: string; name: string; email: string }> = {
  '+34654321987': { id: 'CLI-7842', name: 'María García', email: 'maria@email.com' },
  '654321987': { id: 'CLI-7842', name: 'María García', email: 'maria@email.com' },
  '+34600111222': { id: 'CLI-5291', name: 'Juan López', email: 'juan@email.com' },
  '600111222': { id: 'CLI-5291', name: 'Juan López', email: 'juan@email.com' },
  '+34611223344': { id: 'CLI-3847', name: 'Ana Martínez', email: 'ana@email.com' },
  '611223344': { id: 'CLI-3847', name: 'Ana Martínez', email: 'ana@email.com' },
};

export const QRScanScreen: React.FC<QRScanScreenProps> = ({ onNavigate }) => {
  // Leer el ID de farmacia de la URL
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  
  const [scanned, setScanned] = useState(!!pharmacyId); // Si ya viene con pharmacyId, mostrar directamente
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [foundClient, setFoundClient] = useState<{ id: string; name: string } | null>(null);

  // Farmacia actual (de la URL o default para demo)
  const currentPharmacyId = pharmacyId || 'FM-2024-001';
  const pharmacy = pharmaciesData[currentPharmacyId] || pharmaciesData['FM-2024-001'];

  // Normalizar teléfono para búsqueda
  const normalizePhone = (p: string) => p.replace(/\s/g, '').replace(/^\+34/, '');

  const handleSendCode = async () => {
    if (!phone || phone.replace(/\s/g, '').length < 9) {
      setError('Introduce un teléfono válido');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Buscar cliente por teléfono
      const normalizedPhone = normalizePhone(phone);
      const client = clientsByPhone[phone] || clientsByPhone[normalizedPhone] || clientsByPhone['+34' + normalizedPhone];
      
      if (client) {
        setFoundClient({ id: client.id, name: client.name });
        setCodeSent(true);
      } else {
        // Cliente no encontrado - en producción se podría registrar
        setError('Teléfono no registrado en esta farmacia. Contacta con la farmacia para darte de alta.');
      }
    } catch (err) {
      setError('Error al enviar el código');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (code !== '123456') {
      setError('Código incorrecto. Usa: 123456');
      return;
    }

    if (!foundClient) {
      setError('Error: cliente no identificado');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Navegar al dashboard del cliente con los IDs en la URL
      onNavigate(`/cliente/${currentPharmacyId}/${foundClient.id}`);
    } catch (err) {
      setError('Error en la verificación');
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateScan = () => {
    // Simular escaneo del QR de la farmacia
    setScanned(true);
  };

  return (
    <MockupContainer title="Acceso Cliente">
      <div className="p-6 min-h-[600px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>
          <PharmacyLogo size="sm" />
        </div>

        {!scanned ? (
          <>
            {/* Escáner QR */}
            <div className="flex flex-col items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Escanea el QR
              </h2>
              <p className="text-gray-500 text-center mb-8">
                Apunta tu cámara al código QR de la farmacia
              </p>

              {/* Simulación de escáner */}
              <div className="w-64 h-64 border-4 border-[#00C8C8] rounded-3xl flex items-center justify-center bg-gray-50 relative overflow-hidden">
                <QrCode className="w-32 h-32 text-[#00C8C8] opacity-50" />
                {/* Línea de escaneo animada */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#00C8C8] animate-pulse"></div>
              </div>

              {/* Botón simular escaneo */}
              <button
                onClick={handleSimulateScan}
                className="mt-8 bg-[#00C8C8] hover:bg-[#007878] text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-colors"
              >
                Simular Escaneo
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Farmacia identificada */}
            <div className="mb-6 bg-gradient-to-r from-[#00C8C8]/10 to-[#007878]/10 border-2 border-[#00C8C8]/30 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-[#00C8C8] rounded-xl flex items-center justify-center">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600 font-medium">QR Verificado</span>
                  </div>
                  <p className="font-bold text-gray-800">{pharmacy.name}</p>
                  <p className="text-sm text-gray-500">{pharmacy.address}</p>
                </div>
              </div>
              <div className="bg-white/50 rounded-lg px-3 py-2">
                <p className="text-xs text-gray-500">Código de farmacia</p>
                <p className="font-mono font-bold text-[#007878]">{currentPharmacyId}</p>
              </div>
            </div>

            {/* Identificación por teléfono */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#00C8C8] rounded-full flex items-center justify-center mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Identifícate
              </h2>
              <p className="text-gray-500 text-center mb-6 text-sm">
                Introduce tu número de teléfono para acceder a tu cuenta
              </p>

              {/* Formulario */}
              <div className="w-full space-y-4">
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
                    <p className="text-sm text-red-800 text-center">{error}</p>
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Número de teléfono
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+34 654 321 987"
                    disabled={codeSent}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C8C8] focus:outline-none transition-colors disabled:bg-gray-100"
                  />
                </div>

                {!codeSent ? (
                  <>
                    <button
                      onClick={handleSendCode}
                      disabled={loading}
                      className="w-full bg-[#00C8C8] hover:bg-[#007878] text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Buscando...' : 'Enviar código SMS'}
                    </button>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                      <p className="text-xs text-blue-800 text-center">
                        💡 <strong>Demo:</strong> Usa el teléfono <span className="font-mono">654321987</span>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {foundClient && (
                      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3">
                        <p className="text-sm text-green-800 text-center">
                          ✓ ¡Hola, <strong>{foundClient.name}</strong>!
                        </p>
                        <p className="text-xs text-green-600 text-center mt-1">
                          ID: <span className="font-mono">{foundClient.id}</span>
                        </p>
                        <p className="text-xs text-green-600 text-center">
                          Código enviado a {phone}
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="block text-gray-700 font-medium mb-2 text-sm">
                        Código de verificación
                      </label>
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="000000"
                        maxLength={6}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C8C8] focus:outline-none transition-colors text-center text-2xl font-mono tracking-widest"
                      />
                    </div>

                    <button
                      onClick={handleVerify}
                      disabled={loading || code.length !== 6}
                      className="w-full bg-gradient-to-r from-[#00C8C8] to-[#007878] hover:from-[#007878] hover:to-[#00C8C8] text-white font-semibold py-4 rounded-xl shadow-lg transition-all disabled:opacity-50"
                    >
                      {loading ? 'Verificando...' : 'Verificar y Acceder'}
                    </button>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                      <p className="text-xs text-blue-800 text-center">
                        💡 <strong>Demo:</strong> Usa el código <span className="font-mono">123456</span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* Info de URL actual */}
        {scanned && (
          <div className="mt-6 bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 text-center">
              URL del QR: <span className="font-mono text-gray-700">/qr/{currentPharmacyId}</span>
            </p>
          </div>
        )}
      </div>
    </MockupContainer>
  );
};
