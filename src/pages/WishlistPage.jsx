import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';
import { removeFromWishlist } from '../store/reducers/clientReducer';
import { setCart } from '../store/reducers/shoppingCartReducer';
import { toast } from 'react-toastify';
import { allProducts } from '../data/products';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { wishlist, user } = useSelector(state => state.client);
  const { cart } = useSelector(state => state.shoppingCart);
  
  // Get wishlist products
  const wishlistProducts = allProducts.filter(product => 
    wishlist.includes(product.id)
  );
  
  // Handle remove from wishlist
  const handleRemoveFromWishlist = (product) => {
    dispatch(removeFromWishlist(product.id));
    toast.success(`${product.title} favorilerden kaldırıldı.`);
  };
  
  // Handle add to cart
  const handleAddToCart = (product) => {
    // Check if product already in cart
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      // Update existing item
      const updatedCart = cart.map(item => 
        item.product.id === product.id 
          ? { ...item, count: item.count + 1, checked: true } 
          : item
      );
      
      dispatch(setCart(updatedCart));
    } else {
      // Add new item
      const newItem = {
        product,
        count: 1,
        checked: true
      };
      
      dispatch(setCart([...cart, newItem]));
    }
    
    toast.success(`${product.title} sepete eklendi.`);
  };
  
  if (!user) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Heart size={64} className="mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Favorilerinizi Görüntülemek İçin Giriş Yapın</h1>
          <p className="text-gray-600 mb-8">
            Favori ürünlerinizi görmek ve yönetmek için lütfen hesabınıza giriş yapın.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/login" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              Giriş Yap
            </Link>
            <Link 
              to="/signup" 
              className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (wishlistProducts.length === 0) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Heart size={64} className="mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Favorileriniz Boş</h1>
          <p className="text-gray-600 mb-8">
            Henüz favorilerinize eklediğiniz bir ürün bulunmamaktadır.
          </p>
          <Link 
            to="/shop" 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            Alışverişe Başla
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Favorilerim</h1>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Ürün Listesi */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ürün
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fiyat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stok Durumu
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {wishlistProducts.map((product) => (
                  <tr key={product.id}>
                    {/* Ürün */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16">
                          <img 
                            src={product.image} 
                            alt={product.title} 
                            className="h-16 w-16 object-cover rounded"
                          />
                        </div>
                        <div className="ml-4">
                          <Link 
                            to={`/products/${product.id}`}
                            className="text-sm font-medium text-gray-900 hover:text-blue-600"
                          >
                            {product.title}
                          </Link>
                        </div>
                      </div>
                    </td>
                    
                    {/* Fiyat */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        {product.discountPrice ? (
                          <>
                            <span className="text-sm font-medium text-gray-900">
                              {product.discountPrice.toFixed(2)} TL
                            </span>
                            <span className="text-xs text-gray-500 line-through">
                              {product.price.toFixed(2)} TL
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-medium text-gray-900">
                            {product.price.toFixed(2)} TL
                          </span>
                        )}
                      </div>
                    </td>
                    
                    {/* Stok Durumu */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Stokta
                      </span>
                    </td>
                    
                    {/* İşlemler */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="p-2 text-blue-600 hover:text-blue-800"
                          title="Sepete Ekle"
                        >
                          <ShoppingCart size={18} />
                        </button>
                        <button 
                          onClick={() => handleRemoveFromWishlist(product)}
                          className="p-2 text-red-600 hover:text-red-800"
                          title="Favorilerden Kaldır"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Alışverişe Devam Et */}
        <div className="mt-8 flex justify-between">
          <Link 
            to="/shop" 
            className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors"
          >
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage; 