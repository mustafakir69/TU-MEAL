import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Register for push notifications
export const registerForPushNotifications = async () => {
  let token;
  
  // Sadece fiziksel cihazlarda çalışacak şekilde düzenleme
  if (!Device.isDevice) {
    console.log('Fiziksel bir cihaz gereklidir. Bildirimler simülatör/emülatörde çalışmayabilir.');
    return null;
  }
  
  try {
    // Android için bildirim kanalı oluşturma
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Varsayılan',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7F',
        sound: true,
        enableVibrate: true,
        showBadge: true,
      });
    }
    
    // İzinleri kontrol etme
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Bildirim izni alınamadı!');
      return null;
    }
    
    // Expo Go'da gerçek push bildirimleri çalışmayabilir
    try {
      const expoPushToken = await Notifications.getExpoPushTokenAsync({
        experienceId: '@anonymous/temp-app',
      });
      token = expoPushToken.data;
      await AsyncStorage.setItem('pushToken', token);
    } catch (error) {
      console.log('Push token alınamadı', error);
      console.log('Geliştirme modunda lokalde test bildirimleri kullanılacak');
    }

    return token;
  } catch (error) {
    console.error('Bildirim kayıt hatası:', error);
    return null;
  }
};

// Schedule a local notification
export const scheduleLocalNotification = async (title, body, data = {}, seconds = 5) => {
  try {
    // Bildirim izni kontrol et
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus !== 'granted') {
      console.log('Bildirim izni yok, bildirim gösterilmeyecek');
      return;
    }
    
    // Yerel bildirim gönder (push yerine)
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
        priority: Notifications.AndroidImportance.HIGH,
      },
      trigger: { seconds },
    });
    
    console.log('Bildirim planlandı:', id);
    return id;
  } catch (error) {
    console.error('Bildirim gönderilemedi:', error);
    return null;
  }
};

// Send a notification for the daily menu
export const notifyDailyMenu = async (menuDate) => {
  const formattedDate = new Date(menuDate).toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  
  return await scheduleLocalNotification(
    'Günlük Menü Hazır!',
    `${formattedDate} tarihi için yemek menüsü yayınlandı.`,
    { screen: 'Home' }
  );
};

// Set up notification listener
export const setupNotificationListener = (navigation) => {
  try {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Bildirim tıklandı:', response);
      const { screen } = response.notification.request.content.data;
      if (screen) {
        navigation.navigate(screen);
      }
    });
    
    return subscription;
  } catch (error) {
    console.log('Bildirim dinleyicisi kurulurken hata:', error);
    return null;
  }
};

// Save notification preferences
export const saveNotificationPreferences = async (preferences) => {
  try {
    await AsyncStorage.setItem('notificationPreferences', JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error('Bildirim ayarları kaydedilemedi:', error);
    return false;
  }
};

// Get notification preferences
export const getNotificationPreferences = async () => {
  try {
    const prefs = await AsyncStorage.getItem('notificationPreferences');
    return prefs ? JSON.parse(prefs) : {
      dailyMenu: true,
      favorites: true,
      specialMeals: true
    };
  } catch (error) {
    console.error('Bildirim ayarları okunamadı:', error);
    return {
      dailyMenu: true,
      favorites: true,
      specialMeals: true
    };
  }
}; 