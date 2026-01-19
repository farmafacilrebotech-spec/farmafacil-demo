import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, Printer, CreditCard } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { TPVModal } from '../components/TPVModal';
import { PharmacyLogo } from '../components/PharmacyLogo';
import { products } from '../data/products';

interface KioskCartScreenProps {
  onNavigate: (screen: string) => void;
}

export const KioskCartScreen: React.FC<KioskCartScreenProps> = ({ onNavigate }) => {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const currentPharmacyId = pharmacyId || 'FM-2024-001';

  const [showTicket, setShowTicket] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [showTPVModal, setShowTPVModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Carrito de ejemplo usando productos del mock
  const cartItems = [
    { ...products[0], quantity: 2 }, // Arkobiotics Íntima
    { ...products[5], quantity: 1 }, // Megalevure
    { ...products[4], quantity: 1 }, // Eucerin Aquaphor
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePrintTicket = (paid: boolean) => {
    setIsPaid(paid);
    setShowTicket(true);
  };

  const handlePrintAndPay = () => {
    setShowTPVModal(true);
    setErrorMessage('');
  };

  const handleTPVSuccess = () => {
    setShowTPVModal(false);
    // Imprimir ticket pagado después del pago exitoso
    handlePrintTicket(true);
  };

  const handleTPVError = (error: string) => {
    setErrorMessage(error);
    setShowTPVModal(false);
  };

  if (showTicket) {
    return (
      <MockupContainer title="Ticket Impreso">
        <div className="min-h-[600px] p-8 bg-white">
          {/* Ticket */}
          <div className="max-w-sm mx-auto border-2 border-dashed border-gray-400 rounded-lg p-6 bg-gray-50">
            {/* Header del ticket */}
            <div className="text-center mb-6 pb-4 border-b-2 border-dashed border-gray-300">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <img 
                  src="https://zvxxdmfljbtlenjatqgm.supabase.co/storage/v1/object/public/farmacias-logos/logos/1763991491076-prueba.png"
                  alt="Logo Pruebas"
                  className="w-20 h-20 object-contain"
               />
            </div>            
            <h2 className="text-xl font-bold text-gray-800">FarmaFácil</h2>
              <p className="text-sm text-gray-600">Farmacia Centro</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date().toLocaleDateString('es-ES')} - {new Date().toLocaleTimeString('es-ES')}
              </p>
            </div>

            {/* Productos */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3 text-sm">PRODUCTOS:</h3>
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-gray-800 flex-1">{item.name}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>{item.quantity} x €{item.price.toFixed(2)}</span>
                      <span className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t-2 border-dashed border-gray-300 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">TOTAL:</span>
                <span className="text-2xl font-bold text-[#00C8C8]">€{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Estado del pedido */}
            <div className={`text-center py-3 rounded-lg font-bold text-lg ${
              isPaid 
                ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                : 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
            }`}>
              {isPaid ? '✓ PEDIDO PAGADO' : '⏳ PEDIDO PENDIENTE DE PAGO'}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300 text-center">
              <p className="text-xs text-gray-600">
                Gracias por confiar en FarmaFácil
              </p>
              {!isPaid && (
                <p className="text-xs text-gray-500 mt-2">
                  Por favor, dirígete al mostrador para pagar
                </p>
              )}
            </div>
          </div>

          {/* Botón volver */}
          <button
            onClick={() => setShowTicket(false)}
            className="w-full mt-6 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 rounded-xl transition-colors"
          >
            Volver al Carrito
          </button>
        </div>
      </MockupContainer>
    );
  }

  return (
    <MockupContainer title="Carrito Kiosko">
      <div className="min-h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onNavigate(`/kiosko/${currentPharmacyId}`)}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <PharmacyLogo size="sm" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Mi Carrito</h2>
          <p className="text-gray-500 text-sm">{cartItems.length} productos</p>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border-2 border-gray-100 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  {/* Imagen */}
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/Productos/default.svg';
                      }}
                    />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                      {item.name}
                    </h3>
                    <p className="text-[#00C8C8] font-bold mb-3">
                      €{item.price.toFixed(2)}
                    </p>
                    
                    {/* Controles de cantidad */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button className="w-8 h-8 bg-[#00C8C8] hover:bg-[#007878] rounded-lg flex items-center justify-center transition-colors">
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                      
                      <button className="text-red-500 hover:text-red-600 p-2">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer - Total y botones de impresión */}
        <div className="p-6 bg-white border-t-2 border-gray-100">
          {/* Total */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-[#00C8C8]">
                €{total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Mensaje de error */}
          {errorMessage && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 mb-4">
              <p className="text-sm text-red-800 text-center">
                <strong>Error:</strong> {errorMessage}
              </p>
            </div>
          )}

          {/* Botones de impresión */}
          <div className="space-y-3">
            <button
              onClick={() => handlePrintTicket(false)}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-5 h-5" />
              <span>Imprimir Ticket (Pendiente de Pago)</span>
            </button>

            <button
              onClick={handlePrintAndPay}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              <span>Pagar con TPV e Imprimir</span>
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-3">
            🖨️ El ticket se imprimirá automáticamente
          </p>
        </div>
      </div>

      {/* Modal de TPV (Terminal Punto de Venta) */}
      <TPVModal
        isOpen={showTPVModal}
        onClose={() => setShowTPVModal(false)}
        amount={total}
        onSuccess={handleTPVSuccess}
        onError={handleTPVError}
      />
    </MockupContainer>
  );
};

