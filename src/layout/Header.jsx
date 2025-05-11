import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search, Heart } from 'lucide-react';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useSelector(state => state.shoppingCart);
  const { user, wishlist } = useSelector(state => state.client);
  
  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.count, 0);
  // Get wishlist count
  const wishlistCount = wishlist.length;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            E-Store
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/wishlist" className="text-gray-600 hover:text-gray-900 relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900 relative">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button 
              className="text-gray-600 hover:text-gray-900" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Ana Sayfa
            </Link>
            <Link to="/shop" className="text-gray-600 hover:text-gray-900">
              Ürünler
            </Link>
            <Link to="/categories" className="text-gray-600 hover:text-gray-900">
              Kategoriler
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              Hakkımızda
            </Link>
            <Link to="/team" className="text-gray-600 hover:text-gray-900">
              Ekibimiz
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              İletişim
            </Link>
          </nav>

          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <Search size={20} />
            </button>
            <Link to={user ? "/profile" : "/login"} className="text-gray-600 hover:text-gray-900">
              <User size={20} />
            </Link>
            <Link to="/wishlist" className="text-gray-600 hover:text-gray-900 relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900 relative">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-4 border-t pt-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link 
                to="/shop" 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Ürünler
              </Link>
              <Link 
                to="/categories" 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Kategoriler
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Hakkımızda
              </Link>
              <Link 
                to="/team" 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Ekibimiz
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                İletişim
              </Link>
              <Link 
                to="/wishlist" 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Favorilerim {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
              <Link 
                to="/cart" 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sepetim {cartItemCount > 0 && `(${cartItemCount})`}
              </Link>
              {user ? (
                <Link 
                  to="/profile" 
                  className="text-gray-600 hover:text-gray-900 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hesabım
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Giriş Yap
                  </Link>
                  <Link 
                    to="/signup" 
                    className="text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 