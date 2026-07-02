import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  Share,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { getImage } from '../../assets/images';
import { ExploreStackParamList } from '../../types';

type Route = RouteProp<ExploreStackParamList, 'LocationDetail'>;

export default function LocationDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const insets = useSafeAreaInsets();
  const { location } = route.params;

  const handleOpenMaps = () => {
    const [lat, lng] = location.coordinates.split(', ');
    Linking.openURL(`maps://?q=${location.name}&ll=${lat},${lng}`);
  };

  const handleShare = () => {
    Share.share({
      message: `${location.name}\n${location.description}\nCoordinates: ${location.coordinates}`,
    });
  };

  return (
    <View style={styles.LocationDetailScreenFacetChassis}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Hero */}
        <View style={styles.LocationDetailScreenHeroEnclave}>
          <Image
            source={getImage(location.image)}
            style={styles.LocationDetailScreenHeroImage}
          />
          <LinearGradient
            colors={[
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0.10)',
              'rgba(10,10,10,0.55)',
              Colors.background,
            ]}
            style={styles.LocationDetailScreenHeroGradient}
          />
          <View
            style={[
              styles.LocationDetailScreenHeroContentEnclave,
              { paddingTop: insets.top + 60 },
            ]}
          >
            <View style={styles.LocationDetailScreenCategoryChipBadge}>
              <Text style={styles.LocationDetailScreenCategoryChipFiligree}>
                {location.categoryIcon} {location.category}
              </Text>
            </View>
            <Text style={styles.LocationDetailScreenHeroTitleFiligree}>
              {location.name}
            </Text>
            <Text style={styles.LocationDetailScreenHeroCoordsFiligree}>
              {location.coordinates}
            </Text>
          </View>
        </View>

        <View style={styles.LocationDetailScreenScrollContent}>
          <Text style={styles.LocationDetailScreenDescriptionFiligree}>
            {location.description}
          </Text>

          <View style={styles.LocationDetailScreenCardFacetChassis}>
            <DetailRow icon="🚗" label="Distance" value={location.distance} />
            <DetailRow
              icon="⏱"
              label="Travel Time"
              value={location.travelTime}
            />
            <DetailRow
              icon="🕐"
              label="Opening Hours"
              value={location.openingHours}
            />
            <DetailRow
              icon="📸"
              label="Recommended Duration"
              value={location.recommendedDuration}
            />
          </View>

          {location.nearbyAttractions.length > 0 && (
            <View style={styles.LocationDetailScreenCardFacetChassis}>
              <Text style={styles.LocationDetailScreenSectionTitleFiligree}>
                Nearby Attractions
              </Text>
              {location.nearbyAttractions.map((a, i) => (
                <Text key={i} style={styles.LocationDetailScreenNearbyFiligree}>
                  📍 {a}
                </Text>
              ))}
            </View>
          )}

          {/* Map placeholder */}
          <TouchableOpacity
            style={styles.LocationDetailScreenMapEnclave}
            onPress={handleOpenMaps}
            activeOpacity={0.8}
          >
            <Text style={styles.LocationDetailScreenMapEmojiSigil}>🗺️</Text>
            <Text style={styles.LocationDetailScreenMapTextFiligree}>
              Tap to Open in Maps
            </Text>
            <Text style={styles.LocationDetailScreenMapCoordsFiligree}>
              {location.coordinates}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom actions */}
      <View
        style={[
          styles.LocationDetailScreenBottomBarLintel,
          { paddingBottom: insets.bottom + 16 },
        ]}
      >
        <TouchableOpacity
          style={styles.LocationDetailScreenActionPortico}
          onPress={handleShare}
        >
          <Text style={styles.LocationDetailScreenActionPorticoFiligree}>
            Share
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.LocationDetailScreenActionPortico,
            styles.LocationDetailScreenPrimaryPortico,
          ]}
          onPress={() =>
            (navigation.getParent() as any)?.navigate('TransportTab')
          }
        >
          <Text style={styles.LocationDetailScreenPrimaryPorticoFiligree}>
            Book Hotel Car
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
  <View style={styles.LocationDetailScreenDetailRowLintel}>
    <Text style={styles.LocationDetailScreenDetailIconSigil}>{icon}</Text>
    <Text style={styles.LocationDetailScreenDetailLabelFiligree}>{label}</Text>
    <Text style={styles.LocationDetailScreenDetailValueFiligree}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  LocationDetailScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  LocationDetailScreenHeroEnclave: { height: 320, position: 'relative' },
  LocationDetailScreenHeroImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.backgroundCardElevated,
  },

  LocationDetailScreenHeroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 180,
  },

  LocationDetailScreenHeroContentEnclave: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: Spacing.md,
  },
  LocationDetailScreenCategoryChipBadge: {
    backgroundColor: Colors.redMuted,
    alignSelf: 'flex-start',
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  LocationDetailScreenCategoryChipFiligree: {
    ...Typography.caption1,
    color: Colors.red,
    fontWeight: '600',
  },
  LocationDetailScreenHeroTitleFiligree: {
    ...Typography.title1,
    color: Colors.white,
    marginBottom: 4,
  },
  LocationDetailScreenHeroCoordsFiligree: {
    ...Typography.footnote,
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'Courier New',
  },

  LocationDetailScreenScrollContent: { padding: Spacing.md, gap: Spacing.md },
  LocationDetailScreenDescriptionFiligree: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
  LocationDetailScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    ...(Shadows.small as object),
  },
  LocationDetailScreenSectionTitleFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  LocationDetailScreenDetailRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  LocationDetailScreenDetailIconSigil: { width: 22, fontSize: 16 },
  LocationDetailScreenDetailLabelFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    flex: 1,
  },
  LocationDetailScreenDetailValueFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '500',
  },

  LocationDetailScreenNearbyFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    paddingVertical: 5,
  },
  LocationDetailScreenMapEnclave: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  LocationDetailScreenMapEmojiSigil: { fontSize: 48 },
  LocationDetailScreenMapTextFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },

  LocationDetailScreenMapCoordsFiligree: {
    ...Typography.caption1,
    color: Colors.textTertiary,
    fontFamily: 'Courier New',
  },
  LocationDetailScreenBottomBarLintel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.backgroundCard,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingTop: 16,
  },
  LocationDetailScreenActionPortico: {
    flex: 1,
    backgroundColor: Colors.backgroundCardElevated,
    borderRadius: Radius.lg,
    padding: 14,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.border,
  },

  LocationDetailScreenActionPorticoFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  LocationDetailScreenPrimaryPortico: {
    flex: 2,
    backgroundColor: Colors.red,
    borderWidth: 0,
  },
  LocationDetailScreenPrimaryPorticoFiligree: {
    ...Typography.headline,
    color: Colors.white,
  },
});
