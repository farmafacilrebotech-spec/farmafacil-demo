import React, { useState } from 'react';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { PharmacyLogo } from '../components/PharmacyLogo';

interface AIAssistantScreenProps {
  onNavigate: (screen: string) => void;
}

export const AIAssistantScreen: React.FC<AIAssistantScreenProps> = ({ onNavigate }) => {
  const [messages] = useState([
    { type: 'bot', text: '¡Hola! Soy tu asistente farmacéutico. ¿En qué puedo ayudarte hoy?' },
    { type: 'user', text: 'Tengo dolor de cabeza' },
    { type: 'bot', text: 'Para el dolor de cabeza te recomiendo Paracetamol 1g o Ibuprofeno 600mg. ¿Tienes alguna alergia o condición médica que deba conocer?' },
  ]);

  const suggestedQuestions = [
    '¿Qué tomar para el dolor de cabeza?',
    'Tengo alergia estacional',
    'Crema para piel seca',
    'Productos para bebés',
  ];

  return (
    <MockupContainer title="Asistente IA / Chat Farmacéutico">
      <div className="min-h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 bg-gradient-to-r from-[#00C8C8] to-[#007878] text-white">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onNavigate('pharmacy-dashboard')}
              className="text-white hover:text-gray-100 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-2 py-1">
              <PharmacyLogo size="sm" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Asistente Farmacéutico</h2>
              <p className="text-sm opacity-90">Powered by AI</p>
            </div>
          </div>
        </div>

        {/* Área de mensajes */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-[#00C8C8] text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                  }`}
                >
                  {message.type === 'bot' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-[#00C8C8]" />
                      <span className="text-xs font-medium text-gray-500">
                        Asistente
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
            <p className="text-sm font-medium text-gray-600 mb-3">
              Preguntas frecuentes:
            </p>
            <div className="grid grid-cols-1 gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="bg-white border-2 border-gray-100 text-gray-700 text-sm font-medium py-3 px-4 rounded-xl hover:border-[#00C8C8] hover:text-[#00C8C8] transition-colors text-left"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input de mensaje */}
        <div className="p-4 bg-white border-t-2 border-gray-100">
          {/* Botón enviar recomendación al cliente */}
          <button className="w-full bg-gradient-to-r from-[#00C8C8] to-[#007878] text-white font-semibold py-3 rounded-xl mb-3 hover:shadow-lg transition-all">
            Enviar recomendación al cliente
          </button>

          {/* Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Escribe tu pregunta..."
              className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C8C8] focus:outline-none transition-colors"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#00C8C8] text-white p-2 rounded-lg hover:bg-[#007878] transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </MockupContainer>
  );
};

