import { StyleSheet } from 'react-native';

const NotificationSettingsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#666',
    marginTop: 5,
  },
  divider: {
    marginVertical: 16,
  },
  button: {
    marginTop: 20,
  },
  permissionSection: {
    marginTop: 30,
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
  },
  permissionText: {
    marginBottom: 10,
    color: '#0d47a1',
  },
});

export default NotificationSettingsScreenStyles; 