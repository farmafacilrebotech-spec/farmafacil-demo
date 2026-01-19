import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Send, Sparkles, ShoppingCart } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { PharmacyLogo } from '../components/PharmacyLogo';

interface KioskAIAssistantScreenProps {
  onNavigate: (screen: string) => void;
}

export const KioskAIAssistantScreen: React.FC<KioskAIAssistantScreenProps> = ({ onNavigate }) => {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const currentPharmacyId = pharmacyId || 'FM-2024-001';

  const [messages] = useState([
    { type: 'bot', text: '¡Hola! Soy tu asistente farmacéutico virtual. ¿En qué puedo ayudarte hoy?' },
    { type: 'user', text: 'Tengo dolor de cabeza' },
    { type: 'bot', text: 'Para el dolor de cabeza te recomiendo Paracetamol 1g o Ibuprofeno 600mg. ¿Tienes alguna alergia o condición médica que deba conocer?' },
  ]);

  const suggestedQuestions = [
    '¿Qué tomar para el dolor de cabeza?',
    'Tengo alergia estacional',
    'Crema para piel seca',
    'Productos para bebés',
    '¿Qué probióticos me recomiendas?',
  ];

  return (
    <MockupContainer title="Kiosko - Asistente IA">
      <div className="min-h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-4 pb-3 bg-gradient-to-r from-[#00C8C8] to-[#007878] text-white">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => onNavigate(`/kiosko/${currentPharmacyId}`)}
              className="text-white hover:text-gray-100 flex items-center gap-2 bg-white/20 px-3 py-2 rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate(`/kiosko-carrito/${currentPharmacyId}`)}
                className="bg-white/20 text-white px-3 py-2 rounded-xl flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-2 py-1">
                <PharmacyLogo size="sm" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Asistente Farmacéutico</h2>
              <p className="text-sm opacity-90">Pregúntame lo que necesites</p>
            </div>
          </div>
        </div>

        {/* Área de mensajes */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-[#00C8C8] text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100'
                  }`}
                >
                  {message.type === 'bot' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-[#00C8C8]" />
                      <span className="text-xs font-medium text-[#00C8C8]">
                        Asistente IA
                      </span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Preguntas sugeridas */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-600 mb-3">
              💡 Prueba a preguntar:
            </p>
            <div className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="w-full bg-white border-2 border-gray-100 text-gray-700 text-sm font-medium py-3 px-4 rounded-xl hover:border-[#00C8C8] hover:bg-[#00C8C8]/5 transition-all text-left"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input de mensaje */}
        <div className="p-4 bg-white border-t-2 border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="Escribe tu consulta..."
              className="w-full pl-4 pr-14 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#00C8C8] focus:outline-none transition-colors text-lg"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#00C8C8] text-white p-3 rounded-xl hover:bg-[#007878] transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            Consulta orientativa. Para diagnósticos, consulta con el farmacéutico.
          </p>
        </div>
      </div>
    </MockupContainer>
  );
};

