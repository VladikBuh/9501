import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { ExploreStackParamList } from '../../types';
import { locations, locationCategories } from '../../data/locations';
import { PressableCard } from '../../components/common/PressableCard';
import { getImage } from '../../assets/images';

type Nav = NativeStackNavigationProp<ExploreStackParamList>;

export default function ExploreScreen() {
  const navigation = useNavigation<Nav>();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Locations');

  const filtered = useMemo(() => {
    let list = locations;
    if (category !== 'All Locations')
      list = list.filter(l => l.category === category);
    if (search.trim())
      list = list.filter(l =>
        l.name.toLowerCase().includes(search.toLowerCase()),
      );
    return list;
  }, [search, category]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.ExploreScreenFacetChassis}
      contentContainerStyle={styles.ExploreScreenScrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Search */}
      <View style={styles.ExploreScreenSearchBarPortico}>
        <Text style={styles.ExploreScreenSearchIconSigil}>🔍</Text>
        <TextInput
          style={styles.ExploreScreenSearchInputFiligree}
          placeholder="Search locations..."
          placeholderTextColor={Colors.textTertiary}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.ExploreScreenClearIconSigil}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.ExploreScreenCategoryChipsScrollLintel}
      >
        {locationCategories.map(cat => (
          <TouchableOpacity
            key={cat.name}
            style={[
              styles.ExploreScreenCategoryChipPortico,
              category === cat.name &&
                styles.ExploreScreenCategoryChipActivePortico,
            ]}
            onPress={() => setCategory(cat.name)}
            activeOpacity={0.7}
          >
            {cat.emoji && (
              <Text style={styles.ExploreScreenCategoryChipEmojiSigil}>
                {cat.emoji}
              </Text>
            )}
            <Text
              style={[
                styles.ExploreScreenCategoryChipFiligree,
                category === cat.name &&
                  styles.ExploreScreenCategoryChipActiveFiligree,
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Location cards */}
      {filtered.length === 0 ? (
        <View style={styles.ExploreScreenEmpty}>
          <Text style={styles.ExploreScreenEmptyIconSigil}>🗺️</Text>
          <Text style={styles.ExploreScreenEmptyTitleFiligree}>No Results</Text>
          <Text style={styles.ExploreScreenEmptyDescriptionFiligree}>
            Try adjusting your search or category.
          </Text>
        </View>
      ) : (
        filtered.map(loc => (
          <PressableCard
            key={loc.id}
            style={styles.ExploreScreenLocationCardFacetChassis}
            onPress={() =>
              navigation.navigate('LocationDetail', { location: loc })
            }
          >
            <Image
              source={getImage(loc.image)}
              style={styles.ExploreScreenLocationImage}
            />
            <View style={styles.ExploreScreenLocInfo}>
              <View style={styles.ExploreScreenLocationCardHeaderLintel}>
                <View style={styles.ExploreScreenLocationCategoryChipBadge}>
                  <Text
                    style={styles.ExploreScreenLocationCategoryChipFiligree}
                  >
                    {loc.categoryIcon} {loc.category}
                  </Text>
                </View>
                <Text style={styles.ExploreScreenLocationDistanceFiligree}>
                  {loc.distance}
                </Text>
              </View>
              <Text style={styles.ExploreScreenLocationNameFiligree}>
                {loc.name}
              </Text>
              <Text
                style={styles.ExploreScreenLocationDescriptionFiligree}
                numberOfLines={2}
              >
                {loc.description}
              </Text>
              <View style={styles.ExploreScreenLocationCardFooterLintel}>
                <Text style={styles.ExploreScreenLocationTravelFiligree}>
                  🚗 {loc.travelTime}
                </Text>
                <TouchableOpacity
                  style={styles.ExploreScreenBookPortico}
                  onPress={() =>
                    (navigation.getParent() as any)?.navigate('TransportTab')
                  }
                >
                  <Text style={styles.ExploreScreenBookPorticoFiligree}>
                    Book Car
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </PressableCard>
        ))
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ExploreScreenFacetChassis: { flex: 1, backgroundColor: Colors.background },
  ExploreScreenScrollContent: {
    padding: Spacing.md,
    paddingTop: 15,
    gap: Spacing.md,
  },

  ExploreScreenSearchBarPortico: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },

  ExploreScreenSearchIconSigil: { fontSize: 16 },
  ExploreScreenSearchInputFiligree: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
  },
  ExploreScreenClearIconSigil: { fontSize: 14, color: Colors.textTertiary },

  ExploreScreenCategoryChipsScrollLintel: { gap: Spacing.sm, paddingBottom: 4 },
  ExploreScreenCategoryChipPortico: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  ExploreScreenCategoryChipActivePortico: {
    backgroundColor: Colors.red,
    borderColor: Colors.red,
  },
  ExploreScreenCategoryChipEmojiSigil: { fontSize: 14 },
  ExploreScreenCategoryChipFiligree: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  ExploreScreenCategoryChipActiveFiligree: { color: Colors.white },

  ExploreScreenEmpty: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: Spacing.sm,
  },

  ExploreScreenEmptyIconSigil: { fontSize: 48 },
  ExploreScreenEmptyTitleFiligree: {
    ...Typography.title3,
    color: Colors.textPrimary,
  },
  ExploreScreenEmptyDescriptionFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },

  ExploreScreenLocationCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    ...(Shadows.medium as object),
  },
  ExploreScreenLocationImage: {
    width: '100%',
    height: 180,
    backgroundColor: Colors.backgroundCardElevated,
  },
  ExploreScreenLocInfo: { padding: Spacing.md, gap: 8 },
  ExploreScreenLocationCardHeaderLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  ExploreScreenLocationCategoryChipBadge: {
    backgroundColor: Colors.redMuted,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  ExploreScreenLocationCategoryChipFiligree: {
    ...Typography.caption2,
    color: Colors.red,
    fontWeight: '600',
  },
  ExploreScreenLocationDistanceFiligree: {
    ...Typography.caption1,
    color: Colors.textTertiary,
  },
  ExploreScreenLocationNameFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  ExploreScreenLocationDescriptionFiligree: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  ExploreScreenLocationCardFooterLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  ExploreScreenLocationTravelFiligree: {
    ...Typography.caption1,
    color: Colors.textSecondary,
  },
  ExploreScreenBookPortico: {
    backgroundColor: Colors.red,
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  ExploreScreenBookPorticoFiligree: {
    ...Typography.caption1,
    color: Colors.white,
    fontWeight: '600',
  },
});
