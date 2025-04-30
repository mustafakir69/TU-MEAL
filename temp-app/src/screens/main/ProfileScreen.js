import React, { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Avatar, Text, List, Divider, Button } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/screens/ProfileScreenStyles';
import AppLayout from '../../components/layout/AppLayout';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <AppLayout title="Profilim">
      <ScrollView>
        <View style={styles.profileHeader}>
          <Avatar.Text 
            size={80} 
            label={getInitials(user?.name)} 
            style={styles.avatar}
          />
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <Divider style={styles.divider} />

        <List.Section>
          <List.Subheader>Hesap</List.Subheader>
          <List.Item
            title="Profil Düzenle"
            left={props => <List.Icon {...props} icon="account-edit" />}
            onPress={() => navigation.navigate('Settings')}
          />
          <List.Item
            title="Şifre Değiştir" 
            left={props => <List.Icon {...props} icon="lock-reset" />}
            onPress={() => navigation.navigate('Settings')}
          />
          <List.Item
            title="Bildirim Ayarları" 
            left={props => <List.Icon {...props} icon="bell-outline" />}
            onPress={() => navigation.navigate('NotificationSettings')}
          />
        </List.Section>

        <Divider style={styles.divider} />

        <List.Section>
          <List.Subheader>Aktivitelerim</List.Subheader>
          <List.Item
            title="Favori Yemeklerim"
            left={props => <List.Icon {...props} icon="food" />}
            onPress={() => navigation.navigate('Favorites')}
          />
          <List.Item
            title="Yorumlarım" 
            left={props => <List.Icon {...props} icon="comment-text" />}
            onPress={() => {}}
          />
          <List.Item
            title="Puanlamalarım" 
            left={props => <List.Icon {...props} icon="star" />}
            onPress={() => {}}
          />
        </List.Section>

        <Divider style={styles.divider} />

        <List.Section>
          <List.Subheader>Uygulama</List.Subheader>
          <List.Item
            title="Uygulama Hakkında"
            left={props => <List.Icon {...props} icon="information" />}
            onPress={() => {}}
          />
          <List.Item
            title="Yardım ve Destek" 
            left={props => <List.Icon {...props} icon="help-circle" />}
            onPress={() => {}}
          />
        </List.Section>

        <Button
          mode="outlined"
          color="#f44336"
          icon="logout"
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          Çıkış Yap
        </Button>
      </ScrollView>
    </AppLayout>
  );
};

export default ProfileScreen; 