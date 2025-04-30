import { StyleSheet } from 'react-native';

const MealCardStyles = StyleSheet.create({
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

export default MealCardStyles; 