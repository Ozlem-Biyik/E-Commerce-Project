import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CreditCard, MapPin, Truck, Check, ChevronRight, AlertCircle, Lock } from 'lucide-react';
import { setAddress, setPayment, setCart } from '../store/reducers/shoppingCartReducer';
import { orderAPI, userAPI } from '../services/api';
import { paymentService } from '../services/paymentService';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cart, address, payment } = useSelector(state => state.shoppingCart);
  const { user } = useSelector(state => state.client);
  
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1); // 1: Address, 2: Payment, 3: Review
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [securityCode, setSecurityCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card'); // credit_card, 3d_secure
  
  // Calculate order totals
  const subtotal = cart.reduce((total, item) => {
    const price = item.product.discountPrice || item.product.price;
    return total + (price * item.count * (item.checked ? 1 : 0));
  }, 0);
  
  const shipping = subtotal > 0 ? 29.99 : 0;
  const tax = subtotal * 0.18; // %18 KDV
  const total = subtotal + shipping + tax;
  
  // Fetch user addresses and payment methods
  useEffect(() => {
    if (!user) {
      history.push('/login?redirect=checkout');
      return;
    }
    
    if (cart.length === 0 || !cart.some(item => item.checked)) {
      history.push('/cart');
      return;
    }
    
    const fetchUserData = async () => {
      try {
        const [addressRes, cardRes] = await Promise.all([
          userAPI.getAddresses(),
          userAPI.getCards()
        ]);
        
        setAddresses(addressRes.data);
        setCards(cardRes.data);
        
        // Set default selections if available
        if (addressRes.data.length > 0 && !address) {
          dispatch(setAddress(addressRes.data[0]));
        }
        
        if (cardRes.data.length > 0 && !payment) {
          dispatch(setPayment(cardRes.data[0]));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Kullanıcı bilgileri yüklenirken bir hata oluştu.');
      }
    };
    
    fetchUserData();
  }, [user, history, cart, dispatch, address, payment]);
  
  const handleAddressSelect = (selectedAddress) => {
    dispatch(setAddress(selectedAddress));
  };
  
  const handlePaymentSelect = (selectedPayment) => {
    dispatch(setPayment(selectedPayment));
  };
  
  const handleSubmitOrder = async () => {
    if (!address) {
      toast.error('Lütfen bir teslimat adresi seçin.');
      setActiveStep(1);
      return;
    }
    
    if (!payment) {
      toast.error('Lütfen bir ödeme yöntemi seçin.');
      setActiveStep(2);
      return;
    }
    
    // Validate security code
    if (!securityCode || securityCode.length !== 3) {
      setPaymentError('Lütfen geçerli bir güvenlik kodu girin.');
      return;
    }
    
    setProcessingPayment(true);
    setPaymentError(null);
    
    try {
      // Process payment based on selected method
      let paymentResult;
      
      if (paymentMethod === 'credit_card') {
        paymentResult = await paymentService.processCardPayment({
          amount: total,
          cardNumber: payment.cardNumber,
          cardHolder: payment.cardHolder,
          expiryMonth: payment.expiryMonth,
          expiryYear: payment.expiryYear,
          cvv: securityCode
        });
      } else if (paymentMethod === '3d_secure') {
        paymentResult = await paymentService.process3DSecurePayment({
          amount: total,
          cardNumber: payment.cardNumber,
          cardHolder: payment.cardHolder,
          expiryMonth: payment.expiryMonth,
          expiryYear: payment.expiryYear,
          cvv: securityCode,
          returnUrl: window.location.origin + '/checkout/complete'
        });
        
        // In a real implementation, we would redirect to 3D Secure page
        // For this demo, we'll simulate a successful 3D Secure authentication
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      // Create order after successful payment
      const orderItems = cart
        .filter(item => item.checked)
        .map(item => ({
          productId: item.product.id,
          quantity: item.count,
          price: item.product.discountPrice || item.product.price
        }));
      
      const orderData = {
        addressId: address.id,
        paymentId: payment.id,
        items: orderItems,
        status: 'pending',
        total: total,
        transactionId: paymentResult.transactionId
      };
      
      const response = await orderAPI.createOrder(orderData);
      
      toast.success('Ödeme başarılı! Siparişiniz oluşturuldu.');
      
      // Clear cart items that were ordered
      const remainingItems = cart.filter(item => !item.checked);
      dispatch(setCart(remainingItems));
      
      // Redirect to order confirmation
      history.push(`/orders/${response.data.id}`);
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentError(error.message || 'Ödeme işlemi sırasında bir hata oluştu.');
      toast.error('Ödeme işlemi başarısız oldu.');
    } finally {
      setProcessingPayment(false);
    }
  };
  
  // Render loading state
  if (!user || isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="pb-16">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Ödeme</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Siparişinizi tamamlamak için lütfen teslimat ve ödeme bilgilerinizi girin.
        </p>
      </div>
      
      {/* Checkout Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activeStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            <MapPin size={18} />
          </div>
          <div className="text-sm font-medium mx-2">Adres</div>
          
          <div className="w-16 h-1 bg-gray-200 mx-2">
            <div 
              className="h-full bg-blue-600" 
              style={{ width: activeStep >= 2 ? '100%' : '0%' }}
            ></div>
          </div>
          
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activeStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            <CreditCard size={18} />
          </div>
          <div className="text-sm font-medium mx-2">Ödeme</div>
          
          <div className="w-16 h-1 bg-gray-200 mx-2">
            <div 
              className="h-full bg-blue-600" 
              style={{ width: activeStep >= 3 ? '100%' : '0%' }}
            ></div>
          </div>
          
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activeStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            <Check size={18} />
          </div>
          <div className="text-sm font-medium mx-2">Onay</div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Form Steps */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Step 1: Delivery Address */}
            <div className={`p-6 ${activeStep !== 1 && 'hidden'}`}>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Teslimat Adresi</h2>
              
              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Henüz kayıtlı adresiniz bulunmuyor.</p>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => history.push('/profile/addresses')}
                  >
                    Yeni Adres Ekle
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div 
                      key={addr.id}
                      className={`border rounded-md p-4 cursor-pointer ${
                        address && address.id === addr.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => handleAddressSelect(addr)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">{addr.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{addr.fullAddress}</p>
                          <div className="text-gray-600 text-sm mt-1">
                            {addr.city}, {addr.district}, {addr.zipCode}
                          </div>
                          <div className="text-gray-600 text-sm mt-1">
                            {addr.phone}
                          </div>
                        </div>
                        {address && address.id === addr.id && (
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <Check size={14} className="text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-between mt-6">
                    <button 
                      className="text-blue-600 hover:underline"
                      onClick={() => history.push('/profile/addresses')}
                    >
                      Yeni Adres Ekle
                    </button>
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      onClick={() => setActiveStep(2)}
                      disabled={!address}
                    >
                      Devam Et <ChevronRight size={16} className="inline ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Step 2: Payment Method */}
            <div className={`p-6 ${activeStep !== 2 && 'hidden'}`}>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Ödeme Yöntemi</h2>
              
              {cards.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Henüz kayıtlı ödeme yönteminiz bulunmuyor.</p>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => history.push('/profile/payment')}
                  >
                    Yeni Kart Ekle
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Ödeme Yöntemi Seçimi */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Ödeme Tipi</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="credit_card"
                          name="payment_method"
                          checked={paymentMethod === 'credit_card'}
                          onChange={() => setPaymentMethod('credit_card')}
                          className="h-4 w-4 text-blue-600 rounded-full"
                        />
                        <label htmlFor="credit_card" className="ml-2 text-sm text-gray-700">
                          Kredi Kartı
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="3d_secure"
                          name="payment_method"
                          checked={paymentMethod === '3d_secure'}
                          onChange={() => setPaymentMethod('3d_secure')}
                          className="h-4 w-4 text-blue-600 rounded-full"
                        />
                        <label htmlFor="3d_secure" className="ml-2 text-sm text-gray-700">
                          3D Secure Ödeme
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Kayıtlı Kartlar */}
                  {cards.map((card) => (
                    <div 
                      key={card.id}
                      className={`border rounded-md p-4 cursor-pointer ${
                        payment && payment.id === card.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => handlePaymentSelect(card)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">{card.cardName}</h3>
                          <p className="text-gray-600 text-sm mt-1">
                            **** **** **** {card.cardNumber.slice(-4)}
                          </p>
                          <div className="text-gray-600 text-sm mt-1">
                            Son Kullanma: {card.expiryMonth}/{card.expiryYear}
                          </div>
                        </div>
                        {payment && payment.id === card.id && (
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <Check size={14} className="text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Güvenlik Kodu */}
                  <div className="mt-4">
                    <label htmlFor="securityCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Güvenlik Kodu (CVV)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="password"
                        id="securityCode"
                        name="securityCode"
                        value={securityCode}
                        onChange={(e) => setSecurityCode(e.target.value)}
                        maxLength="3"
                        className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="***"
                        required
                      />
                      <div className="ml-2 text-xs text-gray-500 flex items-center">
                        <Lock size={12} className="mr-1" /> 
                        Kartınızın arkasındaki 3 haneli kod
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <button 
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                      onClick={() => setActiveStep(1)}
                    >
                      Geri
                    </button>
                    <div>
                      <button 
                        className="text-blue-600 hover:underline mr-4"
                        onClick={() => history.push('/profile/payment')}
                      >
                        Yeni Kart Ekle
                      </button>
                      <button 
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={() => setActiveStep(3)}
                        disabled={!payment || !securityCode}
                      >
                        Devam Et <ChevronRight size={16} className="inline ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Step 3: Order Review */}
            <div className={`p-6 ${activeStep !== 3 && 'hidden'}`}>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Sipariş Özeti</h2>
              
              <div className="space-y-6">
                {/* Selected Items */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Ürünler</h3>
                  <div className="space-y-3">
                    {cart.filter(item => item.checked).map((item) => (
                      <div key={item.product.id} className="flex items-center">
                        <img 
                          src={item.product.image} 
                          alt={item.product.title} 
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium text-gray-800">{item.product.title}</h4>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-600">
                              {item.count} x {(item.product.discountPrice || item.product.price).toFixed(2)} TL
                            </span>
                            <span className="text-sm font-medium">
                              {((item.product.discountPrice || item.product.price) * item.count).toFixed(2)} TL
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Delivery Address */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Teslimat Adresi</h3>
                  {address && (
                    <div className="border rounded-md p-3 bg-gray-50">
                      <h4 className="font-medium text-gray-800">{address.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{address.fullAddress}</p>
                      <div className="text-sm text-gray-600 mt-1">
                        {address.city}, {address.district}, {address.zipCode}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Payment Method */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Ödeme Yöntemi</h3>
                  {payment && (
                    <div className="border rounded-md p-3 bg-gray-50">
                      <h4 className="font-medium text-gray-800">
                        {payment.cardName} 
                        {paymentMethod === '3d_secure' && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            3D Secure
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        **** **** **** {payment.cardNumber.slice(-4)}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Payment Error Message */}
                {paymentError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
                    <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{paymentError}</p>
                  </div>
                )}
                
                {/* Secure Payment Notice */}
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start">
                  <Lock size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Tüm ödeme işlemleri güvenli SSL bağlantısı üzerinden gerçekleştirilir. 
                    Kart bilgileriniz hiçbir şekilde sunucularımızda saklanmaz.
                  </p>
                </div>
                
                <div className="flex justify-between mt-6">
                  <button 
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    onClick={() => setActiveStep(2)}
                    disabled={processingPayment}
                  >
                    Geri
                  </button>
                  <button 
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    onClick={handleSubmitOrder}
                    disabled={processingPayment}
                  >
                    {processingPayment ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {paymentMethod === '3d_secure' ? '3D Secure Yönlendiriliyor...' : 'Ödeme İşleniyor...'}
                      </>
                    ) : (
                      'Siparişi Onayla'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Sipariş Özeti</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ara Toplam ({cart.filter(item => item.checked).reduce((sum, item) => sum + item.count, 0)} ürün)</span>
                <span className="font-medium text-gray-800">{subtotal.toFixed(2)} TL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Kargo</span>
                <span className="font-medium text-gray-800">{shipping.toFixed(2)} TL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">KDV (%18)</span>
                <span className="font-medium text-gray-800">{tax.toFixed(2)} TL</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-800">Toplam</span>
                  <span className="font-bold text-gray-800">{total.toFixed(2)} TL</span>
                </div>
              </div>
            </div>
            
            {/* Shipping Info */}
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Truck size={16} className="mr-2" />
                <span>Tahmini Teslimat: 3-5 iş günü</span>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-center space-x-2">
                <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-8" />
                <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="MasterCard" className="h-8" />
                <img src="https://cdn-icons-png.flaticon.com/128/349/349230.png" alt="American Express" className="h-8" />
                <img src="https://cdn-icons-png.flaticon.com/128/6124/6124998.png" alt="Troy" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 