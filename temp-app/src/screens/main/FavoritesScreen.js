import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { SegmentedButtons, Headline, ActivityIndicator, Text } from 'react-native-paper';
import { mealService } from '../../services/api';
import MealCard from '../../components/meal/MealCard';
import styles from '../../styles/screens/FavoritesScreenStyles';
import AppLayout from '../../components/layout/AppLayout';

const FavoritesScreen = ({ navigation }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeFilter, setTimeFilter] = useState('weekly');

  useEffect(() => {
    fetchFavoriteMeals();
  }, [timeFilter]);

  const fetchFavoriteMeals = async () => {
    try {
      setLoading(true);
      const response = await mealService.getFavoriteMeals(timeFilter);
      setMeals(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching favorite meals:', error);
      Alert.alert('Hata', 'Favori yemekler alınırken bir hata oluştu.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchFavoriteMeals();
  };

  const handleMealPress = (meal) => {
    navigation.navigate('MealDetail', { mealId: meal.id });
  };

  return (
    <AppLayout title="Favori Yemekler">
      <View style={styles.filterContainer}>
        <SegmentedButtons
          value={timeFilter}
          onValueChange={setTimeFilter}
          buttons={[
            { value: 'weekly', label: 'Haftalık' },
            { value: 'monthly', label: 'Aylık' },
            { value: 'alltime', label: 'Tüm Zamanlar' },
          ]}
          style={styles.segmentedButtons}
        />
      </View>

      <Headline style={styles.headline}>
        {timeFilter === 'weekly' && 'Bu Haftanın En Beğenilen Yemekleri'}
        {timeFilter === 'monthly' && 'Bu Ayın En Beğenilen Yemekleri'}
        {timeFilter === 'alltime' && 'Tüm Zamanların En Beğenilen Yemekleri'}
      </Headline>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
        </View>
      ) : meals.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Listelenecek favori yemek bulunamadı.
          </Text>
        </View>
      ) : (
        <FlatList
          data={meals}
          renderItem={({ item }) => (
            <MealCard meal={item} onPress={() => handleMealPress(item)} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </AppLayout>
  );
};

export default FavoritesScreen; 