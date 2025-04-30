import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const RatingStars = ({ rating, setRating, disabled = false, size = 36 }) => {
  const starIcons = [];

  for (let i = 1; i <= 5; i++) {
    const name = i <= rating ? 'star' : 'star-border';
    const color = i <= rating ? '#FFC107' : '#757575';
    
    starIcons.push(
      <TouchableOpacity 
        key={i} 
        onPress={() => !disabled && setRating(i)}
        disabled={disabled}
        style={styles.starButton}
      >
        <MaterialIcons name={name} size={size} color={color} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {starIcons}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  starButton: {
    padding: 5,
  },
});

export default RatingStars; 