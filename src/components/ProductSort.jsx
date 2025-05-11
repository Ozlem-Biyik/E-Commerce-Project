import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const ProductSort = ({ onSortChange, currentSort, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { id: 'featured', name: 'Öne Çıkanlar' },
    { id: 'newest', name: 'En Yeniler' },
    { id: 'price-low', name: 'Fiyat: Düşükten Yükseğe' },
    { id: 'price-high', name: 'Fiyat: Yüksekten Düşüğe' },
    { id: 'rating', name: 'Müşteri Değerlendirmesi' }
  ];

  const handleSortChange = (sortId) => {
    onSortChange(sortId);
    setIsOpen(false);
  };

  // Mevcut sıralama seçeneğinin adını bul
  const currentSortName = sortOptions.find(opt => opt.id === currentSort)?.name || 'Öne Çıkanlar';

  return (
    <div className={`relative ${className}`}>
      <button 
        className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm text-gray-700">
          Sırala: <span className="font-medium">{currentSortName}</span>
        </span>
        <ChevronDown size={16} className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-60 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 overflow-hidden">
            {sortOptions.map((option) => (
              <div
                key={option.id}
                className={`flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  currentSort === option.id ? 'bg-gray-50' : ''
                }`}
                onClick={() => handleSortChange(option.id)}
              >
                <span className="flex-grow">{option.name}</span>
                {currentSort === option.id && <Check size={16} className="text-blue-500" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSort; 