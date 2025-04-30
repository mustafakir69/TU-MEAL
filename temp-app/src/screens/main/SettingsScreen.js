import React, { useState, useContext } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { TextInput, Button, List, Divider, Switch, Dialog, Portal } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import { authService } from '../../services/api';
import styles from '../../styles/screens/SettingsScreenStyles';
import AppLayout from '../../components/layout/AppLayout';

const SettingsScreen = ({ navigation }) => {
  const { user, updateUser, logout } = useContext(AuthContext);
  
  // Profile state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Notification settings
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Update profile handler
  const handleUpdateProfile = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    setIsUpdatingProfile(true);
    try {
      const result = await updateUser({ name, email });
      if (result.success) {
        Alert.alert('Başarılı', 'Profil bilgileriniz güncellendi');
        setIsEditingProfile(false);
      } else {
        Alert.alert('Hata', result.error);
      }
    } catch (error) {
      console.error('Update profile error:', error);
      Alert.alert('Hata', 'Profil güncellenirken bir hata oluştu');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // Change password handler
  const handleChangePassword = async () => {
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Hata', 'Yeni şifreler eşleşmiyor');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      // Call password change API
      const result = await authService.changePassword({
        currentPassword,
        newPassword
      });
      
      if (result.data.success) {
        Alert.alert('Başarılı', 'Şifreniz başarıyla değiştirildi');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setIsChangingPassword(false);
      } else {
        Alert.alert('Hata', result.data.message || 'Şifre değiştirilemedi');
      }
    } catch (error) {
      console.error('Change password error:', error);
      Alert.alert('Hata', 'Şifre değiştirilirken bir hata oluştu');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <AppLayout title="Ayarlar" showBackButton={true}>
      <ScrollView>
        {/* Profile Section */}
        <List.Section>
          <List.Subheader>Kişisel Bilgiler</List.Subheader>
          
          {isEditingProfile ? (
            <View style={styles.formContainer}>
              <TextInput
                label="İsim"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
              />
              
              <TextInput
                label="E-posta"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <View style={styles.buttonContainer}>
                <Button 
                  mode="outlined" 
                  onPress={() => setIsEditingProfile(false)}
                  style={styles.cancelButton}
                  disabled={isUpdatingProfile}
                >
                  İptal
                </Button>
                <Button 
                  mode="contained" 
                  onPress={handleUpdateProfile}
                  style={styles.saveButton}
                  loading={isUpdatingProfile}
                  disabled={isUpdatingProfile}
                >
                  Kaydet
                </Button>
              </View>
            </View>
          ) : (
            <>
              <List.Item
                title="İsim"
                description={user?.name}
              />
              <List.Item
                title="E-posta"
                description={user?.email}
              />
              <Button 
                mode="contained" 
                onPress={() => setIsEditingProfile(true)}
                style={styles.editButton}
              >
                Düzenle
              </Button>
            </>
          )}
        </List.Section>

        <Divider />

        {/* Password Section */}
        <List.Section>
          <List.Subheader>Güvenlik</List.Subheader>
          <Button 
            mode="outlined" 
            onPress={() => setIsChangingPassword(true)}
            style={styles.sectionButton}
            icon="lock-reset"
          >
            Şifre Değiştir
          </Button>
        </List.Section>

        <Divider />

        {/* Notifications Section */}
        <List.Section>
          <List.Subheader>Bildirimler</List.Subheader>
          <List.Item
            title="Push Bildirimleri"
            right={() => (
              <Switch 
                value={pushNotifications} 
                onValueChange={() => setPushNotifications(!pushNotifications)}
              />
            )}
          />
          <List.Item
            title="E-posta Bildirimleri"
            right={() => (
              <Switch 
                value={emailNotifications} 
                onValueChange={() => setEmailNotifications(!emailNotifications)}
              />
            )}
          />
          <Button 
            mode="outlined" 
            onPress={() => navigation.navigate('NotificationSettings')}
            style={styles.sectionButton}
            icon="bell-outline"
          >
            Bildirim Ayarları
          </Button>
        </List.Section>

        {/* Password Change Dialog */}
        <Portal>
          <Dialog visible={isChangingPassword} onDismiss={() => setIsChangingPassword(false)}>
            <Dialog.Title>Şifre Değiştir</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Mevcut Şifre"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry={secureTextEntry}
                right={<TextInput.Icon name={secureTextEntry ? "eye" : "eye-off"} onPress={() => setSecureTextEntry(!secureTextEntry)} />}
              />
              <TextInput
                label="Yeni Şifre"
                value={newPassword}
                onChangeText={setNewPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry={secureTextEntry}
              />
              <TextInput
                label="Yeni Şifre (Tekrar)"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry={secureTextEntry}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setIsChangingPassword(false)}>İptal</Button>
              <Button 
                onPress={handleChangePassword} 
                loading={isUpdatingPassword}
                disabled={isUpdatingPassword}
              >
                Değiştir
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </AppLayout>
  );
};

export default SettingsScreen; 