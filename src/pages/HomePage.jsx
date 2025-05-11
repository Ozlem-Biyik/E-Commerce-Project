import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';

// Örnek veriler
const sliderData = [
  {
    title: "Yaz Koleksiyonu",
    description: "Yazın en taze ve trend parçalarıyla stilinizi güncelleyin!",
    buttonText: "Alışverişe Başla",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Teknoloji İndirimleri",
    description: "Tüm elektronik ürünlerde %30'a varan indirimler!",
    buttonText: "Fırsatları Keşfet",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Ev Dekorasyon",
    description: "Evinizi yenilemenin tam zamanı, şık ve modern dekorasyon ürünleriyle yaşam alanınızı dönüştürün.",
    buttonText: "Detayları Gör",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1558&q=80"
  }
];

const categories = [
  {
    id: 1,
    name: "Elektronik",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    name: "Moda",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
  },
  {
    id: 3,
    name: "Ev & Yaşam",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80"
  },
  {
    id: 4,
    name: "Kozmetik",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
  },
  {
    id: 5,
    name: "Kitaplar",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  }
];

const featuredProducts = [
  {
    id: 1,
    title: "Akıllı Telefon X Pro Max",
    price: 14999.99,
    discountPrice: 12999.99,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2227&q=80",
    rating: 4.5,
    isNew: true,
  },
  {
    id: 2,
    title: "Spor Ayakkabı Air Comfort",
    price: 1599.90,
    discountPrice: null,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    rating: 4.2,
    isNew: false,
  },
  {
    id: 3,
    title: "Akıllı Saat Fit Pro",
    price: 2499.90,
    discountPrice: 1999.90,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    rating: 4.7,
    isNew: true,
  },
  {
    id: 4,
    title: "Kablosuz Kulaklık Max Sound",
    price: 1299.90,
    discountPrice: 899.90,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 4.0,
    isNew: false,
  },
  {
    id: 5,
    title: "Modern Metal Masa Lambası",
    price: 799.90,
    discountPrice: null,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 4.3,
    isNew: false,
  },
  {
    id: 6,
    title: "Doğal Cilt Bakım Seti",
    price: 399.90,
    discountPrice: 299.90,
    image: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    rating: 4.9,
    isNew: true,
  },
  {
    id: 7,
    title: "Ultra HD 4K Smart TV 55 inç",
    price: 16999.99,
    discountPrice: 14999.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 4.6,
    isNew: false,
  },
  {
    id: 8,
    title: "Deri Cüzdan Premium",
    price: 499.90,
    discountPrice: null,
    image: "https://images.unsplash.com/photo-1627123437181-786e8553ff2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    rating: 4.4,
    isNew: false,
  }
];

const featuresData = [
  {
    icon: "🚚",
    title: "Ücretsiz Kargo",
    description: "200 TL ve üzeri alışverişlerde ücretsiz kargo"
  },
  {
    icon: "🔄",
    title: "Kolay İade",
    description: "14 gün içerisinde kolay iade imkanı"
  },
  {
    icon: "🔒",
    title: "Güvenli Ödeme",
    description: "Güvenli ödeme seçenekleri"
  },
  {
    icon: "💬",
    title: "7/24 Destek",
    description: "Her zaman yanınızda müşteri desteği"
  }
];

const HomePage = () => {
  return (
    <div className="flex flex-col space-y-12">
      {/* Hero Slider */}
      <section className="px-0">
        <Slider slides={sliderData} />
      </section>

      {/* Kategoriler */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Kategoriler</h2>
          <Link to="/categories" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
            Tümünü Gör <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/categories/${category.id}`}
              className="group relative rounded-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="aspect-square">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Öne Çıkan Ürünler */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Öne Çıkan Ürünler</h2>
          <Link to="/shop" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
            Tümünü Gör <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Çeşitli Özellikler */}
      <section className="bg-gray-100 py-10 -mx-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresData.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center flex flex-col items-center">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white -mx-4 px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Özel Teklifler ve İndirimler İçin Kaydolun</h2>
          <p className="mb-8 text-blue-100">
            En yeni ürünler, kampanyalar ve özel indirimlerden ilk siz haberdar olun.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input 
              type="email" 
              placeholder="E-posta adresiniz" 
              className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none"
            />
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors duration-300 flex items-center justify-center">
              Abone Ol <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 