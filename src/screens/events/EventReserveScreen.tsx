import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { EventsStackParamList } from '../../types';
import { guestData } from '../../data/guest';

type Nav = NativeStackNavigationProp<EventsStackParamList>;
type Route = RouteProp<EventsStackParamList, 'EventReserve'>;

export default function EventReserveScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { event } = route.params;

  const [guests, setGuests] = useState(1);
  const [special, setSpecial] = useState('');
  const [dietary, setDietary] = useState('');
  const [accessibility, setAccessibility] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const total = event.price * guests;

  const handleReserve = () => {
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => {
      const num = `EVT-2026-${Math.floor(Math.random() * 90000) + 10000}`;
      navigation.replace('EventConfirm', { reservationNumber: num, event });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.EventReserveScreenScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Event summary */}
        <View style={styles.EventReserveScreenEventSummaryLintel}>
          <Text style={styles.EventReserveScreenEventTitleFiligree}>
            {event.title}
          </Text>
          <Text style={styles.EventReserveScreenEventMeta}>
            {event.date} · {event.time} · {event.venue}
          </Text>
        </View>

        {/* Auto-filled guest info */}
        <View style={styles.EventReserveScreenCardFacetChassis}>
          <Text style={styles.EventReserveScreenSectionTitleFiligree}>
            Guest Information
          </Text>
          <DisabledField label="Guest Name" value={guestData.name} />
          <DisabledField label="Room Number" value={guestData.roomNumber} />
          <DisabledField
            label="Reservation #"
            value={guestData.reservationNumber}
          />
        </View>

        {/* Guests count */}
        <View style={styles.EventReserveScreenCardFacetChassis}>
          <Text style={styles.EventReserveScreenSectionTitleFiligree}>
            Number of Guests
          </Text>
          <View style={styles.EventReserveScreenCounterRowLintel}>
            <TouchableOpacity
              style={styles.EventReserveScreenCounterPortico}
              onPress={() => setGuests(Math.max(1, guests - 1))}
            >
              <Text style={styles.EventReserveScreenCounterPorticoFiligree}>
                −
              </Text>
            </TouchableOpacity>
            <Text style={styles.EventReserveScreenCounterValueFiligree}>
              {guests}
            </Text>
            <TouchableOpacity
              style={styles.EventReserveScreenCounterPortico}
              onPress={() => setGuests(Math.min(8, guests + 1))}
            >
              <Text style={styles.EventReserveScreenCounterPorticoFiligree}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Special requests */}
        <View style={styles.EventReserveScreenCardFacetChassis}>
          <Text style={styles.EventReserveScreenSectionTitleFiligree}>
            Special Requests
          </Text>
          <TextInput
            style={styles.EventReserveScreenInputPortico}
            placeholder="Any special requests..."
            placeholderTextColor={Colors.textTertiary}
            value={special}
            onChangeText={setSpecial}
          />
          <TextInput
            style={[styles.EventReserveScreenInputPortico, { marginTop: 8 }]}
            placeholder="Dietary requirements..."
            placeholderTextColor={Colors.textTertiary}
            value={dietary}
            onChangeText={setDietary}
          />
          <TextInput
            style={[styles.EventReserveScreenInputPortico, { marginTop: 8 }]}
            placeholder="Accessibility requirements..."
            placeholderTextColor={Colors.textTertiary}
            value={accessibility}
            onChangeText={setAccessibility}
          />
        </View>

        {/* Total */}
        <View style={styles.EventReserveScreenTotalCardFacetChassis}>
          <Text style={styles.EventReserveScreenTotalLabelFiligree}>Total</Text>
          <Text style={styles.EventReserveScreenTotalValueFiligree}>
            ${total} CAD
          </Text>
          <Text style={styles.EventReserveScreenTotalSub}>
            {guests} × ${event.price}
          </Text>
        </View>

        {/* Agreement */}
        <TouchableOpacity
          style={styles.EventReserveScreenAgreementRowLintel}
          onPress={() => setAgreed(!agreed)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.EventReserveScreenCheckboxPortico,
              agreed && styles.EventReserveScreenCheckboxCheckedPortico,
            ]}
          >
            {agreed && (
              <Text style={styles.EventReserveScreenCheckmarkSigil}>✓</Text>
            )}
          </View>
          <Text style={styles.EventReserveScreenAgreementFiligree}>
            I agree to the hotel event policy and cancellation terms.
          </Text>
        </TouchableOpacity>

        {/* Reserve button */}
        <TouchableOpacity
          style={[
            styles.EventReserveScreenReservePortico,
            (!agreed || loading) && styles.EventReserveScreenReserveDisabled,
          ]}
          onPress={handleReserve}
          disabled={!agreed || loading}
          activeOpacity={0.85}
        >
          <Text style={styles.EventReserveScreenReservePorticoFiligree}>
            {loading ? 'Booking…' : 'Reserve Event'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const DisabledField = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.EventReserveScreenDisabledFieldLintel}>
    <Text style={styles.EventReserveScreenDisabledFieldLabelFiligree}>
      {label}
    </Text>
    <Text style={styles.EventReserveScreenDisabledFieldValueFiligree}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  EventReserveScreenScrollContent: {
    padding: Spacing.md,
    paddingTop: 15,
    gap: Spacing.md,
  },
  EventReserveScreenEventSummaryLintel: { gap: 4 },
  EventReserveScreenEventTitleFiligree: {
    ...Typography.title3,
    color: Colors.textPrimary,
  },
  EventReserveScreenEventMeta: {
    ...Typography.footnote,
    color: Colors.textSecondary,
  },
  EventReserveScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    ...(Shadows.small as object),
  },

  EventReserveScreenSectionTitleFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },

  EventReserveScreenDisabledFieldLintel: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  EventReserveScreenDisabledFieldLabelFiligree: {
    ...Typography.subheadline,
    color: Colors.textTertiary,
  },
  EventReserveScreenDisabledFieldValueFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },
  EventReserveScreenCounterRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xl,
    justifyContent: 'center',
  },
  EventReserveScreenCounterPortico: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.backgroundCardElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },

  EventReserveScreenCounterPorticoFiligree: {
    ...Typography.title2,
    color: Colors.textPrimary,
  },
  EventReserveScreenCounterValueFiligree: {
    ...Typography.title1,
    color: Colors.textPrimary,
    minWidth: 40,
    textAlign: 'center',
  },

  EventReserveScreenInputPortico: {
    backgroundColor: Colors.backgroundCardElevated,
    borderRadius: Radius.md,
    padding: 14,
    ...Typography.body,
    color: Colors.textPrimary,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  EventReserveScreenTotalCardFacetChassis: {
    backgroundColor: Colors.redMuted,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.red + '44',
  },
  EventReserveScreenTotalLabelFiligree: {
    ...Typography.footnote,
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  EventReserveScreenTotalValueFiligree: {
    ...Typography.title1,
    color: Colors.red,
    fontWeight: '700',
  },
  EventReserveScreenTotalSub: {
    ...Typography.footnote,
    color: Colors.textSecondary,
  },
  EventReserveScreenAgreementRowLintel: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'flex-start',
  },
  EventReserveScreenCheckboxPortico: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  EventReserveScreenCheckboxCheckedPortico: {
    backgroundColor: Colors.red,
    borderColor: Colors.red,
  },
  EventReserveScreenCheckmarkSigil: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  EventReserveScreenAgreementFiligree: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  EventReserveScreenReservePortico: {
    backgroundColor: Colors.red,
    borderRadius: Radius.lg,
    padding: 17,
    alignItems: 'center',
  },
  EventReserveScreenReserveDisabled: { opacity: 0.5 },
  EventReserveScreenReservePorticoFiligree: {
    ...Typography.headline,
    color: Colors.white,
  },
});
