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
import { DiningStackParamList } from '../../types';
import { guestData } from '../../data/guest';

type Route = RouteProp<DiningStackParamList, 'OrderConfirm'>;

export default function OrderConfirmScreen() {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const { orderNumber } = route.params;

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
    <View style={styles.OrderConfirmScreenFacetChassis}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Text style={styles.OrderConfirmScreenIconSigil}>🍽️</Text>
      </Animated.View>
      <Animated.View
        style={[styles.OrderConfirmScreenCenterEnclave, { opacity }]}
      >
        <Text style={styles.OrderConfirmScreenTitleFiligree}>
          Order Placed!
        </Text>
        <Text style={styles.OrderConfirmScreenSubFiligree}>
          Your order is being prepared by our kitchen and will be delivered to
          your room.
        </Text>
      </Animated.View>

      <View style={styles.OrderConfirmScreenCardFacetChassis}>
        <Row label="Order Number" value={orderNumber} />
        <Divider />
        <Row label="Room" value={`Room ${guestData.roomNumber}`} />
        <Divider />
        <Row label="Estimated Delivery" value="25–45 minutes" />
        <Divider />
        <Row label="Payment" value="Room Charge" />
      </View>

      <TouchableOpacity
        style={styles.OrderConfirmScreenTrackPortico}
        activeOpacity={0.85}
      >
        <Text style={styles.OrderConfirmScreenTrackBtnText}>
          🔍 Track Order
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.OrderConfirmScreenHomePortico}
        onPress={() => navigation.dispatch(StackActions.popToTop())}
      >
        <Text style={styles.OrderConfirmScreenHomeBtnText}>Return to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.OrderConfirmScreenRowLintel}>
    <Text style={styles.OrderConfirmScreenRowLabelFiligree}>{label}</Text>
    <Text style={styles.OrderConfirmScreenRowValueFiligree}>{value}</Text>
  </View>
);
const Divider = () => <View style={styles.OrderConfirmScreenDividerLintel} />;

const styles = StyleSheet.create({
  OrderConfirmScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.lg,
  },

  OrderConfirmScreenIconSigil: { fontSize: 72, textAlign: 'center' },
  OrderConfirmScreenCenterEnclave: { alignItems: 'center' },
  OrderConfirmScreenTitleFiligree: {
    ...Typography.title1,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  OrderConfirmScreenSubFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  OrderConfirmScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    width: '100%',
    ...(Shadows.small as object),
  },

  OrderConfirmScreenRowLintel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  OrderConfirmScreenRowLabelFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },

  OrderConfirmScreenRowValueFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  OrderConfirmScreenDividerLintel: {
    height: 0.5,
    backgroundColor: Colors.border,
  },
  OrderConfirmScreenTrackPortico: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.lg,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  OrderConfirmScreenTrackBtnText: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  OrderConfirmScreenHomePortico: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  OrderConfirmScreenHomeBtnText: {
    ...Typography.subheadline,
    color: Colors.red,
    fontWeight: '600',
  },
});
