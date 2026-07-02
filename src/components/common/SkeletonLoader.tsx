import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius } from '../../theme';

interface Props {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const SkeletonLoader: React.FC<Props> = ({
  width = '100%',
  height = 20,
  borderRadius = Radius.sm,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: Colors.backgroundCardElevated,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const CardSkeleton: React.FC = () => (
  <View style={skStyles.SkeletonLoaderCardFacetChassis}>
    <SkeletonLoader
      height={160}
      borderRadius={16}
      style={{ marginBottom: 12 }}
    />
    <SkeletonLoader width="70%" height={18} style={{ marginBottom: 8 }} />
    <SkeletonLoader width="50%" height={14} />
  </View>
);

const skStyles = StyleSheet.create({
  SkeletonLoaderCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
  },
});
