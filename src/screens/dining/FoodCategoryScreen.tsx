import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { DiningStackParamList } from '../../types';

import { menuItems } from '../../data/menuItems';
import { PressableCard } from '../../components/common/PressableCard';
import { useCart } from '../../hooks/useCart';
import { getImage } from '../../assets/images';
import { ScreenTitleHeader } from '../../components/common/ScreenTitleHeader';

type Nav = NativeStackNavigationProp<DiningStackParamList>;
type Route = RouteProp<DiningStackParamList, 'FoodCategory'>;

export default function FoodCategoryScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { category } = route.params;
  const { addItem, totalItems } = useCart();
  const items = menuItems.filter(m => m.category === category);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        totalItems > 0 ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            activeOpacity={0.7}
          >
            <View style={styles.FoodCategoryScreenCartHeaderPortico}>
              <Text style={styles.FoodCategoryScreenCartHeaderEmojiSigil}>
                🛒
              </Text>
              <View style={styles.FoodCategoryScreenCartHeaderChipBadge}>
                <Text style={styles.FoodCategoryScreenCartHeaderChipFiligree}>
                  {totalItems > 9 ? '9+' : totalItems}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null,
    });
  }, [totalItems, navigation]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.FoodCategoryScreenFacetChassis}
      contentContainerStyle={styles.FoodCategoryScreenScrollContent}
      showsVerticalScrollIndicator={false}
    >
      {Platform.OS === 'android' && (
        <View style={styles.FoodCategoryScreenTitleRowLintel}>
          <ScreenTitleHeader
            title={category}
            onBack={() => navigation.goBack()}
          />
          {totalItems > 0 && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              activeOpacity={0.7}
            >
              <View style={styles.FoodCategoryScreenCartHeaderPortico}>
                <Text style={styles.FoodCategoryScreenCartHeaderEmojiSigil}>
                  🛒
                </Text>
                <View style={styles.FoodCategoryScreenCartHeaderChipBadge}>
                  <Text style={styles.FoodCategoryScreenCartHeaderChipFiligree}>
                    {totalItems > 9 ? '9+' : totalItems}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
      {items.map(item => (
        <PressableCard
          key={item.id}
          style={styles.FoodCategoryScreenCardFacetChassis}
          onPress={() => navigation.navigate('FoodDetail', { item })}
        >
          <Image
            source={getImage(item.image)}
            style={styles.FoodCategoryScreenImage}
          />
          <View style={styles.FoodCategoryScreenInfoEnclave}>
            <View style={styles.FoodCategoryScreenCardTopRowLintel}>
              <View style={styles.FoodCategoryScreenCardNameEnclave}>
                <Text style={styles.FoodCategoryScreenNameFiligree}>
                  {item.name}
                </Text>
                {item.popular && (
                  <Text style={styles.FoodCategoryScreenPopularFiligree}>
                    ⭐ Popular
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.FoodCategoryScreenAddPortico}
                onPress={() => addItem(item)}
                activeOpacity={0.8}
              >
                <Text style={styles.FoodCategoryScreenAddPorticoFiligree}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={styles.FoodCategoryScreenDescriptionFiligree}
              numberOfLines={2}
            >
              {item.description}
            </Text>
            <View style={styles.FoodCategoryScreenFooterLintel}>
              <Text style={styles.FoodCategoryScreenPriceFiligree}>
                ${item.price} CAD
              </Text>
              <Text style={styles.FoodCategoryScreenTimeFiligree}>
                ⏱ {item.prepTime} min
              </Text>
              <Text style={styles.FoodCategoryScreenRatingFiligree}>
                ★ {item.rating}
              </Text>
            </View>
          </View>
        </PressableCard>
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  FoodCategoryScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  FoodCategoryScreenTitleRowLintel: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  FoodCategoryScreenScrollContent: {
    padding: Spacing.md,
    paddingTop: 15,
    gap: Spacing.sm,
  },
  FoodCategoryScreenCardFacetChassis: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    ...(Shadows.small as object),
  },
  FoodCategoryScreenImage: {
    width: 110,
    height: 110,
    backgroundColor: Colors.backgroundCardElevated,
  },
  FoodCategoryScreenInfoEnclave: { flex: 1, padding: Spacing.sm, gap: 4 },
  FoodCategoryScreenCardTopRowLintel: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  FoodCategoryScreenCardNameEnclave: { flex: 1, gap: 2 },

  FoodCategoryScreenNameFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  FoodCategoryScreenPopularFiligree: {
    ...Typography.caption2,
    color: Colors.statusInProgress,
  },
  FoodCategoryScreenAddPortico: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.xs,
  },
  FoodCategoryScreenAddPorticoFiligree: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 22,
  },

  FoodCategoryScreenDescriptionFiligree: {
    ...Typography.caption1,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  FoodCategoryScreenFooterLintel: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  FoodCategoryScreenPriceFiligree: {
    ...Typography.footnote,
    color: Colors.red,
    fontWeight: '700',
  },

  FoodCategoryScreenTimeFiligree: {
    ...Typography.caption2,
    color: Colors.textTertiary,
  },
  FoodCategoryScreenRatingFiligree: {
    ...Typography.caption2,
    color: Colors.statusInProgress,
  },
  FoodCategoryScreenCartHeaderPortico: { position: 'relative', padding: 4 },
  FoodCategoryScreenCartHeaderEmojiSigil: { fontSize: 22 },
  FoodCategoryScreenCartHeaderChipBadge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: Colors.red,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },

  FoodCategoryScreenCartHeaderChipFiligree: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
});
