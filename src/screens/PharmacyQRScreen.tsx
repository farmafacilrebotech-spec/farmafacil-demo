import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { Download, ArrowLeft, Copy, Check, Printer, Store } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { PharmacyLogo } from '../components/PharmacyLogo';

interface PharmacyQRScreenProps {
  onNavigate: (screen: string) => void;
}

// Datos de ejemplo de farmacias
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
  'FM-2024-003': { 
    name: 'Farmacia del Sol', 
    address: 'Plaza Mayor, 8',
    logoUrl: 'https://zvxxdmfljbtlenjatqgm.supabase.co/storage/v1/object/public/farmacias-logos/Farmafacil.png'
  },
};

// URL base para producción
const BASE_URL = 'https://farmafacil-demo.vercel.app';

export const PharmacyQRScreen: React.FC<PharmacyQRScreenProps> = ({ onNavigate }) => {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const qrRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const currentPharmacyId = pharmacyId || 'FM-2024-001';
  const pharmacy = pharmaciesData[currentPharmacyId] || pharmaciesData['FM-2024-001'];
  const qrUrl = `${BASE_URL}/qr/${currentPharmacyId}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(qrUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleDownloadPNG = async () => {
    setDownloading(true);
    
    try {
      // Crear un canvas temporal para combinar QR + logo
      const canvas = document.createElement('canvas');
      const size = 1024; // Alta resolución para impresión
      canvas.width = size;
      canvas.height = size + 200; // Espacio extra para texto
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      // Fondo blanco
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Borde decorativo
      ctx.strokeStyle = '#00C8C8';
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // Título de la farmacia
      ctx.fillStyle = '#1F2937';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(pharmacy.name, canvas.width / 2, 100);

      // Dirección
      ctx.fillStyle = '#6B7280';
      ctx.font = '32px Arial';
      ctx.fillText(pharmacy.address, canvas.width / 2, 150);

      // Generar QR en canvas temporal
      const qrCanvas = document.querySelector('#qr-canvas canvas') as HTMLCanvasElement;
      if (qrCanvas) {
        const qrSize = 700;
        const qrX = (canvas.width - qrSize) / 2;
        const qrY = 200;
        ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

        // Logo en el centro del QR
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        logoImg.onload = () => {
          const logoSize = 140;
          const logoX = canvas.width / 2 - logoSize / 2;
          const logoY = qrY + qrSize / 2 - logoSize / 2;
          
          // Fondo blanco para el logo
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2 + 10, 0, Math.PI * 2);
          ctx.fill();
          
          // Dibujar logo
          ctx.save();
          ctx.beginPath();
          ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
          ctx.restore();

          // Código de farmacia
          ctx.fillStyle = '#007878';
          ctx.font = 'bold 36px monospace';
          ctx.fillText(`Código: ${currentPharmacyId}`, canvas.width / 2, canvas.height - 100);

          // Instrucciones
          ctx.fillStyle = '#6B7280';
          ctx.font = '28px Arial';
          ctx.fillText('Escanea para acceder a tu cuenta', canvas.width / 2, canvas.height - 50);

          // Descargar
          const link = document.createElement('a');
          link.download = `QR-${pharmacy.name.replace(/\s/g, '-')}-${currentPharmacyId}.png`;
          link.href = canvas.toDataURL('image/png', 1.0);
          link.click();
          setDownloading(false);
        };
        logoImg.onerror = () => {
          // Si el logo no carga, descargar sin él
          ctx.fillStyle = '#007878';
          ctx.font = 'bold 36px monospace';
          ctx.fillText(`Código: ${currentPharmacyId}`, canvas.width / 2, canvas.height - 100);
          ctx.fillStyle = '#6B7280';
          ctx.font = '28px Arial';
          ctx.fillText('Escanea para acceder a tu cuenta', canvas.width / 2, canvas.height - 50);
          
          const link = document.createElement('a');
          link.download = `QR-${pharmacy.name.replace(/\s/g, '-')}-${currentPharmacyId}.png`;
          link.href = canvas.toDataURL('image/png', 1.0);
          link.click();
          setDownloading(false);
        };
        logoImg.src = pharmacy.logoUrl;
      }
    } catch (err) {
      console.error('Error al descargar:', err);
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <MockupContainer title="Mi Código QR">
      <div className="p-6 min-h-[600px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate('pharmacy-dashboard')}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>
          <PharmacyLogo size="sm" />
        </div>

        {/* Título */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Código QR de tu Farmacia</h1>
          <p className="text-gray-500 text-sm">
            Imprime este código y colócalo en un lugar visible para tus clientes
          </p>
        </div>

        {/* Info de farmacia */}
        <div className="mb-6 bg-gradient-to-r from-[#00C8C8]/10 to-[#007878]/10 border border-[#00C8C8]/30 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#00C8C8] rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800">{pharmacy.name}</p>
              <p className="text-sm text-gray-500">{pharmacy.address}</p>
              <p className="text-xs font-mono text-[#007878] mt-1">{currentPharmacyId}</p>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div 
          ref={qrRef}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6 print:shadow-none"
        >
          <div className="flex flex-col items-center">
            {/* QR con logo en el centro */}
            <div className="relative mb-4">
              <QRCodeSVG
                value={qrUrl}
                size={220}
                level="H" // Alta corrección de errores para permitir logo
                includeMargin={true}
                bgColor="#FFFFFF"
                fgColor="#1F2937"
              />
              {/* Logo superpuesto en el centro */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-14 h-14 bg-white rounded-full p-1 shadow-md">
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

            {/* Canvas oculto para descarga */}
            <div id="qr-canvas" className="hidden">
              <QRCodeCanvas
                value={qrUrl}
                size={700}
                level="H"
                includeMargin={true}
                bgColor="#FFFFFF"
                fgColor="#1F2937"
              />
            </div>

            {/* Texto bajo el QR */}
            <p className="text-sm text-gray-500 text-center mb-2">
              Escanea para acceder a tu cuenta
            </p>
            <p className="font-mono text-xs text-[#007878] bg-gray-100 px-3 py-1 rounded-lg">
              {currentPharmacyId}
            </p>
          </div>
        </div>

        {/* URL */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <label className="block text-xs text-gray-500 mb-2">URL del código QR</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={qrUrl}
              readOnly
              className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono text-gray-700"
            />
            <button
              onClick={handleCopyUrl}
              className={`p-2 rounded-lg transition-all ${
                copied 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              title={copied ? '¡Copiado!' : 'Copiar URL'}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3">
          <button
            onClick={handleDownloadPNG}
            disabled={downloading}
            className="w-full bg-gradient-to-r from-[#00C8C8] to-[#007878] hover:from-[#007878] hover:to-[#00C8C8] text-white font-semibold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            <span>{downloading ? 'Generando...' : 'Descargar QR en PNG'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="w-full bg-white border-2 border-[#00C8C8] text-[#007878] font-semibold py-4 rounded-xl hover:bg-[#00C8C8]/10 transition-all flex items-center justify-center gap-2"
          >
            <Printer className="w-5 h-5" />
            <span>Imprimir directamente</span>
          </button>
        </div>

        {/* Instrucciones */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Consejos de uso</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Coloca el QR en el mostrador o entrada</li>
            <li>• Tamaño recomendado: mínimo 5x5 cm</li>
            <li>• Asegúrate de buena iluminación</li>
            <li>• Los clientes acceden con su teléfono + SMS</li>
          </ul>
        </div>
      </div>
    </MockupContainer>
  );
};

