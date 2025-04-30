import { StyleSheet } from 'react-native';

const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#757575',
  },
  listContent: {
    padding: 16,
  },
  mealCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 8,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  mealType: {
    marginLeft: 8,
    fontWeight: 'bold',
    width: 105,
    fontSize: 14,
  },
  mealName: {
    flex: 1,
    fontSize: 14,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  calorieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calorieText: {
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HomeScreenStyles; 