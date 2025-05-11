import React, { useState } from 'react';
import { Sliders, ChevronDown, ChevronUp, Check } from 'lucide-react';

const ProductFilter = ({ 
  onFilterChange,
  filters,
  onReset,
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);

  const categories = [
    { id: 'electronics', name: 'Elektronik' },
    { id: 'fashion', name: 'Moda' },
    { id: 'home', name: 'Ev & Yaşam' },
    { id: 'beauty', name: 'Kozmetik' },
    { id: 'books', name: 'Kitaplar' },
  ];

  const priceRanges = [
    { id: 'under100', name: '0 - 100 TL' },
    { id: '100to500', name: '100 - 500 TL' },
    { id: '500to1000', name: '500 - 1.000 TL' },
    { id: '1000to5000', name: '1.000 - 5.000 TL' },
    { id: 'over5000', name: '5.000 TL ve üzeri' },
  ];

  const ratings = [
    { id: '4up', name: '4 yıldız ve üzeri' },
    { id: '3up', name: '3 yıldız ve üzeri' },
    { id: '2up', name: '2 yıldız ve üzeri' },
    { id: '1up', name: '1 yıldız ve üzeri' },
  ];

  const handleFilterChange = (type, id) => {
    let newFilters = { ...filters };
    
    if (type === 'category') {
      if (newFilters.categories?.includes(id)) {
        // Remove from filter if already selected
        newFilters.categories = newFilters.categories.filter(catId => catId !== id);
      } else {
        // Add to filter
        newFilters.categories = [...(newFilters.categories || []), id];
      }
    } else if (type === 'price') {
      newFilters.priceRange = id;
    } else if (type === 'rating') {
      newFilters.rating = id;
    }
    
    onFilterChange(newFilters);
  };

  const toggleMobileFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      {/* Mobile Filter Button */}
      <div className="flex items-center justify-between p-4 md:hidden border-b">
        <h3 className="font-medium text-gray-800 flex items-center">
          <Sliders size={18} className="mr-2" /> Filtreler
        </h3>
        <button
          onClick={toggleMobileFilters}
          className="text-gray-500 hover:text-gray-800"
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Filter Content - Hidden on mobile unless open */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block p-4`}>
        {/* Reset Filters Button */}
        <button
          onClick={onReset}
          className="w-full py-2 px-3 mb-4 text-sm text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-md transition-colors"
        >
          Filtreleri Sıfırla
        </button>

        {/* Categories */}
        <div className="mb-6">
          <div 
            className="flex justify-between items-center mb-2 cursor-pointer" 
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            <h4 className="font-medium text-gray-800">Kategoriler</h4>
            {categoryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          
          {categoryOpen && (
            <div className="space-y-2 ml-1">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                  <div className={`w-4 h-4 border rounded flex items-center justify-center ${
                    filters.categories?.includes(category.id) 
                      ? 'bg-blue-500 border-blue-500' 
                      : 'border-gray-300'
                  }`}>
                    {filters.categories?.includes(category.id) && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <span 
                    className="text-sm text-gray-600"
                    onClick={() => handleFilterChange('category', category.id)}
                  >
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <div 
            className="flex justify-between items-center mb-2 cursor-pointer" 
            onClick={() => setPriceOpen(!priceOpen)}
          >
            <h4 className="font-medium text-gray-800">Fiyat Aralığı</h4>
            {priceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          
          {priceOpen && (
            <div className="space-y-2 ml-1">
              {priceRanges.map((range) => (
                <label key={range.id} className="flex items-center space-x-2 cursor-pointer">
                  <div className={`w-4 h-4 rounded-full border ${
                    filters.priceRange === range.id 
                      ? 'border-4 border-blue-500' 
                      : 'border-gray-300'
                  }`} />
                  <span 
                    className="text-sm text-gray-600"
                    onClick={() => handleFilterChange('price', range.id)}
                  >
                    {range.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="mb-4">
          <div 
            className="flex justify-between items-center mb-2 cursor-pointer" 
            onClick={() => setRatingOpen(!ratingOpen)}
          >
            <h4 className="font-medium text-gray-800">Müşteri Puanı</h4>
            {ratingOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          
          {ratingOpen && (
            <div className="space-y-2 ml-1">
              {ratings.map((rating) => (
                <label key={rating.id} className="flex items-center space-x-2 cursor-pointer">
                  <div className={`w-4 h-4 rounded-full border ${
                    filters.rating === rating.id 
                      ? 'border-4 border-blue-500' 
                      : 'border-gray-300'
                  }`} />
                  <span 
                    className="text-sm text-gray-600"
                    onClick={() => handleFilterChange('rating', rating.id)}
                  >
                    {rating.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter; 