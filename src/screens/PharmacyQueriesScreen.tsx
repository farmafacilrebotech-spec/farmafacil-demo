import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Clock, User, Sparkles, CheckCircle, AlertCircle, Send, Tablet, Smartphone } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';
import { PharmacyLogo } from '../components/PharmacyLogo';

interface PharmacyQueriesScreenProps {
  onNavigate: (screen: string) => void;
}

type QueryStatus = 'pending' | 'answered';
type QuerySource = 'client' | 'kiosk';

interface Query {
  id: string;
  clientName: string;
  question: string;
  aiResponse: string;
  status: QueryStatus;
  source: QuerySource;
  createdAt: string;
  pharmacistNote?: string;
}

// Datos de ejemplo
const mockQueries: Query[] = [
  {
    id: 'CON-001',
    clientName: 'María García',
    question: '¿Puedo tomar ibuprofeno si estoy tomando aspirina?',
    aiResponse: 'No es recomendable combinar ibuprofeno con aspirina sin supervisión médica, ya que ambos son antiinflamatorios no esteroideos (AINEs) y pueden aumentar el riesgo de efectos secundarios gastrointestinales.',
    status: 'pending',
    source: 'client',
    createdAt: '2026-01-19T14:30:00',
  },
  {
    id: 'CON-002',
    clientName: 'Cliente Kiosko',
    question: 'Tengo dolor de garganta, ¿qué me recomienda?',
    aiResponse: 'Para el dolor de garganta te recomiendo pastillas para chupar con benzocaína o lidocaína para alivio local. También puedes usar sprays bucofaríngeos. Si el dolor persiste más de 3 días o tienes fiebre, consulta con el médico.',
    status: 'answered',
    source: 'kiosk',
    createdAt: '2026-01-19T13:15:00',
    pharmacistNote: 'Recomendé Strepsils + spray Angileptol',
  },
  {
    id: 'CON-003',
    clientName: 'Juan López',
    question: '¿Los probióticos se toman con el estómago vacío?',
    aiResponse: 'La mayoría de probióticos se absorben mejor tomados con el estómago vacío, 30 minutos antes del desayuno o 2 horas después de comer. Sin embargo, algunos probióticos específicos pueden tomarse con alimentos. Revisa las instrucciones del producto.',
    status: 'pending',
    source: 'client',
    createdAt: '2026-01-19T12:00:00',
  },
  {
    id: 'CON-004',
    clientName: 'Cliente Kiosko',
    question: '¿Qué crema es buena para la piel seca?',
    aiResponse: 'Para piel seca te recomiendo cremas con urea (al menos 5-10%), ácido hialurónico o ceramidas. Eucerin Aquaphor y CeraVe son muy efectivas. Aplícalas después de la ducha con la piel ligeramente húmeda.',
    status: 'answered',
    source: 'kiosk',
    createdAt: '2026-01-19T11:30:00',
    pharmacistNote: 'Cliente llevó Eucerin Aquaphor',
  },
  {
    id: 'CON-005',
    clientName: 'Ana Martínez',
    question: '¿La melatonina crea dependencia?',
    aiResponse: 'La melatonina no crea dependencia física como otros somníferos. Es una hormona natural que regula el sueño. Sin embargo, se recomienda usarla de forma puntual y no como solución permanente. Consulta con tu médico si tienes problemas de sueño persistentes.',
    status: 'pending',
    source: 'client',
    createdAt: '2026-01-19T10:45:00',
  },
];

