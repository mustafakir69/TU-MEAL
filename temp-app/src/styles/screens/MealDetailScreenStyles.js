import { StyleSheet } from 'react-native';

const MealDetailScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 4,
    padding: 16,
  },
  dateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  calorieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  calorieText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  mealCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  nutritionCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  rateCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  descriptionCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  commentCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  mealIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  mealDetails: {
    flex: 1,
    marginLeft: 8,
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mealCalories: {
    fontSize: 14,
    color: '#757575',
  },
  divider: {
    marginVertical: 4,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  nutritionLabel: {
    fontSize: 16,
    color: '#333',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 16,
  },
  commentInput: {
    marginBottom: 8,
  },
  noComments: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#757575',
    marginTop: 8,
  },
});

export default MealDetailScreenStyles; 