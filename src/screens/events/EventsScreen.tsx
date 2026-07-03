import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { getImage } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { EventsStackParamList } from '../../types';
import { events, eventCategories, eventReservations } from '../../data/events';
import { PressableCard } from '../../components/common/PressableCard';
import { SectionHeader } from '../../components/common/SectionHeader';
import { ScreenTitleHeader } from '../../components/common/ScreenTitleHeader';

type Nav = NativeStackNavigationProp<EventsStackParamList>;

const segments = ['Upcoming', 'Today', 'My Reservations'];

export default function EventsScreen() {
  const navigation = useNavigation<Nav>();
  const [segment, setSegment] = useState(0);

  const filteredEvents =
    segment === 1
      ? events.filter(
          e => e.date === 'Dec 28, 2024' || e.date === 'Dec 29, 2024',
        )
      : events;

  const featured = events[4];

  if (segment === 2) {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.EventsScreenFacetChassis}
        contentContainerStyle={styles.EventsScreenScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ScreenTitleHeader title="Hotel Events" />
        <SegmentedControl
          segments={segments}
          selected={segment}
          onChange={setSegment}
        />
        {eventReservations.length === 0 ? (
          <View style={styles.EventsScreenEmpty}>
            <Text style={styles.EventsScreenEmptyIconSigil}>🎭</Text>
            <Text style={styles.EventsScreenEmptyTitleFiligree}>
              No Reservations
            </Text>
            <Text style={styles.EventsScreenEmptyDescriptionFiligree}>
              Reserve an event to see it here.
            </Text>
          </View>
        ) : (
          eventReservations.map(res => (
            <View
              key={res.id}
              style={styles.EventsScreenReservationCardFacetChassis}
            >
              <Image
                source={getImage(res.eventImage)}
                style={styles.EventsScreenReservationImage}
              />
              <View style={styles.EventsScreenReservationCardInfoEnclave}>
                <Text style={styles.EventsScreenReservationTitleFiligree}>
                  {res.eventTitle}
                </Text>
                <Text style={styles.EventsScreenReservationSubFiligree}>
                  {res.date} · {res.time}
                </Text>
                <Text style={styles.EventsScreenReservationSubFiligree}>
                  Guests: {res.guests}
                </Text>
                <Text
                  style={[
                    styles.EventsScreenReservationStatusFiligree,
                    {
                      color:
                        res.status === 'Confirmed'
                          ? Colors.statusCompleted
                          : Colors.statusAccepted,
                    },
                  ]}
                >
                  ● {res.status}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.EventsScreenFacetChassis}
      contentContainerStyle={styles.EventsScreenScrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ScreenTitleHeader title="Hotel Events" />
      <SegmentedControl
        segments={segments}
        selected={segment}
        onChange={setSegment}
      />

      {/* Featured Event */}
      <PressableCard
        onPress={() => navigation.navigate('EventDetail', { event: featured })}
        style={styles.EventsScreenFeaturedCardFacetChassis}
      >
        <ImageBackground
          source={getImage(featured.image)}
          style={styles.EventsScreenFeaturedBackdrop}
          imageStyle={{ borderRadius: Radius.xl }}
        >
          <LinearGradient
            colors={[
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0.05)',
              'rgba(0,0,0,0.35)',
              'rgba(0,0,0,0.70)',
              'rgba(0,0,0,0.92)',
            ]}
            style={styles.EventsScreenFeaturedGradient}
          >
            <View style={styles.EventsScreenFeaturedGradientInset}>
              <View style={styles.EventsScreenFeaturedChipBadge}>
                <Text style={styles.EventsScreenFeaturedChipBadgeFiligree}>
                  {featured.categoryIcon} Featured
                </Text>
              </View>
              <Text style={styles.EventsScreenFeaturedTitleFiligree}>
                {featured.title}
              </Text>
              <Text style={styles.EventsScreenFeaturedMetaFiligree}>
                {featured.date} · {featured.time} · {featured.venue}
              </Text>
              <View style={styles.EventsScreenFeaturedFooterLintel}>
                <Text style={styles.EventsScreenFeaturedPriceFiligree}>
                  ${featured.price} CAD
                </Text>
                <TouchableOpacity
                  style={styles.EventsScreenReservePortico}
                  onPress={() =>
                    navigation.navigate('EventReserve', { event: featured })
                  }
                >
                  <Text style={styles.EventsScreenReservePorticoFiligree}>
                    Reserve
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </PressableCard>

      {/* Categories */}
      <SectionHeader title="Event Categories" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.EventsScreenCategoryScrollLintel}
      >
        {eventCategories.map(cat => (
          <PressableCard
            key={cat.name}
            style={styles.EventsScreenCategoryCardFacetChassis}
            onPress={() =>
              navigation.navigate('CategoryEvents', {
                category: cat.name,
                categoryIcon: cat.icon,
              })
            }
          >
            <Text style={styles.EventsScreenCategoryEmojiSigil}>
              {cat.icon}
            </Text>
            <Text
              style={styles.EventsScreenCategoryNameFiligree}
              numberOfLines={2}
            >
              {cat.name}
            </Text>
          </PressableCard>
        ))}
      </ScrollView>

      {/* Event List */}
      <SectionHeader
        title={segment === 0 ? 'Upcoming Events' : "Today's Events"}
      />
      {filteredEvents.map(ev => (
        <PressableCard
          key={ev.id}
          style={styles.EventsScreenEventCardFacetChassis}
          onPress={() => navigation.navigate('EventDetail', { event: ev })}
        >
          <Image
            source={getImage(ev.image)}
            style={styles.EventsScreenEventImage}
          />
          <View style={styles.EventsScreenEventCardInfoEnclave}>
            <View style={styles.EventsScreenEventBadgeRowLintel}>
              <View style={styles.EventsScreenEventChipBadge}>
                <Text style={styles.EventsScreenEventChipBadgeFiligree}>
                  {ev.categoryIcon} {ev.category}
                </Text>
              </View>
              {ev.remainingSeats < 10 && (
                <View
                  style={[
                    styles.EventsScreenEventChipBadge,
                    { backgroundColor: Colors.statusCancelled + '22' },
                  ]}
                >
                  <Text
                    style={[
                      styles.EventsScreenEventChipBadgeFiligree,
                      { color: Colors.statusCancelled },
                    ]}
                  >
                    {ev.remainingSeats} left
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.EventsScreenEventTitleFiligree}>
              {ev.title}
            </Text>
            <Text
              style={styles.EventsScreenEventDescriptionFiligree}
              numberOfLines={2}
            >
              {ev.description}
            </Text>
            <View style={styles.EventsScreenEventMeta}>
              <Text style={styles.EventsScreenEventMetaItemFiligree}>
                📅 {ev.date}
              </Text>
              <Text style={styles.EventsScreenEventMetaItemFiligree}>
                🕐 {ev.time}
              </Text>
              <Text style={styles.EventsScreenEventMetaItemFiligree}>
                📍 {ev.venue}
              </Text>
            </View>
            <View style={styles.EventsScreenEventCardFooterLintel}>
              <Text style={styles.EventsScreenEventPriceFiligree}>
                ${ev.price} CAD
              </Text>
              <TouchableOpacity
                style={styles.EventsScreenSmallReservePortico}
                onPress={() =>
                  navigation.navigate('EventReserve', { event: ev })
                }
              >
                <Text style={styles.EventsScreenSmallReservePorticoFiligree}>
                  Reserve
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </PressableCard>
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const SegmentedControl = ({
  segments,
  selected,
  onChange,
}: {
  segments: string[];
  selected: number;
  onChange: (i: number) => void;
}) => (
  <View style={segStyles.EventsScreenWrap}>
    {segments.map((s, i) => (
      <TouchableOpacity
        key={s}
        style={[
          segStyles.EventsScreenSegmentItemPortico,
          i === selected && segStyles.EventsScreenSegmentItemActivePortico,
        ]}
        onPress={() => onChange(i)}
      >
        <Text
          style={[
            segStyles.EventsScreenTextFiligree,
            i === selected && segStyles.EventsScreenSegmentTextActiveFiligree,
          ]}
        >
          {s}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const segStyles = StyleSheet.create({
  EventsScreenWrap: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.sm,
    padding: 3,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  EventsScreenSegmentItemPortico: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: Radius.sm - 2,
  },
  EventsScreenSegmentItemActivePortico: {
    backgroundColor: Colors.backgroundCardElevated,
  },
  EventsScreenTextFiligree: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  EventsScreenSegmentTextActiveFiligree: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
});

const styles = StyleSheet.create({
  EventsScreenFacetChassis: { flex: 1, backgroundColor: Colors.background },
  EventsScreenScrollContent: {
    padding: Spacing.md,
    paddingTop: 15,
    gap: Spacing.md,
  },
  EventsScreenEmpty: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: Spacing.sm,
  },

  EventsScreenEmptyIconSigil: { fontSize: 48 },
  EventsScreenEmptyTitleFiligree: {
    ...Typography.title3,
    color: Colors.textPrimary,
  },
  EventsScreenEmptyDescriptionFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },

  EventsScreenFeaturedCardFacetChassis: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    ...(Shadows.large as object),
  },
  EventsScreenFeaturedBackdrop: {
    height: 240,
    backgroundColor: Colors.backgroundCardElevated,
    justifyContent: 'flex-end',
  },
  EventsScreenFeaturedGradient: {},
  EventsScreenFeaturedGradientInset: { padding: Spacing.md },
  EventsScreenFeaturedChipBadge: {
    backgroundColor: Colors.redMuted,
    alignSelf: 'flex-start',
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },

  EventsScreenFeaturedChipBadgeFiligree: {
    ...Typography.caption1,
    color: Colors.red,
    fontWeight: '600',
  },
  EventsScreenFeaturedTitleFiligree: {
    ...Typography.title2,
    color: Colors.white,
    marginBottom: 4,
  },
  EventsScreenFeaturedMetaFiligree: {
    ...Typography.footnote,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: Spacing.sm,
  },
  EventsScreenFeaturedFooterLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  EventsScreenFeaturedPriceFiligree: {
    ...Typography.headline,
    color: Colors.white,
    fontWeight: '700',
  },
  EventsScreenReservePortico: {
    backgroundColor: Colors.red,
    borderRadius: Radius.md,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  EventsScreenReservePorticoFiligree: {
    ...Typography.subheadline,
    color: Colors.white,
    fontWeight: '600',
  },

  EventsScreenCategoryScrollLintel: { gap: Spacing.sm, paddingBottom: 4 },
  EventsScreenCategoryCardFacetChassis: {
    width: 110,
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.lg,
    padding: Spacing.sm,
    alignItems: 'center',
    ...(Shadows.small as object),
  },

  EventsScreenCategoryEmojiSigil: { fontSize: 28, marginBottom: 4 },
  EventsScreenCategoryNameFiligree: {
    ...Typography.caption1,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },

  EventsScreenEventCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    ...(Shadows.small as object),
  },
  EventsScreenEventImage: {
    height: 130,
    width: '100%',
    backgroundColor: Colors.backgroundCardElevated,
  },
  EventsScreenEventCardInfoEnclave: { padding: Spacing.md, gap: 6 },
  EventsScreenEventBadgeRowLintel: { flexDirection: 'row', gap: 6 },
  EventsScreenEventChipBadge: {
    backgroundColor: Colors.redMuted,
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  EventsScreenEventChipBadgeFiligree: {
    ...Typography.caption2,
    color: Colors.red,
    fontWeight: '600',
  },
  EventsScreenEventTitleFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  EventsScreenEventDescriptionFiligree: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  EventsScreenEventMeta: { gap: 3 },
  EventsScreenEventMetaItemFiligree: {
    ...Typography.caption1,
    color: Colors.textTertiary,
  },
  EventsScreenEventCardFooterLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  EventsScreenEventPriceFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    fontWeight: '700',
  },

  EventsScreenSmallReservePortico: {
    backgroundColor: Colors.red,
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  EventsScreenSmallReservePorticoFiligree: {
    ...Typography.footnote,
    color: Colors.white,
    fontWeight: '600',
  },

  EventsScreenReservationCardFacetChassis: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    ...(Shadows.small as object),
  },
  EventsScreenReservationImage: {
    width: 90,
    height: '100%' as any,
    backgroundColor: Colors.backgroundCardElevated,
  },
  EventsScreenReservationCardInfoEnclave: {
    flex: 1,
    padding: Spacing.md,
    gap: 4,
  },
  EventsScreenReservationTitleFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  EventsScreenReservationSubFiligree: {
    ...Typography.caption1,
    color: Colors.textSecondary,
  },

  EventsScreenReservationStatusFiligree: {
    ...Typography.caption1,
    fontWeight: '600',
    marginTop: 2,
  },
});
