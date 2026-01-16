import React, { useState, useEffect } from 'react';
import { CreditCard, X, Loader, CheckCircle } from 'lucide-react';

interface TPVModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const TPVModal: React.FC<TPVModalProps> = ({
  isOpen,
  onClose,
  amount,
  onSuccess,
  onError,
}) => {
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<'waiting' | 'processing' | 'success'>('waiting');

  useEffect(() => {
    if (isOpen) {
      setStep('waiting');
      setProcessing(false);
    }
  }, [isOpen]);

  const handleStartPayment = async () => {
    setStep('processing');
    setProcessing(true);

    try {
      // Simulación de procesamiento de TPV (3 segundos)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulación de éxito (95% de probabilidad en TPV)
      const success = Math.random() > 0.05;
      
      if (success) {
        setStep('success');
        // Esperar 1.5s para mostrar el éxito antes de continuar
        await new Promise(resolve => setTimeout(resolve, 1500));
        onSuccess();
      } else {
        throw new Error('Pago rechazado por el banco');
      }
    } catch (error) {
      setProcessing(false);
      setStep('waiting');
      onError(error instanceof Error ? error.message : 'Error en el TPV');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        {step !== 'processing' && step !== 'success' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {step === 'waiting' && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Terminal TPV
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Procesamiento de pago con terminal punto de venta
            </p>

            {/* Simulación de TPV */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-6 text-center">
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-10 h-10 text-white" />
              </div>
              <p className="text-white text-lg font-semibold mb-2">
                Terminal de Pago
              </p>
              <p className="text-gray-400 text-sm">
                Inserte o acerque la tarjeta al lector
              </p>
            </div>

            {/* Total */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Total a cobrar:</span>
                <span className="text-3xl font-bold text-[#00C8C8]">
                  €{amount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleStartPayment}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Procesar Pago
              </button>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-[#00C8C8] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader className="w-10 h-10 text-[#00C8C8] animate-spin" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Procesando pago...
            </h3>
            <p className="text-gray-600 mb-4">
              Por favor, no retire la tarjeta
            </p>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mt-6">
              <p className="text-sm text-yellow-800">
                ⏳ Esperando confirmación del banco...
              </p>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              ¡Pago Aprobado!
            </h3>
            <p className="text-gray-600 mb-4">
              La transacción se ha completado correctamente
            </p>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <p className="text-sm text-green-800">
                ✓ Puede retirar la tarjeta
              </p>
            </div>
          </div>
        )}

        {/* Indicador de seguridad */}
        {step !== 'processing' && step !== 'success' && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              🔒 Conexión segura con el banco
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

