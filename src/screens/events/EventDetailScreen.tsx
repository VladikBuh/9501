import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { getImage } from '../../assets/images';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { EventsStackParamList } from '../../types';

type Nav = NativeStackNavigationProp<EventsStackParamList>;
type Route = RouteProp<EventsStackParamList, 'EventDetail'>;

export default function EventDetailScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const insets = useSafeAreaInsets();
  const { event } = route.params;

  return (
    <View style={styles.EventDetailScreenFacetChassis}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Hero */}
        <ImageBackground
          source={getImage(event.image)}
          style={styles.EventDetailScreenHeroEnclave}
        >
          <LinearGradient
            colors={[
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0.10)',
              'rgba(10,10,10,0.55)',
              Colors.background,
            ]}
            style={styles.EventDetailScreenHeroGradient}
          />
          <View
            style={[
              styles.EventDetailScreenHeroContentEnclave,
              { paddingTop: insets.top + 60 },
            ]}
          >
            <View style={styles.EventDetailScreenCategoryChipBadge}>
              <Text style={styles.EventDetailScreenCategoryChipFiligree}>
                {event.categoryIcon} {event.category}
              </Text>
            </View>
            <Text style={styles.EventDetailScreenHeroTitleFiligree}>
              {event.title}
            </Text>
            <Text style={styles.EventDetailScreenHeroMetaFiligree}>
              {event.date} · {event.time} · {event.duration}
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.EventDetailScreenScrollContent}>
          {/* Details card */}
          <View style={styles.EventDetailScreenCardFacetChassis}>
            <Text style={styles.EventDetailScreenSectionTitleFiligree}>
              Event Details
            </Text>
            <Text style={styles.EventDetailScreenDescriptionFiligree}>
              {event.description}
            </Text>
          </View>

          <View style={styles.EventDetailScreenCardFacetChassis}>
            <DetailRow icon="📍" label="Venue" value={event.venue} />
            <DetailRow icon="📅" label="Date" value={event.date} />
            <DetailRow icon="🕐" label="Time" value={event.time} />
            <DetailRow icon="⏱" label="Duration" value={event.duration} />
            <DetailRow
              icon="👥"
              label="Remaining Seats"
              value={`${event.remainingSeats} available`}
            />
            <DetailRow icon="👔" label="Dress Code" value={event.dressCode} />
            <DetailRow
              icon="🔞"
              label="Age Restriction"
              value={event.ageRestriction}
            />
            <DetailRow icon="🎪" label="Organizer" value={event.organizer} />
          </View>

          {event.includedServices.length > 0 && (
            <View style={styles.EventDetailScreenCardFacetChassis}>
              <Text style={styles.EventDetailScreenSectionTitleFiligree}>
                What's Included
              </Text>
              {event.includedServices.map((s, i) => (
                <Text key={i} style={styles.EventDetailScreenIncludedFiligree}>
                  ✓ {s}
                </Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Fixed bottom button */}
      <View
        style={[
          styles.EventDetailScreenBottomBarLintel,
          { paddingBottom: insets.bottom + 16 },
        ]}
      >
        <View style={styles.EventDetailScreenPriceWrap}>
          <Text style={styles.EventDetailScreenPriceLabel}>per person</Text>
          <Text style={styles.EventDetailScreenPriceFiligree}>
            ${event.price} CAD
          </Text>
        </View>
        <TouchableOpacity
          style={styles.EventDetailScreenReservePortico}
          onPress={() => navigation.navigate('EventReserve', { event })}
          activeOpacity={0.85}
        >
          <Text style={styles.EventDetailScreenReservePorticoFiligree}>
            Reserve Event
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const DetailRow = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <View style={styles.EventDetailScreenDetailRowLintel}>
    <Text style={styles.EventDetailScreenDetailIconSigil}>{icon}</Text>
    <Text style={styles.EventDetailScreenDetailLabelFiligree}>{label}</Text>
    <Text style={styles.EventDetailScreenDetailValueFiligree}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  EventDetailScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  EventDetailScreenHeroEnclave: {
    height: 280,
    backgroundColor: Colors.backgroundCardElevated,
    justifyContent: 'flex-end',
  },

  EventDetailScreenHeroGradient: { ...StyleSheet.absoluteFill },
  EventDetailScreenHeroContentEnclave: { padding: Spacing.md },
  EventDetailScreenCategoryChipBadge: {
    backgroundColor: Colors.redMuted,
    alignSelf: 'flex-start',
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  EventDetailScreenCategoryChipFiligree: {
    ...Typography.caption1,
    color: Colors.red,
    fontWeight: '600',
  },
  EventDetailScreenHeroTitleFiligree: {
    ...Typography.title1,
    color: Colors.white,
    marginBottom: 4,
  },

  EventDetailScreenHeroMetaFiligree: {
    ...Typography.subheadline,
    color: 'rgba(255,255,255,0.7)',
  },

  EventDetailScreenScrollContent: { padding: Spacing.md, gap: Spacing.md },
  EventDetailScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    ...(Shadows.small as object),
  },
  EventDetailScreenSectionTitleFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  EventDetailScreenDescriptionFiligree: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 26,
  },

  EventDetailScreenDetailRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  EventDetailScreenDetailIconSigil: { width: 20, fontSize: 16 },
  EventDetailScreenDetailLabelFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    flex: 1,
  },
  EventDetailScreenDetailValueFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  EventDetailScreenIncludedFiligree: {
    ...Typography.subheadline,
    color: Colors.statusCompleted,
    paddingVertical: 4,
  },

  EventDetailScreenBottomBarLintel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.backgroundCard,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: 16,
    gap: Spacing.md,
  },

  EventDetailScreenPriceWrap: { flex: 1 },
  EventDetailScreenPriceLabel: {
    ...Typography.caption1,
    color: Colors.textTertiary,
  },
  EventDetailScreenPriceFiligree: {
    ...Typography.title3,
    color: Colors.textPrimary,
  },

  EventDetailScreenReservePortico: {
    backgroundColor: Colors.red,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.xl,
    paddingVertical: 14,
    flex: 1.5,
    alignItems: 'center',
  },
  EventDetailScreenReservePorticoFiligree: {
    ...Typography.headline,
    color: Colors.white,
  },
});
