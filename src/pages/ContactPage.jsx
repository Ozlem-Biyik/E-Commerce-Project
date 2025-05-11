import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="pb-16">
      {/* Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center text-sm text-gray-500">
          <a href="/" className="hover:text-blue-600">Ana Sayfa</a>
          <span className="mx-2">/</span>
          <span className="text-gray-800">İletişim</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Bizimle İletişime Geçin</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşın. En kısa sürede size dönüş yapacağız.
        </p>
      </div>

      {/* Contact Info Cards - Mobile: Stack, Desktop: Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Phone className="text-blue-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Telefon</h3>
          <p className="text-gray-600">+90 (212) 123 45 67</p>
          <p className="text-gray-600">Pazartesi - Cuma: 09:00 - 18:00</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="text-blue-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">E-posta</h3>
          <p className="text-gray-600">info@ecommerce.com</p>
          <p className="text-gray-600">support@ecommerce.com</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <MapPin className="text-blue-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Adres</h3>
          <p className="text-gray-600">Atatürk Bulvarı No:123</p>
          <p className="text-gray-600">34000 İstanbul, Türkiye</p>
        </div>
      </div>

      {/* Contact Form and Map - Mobile: Stack, Desktop: Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Bize Mesaj Gönderin</h2>
          
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
              Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Adınız Soyadınız
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Adınız Soyadınız"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta Adresiniz
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Konu
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Mesajınızın konusu"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mesajınız
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Mesajınızı buraya yazın..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center justify-center transition-colors duration-300"
            >
              {isSubmitting ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : (
                <Send size={18} className="mr-2" />
              )}
              {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
            </button>
          </form>
        </div>
        
        {/* Map */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Konum</h2>
          <div className="w-full h-80 bg-gray-200 rounded-md overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96314.99036721453!2d28.93726971082335!3d41.01079583653847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1650123456789!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mağaza Konumu"
            ></iframe>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-lg mb-2">Çalışma Saatleri</h3>
            <ul className="space-y-1 text-gray-600">
              <li className="flex justify-between">
                <span>Pazartesi - Cuma:</span>
                <span>09:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Cumartesi:</span>
                <span>10:00 - 16:00</span>
              </li>
              <li className="flex justify-between">
                <span>Pazar:</span>
                <span>Kapalı</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 