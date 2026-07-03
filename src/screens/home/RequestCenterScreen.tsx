import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { HomeStackParamList } from '../../types';
import { requestCategories } from '../../data/requestCategories';
import { PressableCard } from '../../components/common/PressableCard';
import { ScreenTitleHeader } from '../../components/common/ScreenTitleHeader';

type Nav = NativeStackNavigationProp<HomeStackParamList>;

export default function RequestCenterScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.RequestCenterScreenFacetChassis}
      contentContainerStyle={styles.RequestCenterScreenScrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ScreenTitleHeader
        title="Room Requests"
        onBack={() => navigation.goBack()}
      />
      <Text style={styles.RequestCenterScreenIntroFiligree}>
        Select a category to submit a request. Our staff typically responds
        within minutes.
      </Text>
      {requestCategories.map(cat => (
        <PressableCard
          key={cat.id}
          onPress={() => navigation.navigate('RequestForm', { category: cat })}
          style={styles.RequestCenterScreenCardFacetChassis}
        >
          <View style={styles.RequestCenterScreenCardRowLintel}>
            <View style={styles.RequestCenterScreenIconEnclave}>
              <Text style={styles.RequestCenterScreenIconSigil}>
                {cat.icon === 'sparkles'
                  ? '✨'
                  : cat.icon === 'bed.double.fill'
                  ? '🛏'
                  : cat.icon === 'shower.fill'
                  ? '🚿'
                  : cat.icon === 'thermometer.medium'
                  ? '🌡️'
                  : cat.icon === 'wrench.and.screwdriver.fill'
                  ? '🔧'
                  : cat.icon === 'cup.and.saucer.fill'
                  ? '☕'
                  : '🎩'}
              </Text>
            </View>
            <View style={styles.RequestCenterScreenCardTextsEnclave}>
              <Text style={styles.RequestCenterScreenCardTitleFiligree}>
                {cat.title}
              </Text>
              <Text
                style={styles.RequestCenterScreenCardDescriptionFiligree}
                numberOfLines={2}
              >
                {cat.description}
              </Text>
              <View style={styles.RequestCenterScreenTimeRowLintel}>
                <Text style={styles.RequestCenterScreenTimeLabel}>
                  ⏱ {cat.estimatedTime}
                </Text>
              </View>
            </View>
            <Text style={styles.RequestCenterScreenChevronSigil}>›</Text>
          </View>
        </PressableCard>
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  RequestCenterScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  RequestCenterScreenScrollContent: {
    padding: Spacing.md,
    paddingTop: 15,
    gap: Spacing.sm,
  },
  RequestCenterScreenIntroFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.sm,
  },
  RequestCenterScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    ...(Shadows.small as object),
  },
  RequestCenterScreenCardRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },

  RequestCenterScreenIconEnclave: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.redMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },

  RequestCenterScreenIconSigil: { fontSize: 24 },
  RequestCenterScreenCardTextsEnclave: { flex: 1 },
  RequestCenterScreenCardTitleFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  RequestCenterScreenCardDescriptionFiligree: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 6,
  },
  RequestCenterScreenTimeRowLintel: { flexDirection: 'row' },
  RequestCenterScreenTimeLabel: {
    ...Typography.caption1,
    color: Colors.textTertiary,
    fontWeight: '500',
  },

  RequestCenterScreenChevronSigil: { fontSize: 22, color: Colors.textTertiary },
});
