import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { getImage } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { DiningStackParamList } from '../../types';
import { useCart } from '../../hooks/useCart';
import { EmptyState } from '../../components/common/EmptyState';

type Nav = NativeStackNavigationProp<DiningStackParamList>;

export default function CartScreen() {
  const navigation = useNavigation<Nav>();
  const {
    cart,
    removeItem,
    updateQuantity,
    subtotal,
    serviceFee,
    taxes,
    total,
  } = useCart();

  if (cart.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Your Order is Empty"
        description="Browse the menu to add delicious items to your order."
      />
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.CartScreenFacetChassis}
      contentContainerStyle={styles.CartScreenScrollContent}
      showsVerticalScrollIndicator={false}
    >
      {cart.map(({ item, quantity, notes }) => (
        <View key={item.id} style={styles.CartScreenCartItemLintel}>
          <Image
            source={getImage(item.image)}
            style={styles.CartScreenItemImage}
          />
          <View style={styles.CartScreenCartItemInfoEnclave}>
            <Text style={styles.CartScreenCartItemNameFiligree}>
              {item.name}
            </Text>
            <Text style={styles.CartScreenCartItemPriceFiligree}>
              ${item.price} CAD · {item.prepTime} min
            </Text>
            {notes ? (
              <Text style={styles.CartScreenCartItemNotesFiligree}>
                {notes}
              </Text>
            ) : null}
            <View style={styles.CartScreenQuantityRowLintel}>
              <TouchableOpacity
                style={styles.CartScreenQuantityPortico}
                onPress={() => updateQuantity(item.id, quantity - 1)}
              >
                <Text style={styles.CartScreenQuantityPorticoFiligree}>−</Text>
              </TouchableOpacity>
              <Text style={styles.CartScreenQuantityValueFiligree}>
                {quantity}
              </Text>
              <TouchableOpacity
                style={styles.CartScreenQuantityPortico}
                onPress={() => updateQuantity(item.id, quantity + 1)}
              >
                <Text style={styles.CartScreenQuantityPorticoFiligree}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CartScreenRemovePortico}
                onPress={() => removeItem(item.id)}
              >
                <Text style={styles.CartScreenRemovePorticoFiligree}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.CartScreenCartItemTotalFiligree}>
            ${(item.price * quantity).toFixed(0)}
          </Text>
        </View>
      ))}

      {/* Summary */}
      <View style={styles.CartScreenSummaryCardFacetChassis}>
        <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
        <SummaryRow
          label="Service Fee (12%)"
          value={`$${serviceFee.toFixed(2)}`}
        />
        <SummaryRow label="Taxes (13%)" value={`$${taxes.toFixed(2)}`} />
        <View style={styles.CartScreenTotalRowLintel}>
          <Text style={styles.CartScreenTotalLabelFiligree}>Total</Text>
          <Text style={styles.CartScreenTotalValueFiligree}>
            ${total.toFixed(2)} CAD
          </Text>
        </View>
        <Text style={styles.CartScreenDeliveryNoteFiligree}>
          ⏱ Estimated delivery: 25–45 min to your room
        </Text>
      </View>

      <TouchableOpacity
        style={styles.CartScreenContinuePortico}
        onPress={() => navigation.navigate('Checkout')}
        activeOpacity={0.85}
      >
        <Text style={styles.CartScreenContinuePorticoFiligree}>
          Continue to Checkout
        </Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.CartScreenSummaryRowLintel}>
    <Text style={styles.CartScreenSummaryLabelFiligree}>{label}</Text>
    <Text style={styles.CartScreenSummaryValueFiligree}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  CartScreenFacetChassis: { flex: 1, backgroundColor: Colors.background },
  CartScreenScrollContent: {
    padding: Spacing.md,
    paddingTop: 15,
    gap: Spacing.md,
  },

  CartScreenCartItemLintel: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    ...(Shadows.small as object),
    gap: Spacing.sm,
  },

  CartScreenItemImage: {
    width: 90,
    height: 90,
    backgroundColor: Colors.backgroundCardElevated,
  },

  CartScreenCartItemInfoEnclave: { flex: 1, padding: Spacing.sm, gap: 4 },
  CartScreenCartItemNameFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  CartScreenCartItemPriceFiligree: {
    ...Typography.caption1,
    color: Colors.textSecondary,
  },
  CartScreenCartItemNotesFiligree: {
    ...Typography.caption2,
    color: Colors.textTertiary,
    fontStyle: 'italic',
  },

  CartScreenQuantityRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: 4,
  },
  CartScreenQuantityPortico: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.backgroundCardElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  CartScreenQuantityPorticoFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    lineHeight: 18,
  },

  CartScreenQuantityValueFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    minWidth: 20,
    textAlign: 'center',
  },

  CartScreenRemovePortico: { marginLeft: Spacing.xs },
  CartScreenRemovePorticoFiligree: {
    ...Typography.caption1,
    color: Colors.statusCancelled,
  },
  CartScreenCartItemTotalFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '700',
    padding: Spacing.sm,
    alignSelf: 'center',
  },

  CartScreenSummaryCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    ...(Shadows.small as object),
    gap: 8,
  },
  CartScreenSummaryRowLintel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CartScreenSummaryLabelFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },
  CartScreenSummaryValueFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
  },
  CartScreenTotalRowLintel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
  },
  CartScreenTotalLabelFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  CartScreenTotalValueFiligree: {
    ...Typography.headline,
    color: Colors.red,
    fontWeight: '700',
  },
  CartScreenDeliveryNoteFiligree: {
    ...Typography.footnote,
    color: Colors.textTertiary,
    textAlign: 'center',
  },

  CartScreenContinuePortico: {
    backgroundColor: Colors.red,
    borderRadius: Radius.lg,
    padding: 17,
    alignItems: 'center',
  },
  CartScreenContinuePorticoFiligree: {
    ...Typography.headline,
    color: Colors.white,
  },
});