export const PharmacyQueriesScreen: React.FC<PharmacyQueriesScreenProps> = ({ onNavigate }) => {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const currentPharmacyId = pharmacyId || 'FM-2024-001';

  const [queries, setQueries] = useState<Query[]>(mockQueries);
  const [filterStatus, setFilterStatus] = useState<QueryStatus | 'all'>('all');
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [pharmacistNote, setPharmacistNote] = useState('');

  const filteredQueries = queries.filter(query => 
    filterStatus === 'all' || query.status === filterStatus
  );

  const pendingCount = queries.filter(q => q.status === 'pending').length;

  const handleAnswer = () => {
    if (!selectedQuery) return;
    
    setQueries(prev => prev.map(query => 
      query.id === selectedQuery.id 
        ? { ...query, status: 'answered' as QueryStatus, pharmacistNote }
        : query
    ));
    setSelectedQuery(null);
    setPharmacistNote('');
  };

  return (
    <MockupContainer title="Consultas del Asistente">
      <div className="min-h-[600px] flex flex-col bg-gray-50">
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onNavigate(`/farmacia/${currentPharmacyId}`)}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <PharmacyLogo size="sm" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00C8C8] to-[#007878] rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Consultas IA</h1>
              <p className="text-sm text-gray-500">Revisa las consultas del asistente</p>
            </div>
          </div>

          {pendingCount > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <p className="text-sm text-orange-700">
                <strong>{pendingCount}</strong> consulta(s) pendiente(s) de revisión
              </p>
            </div>
          )}

          {/* Filtros */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium ${
                filterStatus === 'all' ? 'bg-[#00C8C8] text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Todas ({queries.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-xl text-sm font-medium ${
                filterStatus === 'pending' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Pendientes ({pendingCount})
            </button>
            <button
              onClick={() => setFilterStatus('answered')}
              className={`px-4 py-2 rounded-xl text-sm font-medium ${
                filterStatus === 'answered' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Revisadas
            </button>
          </div>
        </div>

        {/* Lista de consultas */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {filteredQueries.map((query) => (
              <div
                key={query.id}
                onClick={() => {
                  setSelectedQuery(query);
                  setPharmacistNote(query.pharmacistNote || '');
                }}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{query.clientName}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {new Date(query.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        {query.source === 'kiosk' ? (
                          <span className="ml-1 flex items-center gap-0.5 text-purple-600">
                            <Tablet className="w-3 h-3" />
                            Kiosko
                          </span>
                        ) : (
                          <span className="ml-1 flex items-center gap-0.5 text-blue-600">
                            <Smartphone className="w-3 h-3" />
                            App
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {query.status === 'pending' ? (
                    <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                      Pendiente
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Revisada
                    </span>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-2">
                  <p className="text-sm text-gray-700">{query.question}</p>
                </div>

                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#00C8C8] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-600 line-clamp-2">{query.aiResponse}</p>
                </div>
              </div>
            ))}

            {filteredQueries.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No hay consultas con estos filtros</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal de detalle */}
        {selectedQuery && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="font-bold text-lg">Consulta {selectedQuery.id}</h2>
                <button
                  onClick={() => {
                    setSelectedQuery(null);
                    setPharmacistNote('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Cliente */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{selectedQuery.clientName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(selectedQuery.createdAt).toLocaleString('es-ES')}
                    </p>
                  </div>
                  {selectedQuery.source === 'kiosk' ? (
                    <span className="ml-auto bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Tablet className="w-3 h-3" />
                      Kiosko
                    </span>
                  ) : (
                    <span className="ml-auto bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Smartphone className="w-3 h-3" />
                      App
                    </span>
                  )}
                </div>

                {/* Pregunta */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Pregunta del cliente</p>
                  <div className="bg-gray-100 rounded-xl p-3">
                    <p className="text-gray-800">{selectedQuery.question}</p>
                  </div>
                </div>

                {/* Respuesta IA */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-[#00C8C8]" />
                    Respuesta del asistente IA
                  </p>
                  <div className="bg-[#00C8C8]/10 border border-[#00C8C8]/30 rounded-xl p-3">
                    <p className="text-gray-800 text-sm leading-relaxed">{selectedQuery.aiResponse}</p>
                  </div>
                </div>

                {/* Nota del farmacéutico */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Nota del farmacéutico (opcional)
                  </p>
                  <textarea
                    value={pharmacistNote}
                    onChange={(e) => setPharmacistNote(e.target.value)}
                    placeholder="Añade una nota, recomendación adicional o producto sugerido..."
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:border-[#00C8C8] focus:outline-none resize-none"
                    rows={3}
                  />
                </div>

                {/* Botón de acción */}
                {selectedQuery.status === 'pending' ? (
                  <button
                    onClick={handleAnswer}
                    className="w-full bg-[#00C8C8] hover:bg-[#007878] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Marcar como revisada
                  </button>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Consulta revisada</span>
                    </div>
                    {selectedQuery.pharmacistNote && (
                      <p className="text-sm text-green-600 mt-2">
                        Nota: {selectedQuery.pharmacistNote}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </MockupContainer>
  );
};

