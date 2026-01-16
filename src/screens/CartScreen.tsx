import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, CreditCard, Store, User } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { PaymentModal } from '../components/PaymentModal';
import { OrderConfirmation } from '../components/OrderConfirmation';
import { PharmacyLogo } from '../components/PharmacyLogo';
import { paymentService, Order } from '../services/paymentService';
import { products } from '../data/products';

interface CartScreenProps {
  onNavigate: (screen: string) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({ onNavigate }) => {
  const { pharmacyId, clientId } = useParams<{ pharmacyId: string; clientId: string }>();
  
  const currentPharmacyCode = pharmacyId || 'FM-2024-001';
  const currentClientId = clientId || 'CLI-7842';
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Carrito de ejemplo usando productos del mock
  const cartItems = [
    { ...products[0], quantity: 2 }, // Arkobiotics Íntima
    { ...products[5], quantity: 1 }, // Megalevure
    { ...products[4], quantity: 1 }, // Eucerin Aquaphor
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayAndOrder = () => {
    setShowPaymentModal(true);
    setErrorMessage('');
  };

  const handlePaymentSuccess = async () => {
    setShowPaymentModal(false);
    setIsProcessing(true);

    try {
      // Crear pedido con estado pagado
      const order = await paymentService.createOrder(cartItems, 'paid');
      
      // Enviar notificación WhatsApp
      await paymentService.sendWhatsAppNotification('+34654321987', order);
      
      setCurrentOrder(order);
      setShowConfirmation(true);
    } catch (error) {
      setErrorMessage('Error al procesar el pedido');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOrderWithoutPayment = async () => {
    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Crear pedido sin pagar
      const order = await paymentService.createOrder(cartItems, 'pending');
      
      // Enviar notificación WhatsApp
      await paymentService.sendWhatsAppNotification('+34654321987', order);
      
      setCurrentOrder(order);
      setShowConfirmation(true);
    } catch (error) {
      setErrorMessage('Error al procesar el pedido');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error: string) => {
    setErrorMessage(error);
    setShowPaymentModal(false);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setCurrentOrder(null);
    // Aquí podrías limpiar el carrito
    onNavigate('client-dashboard');
  };

  return (
    <MockupContainer title="Carrito / Checkout">
      <div className="min-h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onNavigate('catalog')}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <PharmacyLogo size="sm" />
          </div>
          {/* IDs de contexto */}
          <div className="mb-3 flex gap-2">
            <div className="flex items-center gap-1 bg-[#00C8C8]/10 border border-[#00C8C8]/30 px-3 py-1.5 rounded-lg">
              <Store className="w-3.5 h-3.5 text-[#007878]" />
              <span className="text-xs font-mono font-bold text-[#007878]">{currentPharmacyCode}</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg">
              <User className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-xs font-mono font-bold text-gray-700">{currentClientId}</span>
            </div>
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

        {/* Footer - Resumen y checkout */}
        <div className="p-6 bg-white border-t-2 border-gray-100">
          {/* Total */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-800">€{total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Envío</span>
              <span className="font-semibold text-gray-800">€0.00</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-[#00C8C8]">
                  €{total.toFixed(2)}
                </span>
              </div>
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

          {/* Botones de acción */}
          <div className="space-y-3">
            <button
              onClick={handlePayAndOrder}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-[#00C8C8] to-[#007878] hover:from-[#007878] hover:to-[#00C8C8] text-white font-semibold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CreditCard className="w-5 h-5" />
              <span>Pagar y Enviar Pedido</span>
            </button>

            <button
              onClick={handleOrderWithoutPayment}
              disabled={isProcessing}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Store className="w-5 h-5" />
              <span>Enviar y Pagar en Farmacia</span>
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-3">
            📱 Recibirás confirmación por WhatsApp
          </p>
        </div>
      </div>

      {/* Modales */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={total}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />

      {showConfirmation && currentOrder && (
        <OrderConfirmation
          order={currentOrder}
          onClose={handleCloseConfirmation}
        />
      )}
    </MockupContainer>
  );
};

