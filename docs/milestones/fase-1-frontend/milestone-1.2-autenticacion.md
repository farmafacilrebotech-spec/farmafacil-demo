# Milestone 1.2 - Pantallas de Autenticación

## 📋 Índice

1. [Objetivo](#objetivo)
2. [Paso 1: HomeScreen - Pantalla de Inicio](#paso-1-homescreen---pantalla-de-inicio)
3. [Paso 2: LoginScreen - Autenticación de Farmacias](#paso-2-loginscreen---autenticación-de-farmacias)
4. [Paso 3: QRScanScreen - Verificación por QR](#paso-3-qrscanscreen---verificación-por-qr)
5. [Paso 4: AuthContext - Contexto de Autenticación](#paso-4-authcontext---contexto-de-autenticación)
6. [Paso 5: PharmacyLogo - Componente de Branding](#paso-5-pharmacylogo---componente-de-branding)
7. [Entregables](#entregables)
8. [Siguiente Milestone](#siguiente-milestone)

---

## Objetivo

Implementar las pantallas de entrada a la aplicación: inicio, login de farmacias y verificación de clientes mediante código QR/SMS.

**Estado**: ✅ Completado

---

## Paso 1: HomeScreen - Pantalla de Inicio

### Descripción
Pantalla de bienvenida con branding, video demo y accesos principales.

### Archivo: `src/screens/HomeScreen.tsx`

### Elementos implementados
- Logo de FarmaFácil
- Placeholder para video de presentación
- Botón "Solicitar DEMO" (contacto comercial)
- Acceso a escáner QR (clientes)
- Acceso a Login (farmacias)

### Diseño
```
┌─────────────────────────────┐
│         🏥 LOGO            │
│                             │
│      ┌─────────────┐       │
│      │  📹 VIDEO   │       │
│      │    DEMO     │       │
│      └─────────────┘       │
│                             │
│   [ Solicitar DEMO ]        │
│                             │
│  ┌──────────┐ ┌──────────┐ │
│  │ 📱 QR    │ │ 🔐 Login │ │
│  │ Scan     │ │ Farmacia │ │
│  └──────────┘ └──────────┘ │
└─────────────────────────────┘
```

### Resultado
- ✅ Pantalla de inicio atractiva
- ✅ Navegación clara a flujos de usuario

---

## Paso 2: LoginScreen - Autenticación de Farmacias

### Descripción
Formulario de login para administradores de farmacias.

### Archivo: `src/screens/LoginScreen.tsx`

### Elementos implementados
- Campo de email con validación
- Campo de contraseña con toggle de visibilidad
- Botón de "Iniciar sesión"
- Enlace "¿Olvidaste tu contraseña?"
- Validación en tiempo real

### Lógica de Demo
```typescript
// Credenciales de demo (cualquier email válido + 3+ caracteres)
const handleLogin = () => {
  if (email.includes('@') && password.length >= 3) {
    onNavigate('pharmacy-dashboard');
  }
};
```

### Diseño
```
┌─────────────────────────────┐
│       ← Volver              │
│                             │
│       🏥 FarmaFácil         │
│    Acceso Farmacias         │
│                             │
│  ┌─────────────────────┐   │
│  │ 📧 Email            │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ 🔒 Contraseña    👁 │   │
│  └─────────────────────┘   │
│                             │
│  [ Iniciar Sesión ]         │
│                             │
│  ¿Olvidaste tu contraseña?  │
└─────────────────────────────┘
```

### Resultado
- ✅ Formulario de login funcional
- ✅ Validación visual de campos
- ✅ Toggle de visibilidad de contraseña

---

## Paso 3: QRScanScreen - Verificación por QR

### Descripción
Pantalla de escaneo de código QR y verificación por SMS para clientes.

### Archivo: `src/screens/QRScanScreen.tsx`

### Flujo implementado
1. **Escaneo QR**: Simulación de cámara/escáner
2. **Envío SMS**: Código de verificación al móvil
3. **Verificación**: Input de código de 6 dígitos
4. **Acceso**: Redirección al dashboard del cliente

### Código de Demo
```typescript
// Código fijo para demo: 123456
const DEMO_CODE = '123456';

const handleVerify = () => {
  if (code === DEMO_CODE) {
    onNavigate('client-dashboard');
  }
};
```

### Estados de la pantalla
```
Estado 1: Escanear QR
┌─────────────────────────────┐
│       📱 Escanea tu QR      │
│                             │
│      ┌─────────────┐       │
│      │   ▣▣▣▣▣    │       │
│      │   ▣   ▣    │       │
│      │   ▣▣▣▣▣    │       │
│      └─────────────┘       │
│                             │
│    [ Simular escaneo ]      │
└─────────────────────────────┘

Estado 2: Verificar código
┌─────────────────────────────┐
│       📲 Verificación       │
│                             │
│   Hemos enviado un código   │
│   a tu móvil +34***987      │
│                             │
│  ┌─────────────────────┐   │
│  │  1 2 3 4 5 6        │   │
│  └─────────────────────┘   │
│                             │
│      [ Verificar ]          │
│                             │
│    Reenviar código (30s)    │
└─────────────────────────────┘
```

### Resultado
- ✅ Simulación de escaneo QR
- ✅ Verificación por código SMS
- ✅ Countdown para reenvío de código

---

## Paso 4: AuthContext - Contexto de Autenticación

### Descripción
Contexto de React para gestionar el estado de autenticación en toda la aplicación.

### Archivo: `src/contexts/AuthContext.tsx`

### Interface
```typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
```

### Uso en componentes
```typescript
const { user, isAuthenticated, login, logout } = useAuth();
```

### Notas para producción
- Integrar con Supabase Auth
- Almacenar tokens en localStorage/cookies
- Implementar refresh tokens

### Resultado
- ✅ Estado de auth centralizado
- ✅ Hook `useAuth()` disponible
- ✅ Preparado para integración backend

---

## Paso 5: PharmacyLogo - Componente de Branding

### Descripción
Componente reutilizable para mostrar el logo de la farmacia.

### Archivo: `src/components/PharmacyLogo.tsx`

### Props
```typescript
interface PharmacyLogoProps {
  size?: 'sm' | 'md' | 'lg';
}
```

### Implementación
```typescript
export const PharmacyLogo: React.FC<PharmacyLogoProps> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
  };
  
  return (
    <div className={`${sizes[size]} rounded-2xl overflow-hidden`}>
      <img 
        src="URL_LOGO_FARMACIA" 
        alt="Logo Farmacia"
        className="w-full h-full object-contain"
      />
    </div>
  );
};
```

### Uso
```tsx
<PharmacyLogo size="sm" />  // Header
<PharmacyLogo size="lg" />  // Pantalla inicio
```

### Resultado
- ✅ Logo dinámico por tamaño
- ✅ Preparado para logo personalizado por farmacia

---

## Entregables

| Entregable | Archivo | Estado |
|------------|---------|--------|
| Pantalla de inicio | `HomeScreen.tsx` | ✅ |
| Login de farmacias | `LoginScreen.tsx` | ✅ |
| Escaneo QR y SMS | `QRScanScreen.tsx` | ✅ |
| Contexto de auth | `AuthContext.tsx` | ✅ |
| Logo de farmacia | `PharmacyLogo.tsx` | ✅ |

---

## Siguiente Milestone

➡️ [Milestone 1.3 - Dashboards y Paneles](./milestone-1.3-dashboards.md)

---

*Milestone completado: Diciembre 2024*

