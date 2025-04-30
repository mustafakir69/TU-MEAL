import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import * as Notifications from 'expo-notifications';
import { registerForPushNotifications } from './src/services/notification';
import * as Device from 'expo-device';
import { LogBox } from 'react-native';

// Expo Go'daki bildirim uyarılarını gizle
LogBox.ignoreLogs([
  'expo-notifications',
  'Push notifications',
  'notifications functionality is not fully supported',
]);

// Configure notifications - sadece geliştirme modunda kullanılacak
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Sadece fiziksel cihazlarda bildirim kur
    if (Device.isDevice) {
      setupNotifications();
    } else {
      console.log('Bildirimler simülatörde tam olarak çalışmaz.');
    }

    // Temizleme işlemi
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  // Bildirimleri yapılandır
  const setupNotifications = async () => {
    try {
      // Bildirim izinlerini kaydet
      await registerForPushNotifications();

      // Gelen bildirimleri dinle
      notificationListener.current = Notifications.addNotificationReceivedListener(
        notification => {
          console.log('Bildirim alındı:', notification);
        }
      );

      // Bildirime tıklanınca tepkiyi dinle
      responseListener.current = Notifications.addNotificationResponseReceivedListener(
        response => {
          console.log('Bildirime yanıt:', response);
          // Burada bildirime tıklandığında yapılacak işlemler ayarlanabilir
        }
      );
    } catch (error) {
      console.log('Bildirim kurulumu sırasında hata:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AuthProvider>
          <StatusBar style="auto" />
          <AppNavigator />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
