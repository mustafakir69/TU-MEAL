import { StyleSheet } from 'react-native';

const LayoutStyles = StyleSheet.create({
  // Header styles
  header: {
    height: 60,
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerBack: {
    position: 'absolute',
    left: 16,
  },
  
  // Footer styles
  footer: {
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 8,
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLabel: {
    fontSize: 12,
    marginTop: 2,
    color: '#757575',
  },
  footerLabelActive: {
    fontSize: 12,
    marginTop: 2,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  
  // Content container
  contentContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default LayoutStyles; 