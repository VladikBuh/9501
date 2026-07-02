import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Colors } from '../theme';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import { TabNavigator } from './TabNavigator';

type Phase = 'splash' | 'onboarding' | 'main';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    card: Colors.backgroundCard,
    text: Colors.textPrimary,
    border: Colors.border,
    primary: Colors.red,
    notification: Colors.red,
  },
};

export default function AppNavigator() {
  const [phase, setPhase] = useState<Phase>('splash');

  if (phase === 'splash') {
    return <SplashScreen onFinish={() => setPhase('onboarding')} />;
  }

  if (phase === 'onboarding') {
    return <OnboardingScreen onFinish={() => setPhase('main')} />;
  }

  return (
    <NavigationContainer theme={navTheme}>
      <TabNavigator />
    </NavigationContainer>
  );
}
