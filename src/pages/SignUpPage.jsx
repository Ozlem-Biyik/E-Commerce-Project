import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Eye, EyeOff, Loader } from 'lucide-react';
import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com'
});

const SignUpPage = () => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role_id: '',
      store: {
        name: '',
        phone: '',
        tax_no: '',
        bank_account: ''
      }
    }
  });
  
  const selectedRole = watch('role_id');
  const watchPassword = watch('password');

  // Fetch roles on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('/roles');
        setRoles(response.data);
        
        // Set default role to Customer if available
        const customerRole = response.data.find(role => role.code === 'customer');
        if (customerRole) {
          setValue('role_id', customerRole.id.toString());
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
        setErrorMessage('Roller yüklenirken bir hata oluştu.');
      }
    };
    
    fetchRoles();
  }, [setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      // Prepare the form data based on selected role
      const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: parseInt(data.role_id)
      };
      
      // Add store data if store role is selected
      if (isStoreRole(data.role_id)) {
        formData.store = {
          name: data.store.name,
          phone: data.store.phone,
          tax_no: data.store.tax_no,
          bank_account: data.store.bank_account
        };
      }
      
      // Send signup request
      await api.post('/signup', formData);
      
      // Redirect to previous page with success message
      history.goBack();
      // In a real app, you would show a toast notification here
      alert('Hesabınız oluşturuldu! Hesabınızı aktifleştirmek için e-posta adresinize gönderilen linke tıklayın.');
      
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage(
        error.response?.data?.message || 
        'Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Check if selected role is a store role
  const isStoreRole = (roleId) => {
    const role = roles.find(r => r.id.toString() === roleId?.toString());
    return role?.code === 'store';
  };

  return (
    <div className="py-8 px-4 md:px-0">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Hesap Oluştur</h1>
        
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Ad Soyad
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ad Soyad"
              {...register('name', { 
                required: 'Ad Soyad alanı zorunludur',
                minLength: {
                  value: 3,
                  message: 'Ad Soyad en az 3 karakter olmalıdır'
                }
              })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          
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
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Şifre"
                {...register('password', { 
                  required: 'Şifre alanı zorunludur',
                  minLength: {
                    value: 8,
                    message: 'Şifre en az 8 karakter olmalıdır'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir'
                  }
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
          
          {/* Confirm Password Field */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Şifre Tekrar
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Şifre Tekrar"
                {...register('confirmPassword', { 
                  required: 'Şifre tekrar alanı zorunludur',
                  validate: value => value === watchPassword || 'Şifreler eşleşmiyor'
                })}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          {/* Role Selection */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Hesap Türü
            </label>
            <select
              id="role"
              className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.role_id ? 'border-red-500' : 'border-gray-300'}`}
              {...register('role_id', { 
                required: 'Hesap türü seçimi zorunludur' 
              })}
            >
              <option value="">Hesap Türü Seçin</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role_id && (
              <p className="mt-1 text-sm text-red-600">{errors.role_id.message}</p>
            )}
          </div>
          
          {/* Store Fields - Only shown if store role is selected */}
          {isStoreRole(selectedRole) && (
            <div className="border-t border-gray-200 pt-4 mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Mağaza Bilgileri</h2>
              
              {/* Store Name */}
              <div className="mb-4">
                <label htmlFor="store.name" className="block text-sm font-medium text-gray-700 mb-1">
                  Mağaza Adı
                </label>
                <input
                  id="store.name"
                  type="text"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.store?.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Mağaza Adı"
                  {...register('store.name', { 
                    required: isStoreRole(selectedRole) ? 'Mağaza adı zorunludur' : false,
                    minLength: {
                      value: 3,
                      message: 'Mağaza adı en az 3 karakter olmalıdır'
                    }
                  })}
                />
                {errors.store?.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.store.name.message}</p>
                )}
              </div>
              
              {/* Store Phone */}
              <div className="mb-4">
                <label htmlFor="store.phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Mağaza Telefonu
                </label>
                <input
                  id="store.phone"
                  type="text"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.store?.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="05XX XXX XX XX"
                  {...register('store.phone', { 
                    required: isStoreRole(selectedRole) ? 'Mağaza telefonu zorunludur' : false,
                    pattern: {
                      value: /^(05)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/,
                      message: 'Geçerli bir Türkiye telefon numarası giriniz (05XX XXX XX XX)'
                    }
                  })}
                />
                {errors.store?.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.store.phone.message}</p>
                )}
              </div>
              
              {/* Store Tax ID */}
              <div className="mb-4">
                <label htmlFor="store.tax_no" className="block text-sm font-medium text-gray-700 mb-1">
                  Vergi Numarası
                </label>
                <input
                  id="store.tax_no"
                  type="text"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.store?.tax_no ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="TXXXXVXXXXXX"
                  {...register('store.tax_no', { 
                    required: isStoreRole(selectedRole) ? 'Vergi numarası zorunludur' : false,
                    pattern: {
                      value: /^T[0-9]{4}V[0-9]{6}$/,
                      message: 'Vergi numarası TXXXXVXXXXXX formatında olmalıdır (X = rakam)'
                    }
                  })}
                />
                {errors.store?.tax_no && (
                  <p className="mt-1 text-sm text-red-600">{errors.store.tax_no.message}</p>
                )}
              </div>
              
              {/* Store Bank Account */}
              <div className="mb-4">
                <label htmlFor="store.bank_account" className="block text-sm font-medium text-gray-700 mb-1">
                  IBAN
                </label>
                <input
                  id="store.bank_account"
                  type="text"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.store?.bank_account ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="TR00 0000 0000 0000 0000 0000 00"
                  {...register('store.bank_account', { 
                    required: isStoreRole(selectedRole) ? 'IBAN zorunludur' : false,
                    pattern: {
                      value: /^TR[0-9]{2}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{2}$/,
                      message: 'Geçerli bir IBAN adresi giriniz'
                    }
                  })}
                />
                {errors.store?.bank_account && (
                  <p className="mt-1 text-sm text-red-600">{errors.store.bank_account.message}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader size={18} className="animate-spin mr-2" />
                  <span>Kaydediliyor...</span>
                </>
              ) : (
                <span>Hesap Oluştur</span>
              )}
            </button>
          </div>
          
          {/* Login Link */}
          <div className="mt-4 text-center text-sm text-gray-600">
            Zaten hesabınız var mı?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Giriş Yap
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage; 