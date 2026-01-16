import React, { useState, useEffect } from 'react';
import { CreditCard, X, Loader } from 'lucide-react';
import { paymentService, PaymentMethod } from '../services/paymentService';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: (paymentMethodId: string) => void;
  onError: (error: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  onSuccess,
  onError,
}) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadPaymentMethods();
    }
  }, [isOpen]);

  const loadPaymentMethods = async () => {
    setLoading(true);
    try {
      const methods = await paymentService.getPaymentMethods();
      setPaymentMethods(methods);
      const defaultMethod = methods.find(m => m.isDefault);
      if (defaultMethod) {
        setSelectedMethod(defaultMethod.id);
      }
    } catch (error) {
      console.error('Error loading payment methods:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      onError('Por favor selecciona un método de pago');
      return;
    }

    setProcessing(true);
    try {
      const paymentIntent = await paymentService.createPaymentIntent(amount);
      const result = await paymentService.processPayment(
        paymentIntent.id,
        selectedMethod
      );

      if (result.success) {
        onSuccess(selectedMethod);
      } else {
        onError(result.error || 'Error en el pago');
      }
    } catch (error) {
      onError('Error procesando el pago');
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Procesar Pago
        </h2>
        <p className="text-gray-600 mb-6">
          Selecciona tu método de pago preferido
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-8 h-8 text-[#00C8C8] animate-spin" />
          </div>
        ) : (
          <>
            {/* Métodos de pago */}
            <div className="space-y-3 mb-6">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    selectedMethod === method.id
                      ? 'border-[#00C8C8] bg-[#00C8C8] bg-opacity-5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-gray-600" />
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">
                          {method.brand} •••• {method.last4}
                        </p>
                        <p className="text-sm text-gray-500">
                          Exp: {method.expiryMonth}/{method.expiryYear}
                        </p>
                      </div>
                    </div>
                    {method.isDefault && (
                      <span className="text-xs bg-[#00C8C8] text-white px-2 py-1 rounded">
                        Principal
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Total */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Total a pagar:</span>
                <span className="text-2xl font-bold text-[#00C8C8]">
                  €{amount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={processing}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handlePayment}
                disabled={processing || !selectedMethod}
                className="flex-1 bg-[#00C8C8] hover:bg-[#007878] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Procesando...</span>
                  </>
                ) : (
                  <span>Pagar Ahora</span>
                )}
              </button>
            </div>
          </>
        )}

        {/* Seguridad */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            🔒 Pago seguro cifrado de extremo a extremo
          </p>
        </div>
      </div>
    </div>
  );
};

