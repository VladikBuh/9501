import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../theme';
import { ExploreStackParamList } from '../types';
import ExploreScreen from '../screens/explore/ExploreScreen';
import LocationDetailScreen from '../screens/explore/LocationDetailScreen';

const Stack = createNativeStackNavigator<ExploreStackParamList>();

export const ExploreStack = () => (
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
    <Stack.Screen name="Explore" component={ExploreScreen} options={{ title: 'Explore Toronto', headerLargeTitle: true }} />
    <Stack.Screen name="LocationDetail" component={LocationDetailScreen} options={{ title: '', headerTransparent: true, headerLargeTitle: false }} />
  </Stack.Navigator>
);
