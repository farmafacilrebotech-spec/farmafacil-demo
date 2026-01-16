import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft, Loader } from 'lucide-react';
import { MockupContainer } from '../components/MockupContainer';

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('farmacia@example.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulación de autenticación
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (password.length < 3) {
        throw new Error('Contraseña incorrecta');
      }
      
      // Login exitoso
      onNavigate('pharmacy-dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MockupContainer title="Login">
      <div className="p-8 min-h-[600px]">
        {/* Header */}
        <button
          onClick={() => onNavigate('home')}
          className="mb-8 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
        <div className="w-24 h-24 bg-black rounded-3xl flex items-center justify-center shadow-lg mx-auto mb-4">
          <img 
                  src="https://zvxxdmfljbtlenjatqgm.supabase.co/storage/v1/object/public/farmacias-logos/Farmafacil.png"
                  alt="Logo FarmaFácil"
                  className="w-20 h-20 object-contain"
                />
          </div>
        
          <h2 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h2>
          <p className="text-gray-500 mt-2">Accede a tu cuenta</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
              <p className="text-sm text-red-800 text-center">{error}</p>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C8C8] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C8C8] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Botón Entrar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00C8C8] hover:bg-[#007878] text-white font-semibold py-4 rounded-xl shadow-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Iniciando sesión...</span>
              </>
            ) : (
              <span>Entrar</span>
            )}
          </button>

          {/* Enlace recuperar contraseña */}
          <div className="text-center">
            <a
              href="#"
              className="text-[#007878] hover:text-[#00C8C8] font-medium text-sm"
            >
              ¿No recuerdas tus credenciales?
            </a>
          </div>

          {/* Hint para demo */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <p className="text-xs text-blue-800 text-center">
              💡 <strong>Demo:</strong> Usa cualquier email y contraseña de 3+ caracteres
            </p>
          </div>
        </form>
      </div>
    </MockupContainer>
  );
};

