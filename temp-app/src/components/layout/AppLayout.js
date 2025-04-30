import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import LayoutStyles from '../../styles/layout/LayoutStyles';

const AppLayout = ({ children, title, showBackButton = false }) => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Footer navigation items
  const navigationItems = [
    {
      name: 'Home',
      label: 'Anasayfa',
      icon: 'restaurant-menu',
      iconType: 'MaterialIcons',
      onPress: () => navigation.navigate('Home')
    },
    {
      name: 'Favorites',
      label: 'Favoriler',
      icon: 'favorite',
      iconType: 'MaterialIcons',
      onPress: () => navigation.navigate('Favorites')
    },
    {
      name: 'Profile',
      label: 'Profil',
      icon: 'account',
      iconType: 'MaterialCommunityIcons',
      onPress: () => navigation.navigate('Profile')
    }
  ];
  
  // Check which tab is currently active
  const isActive = (name) => {
    if (route.name === name) return true;
    if (route.name === 'HomeMain' && name === 'Home') return true;
    if (route.name === 'ProfileMain' && name === 'Profile') return true;
    if (route.name === 'MealDetail' && name === 'Home') return true;
    if (route.name === 'Settings' && name === 'Profile') return true;
    if (route.name === 'NotificationSettings' && name === 'Profile') return true;
    return false;
  };

  return (
    <SafeAreaView style={LayoutStyles.safeAreaView}>
      <StatusBar backgroundColor="#1976D2" barStyle="light-content" />
      
      {/* Header */}
      <View style={LayoutStyles.header}>
        {showBackButton && (
          <TouchableOpacity 
            style={LayoutStyles.headerBack} 
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <Text style={LayoutStyles.headerTitle}>{title}</Text>
      </View>
      
      {/* Content */}
      <View style={LayoutStyles.contentContainer}>
        {children}
      </View>
      
      {/* Footer */}
      <View style={LayoutStyles.footer}>
        {navigationItems.map((item) => (
          <TouchableOpacity 
            key={item.name}
            style={isActive(item.name) ? LayoutStyles.footerItemActive : LayoutStyles.footerItem}
            onPress={item.onPress}
          >
            {item.iconType === 'MaterialIcons' ? (
              <MaterialIcons 
                name={item.icon} 
                size={24} 
                color={isActive(item.name) ? '#2196F3' : '#757575'} 
              />
            ) : (
              <MaterialCommunityIcons 
                name={item.icon} 
                size={24} 
                color={isActive(item.name) ? '#2196F3' : '#757575'} 
              />
            )}
            <Text 
              style={isActive(item.name) ? LayoutStyles.footerLabelActive : LayoutStyles.footerLabel}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default AppLayout; 