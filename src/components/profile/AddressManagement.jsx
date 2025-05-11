import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { userAPI } from '../../services/api';

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    fullName: '',
    phone: '',
    city: '',
    district: '',
    zipCode: '',
    fullAddress: '',
    isDefault: false
  });
  
  useEffect(() => {
    fetchAddresses();
  }, []);
  
  const fetchAddresses = async () => {
    setIsLoading(true);
    try {
      const response = await userAPI.getAddresses();
      setAddresses(response.data || []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Adresler yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      fullName: '',
      phone: '',
      city: '',
      district: '',
      zipCode: '',
      fullAddress: '',
      isDefault: false
    });
    setEditingAddress(null);
    setShowAddressForm(false);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingAddress) {
        await userAPI.updateAddress({
          ...formData,
          id: editingAddress.id
        });
        toast.success('Adres başarıyla güncellendi.');
      } else {
        await userAPI.addAddress(formData);
        toast.success('Yeni adres başarıyla eklendi.');
      }
      
      resetForm();
      fetchAddresses();
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Adres kaydedilirken bir hata oluştu.');
    }
  };
  
  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData({
      title: address.title || '',
      fullName: address.fullName || '',
      phone: address.phone || '',
      city: address.city || '',
      district: address.district || '',
      zipCode: address.zipCode || '',
      fullAddress: address.fullAddress || '',
      isDefault: address.isDefault || false
    });
    setShowAddressForm(true);
  };
  
  const handleDelete = async (addressId) => {
    if (!window.confirm('Bu adresi silmek istediğinize emin misiniz?')) {
      return;
    }
    
    try {
      await userAPI.deleteAddress(addressId);
      toast.success('Adres başarıyla silindi.');
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Adres silinirken bir hata oluştu.');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Adreslerim</h2>
        {!showAddressForm && (
          <button
            onClick={() => setShowAddressForm(true)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Yeni Adres Ekle
          </button>
        )}
      </div>
      
      {showAddressForm ? (
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Adres Başlığı
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Örn: Ev, İş"
                />
              </div>
              
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  İl
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                  İlçe
                </label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Posta Kodu
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Açık Adres
                </label>
                <textarea
                  id="fullAddress"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isDefault"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                    Varsayılan adres olarak ayarla
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingAddress ? 'Güncelle' : 'Kaydet'}
              </button>
            </div>
          </form>
        </div>
      ) : null}
      
      {/* Address List */}
      {addresses.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-600 mb-4">Henüz kayıtlı adresiniz bulunmuyor.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="border rounded-md p-4">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-800">{address.title}</h3>
                    {address.isDefault && (
                      <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        Varsayılan
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{address.fullName}</p>
                  <p className="text-sm text-gray-600">{address.phone}</p>
                  <p className="text-sm text-gray-600 mt-2">{address.fullAddress}</p>
                  <p className="text-sm text-gray-600">
                    {address.district}, {address.city}, {address.zipCode}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="p-2 text-gray-600 hover:text-blue-600"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="p-2 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressManagement; 