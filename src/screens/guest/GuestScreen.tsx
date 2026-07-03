import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { GuestStackParamList } from '../../types';
import { guestData } from '../../data/guest';
import { ScreenTitleHeader } from '../../components/common/ScreenTitleHeader';

type Nav = NativeStackNavigationProp<GuestStackParamList>;

export default function GuestScreen() {
  const navigation = useNavigation<Nav>();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Woobine Room Hub — Reservation ${guestData.reservationNumber}\nGuest: ${guestData.name}\nRoom: ${guestData.roomNumber}\nCheck-in: ${guestData.checkIn}\nCheck-out: ${guestData.checkOut}`,
      });
    } catch {}
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.GuestScreenFacetChassis}
      contentContainerStyle={styles.GuestScreenScrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ScreenTitleHeader title="Guest Information" />
      <LinearGradient
        colors={[Colors.gradientRedStart, Colors.gradientRedEnd]}
        style={styles.GuestScreenWelcomeCardFacetChassis}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.GuestScreenWelcomeCardInset}>
          <View style={styles.GuestScreenAvatarEnclave}>
            <View style={styles.GuestScreenAvatar}>
              <Text style={styles.GuestScreenAvatarFiligree}>
                {guestData.name.charAt(0)}
              </Text>
            </View>
            <View style={styles.GuestScreenVIPChipBadge}>
              <Text style={styles.GuestScreenVIPChipFiligree}>⭐ VIP</Text>
            </View>
          </View>
          <Text style={styles.GuestScreenGuestNameFiligree}>
            {guestData.name}
          </Text>
          <Text style={styles.GuestScreenRoomTextFiligree}>
            Room {guestData.roomNumber} · {guestData.roomType}
          </Text>
          <View style={styles.GuestScreenStatusChipBadge}>
            <View style={styles.GuestScreenStatusChipDotSigil} />
            <Text style={styles.GuestScreenStatusChipFiligree}>
              {guestData.status}
            </Text>
          </View>
          <Text style={styles.GuestScreenMemberLevelFiligree}>
            {guestData.membershipLevel}
          </Text>
        </View>
      </LinearGradient>

      {/* Guest Card (barcode) */}
      <View
        style={[
          styles.GuestScreenCardFacetChassis,
          styles.GuestScreenBarcodeCardFacetChassis,
        ]}
      >
        <Text style={styles.GuestScreenSectionTitleFiligree}>
          Digital Guest Card
        </Text>
        {/* Barcode visual */}
        <View style={styles.GuestScreenBarcodeEnclave}>
          <View style={styles.GuestScreenBarcode}>
            {Array.from({ length: 50 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.GuestScreenBarcodePieceSigil,
                  {
                    width: [1, 2, 3, 1, 2][i % 5],
                    backgroundColor:
                      i % 7 === 0 ? Colors.backgroundCard : Colors.textPrimary,
                  },
                ]}
              />
            ))}
          </View>
          <Text style={styles.GuestScreenReservationNumberFiligree}>
            {guestData.reservationNumber}
          </Text>
        </View>
        <View style={styles.GuestScreenGuestCardInfoEnclave}>
          <GuestInfoRow label="Guest Name" value={guestData.name} />
          <GuestInfoRow label="Room Number" value={guestData.roomNumber} />
          <GuestInfoRow label="Check-in" value={guestData.checkIn} />
          <GuestInfoRow label="Check-out" value={guestData.checkOut} />
          <GuestInfoRow label="Membership" value={guestData.membershipLevel} />
        </View>
        <View style={styles.GuestScreenBarcodeActionsLintel}>
          <TouchableOpacity
            style={[
              styles.GuestScreenBarcodePortico,
              styles.GuestScreenBarcodeSecondaryPortico,
            ]}
            onPress={handleShare}
            activeOpacity={0.8}
          >
            <Text style={styles.GuestScreenBarcodeSecondaryPorticoFiligree}>
              Share Reservation
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stay Information */}
      <View style={styles.GuestScreenCardFacetChassis}>
        <Text style={styles.GuestScreenSectionTitleFiligree}>
          Stay Information
        </Text>
        <View style={styles.GuestScreenStayGridEnclave}>
          <StayRow icon="🏨" label="Hotel" value="Woobine Room Hub" />
          <StayRow icon="🛏" label="Room Type" value={guestData.roomType} />
          <StayRow icon="🏢" label="Floor" value={guestData.floor} />
          <StayRow
            icon="👥"
            label="Guests"
            value={String(guestData.numberOfGuests)}
          />
          <StayRow icon="📅" label="Check-in" value={guestData.checkIn} />
          <StayRow icon="📅" label="Check-out" value={guestData.checkOut} />
          <StayRow
            icon="🍳"
            label="Breakfast"
            value={guestData.breakfastIncluded ? 'Included' : 'Not included'}
          />
          <StayRow
            icon="🚗"
            label="Parking"
            value={guestData.parkingIncluded ? 'Included' : 'Not included'}
          />
          <StayRow
            icon="🕐"
            label="Late Checkout"
            value={guestData.lateCheckout ? 'Available' : 'Not available'}
          />
          <StayRow icon="📶" label="Wi-Fi" value={guestData.wifiStatus} />
          <StayRow
            icon="🎩"
            label="Concierge"
            value={guestData.conciergeAccess ? 'Full Access' : 'Standard'}
          />
        </View>
      </View>

      {/* Hotel Benefits */}
      <View style={styles.GuestScreenCardFacetChassis}>
        <Text style={styles.GuestScreenSectionTitleFiligree}>
          Hotel Benefits
        </Text>
        <View style={styles.GuestScreenBenefitsEnclave}>
          {guestData.benefits.map((b, i) => (
            <View key={i} style={styles.GuestScreenBenefitChipBadge}>
              <Text style={styles.GuestScreenBenefitIconSigil}>⭐</Text>
              <Text style={styles.GuestScreenBenefitChipFiligree}>
                {b.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const GuestInfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.GuestScreenGuestInfoRowLintel}>
    <Text style={styles.GuestScreenGuestInfoLabelFiligree}>{label}</Text>
    <Text style={styles.GuestScreenGuestInfoValueFiligree}>{value}</Text>
  </View>
);

const StayRow = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <View style={styles.GuestScreenStayRowLintel}>
    <Text style={styles.GuestScreenStayIconSigil}>{icon}</Text>
    <Text style={styles.GuestScreenStayLabelFiligree}>{label}</Text>
    <Text style={styles.GuestScreenStayValueFiligree}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  GuestScreenFacetChassis: { flex: 1, backgroundColor: Colors.background },
  GuestScreenScrollContent: {
    padding: Spacing.md,
    paddingTop: 15,
    gap: Spacing.md,
  },

  GuestScreenWelcomeCardFacetChassis: {
    borderRadius: Radius.xxl,
    ...(Shadows.red as object),
  },

  GuestScreenWelcomeCardInset: { padding: Spacing.xl, alignItems: 'center' },

  GuestScreenAvatarEnclave: { position: 'relative', marginBottom: Spacing.md },
  GuestScreenAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },

  GuestScreenAvatarFiligree: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.white,
  },
  GuestScreenVIPChipBadge: {
    position: 'absolute',
    bottom: -4,
    right: -12,
    backgroundColor: '#FFD700',
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  GuestScreenVIPChipFiligree: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7B5E00',
  },
  GuestScreenGuestNameFiligree: {
    ...Typography.title2,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 4,
  },

  GuestScreenRoomTextFiligree: {
    ...Typography.subheadline,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: Spacing.sm,
  },
  GuestScreenStatusChipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: Spacing.sm,
  },

  GuestScreenStatusChipDotSigil: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.statusCompleted,
  },
  GuestScreenStatusChipFiligree: {
    ...Typography.footnote,
    color: Colors.white,
    fontWeight: '500',
  },
  GuestScreenMemberLevelFiligree: {
    ...Typography.caption1,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  GuestScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    ...(Shadows.small as object),
  },

  GuestScreenSectionTitleFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  GuestScreenBarcodeCardFacetChassis: {},
  GuestScreenBarcodeEnclave: { alignItems: 'center', marginBottom: Spacing.md },
  GuestScreenBarcode: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'stretch',
    gap: 1,
    marginBottom: 8,
  },

  GuestScreenBarcodePieceSigil: { flex: 0, borderRadius: 1 },

  GuestScreenReservationNumberFiligree: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    letterSpacing: 2,
    fontWeight: '500',
  },
  GuestScreenGuestCardInfoEnclave: { gap: 4, marginBottom: Spacing.md },
  GuestScreenGuestInfoRowLintel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  GuestScreenGuestInfoLabelFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },
  GuestScreenGuestInfoValueFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  GuestScreenBarcodeActionsLintel: { gap: Spacing.sm },
  GuestScreenBarcodePortico: {
    backgroundColor: Colors.red,
    borderRadius: Radius.md,
    padding: 14,
    alignItems: 'center',
  },
  GuestScreenBarcodeSecondaryPortico: {
    backgroundColor: Colors.red,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  GuestScreenBarcodePorticoFiligree: {
    ...Typography.subheadline,
    color: Colors.white,
    fontWeight: '600',
  },
  GuestScreenBarcodeSecondaryPorticoFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '600',
  },

  GuestScreenStayGridEnclave: { gap: 2 },
  GuestScreenStayRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  GuestScreenStayIconSigil: { fontSize: 18, width: 24 },
  GuestScreenStayLabelFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    flex: 1,
  },
  GuestScreenStayValueFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '500',
  },

  GuestScreenBenefitsEnclave: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  GuestScreenBenefitChipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.redMuted,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  GuestScreenBenefitIconSigil: { fontSize: 12 },
  GuestScreenBenefitChipFiligree: {
    ...Typography.caption1,
    color: Colors.red,
    fontWeight: '600',
  },
});
