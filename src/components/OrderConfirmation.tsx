import React from 'react';
import { CheckCircle, Clock, Package } from 'lucide-react';
import { Order } from '../services/paymentService';

interface OrderConfirmationProps {
  order: Order;
  onClose: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  order,
  onClose,
}) => {
  const isPaid = order.paymentStatus === 'paid';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        {/* Icono de éxito */}
        <div className="flex justify-center mb-4">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
            isPaid ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            {isPaid ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : (
              <Clock className="w-12 h-12 text-yellow-600" />
            )}
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          {isPaid ? '¡Pedido Confirmado!' : 'Pedido Recibido'}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {isPaid
            ? 'Tu pago se ha procesado correctamente'
            : 'Paga en farmacia al recoger tu pedido'}
        </p>

        {/* Número de pedido */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Package className="w-6 h-6 text-[#00C8C8]" />
            <div>
              <p className="text-sm text-gray-600">Número de pedido</p>
              <p className="text-xl font-bold text-gray-800">{order.id}</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Estado:</span>
              <span className={`font-semibold ${
                isPaid ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {isPaid ? 'Listo para recoger' : 'Pendiente de pago'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total:</span>
              <span className="text-xl font-bold text-[#00C8C8]">
                €{order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Productos:</h3>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-gray-800 font-medium">
                  €{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notificación WhatsApp */}
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-green-800 text-center">
            📱 <strong>Te hemos enviado una confirmación por WhatsApp</strong>
            <br />
            Recibirás notificaciones sobre el estado de tu pedido
          </p>
        </div>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="w-full bg-[#00C8C8] hover:bg-[#007878] text-white font-semibold py-4 rounded-xl transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

