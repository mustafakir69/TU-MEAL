import React, { useState, useContext } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, Text, Headline, Divider } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    setIsLoading(true);
    try {
      const result = await login({ email, password });
      if (!result.success) {
        Alert.alert('Giriş Başarısız', result.error);
      }
    } catch (error) {
      Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async () => {
    setIsLoading(true);
    try {
      // Kullanıcı adı ve şifre belirtmeden giriş için özel bir fonksiyon
      const quickLoginCredentials = {
        email: 'test@example.com',
        password: 'test123'
      };
      
      const result = await login(quickLoginCredentials);
      if (!result.success) {
        Alert.alert('Hızlı Giriş Başarısız', result.error);
      }
    } catch (error) {
      Alert.alert('Hata', 'Hızlı giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Quick login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Headline style={styles.title}>Trakya Üniversitesi Yemekhane</Headline>
      </View>
      
      <Button
        mode="contained"
        onPress={handleQuickLogin}
        style={styles.quickLoginButton}
        loading={isLoading}
        disabled={isLoading}
        icon="flash"
      >
        Hızlı Giriş Yap
      </Button>
      
      <Divider style={styles.divider} />
      <Text style={styles.orText}>veya</Text>
      <Divider style={styles.divider} />
      
      <View style={styles.form}>
        <TextInput
          label="E-posta"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          left={<TextInput.Icon icon="email" />}
        />
        
        <TextInput
          label="Şifre"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry={secureTextEntry}
          right={
            <TextInput.Icon
              icon={secureTextEntry ? 'eye' : 'eye-off'}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            />
          }
          left={<TextInput.Icon icon="lock" />}
        />
        
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          loading={isLoading}
          disabled={isLoading}
        >
          Giriş Yap
        </Button>
        
        <View style={styles.registerContainer}>
          <Text>Hesabınız yok mu? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quickLoginButton: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
  },
  divider: {
    marginVertical: 15,
  },
  orText: {
    textAlign: 'center',
    color: '#757575',
    marginVertical: -25,
    backgroundColor: '#fff',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  form: {
    width: '100%',
    marginTop: 10,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 6,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
});

export default LoginScreen; 