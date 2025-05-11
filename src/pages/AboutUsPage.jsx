import React from 'react';
import { ShoppingBag, Users, Truck, HeartHandshake, Award, Smile } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="pb-16">
      {/* Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center text-sm text-gray-500">
          <a href="/" className="hover:text-blue-600">Ana Sayfa</a>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Hakkımızda</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative mb-16">
        <div className="h-64 md:h-80 lg:h-96 w-full bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Hakkımızda</h1>
            <p className="text-lg md:text-xl text-white max-w-2xl">
              2010 yılından beri müşterilerimize en kaliteli ürünleri en uygun fiyatlarla sunuyoruz.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="mb-16">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Hikayemiz</h2>
            <p className="text-gray-600 mb-4">
              Şirketimiz, 2010 yılında e-ticaret dünyasında müşteri odaklı ve kaliteli hizmet sunma vizyonuyla kuruldu. 
              Başlangıçta küçük bir ekiple yola çıktık, ancak müşterilerimizin güveni ve desteğiyle hızla büyüdük.
            </p>
            <p className="text-gray-600 mb-4">
              İlk günden bu yana amacımız, müşterilerimize en iyi alışveriş deneyimini sunmak ve onların ihtiyaçlarına 
              en uygun çözümleri üretmek oldu. Teknolojinin hızla geliştiği bu dönemde, biz de kendimizi sürekli 
              yenileyerek en güncel e-ticaret çözümlerini sunmaya devam ediyoruz.
            </p>
            <p className="text-gray-600">
              Bugün, 50'den fazla çalışanımız ve binlerce müşterimizle Türkiye'nin önde gelen e-ticaret platformlarından 
              biri olmaktan gurur duyuyoruz. Müşteri memnuniyeti odaklı yaklaşımımız ve kaliteli ürün yelpazemizle 
              sektörde fark yaratmaya devam ediyoruz.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
              alt="Ekibimiz çalışırken" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Değerlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Users className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Müşteri Odaklılık</h3>
            <p className="text-gray-600">
              Müşterilerimizin ihtiyaçlarını anlamak ve onlara en iyi hizmeti sunmak için çalışıyoruz.
              Her kararımızda müşteri memnuniyetini ön planda tutuyoruz.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Award className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Kalite</h3>
            <p className="text-gray-600">
              Sunduğumuz her ürün ve hizmette en yüksek kalite standartlarını sağlamak için çalışıyoruz.
              Kaliteden asla ödün vermiyoruz.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <HeartHandshake className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Güven</h3>
            <p className="text-gray-600">
              Müşterilerimizle ve iş ortaklarımızla kurduğumuz ilişkilerde dürüstlük ve şeffaflık 
              ilkelerini benimsiyoruz. Güven bizim için en değerli varlıktır.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Truck className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Hızlı Teslimat</h3>
            <p className="text-gray-600">
              Siparişlerinizin en kısa sürede ve güvenli bir şekilde elinize ulaşması için 
              lojistik süreçlerimizi sürekli iyileştiriyoruz.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Geniş Ürün Yelpazesi</h3>
            <p className="text-gray-600">
              Farklı ihtiyaç ve bütçelere uygun geniş bir ürün yelpazesi sunarak, 
              her müşterimizin ihtiyacına çözüm üretiyoruz.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Smile className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Müşteri Memnuniyeti</h3>
            <p className="text-gray-600">
              Satış öncesi ve sonrası sunduğumuz hizmetlerle müşteri memnuniyetini en üst düzeyde tutmayı hedefliyoruz.
            </p>
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Kilometre Taşlarımız</h2>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-blue-200"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12">
            <div className="relative">
              <div className="ml-12 md:ml-0 md:flex md:items-center">
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                <div className="md:w-1/2 md:pr-8 md:text-right md:mr-4">
                  <h3 className="text-lg font-semibold text-gray-800">2010</h3>
                  <p className="text-gray-600">Şirketimizin kuruluşu</p>
                </div>
                <div className="hidden md:block md:w-1/2 md:pl-8 md:ml-4"></div>
              </div>
            </div>
            
            <div className="relative">
              <div className="ml-12 md:ml-0 md:flex md:items-center">
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                <div className="md:w-1/2 md:pl-8 md:ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">2013</h3>
                  <p className="text-gray-600">İlk mağazamızın açılışı</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="ml-12 md:ml-0 md:flex md:items-center">
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                <div className="md:w-1/2 md:pr-8 md:text-right md:mr-4">
                  <h3 className="text-lg font-semibold text-gray-800">2016</h3>
                  <p className="text-gray-600">10.000 müşteri sayısına ulaştık</p>
                </div>
                <div className="hidden md:block md:w-1/2 md:pl-8 md:ml-4"></div>
              </div>
            </div>
            
            <div className="relative">
              <div className="ml-12 md:ml-0 md:flex md:items-center">
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                <div className="md:w-1/2 md:pl-8 md:ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">2019</h3>
                  <p className="text-gray-600">Yeni e-ticaret platformumuzun lansmanı</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="ml-12 md:ml-0 md:flex md:items-center">
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                <div className="md:w-1/2 md:pr-8 md:text-right md:mr-4">
                  <h3 className="text-lg font-semibold text-gray-800">2022</h3>
                  <p className="text-gray-600">Uluslararası pazara açılma</p>
                </div>
                <div className="hidden md:block md:w-1/2 md:pl-8 md:ml-4"></div>
              </div>
            </div>
            
            <div className="relative">
              <div className="ml-12 md:ml-0 md:flex md:items-center">
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                <div className="md:w-1/2 md:pl-8 md:ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">2024</h3>
                  <p className="text-gray-600">Yeni mobil uygulamamızın lansmanı</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bizimle Çalışmak İster misiniz?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Müşteri memnuniyeti odaklı yaklaşımımız ve kaliteli ürün yelpazemizle sektörde fark yaratmaya devam ediyoruz.
          Siz de bu yolculukta bizimle birlikte olmak isterseniz, hemen iletişime geçin.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="/contact" 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300"
          >
            İletişime Geçin
          </a>
          <a 
            href="/team" 
            className="px-6 py-3 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-md transition-colors duration-300"
          >
            Ekibimizi Tanıyın
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage; 