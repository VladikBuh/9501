import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { transportReservations as initialReservations } from '../../data/vehicles';
import { TransportReservation } from '../../types';
import { TransportStackParamList } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';

type Nav = NativeStackNavigationProp<TransportStackParamList>;

export default function MyTransportScreen() {
  const navigation = useNavigation<Nav>();
  const [reservations, setReservations] =
    useState<TransportReservation[]>(initialReservations);

  const handleCancel = (id: string, destination: string) => {
    Alert.alert(
      'Cancel Booking',
      `Cancel your vehicle booking to "${destination}"?`,
      [
        { text: 'Keep Booking', style: 'cancel' },
        {
          text: 'Cancel Booking',
          style: 'destructive',
          onPress: () =>
            setReservations(prev =>
              prev.map(r =>
                r.id === id ? { ...r, status: 'Cancelled' as const } : r,
              ),
            ),
        },
      ],
    );
  };

  const handleEdit = (id: string) => {
    Alert.alert(
      'Edit Booking',
      'To modify your booking please contact our concierge or make a new reservation.',
      [
        {
          text: 'Cancel Booking',
          style: 'destructive',
          onPress: () => handleCancel(id, ''),
        },
        {
          text: 'New Booking',
          onPress: () => navigation.navigate('Transport'),
        },
        { text: 'Close', style: 'cancel' },
      ],
    );
  };

  const active = reservations.filter(r => r.status === 'Active');
  const past = reservations.filter(r => r.status !== 'Active');

  if (reservations.length === 0) {
    return (
      <EmptyState
        icon="🚗"
        title="No Reservations"
        description="Book a vehicle to see your reservations here."
      />
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.MyTransportScreenFacetChassis}
      contentContainerStyle={styles.MyTransportScreenScrollContent}
      showsVerticalScrollIndicator={false}
    >
      {active.length > 0 && (
        <>
          <Text style={styles.MyTransportScreenSectionLabelFiligree}>
            Active
          </Text>
          {active.map(res => (
            <ReservationCard
              key={res.id}
              res={res}
              onEdit={() => handleEdit(res.id)}
              onCancel={() => handleCancel(res.id, res.destination)}
            />
          ))}
        </>
      )}
      {past.length > 0 && (
        <>
          <Text style={styles.MyTransportScreenSectionLabelFiligree}>Past</Text>
          {past.map(res => (
            <ReservationCard key={res.id} res={res} past />
          ))}
        </>
      )}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

interface CardProps {
  res: TransportReservation;
  past?: boolean;
  onEdit?: () => void;
  onCancel?: () => void;
}

const ReservationCard = ({ res, past, onEdit, onCancel }: CardProps) => (
  <View
    style={[
      styles.MyTransportScreenCardFacetChassis,
      past && styles.MyTransportScreenCardPastFacetChassis,
    ]}
  >
    <View style={styles.MyTransportScreenCardHeaderLintel}>
      <Text style={styles.MyTransportScreenVehicleEmojiSigil}>
        {res.vehicleType === 'Premium'
          ? '🏎️'
          : res.vehicleType === 'Standard'
          ? '🚘'
          : '🚙'}
      </Text>
      <View style={styles.MyTransportScreenHeaderInfoEnclave}>
        <StatusBadge status={res.status} small />
        <Text style={styles.MyTransportScreenReservationNumberFiligree}>
          {res.reservationNumber}
        </Text>
        <Text style={styles.MyTransportScreenDestinationFiligree}>
          {res.destination}
        </Text>
      </View>
    </View>
    <View style={styles.MyTransportScreenDividerLintel} />
    <View style={styles.MyTransportScreenDetailsLintel}>
      <DetailRow icon="📍" value={res.pickupPoint} />
      <DetailRow icon="📅" value={`${res.date} · ${res.time}`} />
      <DetailRow
        icon="👤"
        value={`${res.passengerCount} passenger${
          res.passengerCount > 1 ? 's' : ''
        }`}
      />
      <DetailRow icon="💰" value={`$${res.estimatedPrice} CAD`} />
    </View>
    {!past && (
      <View style={styles.MyTransportScreenActionsLintel}>
        <TouchableOpacity
          style={styles.MyTransportScreenEditPortico}
          onPress={onEdit}
        >
          <Text style={styles.MyTransportScreenEditPorticoFiligree}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.MyTransportScreenCancelPortico}
          onPress={onCancel}
        >
          <Text style={styles.MyTransportScreenCancelPorticoFiligree}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

const DetailRow = ({ icon, value }: { icon: string; value: string }) => (
  <View style={styles.MyTransportScreenDetailRowLintel}>
    <Text style={styles.MyTransportScreenDetailIconSigil}>{icon}</Text>
    <Text style={styles.MyTransportScreenDetailValueFiligree}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  MyTransportScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  MyTransportScreenScrollContent: {
    padding: Spacing.md,
    paddingTop: 15,
    gap: Spacing.sm,
  },
  MyTransportScreenSectionLabelFiligree: {
    ...Typography.footnote,
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: Spacing.sm,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  MyTransportScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    ...(Shadows.small as object),
  },

  MyTransportScreenCardPastFacetChassis: { opacity: 0.7 },
  MyTransportScreenCardHeaderLintel: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.md,
    alignItems: 'center',
  },

  MyTransportScreenVehicleEmojiSigil: { fontSize: 36 },
  MyTransportScreenHeaderInfoEnclave: { flex: 1, gap: 4 },
  MyTransportScreenReservationNumberFiligree: {
    ...Typography.caption1,
    color: Colors.textTertiary,
    letterSpacing: 0.5,
  },
  MyTransportScreenDestinationFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  MyTransportScreenDividerLintel: {
    height: 0.5,
    backgroundColor: Colors.border,
  },
  MyTransportScreenDetailsLintel: { padding: Spacing.md, gap: 8 },
  MyTransportScreenDetailRowLintel: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  MyTransportScreenDetailIconSigil: { width: 20, fontSize: 14 },
  MyTransportScreenDetailValueFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },
  MyTransportScreenActionsLintel: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
  },

  MyTransportScreenEditPortico: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderRightColor: Colors.border,
  },
  MyTransportScreenEditPorticoFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  MyTransportScreenCancelPortico: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
  },

  MyTransportScreenCancelPorticoFiligree: {
    ...Typography.subheadline,
    color: Colors.statusCancelled,
    fontWeight: '500',
  },
});
