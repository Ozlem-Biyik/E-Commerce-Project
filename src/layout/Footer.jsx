import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:justify-between space-y-8 md:space-y-0">
          {/* Logo and description */}
          <div className="md:w-1/4">
            <Link to="/" className="text-2xl font-bold">E-Store</Link>
            <p className="mt-2 text-gray-400">
              Kaliteli ürünler, uygun fiyatlar ve hızlı teslimat ile online alışverişin adresi.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">Ana Sayfa</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-white">Ürünler</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white">Kategoriler</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">Hakkımızda</Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-400 hover:text-white">Ekibimiz</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">İletişim</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kategoriler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/electronics" className="text-gray-400 hover:text-white">Elektronik</Link>
              </li>
              <li>
                <Link to="/categories/fashion" className="text-gray-400 hover:text-white">Moda</Link>
              </li>
              <li>
                <Link to="/categories/home" className="text-gray-400 hover:text-white">Ev & Yaşam</Link>
              </li>
              <li>
                <Link to="/categories/beauty" className="text-gray-400 hover:text-white">Kozmetik</Link>
              </li>
              <li>
                <Link to="/categories/books" className="text-gray-400 hover:text-white">Kitaplar</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim Bilgileri</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span className="text-gray-400">İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span className="text-gray-400">+90 212 123 45 67</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span className="text-gray-400">info@estore.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} E-Store. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 