import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';

import { DiningStackParamList } from '../../types';
import { menuItems, diningCategories } from '../../data/menuItems';
import { PressableCard } from '../../components/common/PressableCard';
import { SectionHeader } from '../../components/common/SectionHeader';

import { useCart } from '../../hooks/useCart';

import { getImage } from '../../assets/images';

type Nav = NativeStackNavigationProp<DiningStackParamList>;

export default function DiningScreen() {
  const navigation = useNavigation<Nav>();
  const { totalItems } = useCart();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        totalItems > 0 ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            activeOpacity={0.7}
          >
            <View style={styles.DiningScreenCartHeaderPortico}>
              <Text style={styles.DiningScreenCartHeaderEmojiSigil}>🛒</Text>
              <View style={styles.DiningScreenCartHeaderChipBadge}>
                <Text style={styles.DiningScreenCartHeaderChipFiligree}>
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
      style={styles.DiningScreenFacetChassis}
      contentContainerStyle={styles.DiningScreenScrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Featured banner */}
      <PressableCard
        style={styles.DiningScreenFeaturedCardFacetChassis}
        onPress={() =>
          navigation.navigate('FoodDetail', { item: menuItems[1] })
        }
      >
        <ImageBackground
          source={getImage(menuItems[1].image)}
          style={styles.DiningScreenFeaturedBackdrop}
          imageStyle={{ borderRadius: Radius.xl }}
        >
          <LinearGradient
            colors={[
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0.05)',
              'rgba(0,0,0,0.25)',
              'rgba(0,0,0,0.60)',
              'rgba(0,0,0,0.88)',
            ]}
            style={styles.DiningScreenFeaturedGradient}
          >
            <View style={styles.DiningScreenFeaturedGradientInset}>
              <Text style={styles.DiningScreenFeaturedLabelFiligree}>
                👨‍🍳 Today's Chef Recommendation
              </Text>
              <Text style={styles.DiningScreenFeaturedTitleFiligree}>
                {menuItems[1].name}
              </Text>
              <Text style={styles.DiningScreenFeaturedDesc} numberOfLines={2}>
                {menuItems[1].description}
              </Text>
              <TouchableOpacity
                style={styles.DiningScreenViewPortico}
                onPress={() =>
                  navigation.navigate('FoodDetail', { item: menuItems[1] })
                }
              >
                <Text style={styles.DiningScreenViewPorticoFiligree}>
                  View Meal →
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
      </PressableCard>

      {/* Categories with carousels */}
      {diningCategories.map(cat => {
        const items = menuItems.filter(m => m.category === cat.name);
        return (
          <View key={cat.name}>
            <SectionHeader
              title={`${cat.icon} ${cat.name}`}
              actionLabel="See All"
              onAction={() =>
                navigation.navigate('FoodCategory', {
                  category: cat.name,
                  categoryIcon: cat.icon,
                })
              }
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.DiningScreenCarousel}
            >
              {items.map(item => (
                <PressableCard
                  key={item.id}
                  style={styles.DiningScreenMenuCardFacetChassis}
                  onPress={() => navigation.navigate('FoodDetail', { item })}
                >
                  <View style={styles.DiningScreenMenuImageEnclave}>
                    <Image
                      source={getImage(item.image)}
                      style={styles.DiningScreenMenuImage}
                    />
                    {item.popular && (
                      <View style={styles.DiningScreenPopularChipBadge}>
                        <Text style={styles.DiningScreenPopularChipFiligree}>
                          ⭐ Popular
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.DiningScreenMenuCardInfoEnclave}>
                    <Text
                      style={styles.DiningScreenMenuNameFiligree}
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    <Text style={styles.DiningScreenMenuPriceFiligree}>
                      ${item.price} CAD
                    </Text>
                    <Text style={styles.DiningScreenMenuTimeFiligree}>
                      ⏱ {item.prepTime} min
                    </Text>
                  </View>
                </PressableCard>
              ))}
            </ScrollView>
          </View>
        );
      })}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  DiningScreenFacetChassis: { flex: 1, backgroundColor: Colors.background },
  DiningScreenScrollContent: {
    padding: Spacing.md,
    paddingTop: 15,
    gap: Spacing.lg,
  },

  DiningScreenFeaturedCardFacetChassis: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    ...(Shadows.large as object),
  },
  DiningScreenFeaturedBackdrop: {
    height: 220,
    backgroundColor: Colors.backgroundCardElevated,
    justifyContent: 'flex-end',
  },
  DiningScreenFeaturedGradient: {},
  DiningScreenFeaturedGradientInset: { padding: Spacing.md },
  DiningScreenFeaturedLabelFiligree: {
    ...Typography.caption1,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  DiningScreenFeaturedTitleFiligree: {
    ...Typography.title2,
    color: Colors.white,
    marginBottom: 4,
  },
  DiningScreenFeaturedDesc: {
    ...Typography.footnote,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: Spacing.sm,
  },
  DiningScreenViewPortico: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.red,
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  DiningScreenViewPorticoFiligree: {
    ...Typography.footnote,
    color: Colors.white,
    fontWeight: '600',
  },

  DiningScreenCarousel: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    paddingBottom: 4,
  },
  DiningScreenMenuCardFacetChassis: {
    width: 160,
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...(Shadows.small as object),
  },
  DiningScreenMenuImageEnclave: { position: 'relative', height: 110 },
  DiningScreenMenuImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.backgroundCardElevated,
  },

  DiningScreenPopularChipBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  DiningScreenPopularChipFiligree: {
    ...Typography.caption2,
    color: Colors.white,
    fontWeight: '600',
  },

  DiningScreenMenuCardInfoEnclave: { padding: 10, gap: 2 },
  DiningScreenMenuNameFiligree: {
    ...Typography.footnote,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  DiningScreenMenuPriceFiligree: {
    ...Typography.footnote,
    color: Colors.red,
    fontWeight: '700',
  },
  DiningScreenMenuTimeFiligree: {
    ...Typography.caption2,
    color: Colors.textTertiary,
  },

  DiningScreenCartHeaderPortico: { position: 'relative', padding: 4 },

  DiningScreenCartHeaderEmojiSigil: { fontSize: 22 },
  DiningScreenCartHeaderChipBadge: {
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
  DiningScreenCartHeaderChipFiligree: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
});
