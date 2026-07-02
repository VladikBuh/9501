import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../theme';
import { HomeStack } from './HomeStack';
import { GuestStack } from './GuestStack';
import { EventsStack } from './EventsStack';
import { DiningStack } from './DiningStack';
import { ExploreStack } from './ExploreStack';
import { TransportStack } from './TransportStack';

const Tab = createBottomTabNavigator();

const TabIcon = ({
  name, focused, badge,
}: { name: string; focused: boolean; badge?: number }) => (
  <View style={tabStyles.iconWrap}>
    <Text style={[tabStyles.emoji, { opacity: focused ? 1 : 0.45 }]}>{name}</Text>
    {badge ? (
      <View style={tabStyles.badge}>
        <Text style={tabStyles.badgeText}>{badge > 9 ? '9+' : badge}</Text>
      </View>
    ) : null}
  </View>
);

export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: tabStyles.bar,
      tabBarActiveTintColor: Colors.tabActive,
      tabBarInactiveTintColor: Colors.tabInactive,
      tabBarLabelStyle: tabStyles.label,
    }}
  >
    <Tab.Screen
      name="HomeTab" component={HomeStack}
      options={{ tabBarLabel: 'Home', tabBarIcon: ({ focused }) => <TabIcon name="🏠" focused={focused} /> }}
    />
    <Tab.Screen
      name="GuestTab" component={GuestStack}
      options={{ tabBarLabel: 'Guest', tabBarIcon: ({ focused }) => <TabIcon name="👤" focused={focused} /> }}
    />
    <Tab.Screen
      name="EventsTab" component={EventsStack}
      options={{ tabBarLabel: 'Events', tabBarIcon: ({ focused }) => <TabIcon name="🎭" focused={focused} /> }}
    />
    <Tab.Screen
      name="DiningTab" component={DiningStack}
      options={{ tabBarLabel: 'Dining', tabBarIcon: ({ focused }) => <TabIcon name="🍽️" focused={focused} /> }}
    />
    <Tab.Screen
      name="ExploreTab" component={ExploreStack}
      options={{ tabBarLabel: 'Explore', tabBarIcon: ({ focused }) => <TabIcon name="🗺️" focused={focused} /> }}
    />
    <Tab.Screen
      name="TransportTab" component={TransportStack}
      options={{ tabBarLabel: 'Transport', tabBarIcon: ({ focused }) => <TabIcon name="🚗" focused={focused} /> }}
    />
  </Tab.Navigator>
);

const tabStyles = StyleSheet.create({
  bar: {
    backgroundColor: Colors.tabBarBg,
    borderTopColor: Colors.tabBarBorder,
    borderTopWidth: 0.5,
    height: 83,
    paddingBottom: 28,
    paddingTop: 10,
  },
  label: {
    ...Typography.caption2,
    fontWeight: '500',
  },
  iconWrap: { alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 22 },
  badge: {
    position: 'absolute', top: -4, right: -8,
    backgroundColor: Colors.red, borderRadius: 8,
    minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3,
  },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
});
