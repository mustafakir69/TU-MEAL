Trakya Üniversitesi Yemekhane Uygulaması - PRD (React Native Expo)
🎯 Amaç
Trakya Üniversitesi öğrencilerinin mobil cihazlarından günlük ve haftalık yemekhane menüsünü görüntülemesini sağlamak

Yemeklere yorum ve puan verme imkânı sunmak

Öğrencilerin favori yemekleri takip edebilmesine olanak tanımak

Giriş yapan kullanıcıların profil bilgilerini görüntüleyip düzenleyebilmesi

✅ Yapıldı
Backend API'leri hazır (kayıt, giriş, yemek verisi, yorumlama, favori listeleme)

Expo tabanlı frontend projesi native-frontend/ klasörü altında kuruldu

Navigasyon sistemi yapılandırıldı (React Navigation)

🔧 Yapılacak
API servis katmanı kurulacak (axios entegrasyonu)

AuthContext ile global oturum yönetimi geliştirilecek

Login ve Register ekranları yapılacak

Home ekranı (günlük yemek listesi) geliştirilecek

Yemek detay ekranı (yorum, puanlama) yapılacak

Favori yemek ekranı (haftalık en çok beğenilenler) oluşturulacak

Profil ekranı ve kullanıcı ayar ekranı geliştirilecek

Kullanıcı akışları ve bileşen testleri yapılacak

Expo üzerinden test build oluşturulacak

⚙️ Teknolojik Gereksinimler
Frontend: React Native (Expo)

Backend: Mevcut REST API (backend/ klasöründe)

Veri İletişimi: Axios

Navigasyon: React Navigation

UI Kit: Native Base veya React Native Paper

Durum Yönetimi: useState + Context API

📂 Proje Klasör Yapısı
Frontend: native-frontend/ (React Native - Expo)

Backend: backend/ (mevcut, gerekirse güncellenecek)

🧱 Ekran Listesi
LoginScreen.js → Giriş ekranı

RegisterScreen.js → Kayıt ekranı

HomeScreen.js → Günlük yemek listesi + tarih seçici

MealDetailScreen.js → Seçilen yemeğin detayları, yorumlar ve puanlama

FavoritesScreen.js → Haftalık en çok puan alan yemekler

ProfileScreen.js → Kullanıcı bilgileri ve düzenleme

SettingsScreen.js → Şifre değiştirme, çıkış yapma

# Trakya Üniversitesi Yemekhane Uygulaması

Bu mobil uygulama, Trakya Üniversitesi öğrencileri ve personeli için geliştirilmiş bir yemekhane bilgi ve takip sistemidir.

## Özellikler

- Günlük yemek menüsünü görüntüleme
- Yemek detaylarını (içerik, besin değerleri, fotoğraf) görüntüleme
- Yemekleri puanlama ve yorum yapma
- Favori yemekleri kaydetme
- Bildirimler alma (günlük menü, favori yemekler vb.)
- Hesap yönetimi

## Kullanım

### Giriş Yapma

Uygulamaya iki şekilde giriş yapabilirsiniz:

1. **Hızlı Giriş**: Ana giriş ekranındaki "Hızlı Giriş Yap" butonuna tıklayarak herhangi bir kullanıcı adı veya şifre girişi yapmadan doğrudan test kullanıcısı ile uygulamaya girebilirsiniz. Bu özellik geliştirme ve test süreçleri için eklenmiştir.

2. **Normal Giriş**: E-posta ve şifrenizi girerek normal şekilde giriş yapabilirsiniz.

### Ana Ekran

Ana ekranda günlere göre yemek menüleri listelenir. Menüleri görmek için aşağı kaydırabilirsiniz. Her bir menü kartında:

- Tarih
- Çorba
- Ana Yemek
- Pilav/Makarna
- Tatlı/İçecek
- Toplam Kalori
- Ortalama Puan

bilgileri yer alır.

### Detay Ekranı

Herhangi bir menü kartına tıklayarak ilgili günün detaylarını görebilirsiniz. Detay ekranında:

- Menü içeriği
- Besin değerleri
- Puanlama seçeneği
- Yorum yapma seçeneği

bulunur.

### Bildirimler

Uygulama, kullanıcıların tercihlerine göre şu bildirimler gönderebilir:

- Günlük menü bildirimleri
- Favori yemek bildirimleri
- Özel menü bildirimleri

Bildirim ayarlarını Profil > Bildirim Ayarları menüsünden yönetebilirsiniz.

### Çıkış Yapma

Uygulamadan çıkış yapmak için Profil ekranının en altındaki "Çıkış Yap" butonunu kullanabilirsiniz. Çıkış yaptığınızda giriş ekranına yönlendirilirsiniz.

## Teknik Detaylar

- React Native Expo ile geliştirilmiştir
- React Navigation ile sayfa geçişleri sağlanmıştır
- React Native Paper UI kütüphanesi kullanılmıştır
- Axios ile API istekleri yönetilmiştir
- AsyncStorage ile yerel veri depolama yapılmıştır
- Expo Notifications ile bildirim altyapısı kurulmuştur

## Geliştirme Modu

Geliştirme sırasında test verisi kullanılmıştır. Gerçek API entegrasyonu için src/services/api.js dosyasını düzenleyin.

### Hızlı Test

Hızlı giriş ile test kullanıcısı olarak uygulamaya giriş yapabilir ve tüm özellikleri test edebilirsiniz. Bu kullanıcının bilgileri şunlardır:

- E-posta: test@example.com
- Şifre: test123 (Hızlı giriş butonunu kullanırsanız bu bilgileri girmeniz gerekmez)

## Gelecek Özellikler

- Haftalık ve aylık menü görünümü
- Kişiselleştirilmiş yemek önerileri
- Kalori takip sistemi
- Diyete özel filtreleme