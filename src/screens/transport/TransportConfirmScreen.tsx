import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { TransportStackParamList } from '../../types';

type Route = RouteProp<TransportStackParamList, 'TransportConfirm'>;

export default function TransportConfirmScreen() {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const { reservation } = route.params;

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
    <View style={styles.TransportConfirmScreenFacetChassis}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Text style={styles.TransportConfirmScreenIconSigil}>🚗</Text>
      </Animated.View>
      <Animated.View
        style={[styles.TransportConfirmScreenCenterEnclave, { opacity }]}
      >
        <Text style={styles.TransportConfirmScreenTitleFiligree}>
          Booking Confirmed!
        </Text>
        <Text style={styles.TransportConfirmScreenSubFiligree}>
          Your vehicle has been booked. The driver will arrive at the designated
          pickup point.
        </Text>
      </Animated.View>

      <View style={styles.TransportConfirmScreenCardFacetChassis}>
        <Row label="Reservation #" value={reservation.reservationNumber} />
        <Divider />
        <Row label="Destination" value={reservation.destination} />
        <Divider />
        <Row label="Vehicle" value={reservation.vehicleType} />
        <Divider />
        <Row label="Pickup Point" value={reservation.pickupPoint} />
        <Divider />
        <Row
          label="Date & Time"
          value={`${reservation.date} · ${reservation.time}`}
        />
        <Divider />
        <Row label="Driver Arrival" value="~15 min before departure" />
        <Divider />
        <Row
          label="Estimated Price"
          value={`$${reservation.estimatedPrice} CAD`}
        />
      </View>

      <TouchableOpacity
        style={styles.TransportConfirmScreenActionPortico}
        onPress={() => navigation.navigate('MyTransport' as never)}
        activeOpacity={0.85}
      >
        <Text style={styles.TransportConfirmScreenBtnText}>
          View Reservations
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.TransportConfirmScreenHomePortico}
        onPress={() => navigation.dispatch(StackActions.popToTop())}
      >
        <Text style={styles.TransportConfirmScreenHomeBtnText}>
          Return Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.TransportConfirmScreenRowLintel}>
    <Text style={styles.TransportConfirmScreenRowLabelFiligree}>{label}</Text>
    <Text
      style={styles.TransportConfirmScreenRowValueFiligree}
      numberOfLines={1}
    >
      {value}
    </Text>
  </View>
);
const Divider = () => (
  <View style={styles.TransportConfirmScreenDividerLintel} />
);

const styles = StyleSheet.create({
  TransportConfirmScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },

  TransportConfirmScreenIconSigil: { fontSize: 72, textAlign: 'center' },
  TransportConfirmScreenCenterEnclave: { alignItems: 'center' },
  TransportConfirmScreenTitleFiligree: {
    ...Typography.title1,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },

  TransportConfirmScreenSubFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  TransportConfirmScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    width: '100%',
    ...(Shadows.small as object),
  },
  TransportConfirmScreenRowLintel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
    gap: Spacing.sm,
  },

  TransportConfirmScreenRowLabelFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },

  TransportConfirmScreenRowValueFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  TransportConfirmScreenDividerLintel: {
    height: 0.5,
    backgroundColor: Colors.border,
  },
  TransportConfirmScreenActionPortico: {
    backgroundColor: Colors.red,
    borderRadius: Radius.lg,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: 'center',
    width: '100%',
  },
  TransportConfirmScreenBtnText: {
    ...Typography.headline,
    color: Colors.white,
  },
  TransportConfirmScreenHomePortico: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  TransportConfirmScreenHomeBtnText: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },
});
