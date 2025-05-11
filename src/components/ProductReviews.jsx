import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, User } from 'lucide-react';
import { addReview, setReviews } from '../store/reducers/productReducer';
import { toast } from 'react-toastify';

const ProductReviews = ({ productId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.client);
  const { reviews } = useSelector(state => state.product);
  
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get product reviews
  const productReviews = reviews[productId] || [];

  // Calculate average rating
  const averageRating = productReviews.length > 0
    ? (productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length).toFixed(1)
    : 0;

  // Mock data for reviews if none exist
  useEffect(() => {
    if (!productReviews.length) {
      const mockReviews = [
        {
          id: 1,
          userId: 'user1',
          userName: 'Ahmet Yılmaz',
          rating: 5,
          comment: 'Harika bir ürün, çok memnun kaldım. Hızlı kargo ve kaliteli paketleme için teşekkürler!',
          date: '2023-05-15T14:30:00Z'
        },
        {
          id: 2,
          userId: 'user2',
          userName: 'Ayşe Demir',
          rating: 4,
          comment: 'Genel olarak iyi bir ürün, beklentilerimi karşıladı. Sadece rengi fotoğraftakinden biraz farklı.',
          date: '2023-06-20T09:15:00Z'
        },
        {
          id: 3,
          userId: 'user3',
          userName: 'Mehmet Kaya',
          rating: 5,
          comment: 'Fiyat/performans açısından mükemmel! Kesinlikle tavsiye ederim.',
          date: '2023-07-05T16:45:00Z'
        }
      ];
      dispatch(setReviews(productId, mockReviews));
    }
  }, [dispatch, productId, productReviews.length]);

  const handleRatingChange = (rating) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleCommentChange = (e) => {
    setNewReview(prev => ({ ...prev, comment: e.target.value }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Değerlendirme yapmak için giriş yapmalısınız.');
      return;
    }
    
    if (!newReview.comment.trim()) {
      toast.error('Lütfen bir yorum yazınız.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Create review object
    const review = {
      id: Date.now(),
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString()
    };
    
    // In a real app, we would send this to the API
    // For now, we'll just add it to the Redux store
    setTimeout(() => {
      dispatch(addReview(productId, review));
      setNewReview({ rating: 5, comment: '' });
      setIsSubmitting(false);
      toast.success('Değerlendirmeniz başarıyla eklendi.');
    }, 800);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Müşteri Değerlendirmeleri</h2>
      
      {/* Değerlendirme Özeti */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-center">
          {/* Ortalama Puan */}
          <div className="flex flex-col items-center mb-6 md:mb-0 md:mr-12">
            <div className="text-5xl font-bold text-gray-800 mb-2">{averageRating}</div>
            <div className="flex mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={20} 
                  className={star <= Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">{productReviews.length} değerlendirme</div>
          </div>
          
          {/* Yıldız Dağılımı */}
          <div className="flex-1 w-full">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = productReviews.filter(review => Math.floor(review.rating) === star).length;
              const percentage = productReviews.length ? (count / productReviews.length) * 100 : 0;
              
              return (
                <div key={star} className="flex items-center mb-1">
                  <div className="flex items-center w-12">
                    <span className="text-sm text-gray-600 mr-1">{star}</span>
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="flex-1 h-3 mx-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-10 text-xs text-gray-500">{count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Yorum Yapma Formu */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Değerlendirme Yap</h3>
        
        <form onSubmit={handleSubmitReview}>
          {/* Yıldız Seçimi */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Puanınız</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none mr-1"
                >
                  <Star 
                    size={24} 
                    className={star <= newReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Yorum Yazma */}
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Yorumunuz
            </label>
            <textarea
              id="comment"
              rows="4"
              value={newReview.comment}
              onChange={handleCommentChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Bu ürün hakkında düşüncelerinizi paylaşın..."
            ></textarea>
          </div>
          
          {/* Gönder Butonu */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300 disabled:bg-blue-400"
          >
            {isSubmitting ? 'Gönderiliyor...' : 'Değerlendirme Gönder'}
          </button>
        </form>
      </div>
      
      {/* Yorumlar Listesi */}
      <div className="space-y-6">
        {productReviews.map(review => (
          <div key={review.id} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start">
              {/* Kullanıcı Avatarı */}
              <div className="mr-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  <User size={20} />
                </div>
              </div>
              
              {/* Yorum İçeriği */}
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <h4 className="font-medium text-gray-800 mr-2">{review.userName}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                
                {/* Yıldızlar */}
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={16} 
                      className={star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                
                {/* Yorum */}
                <p className="text-gray-600">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews; 