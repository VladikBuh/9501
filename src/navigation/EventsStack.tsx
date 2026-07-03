import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../theme';
import { EventsStackParamList } from '../types';
import EventsScreen from '../screens/events/EventsScreen';
import EventDetailScreen from '../screens/events/EventDetailScreen';
import EventReserveScreen from '../screens/events/EventReserveScreen';
import EventConfirmScreen from '../screens/events/EventConfirmScreen';
import MyEventReservationsScreen from '../screens/events/MyEventReservationsScreen';
import CategoryEventsScreen from '../screens/events/CategoryEventsScreen';

const Stack = createNativeStackNavigator<EventsStackParamList>();

export const EventsStack = () => (
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
    <Stack.Screen name="Events" component={EventsScreen} options={{ title: 'Hotel Events', headerLargeTitle: true, headerShown: Platform.OS === 'ios' }} />
    <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: '', headerTransparent: true, headerLargeTitle: false, headerShown: Platform.OS === 'ios' }} />
    <Stack.Screen name="EventReserve" component={EventReserveScreen} options={{ title: 'Reserve Event', presentation: 'modal', headerLargeTitle: false }} />
    <Stack.Screen name="EventConfirm" component={EventConfirmScreen} options={{ title: '', headerShown: false }} />
    <Stack.Screen name="MyEventReservations" component={MyEventReservationsScreen} options={{ title: 'My Reservations', headerLargeTitle: true, headerShown: Platform.OS === 'ios' }} />
    <Stack.Screen name="CategoryEvents" component={CategoryEventsScreen} options={({ route }) => ({ title: route.params.category, headerLargeTitle: true, headerShown: Platform.OS === 'ios' })} />
  </Stack.Navigator>
);
