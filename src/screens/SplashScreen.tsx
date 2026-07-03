import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  ImageBackground,
  Image,
  View,
} from 'react-native';
import { Colors } from '../theme';

const STEP = 250; // 1500ms / 6 steps

function LoaderDots() {
  const d1 = useRef(new Animated.Value(0)).current;
  const d2 = useRef(new Animated.Value(0)).current;
  const d3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(d1, {
          toValue: 1,
          duration: STEP,
          useNativeDriver: true,
        }),
        Animated.timing(d2, {
          toValue: 1,
          duration: STEP,
          useNativeDriver: true,
        }),
        Animated.timing(d3, {
          toValue: 1,
          duration: STEP,
          useNativeDriver: true,
        }),
        Animated.timing(d1, {
          toValue: 0,
          duration: STEP,
          useNativeDriver: true,
        }),
        Animated.timing(d2, {
          toValue: 0,
          duration: STEP,
          useNativeDriver: true,
        }),
        Animated.timing(d3, {
          toValue: 0,
          duration: STEP,
          useNativeDriver: true,
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [d1, d2, d3]);

  return (
    <View style={loader.SplashScreenFacetChassis}>
      <Animated.View
        style={[
          loader.SplashScreenDotSigil,
          loader.SplashScreenLeft,
          { opacity: d1 },
        ]}
      />
      <Animated.View
        style={[
          loader.SplashScreenDotSigil,
          loader.SplashScreenCenterEnclave,
          { opacity: d2 },
        ]}
      />
      <Animated.View
        style={[
          loader.SplashScreenDotSigil,
          loader.SplashScreenRight,
          { opacity: d3 },
        ]}
      />
    </View>
  );
}

interface Props {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 6,
      }),
    ]).start(() => {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(onFinish);
      }, 1800);
    });
  }, []);

  return (
    <ImageBackground
      source={require('../assets/wood-room-hub-onboardbg4.png')}
      style={styles.SplashScreenFacetChassis}
      resizeMode="cover"
    >
      <Animated.View style={{ opacity, transform: [{ scale }] }}>
        <Image
          source={require('../assets/wood-room-hub-loader-icon.png')}
          resizeMode="contain"
          style={{
            width: 250,
            height: 250,
            borderRadius: 50,
            marginBottom: 30,
          }}
        />
      </Animated.View>

      <View style={styles.SplashScreenLoaderWrap}>
        <LoaderDots />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  SplashScreenFacetChassis: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },

  SplashScreenLogo: { width: 200, height: 200 },

  SplashScreenLoaderWrap: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
});

const PILL_W = 140;
const PILL_H = 52;
const DOT_D = 36;
const DOT_TOP = (PILL_H - DOT_D) / 2; // 8

const loader = StyleSheet.create({
  SplashScreenFacetChassis: {
    width: PILL_W,
    height: PILL_H,
    backgroundColor: Colors.red,
    borderRadius: 100,
  },

  SplashScreenDotSigil: {
    position: 'absolute',
    width: DOT_D,
    height: DOT_D,
    borderRadius: DOT_D / 2,
    top: DOT_TOP,
    backgroundColor: Colors.background,
  },
  SplashScreenLeft: { left: 8 },
  SplashScreenCenterEnclave: { left: (PILL_W - DOT_D) / 2 },
  SplashScreenRight: { right: 8 },
});
