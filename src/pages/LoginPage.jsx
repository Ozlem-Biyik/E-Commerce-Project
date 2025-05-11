import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Loader } from 'lucide-react';
import md5 from 'md5';

// This would normally be imported from your Redux actions
const loginUser = async (credentials) => {
  // This is a placeholder for the actual Redux action
  // In a real implementation, this would dispatch a Redux action
  console.log('Logging in with:', credentials);
  
  // Mock API call - replace with actual Redux thunk action
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate API response
      if (credentials.email === 'customer@commerce.com' && credentials.password === '123456') {
        resolve({
          user: {
            id: 1,
            name: 'Test Customer',
            email: 'customer@commerce.com',
            role: 'customer'
          },
          token: 'mock-token-12345'
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const location = useLocation();
  
  // Get the redirect path from location state or default to home
  const { from } = location.state || { from: { pathname: '/' } };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password
      });
      
      // Save token to localStorage if remember me is checked
      if (data.rememberMe && response.token) {
        localStorage.setItem('token', response.token);
      }
      
      // Redirect to the page user was trying to access or to home page
      history.replace(from);
      
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('E-posta veya şifre hatalı. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Gravatar URL from email
  const getGravatarUrl = (email) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=mp&s=200`;
  };

  return (
    <div className="py-8 px-4 md:px-0">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Giriş Yap</h1>
          <p className="text-gray-600">Hesabınıza erişmek için giriş yapın</p>
        </div>
        
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-posta Adresi
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="ornek@email.com"
              {...register('email', { 
                required: 'E-posta alanı zorunludur',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Geçerli bir e-posta adresi giriniz'
                }
              })}
              onChange={(e) => {
                // Display gravatar preview on email change
                const gravatarPreview = document.getElementById('gravatar-preview');
                if (gravatarPreview) {
                  gravatarPreview.src = getGravatarUrl(e.target.value);
                }
              }}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          {/* Password Field */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Şifremi Unuttum
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Şifreniz"
                {...register('password', { 
                  required: 'Şifre alanı zorunludur'
                })}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          
          {/* Remember Me Checkbox */}
          <div className="flex items-center mb-6">
            <input
              id="rememberMe"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              {...register('rememberMe')}
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Beni Hatırla
            </label>
          </div>
          
          {/* Gravatar Preview */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
              <img 
                id="gravatar-preview"
                src={getGravatarUrl('')} 
                alt="Gravatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader size={18} className="animate-spin mr-2" />
                  <span>Giriş Yapılıyor...</span>
                </>
              ) : (
                <span>Giriş Yap</span>
              )}
            </button>
          </div>
          
          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            Hesabınız yok mu?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Hesap Oluştur
            </a>
          </div>
          
          {/* Test Accounts */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Test Hesapları:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div>customer@commerce.com (Müşteri) - Şifre: 123456</div>
              <div>store@commerce.com (Mağaza) - Şifre: 123456</div>
              <div>admin@commerce.com (Admin) - Şifre: 123456</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 