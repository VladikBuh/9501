import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { DiningStackParamList } from '../../types';
import { guestData } from '../../data/guest';
import { useCart } from '../../hooks/useCart';
import { ScreenTitleHeader } from '../../components/common/ScreenTitleHeader';

type Nav = NativeStackNavigationProp<DiningStackParamList>;

export default function CheckoutScreen() {
  const navigation = useNavigation<Nav>();
  const { cart, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      const orderNum = `ORD-2026-${Math.floor(Math.random() * 90000) + 10000}`;
      clearCart();
      navigation.replace('OrderConfirm', { orderNumber: orderNum });
    }, 1000);
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.CheckoutScreenFacetChassis}
      contentContainerStyle={styles.CheckoutScreenScrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ScreenTitleHeader title="Checkout" onBack={() => navigation.goBack()} />
      {/* Guest info (disabled) */}
      <View style={styles.CheckoutScreenCardFacetChassis}>
        <Text style={styles.CheckoutScreenSectionTitleFiligree}>
          Delivery Information
        </Text>
        <DisabledField label="Guest Name" value={guestData.name} />
        <DisabledField label="Room Number" value={guestData.roomNumber} />
        <DisabledField
          label="Delivery Location"
          value={`Room ${guestData.roomNumber}, Floor ${guestData.floor}`}
        />
        <DisabledField label="Estimated Delivery" value="25–45 minutes" />
        <DisabledField label="Payment Method" value="Room Charge" />
      </View>

      {/* Order summary */}
      <View style={styles.CheckoutScreenCardFacetChassis}>
        <Text style={styles.CheckoutScreenSectionTitleFiligree}>
          Order Summary
        </Text>
        {cart.map(({ item, quantity }) => (
          <View key={item.id} style={styles.CheckoutScreenSummaryItemLintel}>
            <Text style={styles.CheckoutScreenSummaryQty}>{quantity}×</Text>
            <Text style={styles.CheckoutScreenSummaryName}>{item.name}</Text>
            <Text style={styles.CheckoutScreenSummaryPrice}>
              ${(item.price * quantity).toFixed(0)}
            </Text>
          </View>
        ))}
        <View style={styles.CheckoutScreenDividerLintel} />
        <View style={styles.CheckoutScreenTotalRowLintel}>
          <Text style={styles.CheckoutScreenTotalLabelFiligree}>Total</Text>
          <Text style={styles.CheckoutScreenTotalValueFiligree}>
            ${total.toFixed(2)} CAD
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.CheckoutScreenConfirmPortico,
          loading && styles.CheckoutScreenConfirmPorticoDisabled,
        ]}
        onPress={handleConfirm}
        disabled={loading}
        activeOpacity={0.85}
      >
        <Text style={styles.CheckoutScreenConfirmPorticoFiligree}>
          {loading ? 'Placing Order…' : 'Confirm Order'}
        </Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const DisabledField = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.CheckoutScreenDisabledFieldLintel}>
    <Text style={styles.CheckoutScreenDisabledFieldLabelFiligree}>{label}</Text>
    <Text style={styles.CheckoutScreenDisabledFieldValueFiligree}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  CheckoutScreenFacetChassis: { flex: 1, backgroundColor: Colors.background },
  CheckoutScreenScrollContent: {
    padding: Spacing.md,
    paddingTop: 15,
    gap: Spacing.md,
  },

  CheckoutScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    ...(Shadows.small as object),
  },
  CheckoutScreenSectionTitleFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  CheckoutScreenDisabledFieldLintel: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CheckoutScreenDisabledFieldLabelFiligree: {
    ...Typography.subheadline,
    color: Colors.textTertiary,
  },

  CheckoutScreenDisabledFieldValueFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },
  CheckoutScreenSummaryItemLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: Spacing.sm,
  },
  CheckoutScreenSummaryQty: {
    ...Typography.subheadline,
    color: Colors.textTertiary,
    width: 24,
  },
  CheckoutScreenSummaryName: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    flex: 1,
  },

  CheckoutScreenSummaryPrice: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  CheckoutScreenDividerLintel: {
    height: 0.5,
    backgroundColor: Colors.border,
    marginVertical: 8,
  },
  CheckoutScreenTotalRowLintel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CheckoutScreenTotalLabelFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    fontWeight: '700',
  },

  CheckoutScreenTotalValueFiligree: {
    ...Typography.headline,
    color: Colors.red,
    fontWeight: '700',
  },
  CheckoutScreenConfirmPortico: {
    backgroundColor: Colors.red,
    borderRadius: Radius.lg,
    padding: 17,
    alignItems: 'center',
  },

  CheckoutScreenConfirmPorticoDisabled: { opacity: 0.6 },
  CheckoutScreenConfirmPorticoFiligree: {
    ...Typography.headline,
    color: Colors.white,
  },
});
