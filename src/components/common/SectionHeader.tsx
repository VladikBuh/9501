import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';

interface Props {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const SectionHeader: React.FC<Props> = ({
  title,
  actionLabel,
  onAction,
}) => (
  <View style={styles.SectionHeaderRowLintel}>
    <Text style={styles.SectionHeaderTitleFiligree}>{title}</Text>
    {actionLabel && onAction && (
      <TouchableOpacity onPress={onAction}>
        <Text style={styles.SectionHeaderAction}>{actionLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  SectionHeaderRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },

  SectionHeaderTitleFiligree: {
    ...Typography.title4,
    color: Colors.textPrimary,
  },
  SectionHeaderAction: {
    ...Typography.subheadline,
    color: Colors.red,
    fontWeight: '600',
  },
});
