import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { HomeStackParamList } from '../../types';
import { useRequests } from '../../hooks/useRequests';

type Nav = NativeStackNavigationProp<HomeStackParamList>;
type Route = RouteProp<HomeStackParamList, 'RequestConfirm'>;

export default function RequestConfirmScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { requestId } = route.params;
  const { requests } = useRequests();
  const req = requests.find(r => r.id === requestId);

  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 14,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.RequestConfirmScreenFacetChassis}>
      <ScrollView
        contentContainerStyle={styles.RequestConfirmScreenScrollContent}
        showsVerticalScrollIndicator={false}
      >
      <Animated.View
        style={[
          styles.RequestConfirmScreenIconEnclave,
          { transform: [{ scale }], opacity },
        ]}
      >
        <Text style={styles.RequestConfirmScreenCheckmark}>✅</Text>
      </Animated.View>

      <Animated.View style={{ opacity }}>
        <Text style={styles.RequestConfirmScreenTitleFiligree}>
          Request Submitted{'\n'}Successfully
        </Text>
        <Text style={styles.RequestConfirmScreenSubtitleFiligree}>
          Our staff has been notified and will respond shortly.
        </Text>
      </Animated.View>

      <View style={styles.RequestConfirmScreenCardFacetChassis}>
        <Row label="Request ID" value={requestId} />
        <Divider />
        <Row label="Category" value={req?.category ?? '—'} />
        <Divider />
        <Row label="Estimated Response" value={req?.estimatedTime ?? '—'} />
        <Divider />
        <Row
          label="Current Status"
          value={req?.status ?? 'Submitted'}
          highlight
        />
      </View>

      <TouchableOpacity
        style={styles.RequestConfirmScreenTrackPortico}
        onPress={() => navigation.replace('RequestTracking', { requestId })}
        activeOpacity={0.85}
      >
        <Text style={styles.RequestConfirmScreenTrackPorticoFiligree}>
          Track Request
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.RequestConfirmScreenHomePortico}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.RequestConfirmScreenHomePorticoFiligree}>
          Back to Home
        </Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const Row = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <View style={styles.RequestConfirmScreenRowLintel}>
    <Text style={styles.RequestConfirmScreenRowLabelFiligree}>{label}</Text>
    <Text
      style={[
        styles.RequestConfirmScreenRowValueFiligree,
        highlight && { color: Colors.statusCompleted },
      ]}
    >
      {value}
    </Text>
  </View>
);

const Divider = () => <View style={styles.RequestConfirmScreenDividerLintel} />;

const styles = StyleSheet.create({
  RequestConfirmScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  RequestConfirmScreenScrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
    gap: Spacing.lg,
  },
  RequestConfirmScreenIconEnclave: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  RequestConfirmScreenCheckmark: { fontSize: 72 },
  RequestConfirmScreenTitleFiligree: {
    ...Typography.title1,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 34,
  },

  RequestConfirmScreenSubtitleFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 8,
  },

  RequestConfirmScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    width: '100%',
    ...(Shadows.small as object),
  },
  RequestConfirmScreenRowLintel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  RequestConfirmScreenRowLabelFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },
  RequestConfirmScreenRowValueFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  RequestConfirmScreenDividerLintel: {
    height: 0.5,
    backgroundColor: Colors.border,
  },
  RequestConfirmScreenTrackPortico: {
    backgroundColor: Colors.red,
    borderRadius: Radius.lg,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: 'center',
    width: '100%',
  },

  RequestConfirmScreenTrackPorticoFiligree: {
    ...Typography.headline,
    color: Colors.white,
  },
  RequestConfirmScreenHomePortico: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  RequestConfirmScreenHomePorticoFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },
});
