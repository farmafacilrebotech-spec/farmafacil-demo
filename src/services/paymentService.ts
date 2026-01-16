export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bizum';
  last4?: string;
  brand?: string;
  expiryMonth?: string;
  expiryYear?: string;
  isDefault?: boolean;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
  paymentMethodId?: string;
}

export interface Order {
  id: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'pending_payment' | 'paid' | 'ready_for_pickup' | 'completed';
  paymentStatus: 'pending' | 'paid';
  createdAt: Date;
  paidAt?: Date;
}

class PaymentService {
  private apiKey = 'pk_test_farmafacil_demo';

  async createPaymentIntent(amount: number): Promise<PaymentIntent> {
    // Simulación de llamada a API de pago (Stripe, Redsys, etc.)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: `pi_${Math.random().toString(36).substr(2, 9)}`,
      amount,
      status: 'pending',
    };
  }

  async processPayment(
    paymentIntentId: string,
    paymentMethodId: string
  ): Promise<{ success: boolean; error?: string }> {
    // Simulación de procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulación de éxito (90% de probabilidad)
    const success = Math.random() > 0.1;
    
    if (success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Pago rechazado. Por favor, verifica tus datos.',
      };
    }
  }

  async createOrder(
    items: Order['items'],
    paymentStatus: Order['paymentStatus']
  ): Promise<Order> {
    // Simulación de creación de pedido
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    return {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      items,
      total,
      status: paymentStatus === 'paid' ? 'ready_for_pickup' : 'pending_payment',
      paymentStatus,
      createdAt: new Date(),
      paidAt: paymentStatus === 'paid' ? new Date() : undefined,
    };
  }

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    // Simulación de obtención de métodos de pago guardados
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 'pm_1',
        type: 'card',
        brand: 'VISA',
        last4: '4532',
        expiryMonth: '12',
        expiryYear: '26',
        isDefault: true,
      },
      {
        id: 'pm_2',
        type: 'card',
        brand: 'Mastercard',
        last4: '8920',
        expiryMonth: '08',
        expiryYear: '25',
        isDefault: false,
      },
    ];
  }

  async sendWhatsAppNotification(
    phone: string,
    order: Order
  ): Promise<void> {
    // Simulación de envío de notificación por WhatsApp
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`WhatsApp enviado a ${phone} - Pedido: ${order.id}`);
  }

  formatPrice(amount: number): string {
    return `€${amount.toFixed(2)}`;
  }
}

export const paymentService = new PaymentService();

