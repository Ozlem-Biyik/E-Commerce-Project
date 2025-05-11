import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch, Switch, Route, NavLink } from 'react-router-dom';
import { User, MapPin, CreditCard, Package, Settings, LogOut, Heart } from 'lucide-react';
import ProfileInfo from '../components/profile/ProfileInfo';
import AddressManagement from '../components/profile/AddressManagement';
import PaymentManagement from '../components/profile/PaymentManagement';
import OrderHistory from '../components/profile/OrderHistory';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { user } = useSelector(state => state.client);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      history.push('/login?redirect=profile');
      toast.info('Bu sayfayı görüntülemek için giriş yapmalısınız.');
    }
  }, [user, history]);
  
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Reload the page to reset Redux state
    window.location.href = '/';
  };
  
  if (!user) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="pb-16">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Hesabım</h1>
        <p className="text-gray-600 mt-2">
          Hesap bilgilerinizi yönetin, siparişlerinizi takip edin ve daha fazlası.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* User Info */}
            <div className="flex items-center space-x-4 mb-6 pb-6 border-b">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-blue-600" />
                )}
              </div>
              <div>
                <h2 className="font-bold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="space-y-1">
              <NavLink 
                exact
                to={`${url}`}
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700"
                activeClassName="bg-blue-50 text-blue-700 font-medium"
              >
                <User size={18} className="mr-3" />
                <span>Profil Bilgilerim</span>
              </NavLink>
              <NavLink 
                to={`${url}/addresses`}
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700"
                activeClassName="bg-blue-50 text-blue-700 font-medium"
              >
                <MapPin size={18} className="mr-3" />
                <span>Adreslerim</span>
              </NavLink>
              <NavLink 
                to={`${url}/payment`}
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700"
                activeClassName="bg-blue-50 text-blue-700 font-medium"
              >
                <CreditCard size={18} className="mr-3" />
                <span>Ödeme Yöntemlerim</span>
              </NavLink>
              <NavLink 
                to={`${url}/orders`}
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700"
                activeClassName="bg-blue-50 text-blue-700 font-medium"
              >
                <Package size={18} className="mr-3" />
                <span>Siparişlerim</span>
              </NavLink>
              <NavLink 
                to="/wishlist"
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700"
                activeClassName="bg-blue-50 text-blue-700 font-medium"
              >
                <Heart size={18} className="mr-3" />
                <span>Favorilerim</span>
              </NavLink>
              <NavLink 
                to={`${url}/settings`}
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700"
                activeClassName="bg-blue-50 text-blue-700 font-medium"
              >
                <Settings size={18} className="mr-3" />
                <span>Ayarlar</span>
              </NavLink>
              
              <button 
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 mt-4 text-red-600 rounded-md hover:bg-red-50"
              >
                <LogOut size={18} className="mr-3" />
                <span>Çıkış Yap</span>
              </button>
            </nav>
          </div>
        </div>
        
        {/* Content */}
        <div className="md:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Switch>
              <Route exact path={path}>
                <ProfileInfo />
              </Route>
              <Route path={`${path}/addresses`}>
                <AddressManagement />
              </Route>
              <Route path={`${path}/payment`}>
                <PaymentManagement />
              </Route>
              <Route path={`${path}/orders`}>
                <OrderHistory />
              </Route>
              <Route path={`${path}/settings`}>
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Ayarlar</h3>
                  <p className="text-gray-600">Bu özellik henüz geliştirme aşamasındadır.</p>
                </div>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 