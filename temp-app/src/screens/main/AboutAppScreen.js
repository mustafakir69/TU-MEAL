import React from 'react';
import { View, ScrollView, Image, Linking } from 'react-native';
import { Title, Text, Divider, Card, Paragraph, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLayout from '../../components/layout/AppLayout';

const AboutAppScreen = () => {
  return (
    <AppLayout title="Uygulama Hakkında" showBackButton={true}>
      <ScrollView>
        <Card style={{ margin: 16 }}>
          <Card.Content>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <MaterialCommunityIcons name="food" size={80} color="#2196F3" />
              <Title style={{ marginTop: 16, fontSize: 26 }}>TU-MEAL</Title>
              <Text style={{ color: '#666', marginTop: 4 }}>Sürüm 1.0.0</Text>
            </View>
            
            <Divider style={{ marginVertical: 16 }} />
            
            <Title style={{ fontSize: 18 }}>Uygulama Hakkında</Title>
            <Paragraph style={{ marginTop: 8, lineHeight: 22 }}>
              TU-MEAL, üniversite kampüsünde öğrencilere ve akademik personele günlük yemek menüsünü kolayca takip edebilme, 
              favori yemeklerini kaydetme ve menülerle ilgili bildirimler alma imkanı sunan bir mobil uygulamadır.
            </Paragraph>
            
            <Paragraph style={{ marginTop: 12, lineHeight: 22 }}>
              Kullanıcılar, günlük menüleri görebilir, yemekler hakkında detaylı bilgilere erişebilir ve 
              kendi profil tercihlerini yönetebilirler. Uygulama, kullanıcı dostu arayüzü ile her gün yayınlanan 
              yemek menüsünü kolay bir şekilde görüntüleme imkanı sunar.
            </Paragraph>
            
            <Divider style={{ marginVertical: 16 }} />
            
            <Title style={{ fontSize: 18 }}>Özellikler</Title>
            <View style={{ marginTop: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" style={{ marginRight: 8 }} />
                <Text>Günlük yemek menüsünü görüntüleme</Text>
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" style={{ marginRight: 8 }} />
                <Text>Menüler hakkında detaylı bilgi</Text>
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" style={{ marginRight: 8 }} />
                <Text>Favori yemeklerinizi kaydetme</Text>
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" style={{ marginRight: 8 }} />
                <Text>Bildirim tercihleri yönetimi</Text>
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" style={{ marginRight: 8 }} />
                <Text>Kullanıcı dostu arayüz</Text>
              </View>
            </View>
            
            <Divider style={{ marginVertical: 16 }} />
            
            <Title style={{ fontSize: 18 }}>İletişim</Title>
            <Paragraph style={{ marginTop: 8, lineHeight: 22 }}>
              Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçebilirsiniz.
            </Paragraph>
            
            <Button 
              mode="contained" 
              icon="email"
              onPress={() => Linking.openURL('mailto:info@tumeal.edu.tr')}
              style={{ marginTop: 16 }}
            >
              E-posta Gönder
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </AppLayout>
  );
};

export default AboutAppScreen; 