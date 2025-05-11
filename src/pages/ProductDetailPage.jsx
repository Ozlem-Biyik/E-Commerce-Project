import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Heart, ShoppingCart, Share2, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductReviews from '../components/ProductReviews';
import { toast } from 'react-toastify';
import { setCart } from '../store/reducers/shoppingCartReducer';
import { addToWishlist, removeFromWishlist } from '../store/reducers/clientReducer';

// Ürünleri ShopPage'den alıyoruz
import { allProducts } from '../data/products';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.shoppingCart);
  const { wishlist, user } = useSelector(state => state.client);
  
  useEffect(() => {
    // ID'ye göre ürünü bul
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // İlgili ürünleri bul (aynı kategori)
      const related = allProducts
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const {
    title,
    price,
    discountPrice,
    image,
    rating,
    isNew,
    category
  } = product;

  const discount = discountPrice ? Math.round((1 - discountPrice / price) * 100) : 0;
  const isFavorite = wishlist.includes(parseInt(id));
  
  // Ürün resimleri - normalde detay sayfasında birden fazla resim olur
  const productImages = [
    image,
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
  ];
  
  // Add to cart function
  const handleAddToCart = () => {
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        count: updatedCart[existingItemIndex].count + quantity,
        checked: true
      };
      
      dispatch(setCart(updatedCart));
    } else {
      // Add new item
      const newItem = {
        product,
        count: quantity,
        checked: true
      };
      
      dispatch(setCart([...cart, newItem]));
    }
    
    // Show success message
    toast.success(`${quantity} adet ${title} sepete eklendi.`, {
      position: "bottom-right",
      autoClose: 3000
    });
  };

  // Toggle wishlist function
  const handleToggleWishlist = () => {
    if (!user) {
      toast.error('Favorilere eklemek için giriş yapmalısınız.');
      return;
    }
    
    const productId = parseInt(id);
    
    if (isFavorite) {
      dispatch(removeFromWishlist(productId));
      toast.success(`${title} favorilerden kaldırıldı.`);
    } else {
      dispatch(addToWishlist(productId));
      toast.success(`${title} favorilere eklendi.`);
    }
  };

  return (
    <div className="pb-16">
      {/* Breadcrumb - Gezinti */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">Ana Sayfa</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-blue-600">Ürünler</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{title}</span>
        </div>
      </div>

      {/* Ürün Detay - Mobil ve Desktop */}
      <div className="lg:flex lg:space-x-8">
        {/* Ürün Resimleri - Sol Taraf */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          {/* Ana Resim */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img 
              src={productImages[activeImage]} 
              alt={title} 
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-contain p-4"
            />
            
            {/* Prev/Next Butonları */}
            <button 
              onClick={() => setActiveImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 rounded-full shadow hover:bg-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setActiveImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 rounded-full shadow hover:bg-white"
            >
              <ChevronRight size={20} />
            </button>
            
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
          </div>
          
          {/* Küçük Resimler */}
          <div className="grid grid-cols-3 gap-2">
            {productImages.map((img, index) => (
              <div 
                key={index}
                onClick={() => setActiveImage(index)}
                className={`cursor-pointer border rounded-md overflow-hidden ${activeImage === index ? 'border-blue-500' : 'border-gray-200'}`}
              >
                <img src={img} alt={`${title} - resim ${index+1}`} className="w-full h-20 object-cover" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Ürün Bilgileri - Sağ Taraf */}
        <div className="lg:w-1/2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{title}</h1>
          
          {/* Değerlendirme */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {Array(5).fill(0).map((_, index) => (
                <Star 
                  key={index} 
                  size={18} 
                  className={index < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">{rating} puan | 120 değerlendirme</span>
          </div>
          
          {/* Fiyat Bilgisi */}
          <div className="flex items-center space-x-2 mb-4">
            {discountPrice ? (
              <>
                <span className="text-2xl font-bold text-gray-900">
                  {discountPrice.toFixed(2)} TL
                </span>
                <span className="text-gray-500 text-lg line-through">
                  {price.toFixed(2)} TL
                </span>
                <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded">
                  {discount}% indirim
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                {price.toFixed(2)} TL
              </span>
            )}
          </div>
          
          {/* Kısa Açıklama */}
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          {/* Stok Durumu */}
          <div className="flex items-center mb-6">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-green-600 font-medium">Stokta mevcut</span>
          </div>
          
          <hr className="my-6" />
          
          {/* Miktar Seçimi */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Miktar</h3>
            <div className="flex items-center">
              <button 
                onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <input 
                type="text" 
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value > 0) {
                    setQuantity(value);
                  }
                }}
                className="w-16 h-10 border-t border-b border-gray-300 text-center text-gray-700"
              />
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Aksiyon Butonları */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
            <button 
              onClick={handleAddToCart}
              className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center justify-center transition-colors duration-300"
            >
              <ShoppingCart size={18} className="mr-2" />
              Sepete Ekle
            </button>
            <button 
              onClick={handleToggleWishlist}
              className={`flex-1 py-3 px-6 border font-medium rounded-md flex items-center justify-center transition-colors duration-300 ${
                isFavorite 
                  ? 'border-red-300 bg-red-50 hover:bg-red-100 text-red-700' 
                  : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Heart size={18} className={`mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
            </button>
          </div>
          
          {/* Paylaş */}
          <div className="flex items-center mb-6">
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <Share2 size={18} className="mr-2" />
              <span>Paylaş</span>
            </button>
          </div>
          
          <hr className="my-6" />
          
          {/* Ürün Detayları */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Ürün Detayları</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Kategori:</span>
                <span className="text-gray-800 capitalize">{category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Renk:</span>
                <span className="text-gray-800">Siyah</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Malzeme:</span>
                <span className="text-gray-800">Metal, Plastik</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Marka:</span>
                <span className="text-gray-800">TechPro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Benzer Ürünler */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Benzer Ürünler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {relatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      {/* Product Reviews */}
      <ProductReviews productId={parseInt(id)} />
    </div>
  );
};

export default ProductDetailPage; 