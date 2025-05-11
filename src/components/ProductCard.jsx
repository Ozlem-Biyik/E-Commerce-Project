import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../store/reducers/clientReducer';
import { setCart } from '../store/reducers/shoppingCartReducer';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector(state => state.client);
  const { cart } = useSelector(state => state.shoppingCart);
  const { user } = useSelector(state => state.client);

  const {
    id,
    title,
    price,
    discountPrice,
    image,
    rating,
    isNew,
  } = product;

  const discount = discountPrice ? Math.round((1 - discountPrice / price) * 100) : 0;
  const isFavorite = wishlist.includes(id);

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Favorilere eklemek için giriş yapmalısınız.');
      return;
    }
    
    if (isFavorite) {
      dispatch(removeFromWishlist(id));
      toast.success(`${title} favorilerden kaldırıldı.`);
    } else {
      dispatch(addToWishlist(id));
      toast.success(`${title} favorilere eklendi.`);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.product.id === id);
    
    if (existingItem) {
      // Update existing item
      const updatedCart = cart.map(item => 
        item.product.id === id 
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
    
    toast.success(`${title} sepete eklendi.`);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md">
      {/* Favori ve İndirim Rozeti */}
      <div className="absolute top-2 right-2 z-10">
        <button 
          onClick={handleToggleWishlist}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 transition-colors duration-300"
        >
          <Heart size={18} fill={isFavorite ? 'red' : 'none'} className={isFavorite ? 'text-red-500' : ''} />
        </button>
      </div>
      
      {/* Yeni ve İndirim Etiketleri */}
      <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1">
        {isNew && (
          <span className="px-2 py-1 text-xs font-semibold bg-blue-500 text-white rounded">
            Yeni
          </span>
        )}
        {discount > 0 && (
          <span className="px-2 py-1 text-xs font-semibold bg-red-500 text-white rounded">
            -{discount}%
          </span>
        )}
      </div>

      {/* Ürün Görseli */}
      <Link to={`/products/${id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Ürün Bilgileri */}
      <div className="p-4">
        <Link to={`/products/${id}`}>
          <h3 className="text-gray-800 font-medium text-sm sm:text-base line-clamp-2 mb-1 min-h-[2.5rem]">
            {title}
          </h3>
        </Link>
        
        {/* Fiyat Bilgisi */}
        <div className="flex items-center space-x-2 mb-2">
          {discountPrice ? (
            <>
              <span className="font-semibold text-gray-900">
                {discountPrice.toFixed(2)} TL
              </span>
              <span className="text-gray-500 text-sm line-through">
                {price.toFixed(2)} TL
              </span>
            </>
          ) : (
            <span className="font-semibold text-gray-900">
              {price.toFixed(2)} TL
            </span>
          )}
        </div>

        {/* Yıldız Değerlendirmesi */}
        <div className="flex items-center mb-3">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Star
                key={index}
                size={16}
                className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
              />
            ))}
          <span className="ml-1 text-xs text-gray-500">({rating})</span>
        </div>

        {/* Sepete Ekle Butonu */}
        <button 
          onClick={handleAddToCart}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md flex items-center justify-center transition-colors duration-300"
        >
          <ShoppingCart size={16} className="mr-2" />
          Sepete Ekle
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 