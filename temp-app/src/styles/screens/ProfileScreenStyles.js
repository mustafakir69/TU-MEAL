import { StyleSheet } from 'react-native';

const ProfileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  avatar: {
    backgroundColor: '#2196F3',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#757575',
  },
  divider: {
    marginVertical: 8,
  },
  logoutButton: {
    margin: 16,
    marginBottom: 32,
    borderColor: '#f44336',
  },
});

export default ProfileScreenStyles; 