import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../theme';
import { DiningStackParamList } from '../types';
import DiningScreen from '../screens/dining/DiningScreen';
import FoodCategoryScreen from '../screens/dining/FoodCategoryScreen';
import FoodDetailScreen from '../screens/dining/FoodDetailScreen';
import CartScreen from '../screens/dining/CartScreen';
import CheckoutScreen from '../screens/dining/CheckoutScreen';
import OrderConfirmScreen from '../screens/dining/OrderConfirmScreen';

const Stack = createNativeStackNavigator<DiningStackParamList>();

export const DiningStack = () => (
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
      name="Dining"
      component={DiningScreen}
      options={{ title: 'Room Dining', headerLargeTitle: true, headerShown: Platform.OS === 'ios' }}
    />
    <Stack.Screen
      name="FoodCategory"
      component={FoodCategoryScreen}
      options={({ route }) => ({ title: route.params.category, headerLargeTitle: true, headerShown: Platform.OS === 'ios' })}
    />
    <Stack.Screen
      name="FoodDetail"
      component={FoodDetailScreen}
      options={{ title: '', headerTransparent: true, headerLargeTitle: false, headerShown: Platform.OS === 'ios' }}
    />
    <Stack.Screen
      name="Cart"
      component={CartScreen}
      options={{ title: 'Your Order', headerLargeTitle: false, presentation: 'modal' }}
    />
    <Stack.Screen
      name="Checkout"
      component={CheckoutScreen}
      options={{ title: 'Checkout', headerLargeTitle: true, headerShown: Platform.OS === 'ios' }}
    />
    <Stack.Screen
      name="OrderConfirm"
      component={OrderConfirmScreen}
      options={{ title: '', headerShown: false }}
    />
  </Stack.Navigator>
);
