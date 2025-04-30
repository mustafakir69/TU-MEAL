import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MealCard = ({ meal, onPress }) => {
  // Türkçe tarih formatı
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.dateRow}>
            <MaterialCommunityIcons name="calendar" size={20} color="#2196F3" />
            <Title style={styles.date}>{formatDate(meal.date || new Date())}</Title>
          </View>

          <View style={styles.mealItemRow}>
            <MaterialCommunityIcons name="bowl" size={18} color="#FF9800" />
            <Paragraph style={styles.mealItem}>{meal.mealName?.corba || 'Belirtilmemiş'}</Paragraph>
          </View>

          <View style={styles.mealItemRow}>
            <MaterialCommunityIcons name="food" size={18} color="#4CAF50" />
            <Paragraph style={styles.mealItem}>{meal.mealName?.anaYemek || 'Belirtilmemiş'}</Paragraph>
          </View>

          <View style={styles.mealItemRow}>
            <MaterialCommunityIcons name="rice" size={18} color="#795548" />
            <Paragraph style={styles.mealItem}>{meal.mealName?.pilav || 'Belirtilmemiş'}</Paragraph>
          </View>

          <View style={styles.mealItemRow}>
            <MaterialCommunityIcons name="cup" size={18} color="#E91E63" />
            <Paragraph style={styles.mealItem}>{meal.mealName?.tatli || 'Belirtilmemiş'}</Paragraph>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="fire" size={16} color="#F44336" />
              <Text style={styles.statText}>{meal.calories || '0'} Kalori</Text>
            </View>
            
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
              <Text style={styles.statText}>
                {meal.avarageRating ? meal.avarageRating.toFixed(1) : '0'}/5
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 280,
    marginHorizontal: 8,
  },
  card: {
    elevation: 4,
    borderRadius: 12,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
  },
  date: {
    marginLeft: 8,
    fontSize: 18,
  },
  mealItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  mealItem: {
    marginLeft: 8,
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default MealCard; 