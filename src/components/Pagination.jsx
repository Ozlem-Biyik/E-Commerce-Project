import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className
}) => {
  // Sayfa numaralarını oluştur
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Max görünür sayfa sayısı
    
    if (totalPages <= maxVisiblePages) {
      // Toplam sayfa sayısı maxVisiblePages'den küçükse tüm sayfaları göster
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // İlk sayfayı her zaman göster
      pages.push(1);
      
      // Ortadaki sayfaları hesapla
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Toplam 3 sayfa gösterilecek şekilde ayarla
      if (endPage - startPage < 2) {
        if (startPage === 2) {
          endPage = Math.min(4, totalPages - 1);
        } else if (endPage === totalPages - 1) {
          startPage = Math.max(totalPages - 3, 2);
        }
      }
      
      // Eğer ilk sayfa ile startPage arasında boşluk varsa, üç nokta ekle
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Ortadaki sayfaları ekle
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Eğer endPage ile son sayfa arasında boşluk varsa, üç nokta ekle
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      // Son sayfayı her zaman göster
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex items-center justify-center mt-8 ${className}`}>
      {/* Önceki Sayfa Butonu */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center h-10 w-10 rounded-md mr-2 ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Önceki sayfa"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Sayfa Numaraları */}
      <div className="flex space-x-1">
        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center h-10 w-10 text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => goToPage(page)}
              className={`flex items-center justify-center h-10 w-10 rounded-md ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )
        ))}
      </div>

      {/* Sonraki Sayfa Butonu */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center h-10 w-10 rounded-md ml-2 ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Sonraki sayfa"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination; 