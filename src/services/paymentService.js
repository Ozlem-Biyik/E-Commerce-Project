import axios from 'axios';
import { toast } from 'react-toastify';

// Ödeme sağlayıcısı API'si için yapılandırma
const paymentAPI = axios.create({
  baseURL: 'https://api.stripe.com/v1',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${import.meta.env.VITE_STRIPE_SECRET_KEY || 'sk_test_sample'}`
  }
});

// Ödeme işlemlerini gerçekleştiren servis
export const paymentService = {
  // Kredi kartı ile ödeme işlemi
  processCardPayment: async (paymentData) => {
    try {
      // Gerçek bir ödeme entegrasyonunda burada Stripe veya başka bir ödeme sağlayıcısı API'sine istek yapılır
      // Bu örnek için simüle edilmiş bir yanıt döndürüyoruz
      
      // Simüle edilmiş API çağrısı
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Başarılı ödeme yanıtı
      return {
        success: true,
        transactionId: `trx_${Math.random().toString(36).substring(2, 15)}`,
        amount: paymentData.amount,
        currency: 'TRY',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Payment processing error:', error);
      throw new Error('Ödeme işlemi sırasında bir hata oluştu.');
    }
  },
  
  // 3D Secure ödeme işlemi
  process3DSecurePayment: async (paymentData) => {
    try {
      // 3D Secure yönlendirme URL'si için simüle edilmiş istek
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 3D Secure yönlendirme URL'si
      return {
        success: true,
        redirectUrl: 'https://3dsecure.example.com/auth',
        transactionId: `3ds_${Math.random().toString(36).substring(2, 15)}`
      };
    } catch (error) {
      console.error('3D Secure payment error:', error);
      throw new Error('3D Secure ödeme işlemi sırasında bir hata oluştu.');
    }
  },
  
  // Ödeme durumunu kontrol etme
  checkPaymentStatus: async (transactionId) => {
    try {
      // Ödeme durumunu kontrol etmek için simüle edilmiş istek
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simüle edilmiş ödeme durumu yanıtı
      return {
        success: true,
        status: 'completed',
        transactionId,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Payment status check error:', error);
      throw new Error('Ödeme durumu kontrol edilirken bir hata oluştu.');
    }
  }
};

export default paymentService; 