import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify';
import { orderAPI } from '../../services/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  
  useEffect(() => {
    fetchOrders();
  }, []);
  
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await orderAPI.getOrders();
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Siparişler yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };
  
  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { text: 'Beklemede', color: 'bg-yellow-100 text-yellow-800' },
      processing: { text: 'İşleniyor', color: 'bg-blue-100 text-blue-800' },
      shipped: { text: 'Kargoya Verildi', color: 'bg-purple-100 text-purple-800' },
      delivered: { text: 'Teslim Edildi', color: 'bg-green-100 text-green-800' },
      cancelled: { text: 'İptal Edildi', color: 'bg-red-100 text-red-800' }
    };
    
    const statusInfo = statusMap[status] || { text: status, color: 'bg-gray-100 text-gray-800' };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
        {statusInfo.text}
      </span>
    );
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Siparişlerim</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <div className="flex justify-center mb-4">
            <Package size={48} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Henüz siparişiniz bulunmuyor</h3>
          <p className="text-gray-600 mb-4">Alışverişe başlamak için ürünleri keşfedin.</p>
          <Link 
            to="/shop" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-md overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-800">Sipariş #{order.id}</h3>
                      <span className="mx-2">•</span>
                      <span className="text-sm text-gray-600">{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="mt-1">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-2 sm:mt-0">
                    <span className="font-medium text-gray-800 mr-4">{order.total.toFixed(2)} TL</span>
                    <button 
                      onClick={() => toggleOrderDetails(order.id)}
                      className="p-2 text-gray-600 hover:text-blue-600"
                    >
                      {expandedOrderId === order.id ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Order Details */}
              {expandedOrderId === order.id && (
                <div className="p-4">
                  {/* Items */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Sipariş Detayları</h4>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <img 
                            src={item.product.image} 
                            alt={item.product.title} 
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="ml-4 flex-1">
                            <h5 className="text-sm font-medium text-gray-800">{item.product.title}</h5>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-gray-600">
                                {item.quantity} x {item.price.toFixed(2)} TL
                              </span>
                              <span className="text-sm font-medium">
                                {(item.price * item.quantity).toFixed(2)} TL
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Shipping Address */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Teslimat Adresi</h4>
                    <div className="border rounded-md p-3 bg-gray-50">
                      <h5 className="font-medium text-gray-800">{order.address.title}</h5>
                      <p className="text-sm text-gray-600 mt-1">{order.address.fullAddress}</p>
                      <div className="text-sm text-gray-600 mt-1">
                        {order.address.district}, {order.address.city}, {order.address.zipCode}
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Info */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Ödeme Bilgileri</h4>
                    <div className="border rounded-md p-3 bg-gray-50">
                      <h5 className="font-medium text-gray-800">{order.payment.cardName}</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        **** **** **** {order.payment.cardNumber.slice(-4)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Order Summary */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Sipariş Özeti</h4>
                    <div className="border rounded-md p-3 bg-gray-50">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Ara Toplam</span>
                          <span>{(order.total - 29.99).toFixed(2)} TL</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Kargo</span>
                          <span>29.99 TL</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-medium">
                            <span>Toplam</span>
                            <span>{order.total.toFixed(2)} TL</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="mt-6 flex justify-end">
                    <Link 
                      to={`/orders/${order.id}`}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <span>Sipariş Detayları</span>
                      <ExternalLink size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory; 