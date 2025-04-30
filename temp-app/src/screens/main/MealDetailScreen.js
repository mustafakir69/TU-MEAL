import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Headline, Subheading, Text, Divider, Card, Button, TextInput, ActivityIndicator, Chip } from 'react-native-paper';
import { mealService } from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import RatingStars from '../../components/meal/RatingStars';
import CommentBox from '../../components/meal/CommentBox';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../styles/screens/MealDetailScreenStyles';
import AppLayout from '../../components/layout/AppLayout';

const MealDetailScreen = ({ route, navigation }) => {
  const { mealId, meal: initialMeal } = route.params;
  
  const [meal, setMeal] = useState(initialMeal || null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(!initialMeal);
  const [submitting, setSubmitting] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  // Kalori bilgileri (normalde backendden gelecek)
  const [nutritionInfo, setNutritionInfo] = useState({
    corba: { calorie: 120, protein: '4g', carb: '18g', fat: '5g' },
    anaYemek: { calorie: 450, protein: '22g', carb: '45g', fat: '18g' },
    pilav: { calorie: 280, protein: '5g', carb: '58g', fat: '4g' },
    tatli: { calorie: 150, protein: '3g', carb: '25g', fat: '6g' }
  });

  useEffect(() => {
    if (!initialMeal) {
      fetchMealDetails();
    }
    fetchComments();
  }, [mealId, initialMeal]);

  const fetchMealDetails = async () => {
    try {
      setLoading(true);
      const response = await mealService.getMealById(mealId);
      setMeal(response.data.meal);
    } catch (error) {
      console.error('Error fetching meal details:', error);
      Alert.alert('Hata', 'Yemek detayları alınırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await mealService.getComments(mealId);
      setComments(response.data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleRate = async () => {
    if (userRating === 0) {
      Alert.alert('Uyarı', 'Lütfen bir puan seçin.');
      return;
    }

    try {
      setSubmitting(true);
      await mealService.rateMeal(mealId, userRating);
      Alert.alert('Başarılı', 'Puanınız kaydedildi.');
      fetchMealDetails(); // Refresh meal data to get updated rating
    } catch (error) {
      console.error('Error rating meal:', error);
      Alert.alert('Hata', 'Puanlama yapılırken bir hata oluştu.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleComment = async () => {
    if (!userComment.trim()) {
      Alert.alert('Uyarı', 'Lütfen bir yorum yazın.');
      return;
    }

    try {
      setSubmitting(true);
      await mealService.commentMeal(mealId, userComment);
      setUserComment('');
      Alert.alert('Başarılı', 'Yorumunuz kaydedildi.');
      fetchComments(); // Refresh comments
    } catch (error) {
      console.error('Error posting comment:', error);
      Alert.alert('Hata', 'Yorum yapılırken bir hata oluştu.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <AppLayout title="Yemek Detayı" showBackButton={true}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
        </View>
      </AppLayout>
    );
  }

  if (!meal) {
    return (
      <AppLayout title="Yemek Detayı" showBackButton={true}>
        <View style={styles.errorContainer}>
          <Text>Yemek bulunamadı.</Text>
        </View>
      </AppLayout>
    );
  }

  const totalCalories = meal.calories || 
    (nutritionInfo.corba.calorie + 
     nutritionInfo.anaYemek.calorie + 
     nutritionInfo.pilav.calorie + 
     nutritionInfo.tatli.calorie);

  return (
    <AppLayout title="Yemek Detayı" showBackButton={true}>
      <ScrollView>
        <Card style={styles.headerCard}>
          <Headline style={styles.dateTitle}>{formatDate(meal.date)}</Headline>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={24} color="#FFC107" />
            <Text style={styles.ratingText}>
              {meal.avarageRating ? `${meal.avarageRating.toFixed(1)} / 5` : 'Henüz puanlanmadı'}
            </Text>
          </View>
          
          <View style={styles.calorieContainer}>
            <MaterialCommunityIcons name="fire" size={24} color="#F44336" />
            <Text style={styles.calorieText}>{totalCalories} kalori</Text>
          </View>
        </Card>
        
        <View style={styles.content}>
          <Card style={styles.mealCard}>
            <Card.Content>
              <Subheading style={styles.sectionTitle}>Menü İçeriği</Subheading>
              
              <View style={styles.mealRow}>
                <View style={styles.mealIconContainer}>
                  <MaterialCommunityIcons name="bowl" size={24} color="#FF9800" />
                </View>
                <View style={styles.mealDetails}>
                  <Text style={styles.mealName}>{meal.mealName.corba}</Text>
                  <Text style={styles.mealCalories}>{nutritionInfo.corba.calorie} kalori</Text>
                </View>
              </View>
              
              <Divider style={styles.divider} />
              
              <View style={styles.mealRow}>
                <View style={styles.mealIconContainer}>
                  <MaterialCommunityIcons name="food" size={24} color="#4CAF50" />
                </View>
                <View style={styles.mealDetails}>
                  <Text style={styles.mealName}>{meal.mealName.anaYemek}</Text>
                  <Text style={styles.mealCalories}>{nutritionInfo.anaYemek.calorie} kalori</Text>
                </View>
              </View>
              
              <Divider style={styles.divider} />
              
              <View style={styles.mealRow}>
                <View style={styles.mealIconContainer}>
                  <MaterialCommunityIcons name="rice" size={24} color="#795548" />
                </View>
                <View style={styles.mealDetails}>
                  <Text style={styles.mealName}>{meal.mealName.pilav}</Text>
                  <Text style={styles.mealCalories}>{nutritionInfo.pilav.calorie} kalori</Text>
                </View>
              </View>
              
              <Divider style={styles.divider} />
              
              <View style={styles.mealRow}>
                <View style={styles.mealIconContainer}>
                  <MaterialCommunityIcons name="cup" size={24} color="#E91E63" />
                </View>
                <View style={styles.mealDetails}>
                  <Text style={styles.mealName}>{meal.mealName.tatli}</Text>
                  <Text style={styles.mealCalories}>{nutritionInfo.tatli.calorie} kalori</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
          
          <Card style={styles.nutritionCard}>
            <Card.Content>
              <Subheading style={styles.sectionTitle}>Besin Değerleri</Subheading>
              
              <View style={styles.nutritionRow}>
                <Text style={styles.nutritionLabel}>Toplam Kalori:</Text>
                <Text style={styles.nutritionValue}>{totalCalories} kcal</Text>
              </View>
              
              <View style={styles.nutritionRow}>
                <Text style={styles.nutritionLabel}>Protein:</Text>
                <Text style={styles.nutritionValue}>
                  {parseInt(nutritionInfo.corba.protein) + 
                   parseInt(nutritionInfo.anaYemek.protein) + 
                   parseInt(nutritionInfo.pilav.protein) + 
                   parseInt(nutritionInfo.tatli.protein)}g
                </Text>
              </View>
              
              <View style={styles.nutritionRow}>
                <Text style={styles.nutritionLabel}>Karbonhidrat:</Text>
                <Text style={styles.nutritionValue}>
                  {parseInt(nutritionInfo.corba.carb) + 
                   parseInt(nutritionInfo.anaYemek.carb) + 
                   parseInt(nutritionInfo.pilav.carb) + 
                   parseInt(nutritionInfo.tatli.carb)}g
                </Text>
              </View>
              
              <View style={styles.nutritionRow}>
                <Text style={styles.nutritionLabel}>Yağ:</Text>
                <Text style={styles.nutritionValue}>
                  {parseInt(nutritionInfo.corba.fat) + 
                   parseInt(nutritionInfo.anaYemek.fat) + 
                   parseInt(nutritionInfo.pilav.fat) + 
                   parseInt(nutritionInfo.tatli.fat)}g
                </Text>
              </View>
            </Card.Content>
          </Card>
          
          <Card style={styles.rateCard}>
            <Card.Content>
              <Subheading style={styles.sectionTitle}>Menüyü Puanla</Subheading>
              <RatingStars 
                rating={userRating} 
                setRating={setUserRating} 
              />
              <Button 
                mode="contained" 
                onPress={() => Alert.alert('Bilgi', 'Puanlama işlemi başarılı!')} 
                style={styles.button}
                disabled={userRating === 0}
              >
                Puanla
              </Button>
            </Card.Content>
          </Card>
          
          <Card style={styles.commentCard}>
            <Card.Content>
              <Subheading style={styles.sectionTitle}>Yorum Yap</Subheading>
              <TextInput
                mode="outlined"
                placeholder="Yemek hakkında düşüncelerinizi yazın..."
                value={userComment}
                onChangeText={setUserComment}
                multiline
                numberOfLines={3}
                style={styles.commentInput}
                disabled={submitting}
              />
              <Button 
                mode="contained" 
                onPress={handleComment} 
                style={styles.button}
                loading={submitting}
                disabled={submitting || !userComment.trim()}
              >
                Yorum Gönder
              </Button>
            </Card.Content>
          </Card>
          
          <Divider style={styles.divider} />
          
          <Subheading style={styles.sectionTitle}>
            Yorumlar ({comments.length})
          </Subheading>
          
          {comments.length === 0 ? (
            <Text style={styles.noComments}>Henüz yorum yapılmamış. İlk yorumu siz yapın!</Text>
          ) : (
            comments.map(comment => (
              <CommentBox key={comment.id} comment={comment} />
            ))
          )}
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default MealDetailScreen; 