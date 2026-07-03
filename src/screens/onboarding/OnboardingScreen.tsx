import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';

const pages = [
  {
    headline: 'Hotel Digital Experience',
    description:
      'Manage every hotel service — from room requests to dining — all from a single premium application.',
  },
  {
    headline: 'Room Service',
    description:
      'Submit room requests instantly and track their progress in real-time. Our staff responds within minutes.',
  },
  {
    headline: 'Premium Dining',
    description:
      'Order from our world-class kitchen directly to your room. Sushi, seafood, and gourmet street food on demand.',
  },
  {
    headline: 'Entertainment',
    description:
      'Explore hotel events, reserve seats at concerts, wine tastings, casino tournaments, and exclusive VIP parties.',
  },
  {
    headline: 'Transportation',
    description:
      'Book a luxury hotel vehicle and explore the best of Toronto with private, comfortable transportation.',
  },
];

interface Props {
  onFinish: () => void;
}

export default function OnboardingScreen({ onFinish }: Props) {
  const [page, setPage] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const transitionTo = (nextPage: number) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -30,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setPage(nextPage);
      slideAnim.setValue(30);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleNext = () => {
    if (page < pages.length - 1) transitionTo(page + 1);
    else onFinish();
  };

  const handleSkip = () => onFinish();

  const current = pages[page];
  const isLast = page === pages.length - 1;

  return (
    <View style={styles.OnboardingScreenFacetChassis}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../assets/wood-room-hub-onboardbg2.png')}
        style={styles.OnboardingScreenBg}
        resizeMode="cover"
      >
        <View style={styles.OnboardingScreenOverlay} />

        <TouchableOpacity
          style={styles.OnboardingScreenSkipPortico}
          onPress={handleSkip}
        >
          {!isLast && (
            <Text style={styles.OnboardingScreenSkipPorticoFiligree}>Skip</Text>
          )}
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.OnboardingScreenScrollContent,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.OnboardingScreenHeadlineFiligree}>
            {current.headline}
          </Text>
          <Text style={styles.OnboardingScreenDescriptionFiligree}>
            {current.description}
          </Text>
        </Animated.View>

        <View style={styles.OnboardingScreenFooterLintel}>
          <View style={styles.OnboardingScreenDotsLintel}>
            {pages.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.OnboardingScreenDotSigil,
                  i === page
                    ? styles.OnboardingScreenDotActiveSigil
                    : styles.OnboardingScreenDotInactiveSigil,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.OnboardingScreenNextPortico}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text style={styles.OnboardingScreenNextPorticoFiligree}>
              {isLast ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  OnboardingScreenFacetChassis: { flex: 1, backgroundColor: Colors.background },
  OnboardingScreenBg: { flex: 1 },
  OnboardingScreenOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.52)',
  },
  OnboardingScreenSkipPortico: {
    position: 'absolute',
    top: 60,
    right: Spacing.lg,
    zIndex: 10,
  },
  OnboardingScreenSkipPorticoFiligree: {
    ...Typography.callout,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  OnboardingScreenScrollContent: {
    position: 'absolute',
    bottom: 220,
    left: Spacing.xl,
    right: Spacing.xl,
  },
  OnboardingScreenHeadlineFiligree: {
    ...Typography.largeTitle,
    color: Colors.white,
    marginBottom: Spacing.md,
    lineHeight: 40,
  },
  OnboardingScreenDescriptionFiligree: {
    ...Typography.body,
    color: 'rgba(255,255,255,0.80)',
    lineHeight: 26,
  },
  OnboardingScreenFooterLintel: {
    position: 'absolute',
    bottom: 60,
    left: Spacing.xl,
    right: Spacing.xl,
    gap: Spacing.lg,
  },
  OnboardingScreenDotsLintel: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  OnboardingScreenDotSigil: { height: 4, borderRadius: 2 },
  OnboardingScreenDotActiveSigil: { width: 24, backgroundColor: Colors.red },
  OnboardingScreenDotInactiveSigil: {
    width: 8,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  OnboardingScreenNextPortico: {
    backgroundColor: Colors.red,
    paddingVertical: 17,
    borderRadius: Radius.lg,
    alignItems: 'center',
  },
  OnboardingScreenNextPorticoFiligree: {
    ...Typography.headline,
    color: Colors.white,
    letterSpacing: 0.2,
  },
});
