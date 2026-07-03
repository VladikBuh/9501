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
import {
  TransportStackParamList,
  VehicleType,
  TransportReservation,
} from '../../types';

import { vehicles, pickupLocations } from '../../data/vehicles';
import { locations } from '../../data/locations';

import { PressableCard } from '../../components/common/PressableCard';
import { ScreenTitleHeader } from '../../components/common/ScreenTitleHeader';

type Nav = NativeStackNavigationProp<TransportStackParamList>;

const segments = ['Book Vehicle', 'My Reservations'];

export default function TransportScreen() {
  const navigation = useNavigation<Nav>();
  const [segment, setSegment] = useState(0);
  const [selectedVehicle, setSelectedVehicle] =
    useState<VehicleType>('Premium');
  const [selectedPickup, setSelectedPickup] = useState('p1');
  const [selectedDest, setSelectedDest] = useState(locations[0].name);
  const [passengers, setPassengers] = useState(2);
  const [date, setDate] = useState('Dec 30, 2024');
  const [time, setTime] = useState('7:00 PM');

  if (segment === 1) {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.TransportScreenFacetChassis}
        contentContainerStyle={styles.TransportScreenScrollContent}
      >
        <ScreenTitleHeader title="Transportation" />
        <SegControl
          segments={segments}
          selected={segment}
          onChange={setSegment}
        />
        <TouchableOpacity
          style={styles.TransportScreenNavToReservationsPortico}
          onPress={() => navigation.navigate('MyTransport')}
        >
          <Text style={styles.TransportScreenNavToReservationsFiligree}>
            View My Transport Reservations →
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  const vehicle = vehicles.find(v => v.type === selectedVehicle)!;

  const handleBook = () => {
    const res: TransportReservation = {
      id: `t_${Date.now()}`,
      reservationNumber: `TRN-2026-${
        Math.floor(Math.random() * 90000) + 10000
      }`,
      destination: selectedDest,
      vehicleType: selectedVehicle,
      pickupPoint:
        pickupLocations.find(p => p.id === selectedPickup)?.name ??
        'Main Entrance',
      date,
      time,
      passengerCount: passengers,
      estimatedPrice: vehicle.priceEstimate,
      status: 'Active',
    };
    navigation.navigate('TransportConfirm', { reservation: res });
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.TransportScreenFacetChassis}
      contentContainerStyle={styles.TransportScreenScrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ScreenTitleHeader title="Transportation" />
      <SegControl
        segments={segments}
        selected={segment}
        onChange={setSegment}
      />
      {/* Illustration */}
      <View style={styles.TransportScreenIllustrationEnclave}>
        <Text style={styles.TransportScreenIllustrationEmojiSigil}>🚗</Text>
        <Text style={styles.TransportScreenIllustrationTitleFiligree}>
          Luxury Hotel Transportation
        </Text>
        <Text style={styles.TransportScreenIllustrationSubFiligree}>
          Premium vehicles available 24/7
        </Text>
      </View>

      {/* Destination */}
      <View style={styles.TransportScreenCardFacetChassis}>
        <Text style={styles.TransportScreenCardTitleFiligree}>Destination</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.TransportScreenDestinationScrollLintel}
        >
          {locations.slice(0, 8).map(loc => (
            <TouchableOpacity
              key={loc.id}
              style={[
                styles.TransportScreenDestinationChipBadge,
                selectedDest === loc.name &&
                  styles.TransportScreenDestinationChipActiveBadge,
              ]}
              onPress={() => setSelectedDest(loc.name)}
            >
              <Text style={styles.TransportScreenDestinationChipEmojiSigil}>
                {loc.categoryIcon}
              </Text>
              <Text
                style={[
                  styles.TransportScreenDestinationChipFiligree,
                  selectedDest === loc.name &&
                    styles.TransportScreenDestinationChipActiveFiligree,
                ]}
                numberOfLines={1}
              >
                {loc.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Vehicle selection */}
      <View style={styles.TransportScreenCardFacetChassis}>
        <Text style={styles.TransportScreenCardTitleFiligree}>
          Vehicle Type
        </Text>
        <View style={styles.TransportScreenVehicleListLintel}>
          {vehicles.map(v => (
            <PressableCard
              key={v.type}
              style={[
                styles.TransportScreenVehicleCardFacetChassis,
                selectedVehicle === v.type
                  ? styles.TransportScreenVehicleCardActiveFacetChassis
                  : undefined,
              ]}
              onPress={() => setSelectedVehicle(v.type)}
            >
              <Text style={styles.TransportScreenVehicleEmojiSigil}>
                {v.type === 'Economy'
                  ? '🚙'
                  : v.type === 'Standard'
                  ? '🚘'
                  : '🏎️'}
              </Text>
              <View style={styles.TransportScreenVehicleInfoEnclave}>
                <Text style={styles.TransportScreenVehicleTypeFiligree}>
                  {v.type}
                </Text>
                <Text style={styles.TransportScreenVehicleMetaFiligree}>
                  👤 {v.passengerCapacity} · 🧳 {v.luggageCapacity} · ⏱{' '}
                  {v.estimatedArrival}
                </Text>
                <Text
                  style={styles.TransportScreenVehicleFeaturesFiligree}
                  numberOfLines={1}
                >
                  {v.features.slice(0, 2).join(' · ')}
                </Text>
              </View>
              <Text style={styles.TransportScreenVehiclePriceFiligree}>
                ${v.priceEstimate}
              </Text>
            </PressableCard>
          ))}
        </View>
      </View>

      {/* Trip details */}
      <View style={styles.TransportScreenCardFacetChassis}>
        <Text style={styles.TransportScreenCardTitleFiligree}>
          Trip Details
        </Text>
        <View style={styles.TransportScreenTripDetailsGridLintel}>
          <DetailInput label="Date" value={date} onPress={() => {}} />
          <DetailInput label="Time" value={time} onPress={() => {}} />
        </View>
        <View style={styles.TransportScreenPassengersRowLintel}>
          <Text style={styles.TransportScreenPassengersLabelFiligree}>
            Passengers
          </Text>
          <View style={styles.TransportScreenCounterRowLintel}>
            <TouchableOpacity
              style={styles.TransportScreenCounterPortico}
              onPress={() => setPassengers(Math.max(1, passengers - 1))}
            >
              <Text style={styles.TransportScreenCounterPorticoFiligree}>
                −
              </Text>
            </TouchableOpacity>
            <Text style={styles.TransportScreenCounterValueFiligree}>
              {passengers}
            </Text>
            <TouchableOpacity
              style={styles.TransportScreenCounterPortico}
              onPress={() => setPassengers(Math.min(4, passengers + 1))}
            >
              <Text style={styles.TransportScreenCounterPorticoFiligree}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Pickup map */}
      <View style={styles.TransportScreenCardFacetChassis}>
        <Text style={styles.TransportScreenCardTitleFiligree}>
          Pickup Location
        </Text>
        {pickupLocations.map(p => (
          <TouchableOpacity
            key={p.id}
            style={[
              styles.TransportScreenPickupRowLintel,
              selectedPickup === p.id &&
                styles.TransportScreenPickupRowActiveLintel,
            ]}
            onPress={() => setSelectedPickup(p.id)}
          >
            <Text style={styles.TransportScreenPickupPinSigil}>
              {selectedPickup === p.id ? '📍' : '📌'}
            </Text>
            <View style={styles.TransportScreenPickupInfo}>
              <Text style={styles.TransportScreenPickupNameFiligree}>
                {p.name}
              </Text>
              <Text style={styles.TransportScreenPickupDescriptionFiligree}>
                {p.description} · {p.distance}
              </Text>
            </View>
            {selectedPickup === p.id && (
              <Text style={styles.TransportScreenPickupCheckSigil}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Summary */}
      <View
        style={[
          styles.TransportScreenCardFacetChassis,
          styles.TransportScreenSummaryCardFacetChassis,
        ]}
      >
        <Text style={styles.TransportScreenCardTitleFiligree}>
          Reservation Summary
        </Text>
        <SummaryRow label="Destination" value={selectedDest} />
        <SummaryRow label="Vehicle" value={selectedVehicle} />
        <SummaryRow
          label="Pickup"
          value={pickupLocations.find(p => p.id === selectedPickup)?.name ?? ''}
        />
        <SummaryRow label="Date" value={date} />
        <SummaryRow label="Time" value={time} />
        <SummaryRow label="Passengers" value={String(passengers)} />
        <View style={styles.TransportScreenEstimatedPriceRowLintel}>
          <Text style={styles.TransportScreenEstimatedPriceLabelFiligree}>
            Estimated Price
          </Text>
          <Text style={styles.TransportScreenEstimatedPriceValueFiligree}>
            ${vehicle.priceEstimate} CAD
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.TransportScreenBookPortico}
        onPress={handleBook}
        activeOpacity={0.85}
      >
        <Text style={styles.TransportScreenBookPorticoFiligree}>
          Book Vehicle
        </Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const SegControl = ({
  segments,
  selected,
  onChange,
}: {
  segments: string[];
  selected: number;
  onChange: (i: number) => void;
}) => (
  <View style={segStyles.TransportScreenWrap}>
    {segments.map((s, i) => (
      <TouchableOpacity
        key={s}
        style={[
          segStyles.TransportScreenSegmentItemPortico,
          i === selected && segStyles.TransportScreenActive,
        ]}
        onPress={() => onChange(i)}
      >
        <Text
          style={[
            segStyles.TransportScreenTextFiligree,
            i === selected &&
              segStyles.TransportScreenSegmentTextActiveFiligree,
          ]}
        >
          {s}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const DetailInput = ({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={styles.TransportScreenTripDetailInputPortico}
    onPress={onPress}
  >
    <Text style={styles.TransportScreenTripDetailInputLabelFiligree}>
      {label}
    </Text>
    <Text style={styles.TransportScreenTripDetailInputValueFiligree}>
      {value}
    </Text>
  </TouchableOpacity>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.TransportScreenSummaryRowLintel}>
    <Text style={styles.TransportScreenSummaryLabelFiligree}>{label}</Text>
    <Text style={styles.TransportScreenSummaryValueFiligree}>{value}</Text>
  </View>
);

const segStyles = StyleSheet.create({
  TransportScreenWrap: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.sm,
    padding: 3,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  TransportScreenSegmentItemPortico: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: Radius.sm - 2,
  },
  TransportScreenActive: { backgroundColor: Colors.backgroundCardElevated },
  TransportScreenTextFiligree: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  TransportScreenSegmentTextActiveFiligree: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
});

const styles = StyleSheet.create({
  TransportScreenFacetChassis: { flex: 1, backgroundColor: Colors.background },
  TransportScreenScrollContent: {
    padding: Spacing.md,
    paddingTop: 15,
    gap: Spacing.md,
  },
  TransportScreenNavToReservationsPortico: {
    alignItems: 'center',
    paddingTop: 80,
  },
  TransportScreenNavToReservationsFiligree: {
    ...Typography.headline,
    color: Colors.red,
  },

  TransportScreenIllustrationEnclave: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: Spacing.md,
  },

  TransportScreenIllustrationEmojiSigil: { fontSize: 64 },

  TransportScreenIllustrationTitleFiligree: {
    ...Typography.title3,
    color: Colors.textPrimary,
  },

  TransportScreenIllustrationSubFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },

  TransportScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    ...(Shadows.small as object),
  },
  TransportScreenCardTitleFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },

  TransportScreenDestinationScrollLintel: { gap: Spacing.sm, paddingBottom: 4 },
  TransportScreenDestinationChipBadge: {
    backgroundColor: Colors.backgroundCardElevated,
    borderRadius: Radius.lg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: 140,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  TransportScreenDestinationChipActiveBadge: {
    borderColor: Colors.red,
    backgroundColor: Colors.redMuted,
  },
  TransportScreenDestinationChipEmojiSigil: { fontSize: 14 },
  TransportScreenDestinationChipFiligree: {
    ...Typography.caption1,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  TransportScreenDestinationChipActiveFiligree: { color: Colors.red },

  TransportScreenVehicleListLintel: { gap: Spacing.sm },
  TransportScreenVehicleCardFacetChassis: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.backgroundCardElevated,
    borderRadius: Radius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  TransportScreenVehicleCardActiveFacetChassis: {
    borderColor: Colors.red,
    backgroundColor: Colors.redMuted,
  },
  TransportScreenVehicleEmojiSigil: { fontSize: 28 },
  TransportScreenVehicleInfoEnclave: { flex: 1, gap: 2 },
  TransportScreenVehicleTypeFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  TransportScreenVehicleMetaFiligree: {
    ...Typography.caption1,
    color: Colors.textSecondary,
  },
  TransportScreenVehicleFeaturesFiligree: {
    ...Typography.caption2,
    color: Colors.textTertiary,
  },
  TransportScreenVehiclePriceFiligree: {
    ...Typography.headline,
    color: Colors.red,
    fontWeight: '700',
  },

  TransportScreenTripDetailsGridLintel: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },

  TransportScreenTripDetailInputPortico: {
    flex: 1,
    backgroundColor: Colors.backgroundCardElevated,
    borderRadius: Radius.md,
    padding: 12,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  TransportScreenTripDetailInputLabelFiligree: {
    ...Typography.caption2,
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  TransportScreenTripDetailInputValueFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '500',
  },

  TransportScreenPassengersRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TransportScreenPassengersLabelFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },
  TransportScreenCounterRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  TransportScreenCounterPortico: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.backgroundCardElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  TransportScreenCounterPorticoFiligree: {
    ...Typography.title3,
    color: Colors.textPrimary,
  },
  TransportScreenCounterValueFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    minWidth: 24,
    textAlign: 'center',
  },

  TransportScreenPickupRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: Radius.md,
    gap: Spacing.sm,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  TransportScreenPickupRowActiveLintel: {
    backgroundColor: Colors.redMuted,
    borderColor: Colors.red + '44',
  },
  TransportScreenPickupPinSigil: { fontSize: 20 },
  TransportScreenPickupInfo: { flex: 1 },
  TransportScreenPickupNameFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  TransportScreenPickupDescriptionFiligree: {
    ...Typography.caption1,
    color: Colors.textSecondary,
  },
  TransportScreenPickupCheckSigil: {
    color: Colors.red,
    fontSize: 18,
    fontWeight: '700',
  },

  TransportScreenSummaryCardFacetChassis: {},
  TransportScreenSummaryRowLintel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  TransportScreenSummaryLabelFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },
  TransportScreenSummaryValueFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  TransportScreenEstimatedPriceRowLintel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  TransportScreenEstimatedPriceLabelFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  TransportScreenEstimatedPriceValueFiligree: {
    ...Typography.headline,
    color: Colors.red,
    fontWeight: '700',
  },

  TransportScreenBookPortico: {
    backgroundColor: Colors.red,
    borderRadius: Radius.lg,
    padding: 17,
    alignItems: 'center',
  },
  TransportScreenBookPorticoFiligree: {
    ...Typography.headline,
    color: Colors.white,
  },
});
