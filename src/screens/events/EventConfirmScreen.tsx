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
import { StackActions } from '@react-navigation/native';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { EventsStackParamList } from '../../types';

type Route = RouteProp<EventsStackParamList, 'EventConfirm'>;

export default function EventConfirmScreen() {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const { reservationNumber, event } = route.params;

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
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.EventConfirmScreenFacetChassis}>
      <ScrollView
        contentContainerStyle={styles.EventConfirmScreenScrollContent}
        showsVerticalScrollIndicator={false}
      >
      <Animated.View
        style={[
          styles.EventConfirmScreenIconEnclave,
          { transform: [{ scale }] },
        ]}
      >
        <Text style={styles.EventConfirmScreenIconSigil}>🎉</Text>
      </Animated.View>
      <Animated.View
        style={[styles.EventConfirmScreenCenterEnclave, { opacity }]}
      >
        <Text style={styles.EventConfirmScreenTitleFiligree}>
          Reservation{'\n'}Confirmed!
        </Text>
        <Text style={styles.EventConfirmScreenSubFiligree}>
          Your spot has been reserved. Check your reservation details below.
        </Text>
      </Animated.View>

      <View style={styles.EventConfirmScreenCardFacetChassis}>
        <Row label="Reservation #" value={reservationNumber} />
        <Divider />
        <Row label="Event" value={event.title} />
        <Divider />
        <Row label="Date" value={event.date} />
        <Divider />
        <Row label="Time" value={event.time} />
        <Divider />
        <Row label="Venue" value={event.venue} />
      </View>

      {/* QR Code placeholder */}
      <View style={styles.EventConfirmScreenQRCardFacetChassis}>
        <View style={styles.EventConfirmScreenQREnclave}>
          <Text style={styles.EventConfirmScreenQREmojiSigil}>🔳</Text>
        </View>
        <Text style={styles.EventConfirmScreenQRLabelFiligree}>
          Show at entrance
        </Text>
      </View>

      <TouchableOpacity
        style={styles.EventConfirmScreenActionPortico}
        onPress={() => navigation.dispatch(StackActions.popToTop())}
        activeOpacity={0.85}
      >
        <Text style={styles.EventConfirmScreenBtnText}>Back to Events</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.EventConfirmScreenSecondaryPortico}
        onPress={() => navigation.navigate('MyEventReservations' as never)}
      >
        <Text style={styles.EventConfirmScreenSecondaryPorticoFiligree}>
          View My Reservations
        </Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.EventConfirmScreenRowLintel}>
    <Text style={styles.EventConfirmScreenRowLabelFiligree}>{label}</Text>
    <Text style={styles.EventConfirmScreenRowValueFiligree} numberOfLines={1}>
      {value}
    </Text>
  </View>
);
const Divider = () => <View style={styles.EventConfirmScreenDividerLintel} />;

const styles = StyleSheet.create({
  EventConfirmScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  EventConfirmScreenScrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
    gap: Spacing.md,
  },

  EventConfirmScreenIconEnclave: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  EventConfirmScreenIconSigil: { fontSize: 64 },
  EventConfirmScreenCenterEnclave: { alignItems: 'center' },
  EventConfirmScreenTitleFiligree: {
    ...Typography.title1,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 8,
  },
  EventConfirmScreenSubFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  EventConfirmScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    width: '100%',
    ...(Shadows.small as object),
  },
  EventConfirmScreenRowLintel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    gap: Spacing.sm,
  },

  EventConfirmScreenRowLabelFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },
  EventConfirmScreenRowValueFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  EventConfirmScreenDividerLintel: {
    height: 0.5,
    backgroundColor: Colors.border,
  },
  EventConfirmScreenQRCardFacetChassis: { alignItems: 'center', gap: 8 },
  EventConfirmScreenQREnclave: {
    width: 80,
    height: 80,
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  EventConfirmScreenQREmojiSigil: { fontSize: 48 },
  EventConfirmScreenQRLabelFiligree: {
    ...Typography.caption1,
    color: Colors.textTertiary,
  },
  EventConfirmScreenActionPortico: {
    backgroundColor: Colors.red,
    borderRadius: Radius.lg,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: 'center',
    width: '100%',
  },
  EventConfirmScreenBtnText: { ...Typography.headline, color: Colors.white },
  EventConfirmScreenSecondaryPortico: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },

  EventConfirmScreenSecondaryPorticoFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },
});
