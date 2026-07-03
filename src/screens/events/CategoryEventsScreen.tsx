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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { EventsStackParamList } from '../../types';
import { events } from '../../data/events';
import { PressableCard } from '../../components/common/PressableCard';

import { EmptyState } from '../../components/common/EmptyState';
import { ScreenTitleHeader } from '../../components/common/ScreenTitleHeader';

type Nav = NativeStackNavigationProp<EventsStackParamList>;
type Route = RouteProp<EventsStackParamList, 'CategoryEvents'>;

export default function CategoryEventsScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { category, categoryIcon } = route.params;
  const filtered = events.filter(e => e.category === category);

  if (filtered.length === 0) {
    return (
      <View style={styles.CategoryEventsScreenFacetChassis}>
        <ScreenTitleHeader title={category} onBack={() => navigation.goBack()} />
        <EmptyState
          icon={categoryIcon}
          title="No Events"
          description="No events in this category right now."
        />
      </View>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.CategoryEventsScreenFacetChassis}
      contentContainerStyle={styles.CategoryEventsScreenScrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ScreenTitleHeader title={category} />
      {filtered.map(ev => (
        <PressableCard
          key={ev.id}
          style={styles.CategoryEventsScreenCardFacetChassis}
          onPress={() => navigation.navigate('EventDetail', { event: ev })}
        >
          <Image
            source={getImage(ev.image)}
            style={styles.CategoryEventsScreenEventImage}
          />
          <View style={styles.CategoryEventsScreenInfoEnclave}>
            <Text style={styles.CategoryEventsScreenTitleFiligree}>
              {ev.title}
            </Text>
            <Text
              style={styles.CategoryEventsScreenDescriptionFiligree}
              numberOfLines={2}
            >
              {ev.description}
            </Text>
            <Text style={styles.CategoryEventsScreenMetaFiligree}>
              {ev.date} · {ev.time} · {ev.venue}
            </Text>
            <View style={styles.CategoryEventsScreenFooterLintel}>
              <Text style={styles.CategoryEventsScreenPriceFiligree}>
                ${ev.price} CAD
              </Text>
              <TouchableOpacity
                style={styles.CategoryEventsScreenReservePortico}
                onPress={() =>
                  navigation.navigate('EventReserve', { event: ev })
                }
              >
                <Text style={styles.CategoryEventsScreenReservePorticoFiligree}>
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

const styles = StyleSheet.create({
  CategoryEventsScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  CategoryEventsScreenScrollContent: {
    padding: Spacing.md,
    paddingTop: 15,
    gap: Spacing.md,
  },
  CategoryEventsScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    ...(Shadows.small as object),
  },

  CategoryEventsScreenEventImage: {
    height: 120,
    width: '100%',
    backgroundColor: Colors.backgroundCardElevated,
  },

  CategoryEventsScreenInfoEnclave: { padding: Spacing.md, gap: 6 },
  CategoryEventsScreenTitleFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  CategoryEventsScreenDescriptionFiligree: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  CategoryEventsScreenMetaFiligree: {
    ...Typography.caption1,
    color: Colors.textTertiary,
  },
  CategoryEventsScreenFooterLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },

  CategoryEventsScreenPriceFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    fontWeight: '700',
  },

  CategoryEventsScreenReservePortico: {
    backgroundColor: Colors.red,
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  CategoryEventsScreenReservePorticoFiligree: {
    ...Typography.footnote,
    color: Colors.white,
    fontWeight: '600',
  },
});
