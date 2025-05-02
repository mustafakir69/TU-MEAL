import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/main/HomeScreen';
import MealDetailScreen from '../screens/main/MealDetailScreen';
import FavoritesScreen from '../screens/main/FavoritesScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import NotificationSettingsScreen from '../screens/main/NotificationSettingsScreen';
import AboutAppScreen from '../screens/main/AboutAppScreen';
import HelpSupportScreen from '../screens/main/HelpSupportScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// Home Stack
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen 
        name="HomeMain" 
        component={HomeScreen}
      />
      <HomeStack.Screen 
        name="MealDetail" 
        component={MealDetailScreen}
      />
    </HomeStack.Navigator>
  );
};

// Profile Stack
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen 
        name="ProfileMain" 
        component={ProfileScreen}
      />
      <ProfileStack.Screen 
        name="Settings" 
        component={SettingsScreen}
      />
      <ProfileStack.Screen 
        name="NotificationSettings" 
        component={NotificationSettingsScreen}
      />
      <ProfileStack.Screen 
        name="AboutApp" 
        component={AboutAppScreen}
      />
      <ProfileStack.Screen 
        name="HelpSupport" 
        component={HelpSupportScreen}
      />
    </ProfileStack.Navigator>
  );
};

// Main Tab Navigator
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { display: 'none' }, // Hide the bottom tab bar since we have our custom footer
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackNavigator}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator; 