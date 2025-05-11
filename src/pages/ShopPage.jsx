import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ChevronDown, Search } from 'lucide-react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';

const ShopPage = () => {
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(queryParams.get('category') || '');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [location.search]);
  
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // Get category from URL if present
      const categoryParam = queryParams.get('category');
      
      const params = {};
      if (categoryParam) {
        params.category = categoryParam;
        setSelectedCategory(categoryParam);
      }
      
      const response = await productAPI.getProducts(params);
      // Ensure products is always an array
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Ürünler yüklenirken bir hata oluştu.');
      setProducts([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await productAPI.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    
    // Update URL with selected category
    if (category) {
      queryParams.set('category', category);
    } else {
      queryParams.delete('category');
    }
    
    history.push({
      pathname: location.pathname,
      search: queryParams.toString()
    });
  };
  
  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const applyFilters = () => {
    // Check if products is an array before filtering
    if (!Array.isArray(products)) {
      return [];
    }
    
    const filteredProducts = products.filter(product => {
      // Filter by price range
      const price = product.discountPrice || product.price;
      const minPrice = priceRange.min !== '' ? parseFloat(priceRange.min) : 0;
      const maxPrice = priceRange.max !== '' ? parseFloat(priceRange.max) : Infinity;
      
      const matchesPrice = price >= minPrice && price <= maxPrice;
      
      // Filter by search term
      const matchesSearch = searchTerm === '' || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesPrice && matchesSearch;
    });
    
    // Sort products
    let sortedProducts = [...filteredProducts];
    
    if (sortBy === 'price-asc') {
      sortedProducts.sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        return priceA - priceB;
      });
    } else if (sortBy === 'price-desc') {
      sortedProducts.sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        return priceB - priceA;
      });
    } else if (sortBy === 'name-asc') {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'name-desc') {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    return sortedProducts;
  };
  
  const filteredProducts = applyFilters();
  
  const resetFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortBy('');
    setSearchTerm('');
    
    // Reset URL params
    history.push({
      pathname: location.pathname
    });
  };
  
  return (
    <div className="pb-16">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Ürünlerimiz</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          En kaliteli ürünleri keşfedin ve alışverişin tadını çıkarın.
        </p>
      </div>
      
      {/* Filters and Search */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <button 
            className="flex items-center text-gray-700 hover:text-blue-600 mb-4 md:mb-0"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} className="mr-2" />
            <span>Filtrele</span>
            <ChevronDown size={16} className="ml-1" />
          </button>
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ürün ara..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800">Filtreler</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={resetFilters}
              >
                Filtreleri Temizle
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Kategoriler</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-all"
                      name="category"
                      checked={selectedCategory === ''}
                      onChange={() => handleCategoryChange('')}
                      className="h-4 w-4 text-blue-600 rounded-full"
                    />
                    <label htmlFor="category-all" className="ml-2 text-sm text-gray-700">
                      Tümü
                    </label>
                  </div>
                  
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category}`}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-blue-600 rounded-full"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700 capitalize">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Fiyat Aralığı</h4>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    name="min"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={handlePriceRangeChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    name="max"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={handlePriceRangeChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              {/* Sort By */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Sıralama</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Varsayılan</option>
                  <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                  <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                  <option value="name-asc">İsim: A-Z</option>
                  <option value="name-desc">İsim: Z-A</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        {/* Active Filters */}
        {(selectedCategory || priceRange.min || priceRange.max || sortBy || searchTerm) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCategory && (
              <div className="flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                <span>Kategori: {selectedCategory}</span>
                <button 
                  className="ml-1 text-blue-600 hover:text-blue-800"
                  onClick={() => handleCategoryChange('')}
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {(priceRange.min || priceRange.max) && (
              <div className="flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                <span>
                  Fiyat: 
                  {priceRange.min ? ` ${priceRange.min} TL` : ' 0 TL'} - 
                  {priceRange.max ? ` ${priceRange.max} TL` : ' ∞'}
                </span>
                <button 
                  className="ml-1 text-blue-600 hover:text-blue-800"
                  onClick={() => setPriceRange({ min: '', max: '' })}
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {sortBy && (
              <div className="flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                <span>
                  Sıralama: 
                  {sortBy === 'price-asc' && ' Fiyat: Düşükten Yükseğe'}
                  {sortBy === 'price-desc' && ' Fiyat: Yüksekten Düşüğe'}
                  {sortBy === 'name-asc' && ' İsim: A-Z'}
                  {sortBy === 'name-desc' && ' İsim: Z-A'}
                </span>
                <button 
                  className="ml-1 text-blue-600 hover:text-blue-800"
                  onClick={() => setSortBy('')}
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {searchTerm && (
              <div className="flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                <span>Arama: {searchTerm}</span>
                <button 
                  className="ml-1 text-blue-600 hover:text-blue-800"
                  onClick={() => setSearchTerm('')}
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Products Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl font-medium text-gray-800 mb-2">Ürün Bulunamadı</h2>
          <p className="text-gray-600">Lütfen farklı filtreler deneyiniz.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage; 