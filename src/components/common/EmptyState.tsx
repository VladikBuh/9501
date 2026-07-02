import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';
import { PressableCard } from './PressableCard';

interface Props {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<Props> = ({
  icon = '📭',
  title,
  description,
  actionLabel,
  onAction,
}) => (
  <View style={styles.EmptyStateFacetChassis}>
    <Text style={styles.EmptyStateIconSigil}>{icon}</Text>
    <Text style={styles.EmptyStateTitleFiligree}>{title}</Text>
    <Text style={styles.EmptyStateDescriptionFiligree}>{description}</Text>
    {actionLabel && onAction && (
      <PressableCard onPress={onAction} style={styles.EmptyStateActionPortico}>
        <Text style={styles.EmptyStateButtonText}>{actionLabel}</Text>
      </PressableCard>
    )}
  </View>
);

const styles = StyleSheet.create({
  EmptyStateFacetChassis: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: Spacing.xxxl,
  },

  EmptyStateIconSigil: { fontSize: 56, marginBottom: Spacing.md },
  EmptyStateTitleFiligree: {
    ...Typography.title3,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },

  EmptyStateDescriptionFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  EmptyStateActionPortico: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.red,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 14,
  },
  EmptyStateButtonText: { ...Typography.headline, color: Colors.white },
});
