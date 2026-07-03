import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../theme';
import { HomeStackParamList } from '../types';
import HomeScreen from '../screens/home/HomeScreen';
import RequestCenterScreen from '../screens/home/RequestCenterScreen';
import RequestFormScreen from '../screens/home/RequestFormScreen';
import RequestConfirmScreen from '../screens/home/RequestConfirmScreen';
import RequestTrackingScreen from '../screens/home/RequestTrackingScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: Colors.background },
      headerLargeStyle: { backgroundColor: Colors.background },
      headerTintColor: Colors.textPrimary,
      headerLargeTitleStyle: { color: Colors.textPrimary },
      headerShadowVisible: false,
      headerLargeTitle: true,
      contentStyle: { backgroundColor: Colors.background },
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RequestCenter"
      component={RequestCenterScreen}
      options={{ title: 'Room Requests', headerLargeTitle: true, headerShown: Platform.OS === 'ios' }}
    />
    <Stack.Screen
      name="RequestForm"
      component={RequestFormScreen}
      options={{ title: 'New Request', headerLargeTitle: true, headerShown: Platform.OS === 'ios' }}
    />
    <Stack.Screen
      name="RequestConfirm"
      component={RequestConfirmScreen}
      options={{ title: '', headerShown: false }}
    />
    <Stack.Screen
      name="RequestTracking"
      component={RequestTrackingScreen}
      options={{ title: 'Track Request', headerLargeTitle: true, headerShown: Platform.OS === 'ios' }}
    />
  </Stack.Navigator>
);
