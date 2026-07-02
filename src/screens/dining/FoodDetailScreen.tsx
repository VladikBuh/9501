import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { DiningStackParamList } from '../../types';
import { useCart } from '../../hooks/useCart';
import { getImage } from '../../assets/images';

type Nav = NativeStackNavigationProp<DiningStackParamList>;
type Route = RouteProp<DiningStackParamList, 'FoodDetail'>;

export default function FoodDetailScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const insets = useSafeAreaInsets();
  const { item } = route.params;
  const { addItem, cart } = useCart();

  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState('');

  const cartItem = cart.find(c => c.item.id === item.id);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(item, notes);
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.FoodDetailScreenFacetChassis}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* Hero image */}
        <View style={styles.FoodDetailScreenHeroEnclave}>
          <Image
            source={getImage(item.image)}
            style={styles.FoodDetailScreenHeroImage}
          />
          <LinearGradient
            colors={[
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0.10)',
              'rgba(10,10,10,0.55)',
              Colors.background,
            ]}
            style={styles.FoodDetailScreenHeroGradient}
          />
        </View>

        <View style={styles.FoodDetailScreenScrollContent}>
          <View style={styles.FoodDetailScreenTitleRow}>
            <Text style={styles.FoodDetailScreenTitleFiligree}>
              {item.name}
            </Text>
            {item.popular && (
              <View style={styles.FoodDetailScreenPopularChipBadge}>
                <Text style={styles.FoodDetailScreenPopularText}>
                  ⭐ Popular
                </Text>
              </View>
            )}
          </View>
          <View style={styles.FoodDetailScreenMetaRowLintel}>
            <Text style={styles.FoodDetailScreenPriceFiligree}>
              ${item.price} CAD
            </Text>
            <Text style={styles.FoodDetailScreenMetaItemFiligree}>
              ⏱ {item.prepTime} min
            </Text>
            <Text style={styles.FoodDetailScreenMetaItemFiligree}>
              ★ {item.rating}
            </Text>
          </View>
          <Text style={styles.FoodDetailScreenDescriptionFiligree}>
            {item.description}
          </Text>

          {/* Ingredients */}
          <View style={styles.FoodDetailScreenCardFacetChassis}>
            <Text style={styles.FoodDetailScreenSectionTitleFiligree}>
              Ingredients
            </Text>
            <Text style={styles.FoodDetailScreenIngredientsFiligree}>
              {item.ingredients.join(' · ')}
            </Text>
          </View>

          {/* Chef note */}
          <View
            style={[
              styles.FoodDetailScreenCardFacetChassis,
              {
                backgroundColor: Colors.redMuted,
                borderWidth: 1,
                borderColor: Colors.red + '33',
              },
            ]}
          >
            <Text style={styles.FoodDetailScreenSectionTitleFiligree}>
              Chef's Note
            </Text>
            <Text style={styles.FoodDetailScreenChefNoteFiligree}>
              Prepared fresh to order by our executive chef using the finest
              locally-sourced ingredients.
            </Text>
          </View>

          {/* Quantity & notes */}
          <View style={styles.FoodDetailScreenCardFacetChassis}>
            <Text style={styles.FoodDetailScreenSectionTitleFiligree}>
              Quantity
            </Text>
            <View style={styles.FoodDetailScreenQuantityRowLintel}>
              <TouchableOpacity
                style={styles.FoodDetailScreenQuantityPortico}
                onPress={() => setQty(Math.max(1, qty - 1))}
              >
                <Text style={styles.FoodDetailScreenQuantityPorticoFiligree}>
                  −
                </Text>
              </TouchableOpacity>
              <Text style={styles.FoodDetailScreenQuantityValueFiligree}>
                {qty}
              </Text>
              <TouchableOpacity
                style={styles.FoodDetailScreenQuantityPortico}
                onPress={() => setQty(qty + 1)}
              >
                <Text style={styles.FoodDetailScreenQuantityPorticoFiligree}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.FoodDetailScreenCardFacetChassis}>
            <Text style={styles.FoodDetailScreenSectionTitleFiligree}>
              Special Instructions
            </Text>
            <TextInput
              style={styles.FoodDetailScreenNotesInputPortico}
              placeholder="Allergies, preferences, modifications..."
              placeholderTextColor={Colors.textTertiary}
              value={notes}
              onChangeText={setNotes}
              multiline
            />
          </View>
        </View>
      </ScrollView>

      {/* Fixed add to cart */}
      <View
        style={[
          styles.FoodDetailScreenBottomBarLintel,
          { paddingBottom: insets.bottom + 16 },
        ]}
      >
        <TouchableOpacity
          style={styles.FoodDetailScreenAddPortico}
          onPress={handleAdd}
          activeOpacity={0.85}
        >
          <Text style={styles.FoodDetailScreenAddPorticoFiligree}>
            Add {qty} to Order · ${(item.price * qty).toFixed(0)} CAD
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  FoodDetailScreenFacetChassis: { flex: 1, backgroundColor: Colors.background },
  FoodDetailScreenHeroEnclave: { height: 300, position: 'relative' },
  FoodDetailScreenHeroImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.backgroundCardElevated,
  },
  FoodDetailScreenHeroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
  },

  FoodDetailScreenScrollContent: { padding: Spacing.md, gap: Spacing.md },
  FoodDetailScreenTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },

  FoodDetailScreenTitleFiligree: {
    ...Typography.title2,
    color: Colors.textPrimary,
    flex: 1,
  },
  FoodDetailScreenPopularChipBadge: {
    backgroundColor: Colors.statusInProgress + '22',
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  FoodDetailScreenPopularText: {
    ...Typography.caption1,
    color: Colors.statusInProgress,
    fontWeight: '600',
  },
  FoodDetailScreenMetaRowLintel: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'center',
  },
  FoodDetailScreenPriceFiligree: {
    ...Typography.title3,
    color: Colors.red,
    fontWeight: '700',
  },

  FoodDetailScreenMetaItemFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
  },
  FoodDetailScreenDescriptionFiligree: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
  FoodDetailScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    ...(Shadows.small as object),
  },

  FoodDetailScreenSectionTitleFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  FoodDetailScreenIngredientsFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  FoodDetailScreenChefNoteFiligree: {
    ...Typography.subheadline,
    color: Colors.red,
    lineHeight: 22,
  },
  FoodDetailScreenQuantityRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xl,
    justifyContent: 'center',
  },
  FoodDetailScreenQuantityPortico: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.backgroundCardElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },

  FoodDetailScreenQuantityPorticoFiligree: {
    ...Typography.title2,
    color: Colors.textPrimary,
  },
  FoodDetailScreenQuantityValueFiligree: {
    ...Typography.title1,
    color: Colors.textPrimary,
    minWidth: 40,
    textAlign: 'center',
  },
  FoodDetailScreenNotesInputPortico: {
    ...Typography.body,
    color: Colors.textPrimary,
    minHeight: 80,
    textAlignVertical: 'top',
  },

  FoodDetailScreenBottomBarLintel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.backgroundCard,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    padding: Spacing.md,
  },
  FoodDetailScreenAddPortico: {
    backgroundColor: Colors.red,
    borderRadius: Radius.lg,
    padding: 16,
    alignItems: 'center',
  },
  FoodDetailScreenAddPorticoFiligree: {
    ...Typography.headline,
    color: Colors.white,
  },
});
