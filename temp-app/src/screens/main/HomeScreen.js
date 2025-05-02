import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import { Paragraph, Text, Card, Divider, Title } from 'react-native-paper';
import { mealService } from '../../services/api';
import { notifyDailyMenu, getNotificationPreferences } from '../../services/notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../styles/screens/HomeScreenStyles';
import AppLayout from '../../components/layout/AppLayout';

// TEST AMAÇLI: Sahte yemek verileri
const MOCK_MEALS = [
  {
    id: 1,
    date: "2025-04-28",
    mealName: {
      corba: "Köylüm Çorba",
      anaYemek: "Etli Nohut",
      yardimci: "Pirinç Pilavı",
      ekstra: "Ayran"
    },
    calories: 998,
    avarageRating: 4.2,
    description: 'Geleneksel Türk mutfağından lezzetli ve besleyici yemekler.'
  },
  {
    id: 2,
    date: "2025-04-29",
    mealName: {
      corba: "Ezogelin Çorbası",
      anaYemek: "Tavuk Sote",
      yardimci: "Bulgur Pilavı",
      ekstra: "Sütlaç"
    },
    calories: 1050,
    avarageRating: 4.5,
    description: 'Lezzetli tavuk sote ve yanında nefis bulgur pilavı.'
  },
  {
    id: 3,
    date: "2025-04-30",
    mealName: {
      corba: "Yayla Çorbası",
      anaYemek: "Kuru Fasulye",
      yardimci: "Pirinç Pilavı",
      ekstra: "Baklava"
    },
    calories: 1200,
    avarageRating: 4.8,
    description: 'Geleneksel Türk mutfağının vazgeçilmezi kuru fasulye ve pilav.'
  },
  {
    id: 4,
    date: "2025-05-01",
    mealName: {
      corba: "Domates Çorbası",
      anaYemek: "İzmir Köfte",
      yardimci: "Şehriyeli Pirinç Pilavı",
      ekstra: "Kemalpaşa Tatlısı"
    },
    calories: 1150,
    avarageRating: 4.4,
    description: 'Nefis İzmir köfte ve yanında lezzetli pilav.'
  },
  {
    id: 5,
    date: "2025-05-02",
    mealName: {
      corba: "Mercimek Çorbası",
      anaYemek: "Mantı",
      yardimci: "Bulgur Pilavı",
      ekstra: "Kadayıf"
    },
    calories: 1100,
    avarageRating: 4.7,
    description: 'El yapımı mantı ve yanında bulgur pilavı.'
  }
];

const HomeScreen = ({ navigation }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    // Load notification preferences
    loadNotificationPrefs();
    
    // TEST AMAÇLI: Gerçek API çağrısı yerine sahte veri kullanıyoruz
    fetchMockMeals();
    // Gerçek API çağrısı için:
    // fetchMeals();
  }, []);

  const loadNotificationPrefs = async () => {
    try {
      const prefs = await getNotificationPreferences();
      setNotificationsEnabled(prefs.dailyMenu);
    } catch (error) {
      console.error('Error loading notification preferences:', error);
    }
  };

  // TEST AMAÇLI: Sahte veri yükleme fonksiyonu
  const fetchMockMeals = async () => {
    // API çağrısını simüle etmek için kısa bir gecikme ekliyoruz
    setTimeout(() => {
      setMeals(MOCK_MEALS);
      setLoading(false);
      setRefreshing(false);
      
      // Check if we should send a notification and haven't already sent one today
      checkAndSendNotification();
    }, 500);
  };

  // Check if we should send a notification
  const checkAndSendNotification = async () => {
    try {
      if (!notificationsEnabled) return;
      
      const today = new Date().toISOString().split('T')[0];
      const lastNotificationDate = await AsyncStorage.getItem('lastMenuNotificationDate');
      
      // Only send notification if we haven't sent one today
      if (lastNotificationDate !== today) {
        console.log('Günlük menü bildirimi gönderiliyor...');
        const notificationId = await notifyDailyMenu(new Date());
        
        if (notificationId) {
          console.log('Bildirim başarıyla gönderildi, ID:', notificationId);
          await AsyncStorage.setItem('lastMenuNotificationDate', today);
        } else {
          console.log('Bildirim gönderilemedi');
        }
      } else {
        console.log('Bildirim zaten bugün gönderilmiş, tekrar gönderilmeyecek.');
      }
    } catch (error) {
      console.error('Bildirim gönderirken hata:', error);
    }
  };

  // Gerçek API çağrısı
  const fetchMeals = async () => {
    try {
      setLoading(true);
      const response = await mealService.getDailyMeals();
      setMeals(response.data.meals || []);
      
      // Check if we should send a notification
      checkAndSendNotification();
    } catch (error) {
      console.error('Error fetching meals:', error);
      Alert.alert('Hata', 'Yemek listesi alınırken bir hata oluştu.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    // TEST AMAÇLI: Sahte veri için
    fetchMockMeals();
    // Gerçek API çağrısı için:
    // fetchMeals();
  };

  const handleMealPress = (meal) => {
    navigation.navigate('MealDetail', { mealId: meal.id, meal: meal }); 
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderMealCard = ({ item }) => {
    const meal = item;
    return (
      <TouchableOpacity onPress={() => handleMealPress(meal)}>
        <Card style={styles.mealCard}>
          <Card.Content>
            <View style={styles.dateRow}>
              <MaterialCommunityIcons name="calendar" size={22} color="#2196F3" />
              <Title style={styles.dateText}>{formatDate(meal.date)}</Title>
            </View>
            
            <Divider style={styles.divider} />
            
            <View style={styles.mealRow}>
              <MaterialCommunityIcons name="bowl" size={20} color="#FF9800" />
              <Text style={styles.mealType}>Çorba:</Text>
              <Text style={styles.mealName}>{meal.mealName.corba}</Text>
            </View>
            
            <View style={styles.mealRow}>
              <MaterialCommunityIcons name="food" size={20} color="#4CAF50" />
              <Text style={styles.mealType}>Ana Yemek:</Text>
              <Text style={styles.mealName}>{meal.mealName.anaYemek}</Text>
            </View>
            
            <View style={styles.mealRow}>
              <MaterialCommunityIcons name="rice" size={20} color="#795548" />
              <Text style={styles.mealType}>Yardımcı:</Text>
              <Text style={styles.mealName}>{meal.mealName.yardimci}</Text>
            </View>
            
            <View style={styles.mealRow}>
              <MaterialCommunityIcons name="cup" size={20} color="#E91E63" />
              <Text style={styles.mealType}>Ekstra:</Text>
              <Text style={styles.mealName}>{meal.mealName.ekstra}</Text>
            </View>
            
            <Divider style={styles.divider} />
            
            <View style={styles.footerRow}>
              <View style={styles.calorieContainer}>
                <MaterialCommunityIcons name="fire" size={18} color="#F44336" />
                <Text style={styles.calorieText}>{meal.calories} Kalori</Text>
              </View>
              
              <View style={styles.ratingContainer}>
                <MaterialCommunityIcons name="star" size={18} color="#FFC107" />
                <Text style={styles.ratingText}>
                  {meal.avarageRating ? meal.avarageRating.toFixed(1) : "0"}/5
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <AppLayout title="Günlük Yemek Menüsü">
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
        </View>
      ) : meals.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Paragraph style={styles.emptyText}>
            Listelenecek yemek menüsü bulunamadı.
          </Paragraph>
        </View>
      ) : (
        <FlatList
          data={meals}
          renderItem={renderMealCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#2196F3"]}
            />
          }
        />
      )}
    </AppLayout>
  );
};

export default HomeScreen; 