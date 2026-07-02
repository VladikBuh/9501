import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../theme';
import { GuestStackParamList } from '../types';
import GuestScreen from '../screens/guest/GuestScreen';
import FullBarcodeScreen from '../screens/guest/FullBarcodeScreen';

const Stack = createNativeStackNavigator<GuestStackParamList>();

export const GuestStack = () => (
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
      name="Guest"
      component={GuestScreen}
      options={{ title: 'Guest Information', headerLargeTitle: true }}
    />
    <Stack.Screen
      name="FullBarcode"
      component={FullBarcodeScreen}
      options={{ presentation: 'modal', title: '' }}
    />
  </Stack.Navigator>
);
