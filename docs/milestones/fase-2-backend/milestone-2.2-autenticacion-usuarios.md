# Milestone 2.2 - Autenticación de Usuarios

## 📋 Índice

1. [Objetivo](#objetivo)
2. [Paso 1: Configurar Supabase Auth](#paso-1-configurar-supabase-auth)
3. [Paso 2: Registro de Farmacias](#paso-2-registro-de-farmacias)
4. [Paso 3: Login de Farmacias](#paso-3-login-de-farmacias)
5. [Paso 4: Autenticación de Clientes (OTP SMS)](#paso-4-autenticación-de-clientes-otp-sms)
6. [Paso 5: Actualizar AuthContext](#paso-5-actualizar-authcontext)
7. [Entregables](#entregables)
8. [Siguiente Milestone](#siguiente-milestone)

---

## Objetivo

Implementar autenticación real para farmacias (email/password) y clientes (OTP por SMS).

**Estado**: 🔲 Pendiente

---

## Paso 1: Configurar Supabase Auth

### Descripción
Habilitar y configurar los proveedores de autenticación en Supabase.

### Tareas
- [ ] Habilitar Email/Password auth
- [ ] Habilitar Phone OTP auth
- [ ] Configurar proveedor SMS (Twilio)
- [ ] Personalizar emails de verificación
- [ ] Configurar redirect URLs

### Configuración Twilio
```
Account SID: ACxxxxx
Auth Token: xxxxxx
Messaging Service SID: MGxxxxx
```

---

## Paso 2: Registro de Farmacias

### Descripción
Implementar flujo de registro para nuevas farmacias.

### Función de registro
```typescript
export const registerPharmacy = async (
  email: string,
  password: string,
  pharmacyData: PharmacyData
) => {
  // 1. Crear usuario en Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  // 2. Crear registro en tabla farmacias
  const { error: dbError } = await supabase
    .from('farmacias')
    .insert({
      id: authData.user.id,
      nombre: pharmacyData.nombre,
      email,
      telefono: pharmacyData.telefono,
      direccion: pharmacyData.direccion,
    });

  if (dbError) throw dbError;

  return authData;
};
```

---

## Paso 3: Login de Farmacias

### Descripción
Implementar login con email y contraseña.

### Función de login
```typescript
export const loginPharmacy = async (
  email: string,
  password: string
) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};
```

---

## Paso 4: Autenticación de Clientes (OTP SMS)

### Descripción
Implementar verificación por código SMS para clientes.

### Flujo OTP
```typescript
// 1. Enviar OTP
export const sendOTP = async (phone: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    phone,
  });
  if (error) throw error;
};

// 2. Verificar OTP
export const verifyOTP = async (phone: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms',
  });
  if (error) throw error;
  return data;
};
```

---

## Paso 5: Actualizar AuthContext

### Descripción
Integrar Supabase Auth con el contexto de React.

### AuthContext actualizado
```typescript
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escuchar cambios de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ... métodos login, logout, etc.
};
```

---

## Entregables

| Entregable | Estado |
|------------|--------|
| Supabase Auth configurado | 🔲 |
| Registro farmacias | 🔲 |
| Login farmacias | 🔲 |
| OTP clientes | 🔲 |
| AuthContext actualizado | 🔲 |

---

## Siguiente Milestone

➡️ [Milestone 2.3 - Gestión de Farmacias](./milestone-2.3-gestion-farmacias.md)

---

*Milestone pendiente*

