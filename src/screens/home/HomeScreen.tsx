import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Animated,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { HomeStackParamList } from '../../types';
import { guestData } from '../../data/guest';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PressableCard } from '../../components/common/PressableCard';
import { SectionHeader } from '../../components/common/SectionHeader';
import { useRequests } from '../../hooks/useRequests';
import { events } from '../../data/events';
import { locations } from '../../data/locations';
import { menuItems } from '../../data/menuItems';
import { getImage } from '../../assets/images';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const quickActions = [
  {
    icon: '🔧',
    title: 'Room Requests',
    sub: 'Submit a request',
    route: 'RequestCenter',
  },
  { icon: '🍽️', title: 'Room Dining', sub: 'Order food', tab: 'DiningTab' },
  { icon: '🎭', title: 'Book Event', sub: 'Reserve a seat', tab: 'EventsTab' },
  { icon: '🚗', title: 'Book Car', sub: 'Get a vehicle', tab: 'TransportTab' },
  { icon: '👤', title: 'Guest Card', sub: 'View your card', tab: 'GuestTab' },
  {
    icon: '🗺️',
    title: 'Explore Toronto',
    sub: 'Discover the city',
    tab: 'ExploreTab',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { requests } = useRequests();
  const glowAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.5,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const latestRequests = requests.slice(0, 3);
  const featuredEvent = events[4];

  return (
    <View style={styles.HomeScreenFacetChassis}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.HomeScreenFacetChassis}
        bounces={false}
        contentContainerStyle={styles.HomeScreenScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner */}
        <ImageBackground
          source={require('../../assets/wood-room-hub-onboardbg3.png')}
          style={styles.HomeScreenHeroEnclave}
          imageStyle={styles.HomeScreenHeroImage}
        >
          <LinearGradient
            colors={[
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0.15)',
              'rgba(0,0,0,0.45)',
              'rgba(0,0,0,0.75)',
            ]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.HomeScreenHeroContentEnclave}>
            <Text style={styles.HomeScreenHeroSubFiligree}>Good evening</Text>
            <Text style={styles.HomeScreenHeroTitleFiligree}>
              Welcome to{'\n'}Woobine Room Hub
            </Text>
            <Text style={styles.HomeScreenHeroDescriptionFiligree}>
              Enjoy premium hotel services during your stay.
            </Text>
            <Animated.View
              style={[styles.HomeScreenGlowSigil, { opacity: glowAnim }]}
            />
          </View>
        </ImageBackground>

        {/* Hotel Info Card */}
        <View
          style={[
            styles.HomeScreenCardFacetChassis,
            styles.HomeScreenInfoCardFacetChassis,
          ]}
        >
          <View style={styles.HomeScreenInfoRowLintel}>
            <View style={styles.HomeScreenInfoIconEnclave}>
              <Text style={styles.HomeScreenIconEmoji}>🏨</Text>
            </View>
            <View style={styles.HomeScreenInfoTextsEnclave}>
              <Text style={styles.HomeScreenInfoNameFiligree}>
                Woobine Room Hub
              </Text>
              <Text style={styles.HomeScreenInfoSubFiligree}>
                555 Rexdale Blvd, Toronto, ON
              </Text>
            </View>
          </View>
          <View style={styles.HomeScreenDividerLintel} />
          <View style={styles.HomeScreenInfoGridLintel}>
            <InfoItem icon="🌤️" label="Weather" value="–4°C Partly Cloudy" />
            <InfoItem icon="📅" label="Check-in" value={guestData.checkIn} />
            <InfoItem icon="📅" label="Check-out" value={guestData.checkOut} />
            <InfoItem
              icon="📞"
              label="Concierge"
              value={guestData.conciergePhone}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <SectionHeader title="Quick Actions" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.HomeScreenQuickActionsScrollLintel}
        >
          {quickActions.map((action, i) => (
            <PressableCard
              key={i}
              onPress={() => {
                if (action.route) {
                  (navigation as any).navigate(action.route);
                } else if (action.tab) {
                  (navigation.getParent() as any)?.navigate(action.tab);
                }
              }}
              style={styles.HomeScreenQuickActionCardFacetChassis}
            >
              <Text style={styles.HomeScreenQuickActionIconSigil}>
                {action.icon}
              </Text>
              <Text style={styles.HomeScreenQuickActionTitleFiligree}>
                {action.title}
              </Text>
              <Text style={styles.HomeScreenQuickActionSubFiligree}>
                {action.sub}
              </Text>
              <Text style={styles.HomeScreenQuickActionChevronSigil}>›</Text>
            </PressableCard>
          ))}
        </ScrollView>

        {/* Recent Requests */}
        <SectionHeader
          title="Recent Requests"
          actionLabel="View All"
          onAction={() => navigation.navigate('RequestCenter')}
        />
        {latestRequests.length === 0 ? (
          <View style={styles.HomeScreenEmptySmallEnclave}>
            <Text style={styles.HomeScreenEmptySmallFiligree}>
              No requests yet
            </Text>
          </View>
        ) : (
          <View style={styles.HomeScreenRequestsEnclave}>
            {latestRequests.map(req => (
              <PressableCard
                key={req.id}
                onPress={() =>
                  navigation.navigate('RequestTracking', { requestId: req.id })
                }
                style={[
                  styles.HomeScreenCardFacetChassis,
                  styles.HomeScreenRequestCardFacetChassis,
                ]}
              >
                <View style={styles.HomeScreenRequestRowLintel}>
                  <Text style={styles.HomeScreenRequestIconSigil}>🔧</Text>
                  <View style={styles.HomeScreenRequestInfo}>
                    <Text style={styles.HomeScreenRequestTitleFiligree}>
                      {req.subject}
                    </Text>
                    <Text style={styles.HomeScreenRequestDateFiligree}>
                      {req.submittedAt}
                    </Text>
                  </View>
                  <StatusBadge status={req.status} small />
                </View>
              </PressableCard>
            ))}
            <TouchableOpacity
              onPress={() => navigation.navigate('RequestCenter')}
              style={styles.HomeScreenViewAllPortico}
            >
              <Text style={styles.HomeScreenViewAllPorticoFiligree}>
                View All Requests
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Featured Event */}
        <SectionHeader title="Tonight's Event" />
        <PressableCard
          style={styles.HomeScreenFeaturedCardFacetChassis}
          onPress={() => (navigation.getParent() as any)?.navigate('EventsTab')}
        >
          <ImageBackground
            source={getImage(featuredEvent.image)}
            style={styles.HomeScreenFeaturedBackdrop}
            imageStyle={{ borderRadius: Radius.xl }}
          >
            <LinearGradient
              colors={[
                'rgba(0,0,0,0)',
                'rgba(0,0,0,0.05)',
                'rgba(0,0,0,0.30)',
                'rgba(0,0,0,0.65)',
                'rgba(0,0,0,0.88)',
              ]}
              style={styles.HomeScreenFeaturedGradient}
            >
              <View style={styles.HomeScreenFeaturedGradientInset}>
                <View style={styles.HomeScreenFeaturedChipBadge}>
                  <Text style={styles.HomeScreenFeaturedChipBadgeFiligree}>
                    {featuredEvent.categoryIcon} {featuredEvent.category}
                  </Text>
                </View>
                <Text style={styles.HomeScreenFeaturedTitleFiligree}>
                  {featuredEvent.title}
                </Text>
                <Text style={styles.HomeScreenFeaturedSubFiligree}>
                  {featuredEvent.date} · {featuredEvent.time} ·{' '}
                  {featuredEvent.venue}
                </Text>
                <View style={styles.HomeScreenFeaturedFooter}>
                  <Text style={styles.HomeScreenFeaturedPriceFiligree}>
                    ${featuredEvent.price} CAD
                  </Text>
                  <View style={styles.HomeScreenFeaturedSeatsChipBadge}>
                    <Text style={styles.HomeScreenFeaturedSeatsChipFiligree}>
                      {featuredEvent.remainingSeats} seats left
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </PressableCard>

        {/* Horizontal feeds */}
        <SectionHeader title="Popular Dining" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.HomeScreenFeedScrollLintel}
        >
          {menuItems.slice(0, 5).map(item => (
            <PressableCard
              key={item.id}
              style={styles.HomeScreenFeedCardFacetChassis}
              onPress={() =>
                (navigation.getParent() as any)?.navigate('DiningTab')
              }
            >
              <Image
                source={getImage(item.image)}
                style={styles.HomeScreenFeedImage}
              />
              <Text
                style={styles.HomeScreenFeedCardTitleFiligree}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text style={styles.HomeScreenFeedCardSubFiligree}>
                ${item.price} · {item.prepTime} min
              </Text>
            </PressableCard>
          ))}
        </ScrollView>

        <SectionHeader title="Explore Toronto" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.HomeScreenFeedScrollLintel}
        >
          {locations.slice(0, 5).map(loc => (
            <PressableCard
              key={loc.id}
              style={styles.HomeScreenFeedCardFacetChassis}
              onPress={() =>
                (navigation.getParent() as any)?.navigate('ExploreTab')
              }
            >
              <Image
                source={getImage(loc.image)}
                style={styles.HomeScreenFeedImage}
              />
              <Text
                style={styles.HomeScreenFeedCardTitleFiligree}
                numberOfLines={1}
              >
                {loc.name}
              </Text>
              <Text style={styles.HomeScreenFeedCardSubFiligree}>
                {loc.distance} · {loc.travelTime}
              </Text>
            </PressableCard>
          ))}
        </ScrollView>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <View style={styles.HomeScreenInfoItemEnclave}>
    <Text style={styles.HomeScreenInfoItemIconSigil}>{icon}</Text>
    <Text style={styles.HomeScreenInfoItemLabelFiligree}>{label}</Text>
    <Text style={styles.HomeScreenInfoItemValueFiligree}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  HomeScreenFacetChassis: { flex: 1, backgroundColor: Colors.background },
  HomeScreenScrollContent: { paddingBottom: 20 },

  HomeScreenHeroEnclave: {
    height: 260,
    justifyContent: 'flex-end',
    marginBottom: Spacing.md,
  },

  HomeScreenHeroImage: { resizeMode: 'cover' },
  HomeScreenHeroContentEnclave: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  HomeScreenHeroSubFiligree: {
    ...Typography.footnote,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  HomeScreenHeroTitleFiligree: {
    ...Typography.largeTitle,
    color: Colors.white,
    marginBottom: 6,
    lineHeight: 38,
  },
  HomeScreenHeroDescriptionFiligree: {
    ...Typography.subheadline,
    color: 'rgba(255,255,255,0.75)',
  },
  HomeScreenGlowSigil: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.red,
  },

  HomeScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    ...(Shadows.medium as object),
  },
  HomeScreenInfoCardFacetChassis: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    padding: Spacing.md,
  },
  HomeScreenInfoRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  HomeScreenInfoIconEnclave: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.redMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },

  HomeScreenIconEmoji: { fontSize: 22 },
  HomeScreenInfoTextsEnclave: { flex: 1 },
  HomeScreenInfoNameFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  HomeScreenInfoSubFiligree: {
    ...Typography.caption1,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  HomeScreenDividerLintel: {
    height: 0.5,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
  HomeScreenInfoGridLintel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },

  HomeScreenInfoItemEnclave: { flex: 1, minWidth: '45%', gap: 2 },
  HomeScreenInfoItemIconSigil: { fontSize: 16 },
  HomeScreenInfoItemLabelFiligree: {
    ...Typography.caption2,
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  HomeScreenInfoItemValueFiligree: {
    ...Typography.footnote,
    color: Colors.textPrimary,
    fontWeight: '500',
  },

  HomeScreenQuickActionsScrollLintel: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
  },

  HomeScreenQuickActionCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    width: 140,
    ...(Shadows.small as object),
  },
  HomeScreenQuickActionIconSigil: { fontSize: 28, marginBottom: Spacing.sm },
  HomeScreenQuickActionTitleFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  HomeScreenQuickActionSubFiligree: {
    ...Typography.caption1,
    color: Colors.textSecondary,
  },
  HomeScreenQuickActionChevronSigil: {
    position: 'absolute',
    right: 12,
    top: 12,
    fontSize: 20,
    color: Colors.textTertiary,
  },

  HomeScreenRequestsEnclave: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  HomeScreenRequestCardFacetChassis: { padding: Spacing.md },
  HomeScreenRequestRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  HomeScreenRequestIconSigil: { fontSize: 24 },
  HomeScreenRequestInfo: { flex: 1 },
  HomeScreenRequestTitleFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  HomeScreenRequestDateFiligree: {
    ...Typography.caption1,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  HomeScreenViewAllPortico: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  HomeScreenViewAllPorticoFiligree: {
    ...Typography.subheadline,
    color: Colors.red,
    fontWeight: '600',
  },

  HomeScreenEmptySmallEnclave: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  HomeScreenEmptySmallFiligree: {
    ...Typography.subheadline,
    color: Colors.textTertiary,
  },

  HomeScreenFeaturedCardFacetChassis: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    borderRadius: Radius.xl,
    ...(Shadows.large as object),
  },
  HomeScreenFeaturedBackdrop: {
    height: 200,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: Radius.xl,
    backgroundColor: Colors.backgroundCardElevated,
  },
  HomeScreenFeaturedGradient: {
    borderRadius: Radius.xl,
    justifyContent: 'flex-end',
  },
  HomeScreenFeaturedGradientInset: { padding: Spacing.md },
  HomeScreenFeaturedChipBadge: {
    backgroundColor: Colors.redMuted,
    alignSelf: 'flex-start',
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 6,
  },
  HomeScreenFeaturedChipBadgeFiligree: {
    ...Typography.caption1,
    color: Colors.red,
    fontWeight: '600',
  },
  HomeScreenFeaturedTitleFiligree: {
    ...Typography.title3,
    color: Colors.white,
    marginBottom: 4,
  },
  HomeScreenFeaturedSubFiligree: {
    ...Typography.caption1,
    color: 'rgba(255,255,255,0.7)',
  },
  HomeScreenFeaturedFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  HomeScreenFeaturedPriceFiligree: {
    ...Typography.headline,
    color: Colors.white,
    fontWeight: '700',
  },
  HomeScreenFeaturedSeatsChipBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  HomeScreenFeaturedSeatsChipFiligree: {
    ...Typography.caption1,
    color: Colors.white,
  },

  HomeScreenFeedScrollLintel: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  HomeScreenFeedCardFacetChassis: {
    width: 150,
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...(Shadows.small as object),
  },
  HomeScreenFeedImage: {
    height: 100,
    width: '100%',
    backgroundColor: Colors.backgroundCardElevated,
  },
  HomeScreenFeedCardTitleFiligree: {
    ...Typography.footnote,
    color: Colors.textPrimary,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  HomeScreenFeedCardSubFiligree: {
    ...Typography.caption2,
    color: Colors.textSecondary,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
