import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../theme';
import { TransportStackParamList } from '../types';
import TransportScreen from '../screens/transport/TransportScreen';
import TransportConfirmScreen from '../screens/transport/TransportConfirmScreen';
import MyTransportScreen from '../screens/transport/MyTransportScreen';

const Stack = createNativeStackNavigator<TransportStackParamList>();

export const TransportStack = () => (
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
    <Stack.Screen name="Transport" component={TransportScreen} options={{ title: 'Transportation', headerLargeTitle: true }} />
    <Stack.Screen name="TransportConfirm" component={TransportConfirmScreen} options={{ title: '', headerShown: false }} />
    <Stack.Screen name="MyTransport" component={MyTransportScreen} options={{ title: 'My Reservations', headerLargeTitle: true }} />
  </Stack.Navigator>
);
