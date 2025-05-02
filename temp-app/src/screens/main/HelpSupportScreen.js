import React, { useState } from 'react';
import { View, ScrollView, Linking } from 'react-native';
import { Title, Text, Divider, Card, List, Button, Paragraph, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLayout from '../../components/layout/AppLayout';

const HelpSupportScreen = () => {
  const [expanded, setExpanded] = useState(null);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  const handlePress = (questionId) => {
    setExpanded(expanded === questionId ? null : questionId);
  };

  const sendSupportEmail = () => {
    const emailSubject = encodeURIComponent(subject || 'Yardım Talebi');
    const emailBody = encodeURIComponent(message);
    Linking.openURL(`mailto:destek@tumeal.edu.tr?subject=${emailSubject}&body=${emailBody}`);
  };

  return (
    <AppLayout title="Yardım ve Destek" showBackButton={true}>
      <ScrollView>
        <Card style={{ margin: 16 }}>
          <Card.Content>
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <MaterialCommunityIcons name="help-circle" size={60} color="#2196F3" />
              <Title style={{ marginTop: 8 }}>Nasıl Yardımcı Olabiliriz?</Title>
            </View>
            
            <Divider style={{ marginVertical: 16 }} />
            
            <Title style={{ fontSize: 18 }}>Sık Sorulan Sorular</Title>
            
            <List.Accordion
              title="Bildirim ayarlarımı nasıl değiştirebilirim?"
              expanded={expanded === 1}
              onPress={() => handlePress(1)}
              style={{ paddingHorizontal: 0 }}
            >
              <List.Item 
                title="Profil sayfanızda 'Bildirim Ayarları' seçeneğine dokunun. Açılan sayfadan 'Günlük Yemek Bildirimi' seçeneğini açıp kapatabilirsiniz."
                titleNumberOfLines={10}
                titleStyle={{ fontSize: 14, lineHeight: 20 }}
                style={{ paddingLeft: 20 }}
              />
            </List.Accordion>
            
            <List.Accordion
              title="Şifremi nasıl değiştirebilirim?"
              expanded={expanded === 2}
              onPress={() => handlePress(2)}
              style={{ paddingHorizontal: 0 }}
            >
              <List.Item 
                title="Profil sayfanızda 'Şifre Değiştir' seçeneğine dokunarak şifrenizi değiştirebilirsiniz."
                titleNumberOfLines={10}
                titleStyle={{ fontSize: 14, lineHeight: 20 }}
                style={{ paddingLeft: 20 }}
              />
            </List.Accordion>
            
            <List.Accordion
              title="Menü bilgileri ne zaman güncellenir?"
              expanded={expanded === 3}
              onPress={() => handlePress(3)}
              style={{ paddingHorizontal: 0 }}
            >
              <List.Item 
                title="Günlük yemek menüleri genellikle her sabah 08:00 itibariyle güncellenir. Menü güncellendiğinde bildirim ayarlarınız açıksa bildirim alacaksınız."
                titleNumberOfLines={10}
                titleStyle={{ fontSize: 14, lineHeight: 20 }}
                style={{ paddingLeft: 20 }}
              />
            </List.Accordion>
            
            <List.Accordion
              title="Favori yemeklerimi nasıl kaydedebilirim?"
              expanded={expanded === 4}
              onPress={() => handlePress(4)}
              style={{ paddingHorizontal: 0 }}
            >
              <List.Item 
                title="Yemek detay sayfasında sağ üst köşedeki kalp ikonuna dokunarak yemeği favorilerinize ekleyebilirsiniz. Favorilerinizi profilinizden 'Favori Yemeklerim' bölümünden görüntüleyebilirsiniz."
                titleNumberOfLines={10}
                titleStyle={{ fontSize: 14, lineHeight: 20 }}
                style={{ paddingLeft: 20 }}
              />
            </List.Accordion>
            
            <Divider style={{ marginVertical: 16 }} />
            
            <Title style={{ fontSize: 18 }}>İletişim</Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 16 }}>
              Sorunuzun cevabını bulamadıysanız bize mesaj gönderin, en kısa sürede size yanıt vereceğiz.
            </Paragraph>
            
            <TextInput
              label="Konu"
              value={subject}
              onChangeText={setSubject}
              mode="outlined"
              style={{ marginBottom: 12 }}
            />
            
            <TextInput
              label="Mesajınız"
              value={message}
              onChangeText={setMessage}
              mode="outlined"
              multiline
              numberOfLines={5}
              style={{ marginBottom: 16 }}
            />
            
            <Button 
              mode="contained"
              icon="send"
              onPress={sendSupportEmail}
              disabled={!message.trim()}
            >
              Mesaj Gönder
            </Button>
            
            <Divider style={{ marginVertical: 16 }} />
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <MaterialCommunityIcons name="phone" size={24} color="#2196F3" style={{ marginRight: 12 }} />
              <View>
                <Text style={{ fontWeight: 'bold' }}>Telefon</Text>
                <Text>+90 212 000 00 00</Text>
              </View>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
              <MaterialCommunityIcons name="email" size={24} color="#2196F3" style={{ marginRight: 12 }} />
              <View>
                <Text style={{ fontWeight: 'bold' }}>E-posta</Text>
                <Text>destek@tumeal.edu.tr</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </AppLayout>
  );
};

export default HelpSupportScreen; 