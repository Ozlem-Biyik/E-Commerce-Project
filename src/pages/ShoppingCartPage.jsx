import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { setCart } from '../store/reducers/shoppingCartReducer';

const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cart } = useSelector(state => state.shoppingCart);
  
  // Calculate totals
  const subtotal = cart.reduce((total, item) => {
    const price = item.product.discountPrice || item.product.price;
    return total + (price * item.count * (item.checked ? 1 : 0));
  }, 0);
  
  const shipping = subtotal > 0 ? 29.99 : 0;
  const discount = 0; // Implement discount logic if needed
  const total = subtotal + shipping - discount;
  
  // Handle quantity change
  const handleQuantityChange = (productId, newCount) => {
    if (newCount < 1) return;
    
    const updatedCart = cart.map(item => 
      item.product.id === productId 
        ? { ...item, count: newCount } 
        : item
    );
    
    dispatch(setCart(updatedCart));
  };
  
  // Handle remove item
  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter(item => item.product.id !== productId);
    dispatch(setCart(updatedCart));
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (productId, checked) => {
    const updatedCart = cart.map(item => 
      item.product.id === productId 
        ? { ...item, checked } 
        : item
    );
    
    dispatch(setCart(updatedCart));
  };
  
  // Handle select all
  const handleSelectAll = (checked) => {
    const updatedCart = cart.map(item => ({ ...item, checked }));
    dispatch(setCart(updatedCart));
  };
  
  // Proceed to checkout
  const handleCheckout = () => {
    history.push('/checkout');
  };
  
  // Check if all items are selected
  const allSelected = cart.length > 0 && cart.every(item => item.checked);
  
  return (
    <div className="pb-16">
      {/* Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">Ana Sayfa</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Sepetim</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Alışveriş Sepetim</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Sepetinizdeki ürünleri inceleyebilir, miktarlarını değiştirebilir veya silebilirsiniz.
        </p>
      </div>

      {/* Cart Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          {cart.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <ShoppingCart size={64} className="text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Sepetiniz Boş</h2>
              <p className="text-gray-600 mb-6">Sepetinizde henüz ürün bulunmamaktadır.</p>
              <Link 
                to="/shop" 
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300"
              >
                Alışverişe Başla
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-4 px-4 text-left">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            className="h-4 w-4 text-blue-600 rounded"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700">Tümünü Seç</span>
                        </div>
                      </th>
                      <th className="py-4 px-4 text-left text-sm font-medium text-gray-700">Ürün</th>
                      <th className="py-4 px-4 text-left text-sm font-medium text-gray-700">Fiyat</th>
                      <th className="py-4 px-4 text-left text-sm font-medium text-gray-700">Miktar</th>
                      <th className="py-4 px-4 text-left text-sm font-medium text-gray-700">Toplam</th>
                      <th className="py-4 px-4 text-left text-sm font-medium text-gray-700">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cart.map((item) => {
                      const { product, count, checked } = item;
                      const price = product.discountPrice || product.price;
                      const itemTotal = price * count;
                      
                      return (
                        <tr key={product.id} className={!checked ? 'bg-gray-50' : ''}>
                          <td className="py-4 px-4">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => handleCheckboxChange(product.id, e.target.checked)}
                              className="h-4 w-4 text-blue-600 rounded"
                            />
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <img 
                                src={product.image} 
                                alt={product.title} 
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
                                {product.discountPrice && (
                                  <span className="text-xs text-red-600">İndirimli</span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {product.discountPrice ? (
                              <div>
                                <span className="text-sm font-medium text-gray-900">{product.discountPrice.toFixed(2)} TL</span>
                                <span className="block text-xs text-gray-500 line-through">{product.price.toFixed(2)} TL</span>
                              </div>
                            ) : (
                              <span className="text-sm font-medium text-gray-900">{product.price.toFixed(2)} TL</span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <button 
                                onClick={() => handleQuantityChange(product.id, count - 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-100"
                              >
                                <Minus size={16} />
                              </button>
                              <input 
                                type="text" 
                                value={count}
                                readOnly
                                className="w-12 h-8 border-t border-b border-gray-300 text-center text-gray-700"
                              />
                              <button 
                                onClick={() => handleQuantityChange(product.id, count + 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-100"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm font-medium text-gray-900">{itemTotal.toFixed(2)} TL</span>
                          </td>
                          <td className="py-4 px-4">
                            <button 
                              onClick={() => handleRemoveItem(product.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Sipariş Özeti</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ara Toplam</span>
                <span className="font-medium text-gray-800">{subtotal.toFixed(2)} TL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Kargo</span>
                <span className="font-medium text-gray-800">{shipping.toFixed(2)} TL</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">İndirim</span>
                  <span className="font-medium text-red-600">-{discount.toFixed(2)} TL</span>
                </div>
              )}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-800">Toplam</span>
                  <span className="font-bold text-gray-800">{total.toFixed(2)} TL</span>
                </div>
              </div>
            </div>
            
            <button
              disabled={cart.length === 0 || !cart.some(item => item.checked)}
              className={`w-full py-3 px-4 rounded-md font-medium text-white ${
                cart.length === 0 || !cart.some(item => item.checked)
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={handleCheckout}
            >
              Siparişi Tamamla
            </button>
            
            <div className="mt-4">
              <Link 
                to="/shop" 
                className="text-sm text-blue-600 hover:underline flex items-center justify-center"
              >
                <span>Alışverişe Devam Et</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage; 