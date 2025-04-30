import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { List, Switch, Divider, Button, Headline, Subheading, Text } from 'react-native-paper';
import { getNotificationPreferences, saveNotificationPreferences, registerForPushNotifications } from '../../services/notification';
import styles from '../../styles/screens/NotificationSettingsScreenStyles';
import AppLayout from '../../components/layout/AppLayout';

const NotificationSettingsScreen = () => {
  const [preferences, setPreferences] = useState({
    dailyMenu: true,
    favorites: true,
    specialMeals: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const prefs = await getNotificationPreferences();
      setPreferences(prefs);
    } catch (error) {
      console.error('Error loading notification preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSwitch = (key) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key],
    });
  };

  const handleSavePreferences = async () => {
    try {
      setSaving(true);
      await saveNotificationPreferences(preferences);
      Alert.alert('Başarılı', 'Bildirim ayarlarınız kaydedildi.');
    } catch (error) {
      console.error('Error saving notification preferences:', error);
      Alert.alert('Hata', 'Bildirim ayarlarınız kaydedilirken bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const handleRequestPermissions = async () => {
    try {
      setSaving(true);
      const token = await registerForPushNotifications();
      if (token) {
        Alert.alert('Başarılı', 'Bildirim izinleri verildi.');
      } else {
        Alert.alert('Uyarı', 'Bildirim izinleri verilmedi veya cihaz uygun değil.');
      }
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      Alert.alert('Hata', 'Bildirim izinleri alınırken bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout title="Bildirim Ayarları" showBackButton={true}>
      <ScrollView>
        <View style={styles.content}>
          <Headline style={styles.title}>Bildirim Ayarları</Headline>
          <Subheading style={styles.subtitle}>
            Hangi konularda bildirim almak istediğinizi seçin
          </Subheading>
          
          <Divider style={styles.divider} />
          
          <List.Section>
            <List.Item
              title="Günlük Menü Bildirimleri"
              description="Her gün yeni menü yayınlandığında bildirim alın"
              left={props => <List.Icon {...props} icon="food" />}
              right={props => 
                <Switch
                  value={preferences.dailyMenu}
                  onValueChange={() => handleToggleSwitch('dailyMenu')}
                  disabled={loading}
                />
              }
            />
            
            <Divider />
            
            <List.Item
              title="Favori Yemek Bildirimleri"
              description="Favori yemekleriniz menüde olduğunda bildirim alın"
              left={props => <List.Icon {...props} icon="heart" />}
              right={props => 
                <Switch
                  value={preferences.favorites}
                  onValueChange={() => handleToggleSwitch('favorites')}
                  disabled={loading}
                />
              }
            />
            
            <Divider />
            
            <List.Item
              title="Özel Menü Bildirimleri"
              description="Özel günlerde veya kampanyalarda bildirim alın"
              left={props => <List.Icon {...props} icon="star" />}
              right={props => 
                <Switch
                  value={preferences.specialMeals}
                  onValueChange={() => handleToggleSwitch('specialMeals')}
                  disabled={loading}
                />
              }
            />
          </List.Section>
          
          <Button
            mode="contained"
            onPress={handleSavePreferences}
            loading={saving}
            disabled={loading || saving}
            style={styles.button}
          >
            Ayarları Kaydet
          </Button>
          
          <View style={styles.permissionSection}>
            <Text style={styles.permissionText}>
              Bildirimleri almak için cihazınızın bildirim izinlerini etkinleştirmeniz gerekir.
            </Text>
            
            <Button
              mode="outlined"
              onPress={handleRequestPermissions}
              loading={saving}
              disabled={loading || saving}
              style={styles.button}
            >
              Bildirim İzinlerini Yönet
            </Button>
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default NotificationSettingsScreen; 