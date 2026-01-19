import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, User, ShoppingBag, MessageSquare, Store, Tablet, LogIn, QrCode, ShoppingCart, Package } from 'lucide-react';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { QRScanScreen } from './screens/QRScanScreen';
import { ClientDashboard } from './screens/ClientDashboard';
import { ProfileScreen } from './screens/ProfileScreen';
import { PharmacyDashboard } from './screens/PharmacyDashboard';
import { CatalogScreen } from './screens/CatalogScreen';
import { PharmacyCatalogScreen } from './screens/PharmacyCatalogScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { CartScreen } from './screens/CartScreen';
import { AIAssistantScreen } from './screens/AIAssistantScreen';
import { KioskScreen } from './screens/KioskScreen';
import { KioskCartScreen } from './screens/KioskCartScreen';
import { PharmacyQRScreen } from './screens/PharmacyQRScreen';

// IDs de ejemplo para la demo
const DEMO_PHARMACY_ID = 'FM-2024-001';
const DEMO_CLIENT_ID = 'CLI-7842';
const DEMO_PRODUCT_ID = 'PROD-001';

// Mapeo de nombres de pantalla a rutas URL (con parámetros de demo)
const getScreenRoute = (screen: string): string => {
  const routes: Record<string, string> = {
    'home': '/',
    'login': '/login',
    'qr': `/qr/${DEMO_PHARMACY_ID}`,
    'client-dashboard': `/cliente/${DEMO_PHARMACY_ID}/${DEMO_CLIENT_ID}`,
    'profile': `/perfil/${DEMO_PHARMACY_ID}/${DEMO_CLIENT_ID}`,
    'pharmacy-dashboard': `/farmacia/${DEMO_PHARMACY_ID}`,
    'catalog': `/catalogo/${DEMO_PHARMACY_ID}/${DEMO_CLIENT_ID}`,
    'pharmacy-catalog': `/catalogo-farmacia/${DEMO_PHARMACY_ID}`,
    'product-detail': `/producto/${DEMO_PHARMACY_ID}/${DEMO_PRODUCT_ID}`,
    'cart': `/carrito/${DEMO_PHARMACY_ID}/${DEMO_CLIENT_ID}`,
    'ai-assistant': `/asistente-ia/${DEMO_PHARMACY_ID}`,
    'kiosk': `/kiosko/${DEMO_PHARMACY_ID}`,
    'kiosk-cart': `/kiosko-carrito/${DEMO_PHARMACY_ID}`,
    'pharmacy-qr': `/mi-qr/${DEMO_PHARMACY_ID}`,
  };
  return routes[screen] || screen;
};

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Función de navegación que acepta tanto nombres de pantalla como rutas
  const handleNavigate = (screenOrRoute: string) => {
    // Si ya es una ruta (empieza con /), usarla directamente
    if (screenOrRoute.startsWith('/')) {
      navigate(screenOrRoute);
    } else {
      // Si es un nombre de pantalla, convertirlo a ruta
      const route = getScreenRoute(screenOrRoute);
      navigate(route);
    }
  };

  // Rutas para la navegación flotante (con parámetros de demo)
  const screens = [
    { id: '/', label: 'Inicio', icon: Home },
    { id: '/login', label: 'Login', icon: LogIn },
    { id: `/qr/${DEMO_PHARMACY_ID}`, label: 'QR', icon: QrCode },
    { id: `/cliente/${DEMO_PHARMACY_ID}/${DEMO_CLIENT_ID}`, label: 'Cliente', icon: User },
    { id: `/perfil/${DEMO_PHARMACY_ID}/${DEMO_CLIENT_ID}`, label: 'Perfil', icon: User },
    { id: `/farmacia/${DEMO_PHARMACY_ID}`, label: 'Farmacia', icon: Store },
    { id: `/catalogo/${DEMO_PHARMACY_ID}/${DEMO_CLIENT_ID}`, label: 'Cat.Cliente', icon: ShoppingBag },
    { id: `/catalogo-farmacia/${DEMO_PHARMACY_ID}`, label: 'Cat.Farm', icon: Package },
    { id: `/producto/${DEMO_PHARMACY_ID}/${DEMO_PRODUCT_ID}`, label: 'Producto', icon: Package },
    { id: `/carrito/${DEMO_PHARMACY_ID}/${DEMO_CLIENT_ID}`, label: 'Carrito', icon: ShoppingCart },
    { id: `/asistente-ia/${DEMO_PHARMACY_ID}`, label: 'IA', icon: MessageSquare },
    { id: `/kiosko/${DEMO_PHARMACY_ID}`, label: 'Kiosko', icon: Tablet },
    { id: `/kiosko-carrito/${DEMO_PHARMACY_ID}`, label: 'Carr.Kiosk', icon: ShoppingCart },
  ];

  const props = { onNavigate: handleNavigate };

  // Función para verificar si la ruta actual coincide con un patrón
  const isActiveRoute = (routePattern: string): boolean => {
    const currentPath = location.pathname;
    // Extraer la base de la ruta (sin los parámetros específicos)
    const patternBase = routePattern.split('/').slice(0, 2).join('/');
    const currentBase = currentPath.split('/').slice(0, 2).join('/');
    return patternBase === currentBase || routePattern === currentPath;
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<HomeScreen {...props} />} />
        <Route path="/login" element={<LoginScreen {...props} />} />
        
        {/* Rutas con parámetro de farmacia */}
        <Route path="/qr/:pharmacyId" element={<QRScanScreen {...props} />} />
        <Route path="/farmacia/:pharmacyId" element={<PharmacyDashboard {...props} />} />
        <Route path="/catalogo-farmacia/:pharmacyId" element={<PharmacyCatalogScreen {...props} />} />
        <Route path="/asistente-ia/:pharmacyId" element={<AIAssistantScreen {...props} />} />
        <Route path="/kiosko/:pharmacyId" element={<KioskScreen {...props} />} />
        <Route path="/kiosko-carrito/:pharmacyId" element={<KioskCartScreen {...props} />} />
        <Route path="/mi-qr/:pharmacyId" element={<PharmacyQRScreen {...props} />} />
        
        {/* Rutas con parámetros de farmacia y cliente */}
        <Route path="/cliente/:pharmacyId/:clientId" element={<ClientDashboard {...props} />} />
        <Route path="/perfil/:pharmacyId/:clientId" element={<ProfileScreen {...props} />} />
        <Route path="/catalogo/:pharmacyId/:clientId" element={<CatalogScreen {...props} />} />
        <Route path="/carrito/:pharmacyId/:clientId" element={<CartScreen {...props} />} />
        
        {/* Ruta de producto con farmacia y producto */}
        <Route path="/producto/:pharmacyId/:productId" element={<ProductDetailScreen {...props} />} />
        
        {/* Rutas legacy sin parámetros (redirección a demo) */}
        <Route path="/qr" element={<QRScanScreen {...props} />} />
        <Route path="/cliente" element={<ClientDashboard {...props} />} />
        <Route path="/perfil" element={<ProfileScreen {...props} />} />
        <Route path="/farmacia" element={<PharmacyDashboard {...props} />} />
        <Route path="/catalogo" element={<CatalogScreen {...props} />} />
        <Route path="/catalogo-farmacia" element={<PharmacyCatalogScreen {...props} />} />
        <Route path="/producto" element={<ProductDetailScreen {...props} />} />
        <Route path="/carrito" element={<CartScreen {...props} />} />
        <Route path="/asistente-ia" element={<AIAssistantScreen {...props} />} />
        <Route path="/kiosko" element={<KioskScreen {...props} />} />
        <Route path="/kiosko-carrito" element={<KioskCartScreen {...props} />} />
        
        {/* Ruta por defecto para URLs no encontradas */}
        <Route path="*" element={<HomeScreen {...props} />} />
      </Routes>
      
      {/* Navegación flotante */}
      <div className="fixed bottom-4 left-4 bg-white rounded-2xl shadow-2xl p-2 max-w-[200px] z-50">
        <div className="text-xs font-semibold text-gray-500 px-2 py-1 mb-1">
          Navegación
        </div>
        <div className="grid grid-cols-3 gap-1 max-h-[300px] overflow-y-auto">
          {screens.map((screen) => {
            const Icon = screen.icon;
            return (
              <button
                key={screen.id}
                onClick={() => navigate(screen.id)}
                className={`p-2 rounded-lg transition-all ${
                  isActiveRoute(screen.id)
                    ? 'bg-[#00C8C8] text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
                title={screen.label}
              >
                <Icon className="w-4 h-4 mx-auto" />
                <span className="text-[10px] mt-1 block truncate">
                  {screen.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
