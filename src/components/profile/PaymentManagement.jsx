import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';
import { userAPI } from '../../services/api';

const PaymentManagement = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    isDefault: false
  });
  
  useEffect(() => {
    fetchCards();
  }, []);
  
  const fetchCards = async () => {
    setIsLoading(true);
    try {
      const response = await userAPI.getCards();
      setCards(response.data || []);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      toast.error('Ödeme yöntemleri yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'cardNumber') {
      // Format card number with spaces every 4 digits
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  
  const resetForm = () => {
    setFormData({
      cardName: '',
      cardNumber: '',
      cardHolder: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      isDefault: false
    });
    setEditingCard(null);
    setShowCardForm(false);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Remove spaces from card number
    const cardData = {
      ...formData,
      cardNumber: formData.cardNumber.replace(/\s/g, '')
    };
    
    try {
      if (editingCard) {
        await userAPI.updateCard({
          ...cardData,
          id: editingCard.id
        });
        toast.success('Kart bilgileri başarıyla güncellendi.');
      } else {
        await userAPI.addCard(cardData);
        toast.success('Yeni kart başarıyla eklendi.');
      }
      
      resetForm();
      fetchCards();
    } catch (error) {
      console.error('Error saving card:', error);
      toast.error('Kart bilgileri kaydedilirken bir hata oluştu.');
    }
  };
  
  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({
      cardName: card.cardName || '',
      cardNumber: card.cardNumber ? card.cardNumber.replace(/(\d{4})/g, '$1 ').trim() : '',
      cardHolder: card.cardHolder || '',
      expiryMonth: card.expiryMonth || '',
      expiryYear: card.expiryYear || '',
      cvv: '',
      isDefault: card.isDefault || false
    });
    setShowCardForm(true);
  };
  
  const handleDelete = async (cardId) => {
    if (!window.confirm('Bu kartı silmek istediğinize emin misiniz?')) {
      return;
    }
    
    try {
      await userAPI.deleteCard(cardId);
      toast.success('Kart başarıyla silindi.');
      fetchCards();
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('Kart silinirken bir hata oluştu.');
    }
  };
  
  // Generate years for expiry date
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  
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
        <h2 className="text-xl font-bold text-gray-800">Ödeme Yöntemlerim</h2>
        {!showCardForm && (
          <button
            onClick={() => setShowCardForm(true)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Yeni Kart Ekle
          </button>
        )}
      </div>
      
      {showCardForm ? (
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {editingCard ? 'Kartı Düzenle' : 'Yeni Kart Ekle'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                  Kart Adı
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Örn: Banka Kartım"
                />
              </div>
              
              <div>
                <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                  Kart Üzerindeki İsim
                </label>
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
                  value={formData.cardHolder}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Örn: JOHN DOE"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Kart Numarası
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="XXXX XXXX XXXX XXXX"
                    maxLength={19}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Son Kullanma Tarihi
                </label>
                <div className="flex space-x-2">
                  <select
                    id="expiryMonth"
                    name="expiryMonth"
                    value={formData.expiryMonth}
                    onChange={handleChange}
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Ay</option>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = i + 1;
                      return (
                        <option key={month} value={month.toString().padStart(2, '0')}>
                          {month.toString().padStart(2, '0')}
                        </option>
                      );
                    })}
                  </select>
                  
                  <select
                    id="expiryYear"
                    name="expiryYear"
                    value={formData.expiryYear}
                    onChange={handleChange}
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Yıl</option>
                    {years.map(year => (
                      <option key={year} value={year.toString().slice(-2)}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  maxLength={3}
                  placeholder="XXX"
                />
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
                    Varsayılan ödeme yöntemi olarak ayarla
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
                {editingCard ? 'Güncelle' : 'Kaydet'}
              </button>
            </div>
          </form>
        </div>
      ) : null}
      
      {/* Card List */}
      {cards.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-600 mb-4">Henüz kayıtlı ödeme yönteminiz bulunmuyor.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="border rounded-md p-4">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-800">{card.cardName}</h3>
                    {card.isDefault && (
                      <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        Varsayılan
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-2">
                    <CreditCard size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      **** **** **** {card.cardNumber.slice(-4)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {card.cardHolder} | Son Kullanma: {card.expiryMonth}/{card.expiryYear}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(card)}
                    className="p-2 text-gray-600 hover:text-blue-600"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(card.id)}
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

export default PaymentManagement; 