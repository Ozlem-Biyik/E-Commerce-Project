# E-Commerce Projesi

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş bir e-ticaret uygulamasıdır.

## Görev Durumu

- ✅ T01: Project Setup - Tamamlandı
- ✅ T02: Home Page Figma Designs - Tamamlandı
- ✅ T03: Shop Page - Tamamlandı
- ✅ T04: Product Detail Page - Tamamlandı
- ✅ T05: Contact Page - Tamamlandı
- ✅ T06: Team Page - Tamamlandı
- ✅ T07: About Us Page - Tamamlandı
- ✅ T08: Sign Up User Form Page - Tamamlandı
- ✅ T09: Initialize Redux, Reducers with Action Creators - Tamamlandı
- ✅ T10: Login Form - Tamamlandı
- ✅ T11: Auto login by token from localStorage - Tamamlandı
- ✅ T12: Shopping Cart Page - Tamamlandı
- ✅ T13: Add to Cart Functionality - Tamamlandı
- ✅ T14: Cart Counter in Header - Tamamlandı
- ✅ T15: Cart Item Management (Add/Remove/Update) - Tamamlandı
- ✅ T16: Checkout Page - Tamamlandı
- ✅ T17: Payment Integration - Tamamlandı
- ✅ T18: Order History Page - Tamamlandı
- ✅ T19: User Profile Page - Tamamlandı
- ✅ T20: Product Reviews and Ratings - Tamamlandı
- ✅ T21: Wishlist Functionality - Tamamlandı
- ✅ T22: Search Functionality - Tamamlandı
- ✅ T23: Filter Products by Category - Tamamlandı

## Kullanılan Teknolojiler

- React (Vite ile)
- Redux & Redux Thunk
- React Router v5
- Tailwind CSS
- Axios
- React Hook Form
- MD5 (Gravatar için)
- React Toastify
- Lucide React (İkon Kütüphanesi)

## Kurulum

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

## Yapı

- `/src`: Kaynak kodların bulunduğu ana dizin
  - `/components`: Yeniden kullanılabilir bileşenler
  - `/layout`: Layout bileşenleri (Header, Footer, PageContent)
  - `/pages`: Uygulama sayfaları
  - `/store`: Redux store, reducer ve action'lar
    - `/reducers`: Redux reducer'ları
    - `/actions`: Redux action'ları ve thunk'lar
  - `/services`: API ve diğer servisler
  - `/utils`: Yardımcı fonksiyonlar

## API Entegrasyonu

Proje, https://workintech-fe-ecommerce.onrender.com API'si ile entegre edilmiştir. API istekleri için Axios kullanılmaktadır.

## Özellikler

- Responsive tasarım (mobil ve masaüstü uyumlu)
- Kullanıcı kaydı ve girişi
- Ürün listeleme ve filtreleme
- Ürün detay sayfası
- Sepet yönetimi
- Token tabanlı kimlik doğrulama
- Ödeme sayfası ve ödeme entegrasyonu (Kredi Kartı ve 3D Secure)
- Kullanıcı profil yönetimi
- Sipariş geçmişi
- Kategoriye göre ürün filtreleme
- Fiyat aralığına göre filtreleme
- Ürün arama ve sıralama
- Ürün değerlendirme ve puanlama sistemi
- Favorilere ekleme ve favori ürünleri görüntüleme

## Dağıtım

Uygulama Vercel, Netlify veya Render üzerinde dağıtılabilir.