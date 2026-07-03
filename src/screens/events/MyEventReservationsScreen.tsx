import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { eventReservations as initialReservations } from '../../data/events';
import { EventReservation } from '../../types';
import { getImage } from '../../assets/images';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { ScreenTitleHeader } from '../../components/common/ScreenTitleHeader';

export default function MyEventReservationsScreen() {
  const navigation = useNavigation();
  const [reservations, setReservations] =
    useState<EventReservation[]>(initialReservations);

  const handleCancel = (id: string, title: string) => {
    Alert.alert(
      'Cancel Reservation',
      `Are you sure you want to cancel your reservation for "${title}"?`,
      [
        { text: 'Keep Reservation', style: 'cancel' },
        {
          text: 'Cancel Reservation',
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

  const handleQR = (resNum: string) => {
    Alert.alert(
      'QR Code',
      `Reservation: ${resNum}\n\nShow this code at the event entrance.`,
      [{ text: 'Close' }],
    );
  };

  if (reservations.length === 0) {
    return (
      <View style={styles.MyEventReservationsScreenFacetChassis}>
        <ScreenTitleHeader
          title="My Reservations"
          onBack={() => navigation.goBack()}
        />
        <EmptyState
          icon="🎭"
          title="No Reservations"
          description="Reserve an event to see it here."
        />
      </View>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.MyEventReservationsScreenFacetChassis}
      contentContainerStyle={styles.MyEventReservationsScreenScrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ScreenTitleHeader title="My Reservations" />
      {reservations.map(res => (
        <View
          key={res.id}
          style={styles.MyEventReservationsScreenCardFacetChassis}
        >
          <View style={styles.MyEventReservationsScreenCardHeaderLintel}>
            <Image
              source={getImage(res.eventImage)}
              style={styles.MyEventReservationsScreenReservationImage}
            />
            <View style={styles.MyEventReservationsScreenHeaderInfoEnclave}>
              <StatusBadge status={res.status} small />
              <Text style={styles.MyEventReservationsScreenTitleFiligree}>
                {res.eventTitle}
              </Text>
              <Text
                style={
                  styles.MyEventReservationsScreenReservationNumberFiligree
                }
              >
                {res.reservationNumber}
              </Text>
            </View>
          </View>
          <View style={styles.MyEventReservationsScreenDividerLintel} />
          <View style={styles.MyEventReservationsScreenDetailsLintel}>
            <DetailRow icon="📅" value={res.date} />
            <DetailRow icon="🕐" value={res.time} />
            <DetailRow
              icon="👥"
              value={`${res.guests} guest${res.guests > 1 ? 's' : ''}`}
            />
            {res.notes ? <DetailRow icon="📝" value={res.notes} /> : null}
          </View>
          {res.status !== 'Cancelled' && res.status !== 'Completed' && (
            <View style={styles.MyEventReservationsScreenActionsLintel}>
              <TouchableOpacity
                style={styles.MyEventReservationsScreenActionPortico}
                onPress={() => handleQR(res.reservationNumber)}
              >
                <Text
                  style={styles.MyEventReservationsScreenActionPorticoFiligree}
                >
                  🔳 Show QR Code
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.MyEventReservationsScreenActionPortico,
                  styles.MyEventReservationsScreenCancelPortico,
                ]}
                onPress={() => handleCancel(res.id, res.eventTitle)}
              >
                <Text
                  style={[
                    styles.MyEventReservationsScreenActionPorticoFiligree,
                    { color: Colors.statusCancelled },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const DetailRow = ({ icon, value }: { icon: string; value: string }) => (
  <View style={styles.MyEventReservationsScreenDetailRowLintel}>
    <Text style={styles.MyEventReservationsScreenDetailIconSigil}>{icon}</Text>
    <Text style={styles.MyEventReservationsScreenDetailValueFiligree}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  MyEventReservationsScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  MyEventReservationsScreenScrollContent: {
    padding: Spacing.md,
    paddingTop: 15,
    gap: Spacing.md,
  },

  MyEventReservationsScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    ...(Shadows.small as object),
  },
  MyEventReservationsScreenCardHeaderLintel: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.md,
  },

  MyEventReservationsScreenReservationImage: {
    width: 70,
    height: 70,
    borderRadius: Radius.md,
    backgroundColor: Colors.backgroundCardElevated,
  },
  MyEventReservationsScreenHeaderInfoEnclave: { flex: 1, gap: 4 },
  MyEventReservationsScreenTitleFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },

  MyEventReservationsScreenReservationNumberFiligree: {
    ...Typography.caption1,
    color: Colors.textTertiary,
    letterSpacing: 0.5,
  },
  MyEventReservationsScreenDividerLintel: {
    height: 0.5,
    backgroundColor: Colors.border,
  },

  MyEventReservationsScreenDetailsLintel: { padding: Spacing.md, gap: 8 },
  MyEventReservationsScreenDetailRowLintel: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },

  MyEventReservationsScreenDetailIconSigil: { width: 20, fontSize: 14 },
  MyEventReservationsScreenDetailValueFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },
  MyEventReservationsScreenActionsLintel: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
  },
  MyEventReservationsScreenActionPortico: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderRightColor: Colors.border,
  },
  MyEventReservationsScreenCancelPortico: { borderRightWidth: 0 },
  MyEventReservationsScreenActionPorticoFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
});
