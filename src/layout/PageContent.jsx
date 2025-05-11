import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ContactPage from '../pages/ContactPage';
import TeamPage from '../pages/TeamPage';
import AboutUsPage from '../pages/AboutUsPage';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import CheckoutPage from '../pages/CheckoutPage';
import ProfilePage from '../pages/ProfilePage';
import WishlistPage from '../pages/WishlistPage';

const PageContent = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/shop">
            <ShopPage />
          </Route>
          <Route path="/products/:id">
            <ProductDetailPage />
          </Route>
          <Route path="/contact">
            <ContactPage />
          </Route>
          <Route path="/team">
            <TeamPage />
          </Route>
          <Route path="/about">
            <AboutUsPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/cart">
            <ShoppingCartPage />
          </Route>
          <Route path="/checkout">
            <CheckoutPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/wishlist">
            <WishlistPage />
          </Route>
          {/* 404 Page */}
          <Route path="*">
            <div className="flex flex-col items-center justify-center py-20">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-8">Sayfa bulunamadı</p>
            </div>
          </Route>
        </Switch>
      </div>
    </main>
  );
};

export default PageContent; 