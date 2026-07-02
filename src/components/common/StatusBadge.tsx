import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { RequestStatus, EventStatus, TransportStatus } from '../../types';

type AnyStatus = RequestStatus | EventStatus | TransportStatus;

const statusConfig: Record<
  string,
  { color: string; bg: string; label: string }
> = {
  Submitted: {
    color: Colors.statusSubmitted,
    bg: Colors.statusSubmitted + '22',
    label: 'Submitted',
  },
  Accepted: {
    color: Colors.statusAccepted,
    bg: Colors.statusAccepted + '22',
    label: 'Accepted',
  },
  'In Progress': {
    color: Colors.statusInProgress,
    bg: Colors.statusInProgress + '22',
    label: 'In Progress',
  },
  Completed: {
    color: Colors.statusCompleted,
    bg: Colors.statusCompleted + '22',
    label: 'Completed',
  },
  Cancelled: {
    color: Colors.statusCancelled,
    bg: Colors.statusCancelled + '22',
    label: 'Cancelled',
  },
  Reserved: {
    color: Colors.statusReserved,
    bg: Colors.statusReserved + '22',
    label: 'Reserved',
  },
  Confirmed: {
    color: Colors.statusConfirmed,
    bg: Colors.statusConfirmed + '22',
    label: 'Confirmed',
  },
  Active: {
    color: Colors.statusAccepted,
    bg: Colors.statusAccepted + '22',
    label: 'Active',
  },
};

interface Props {
  status: AnyStatus;
  small?: boolean;
}

export const StatusBadge: React.FC<Props> = ({ status, small }) => {
  const config = statusConfig[status] ?? statusConfig.Submitted;
  return (
    <View
      style={[
        styles.StatusBadgeChipBadge,
        { backgroundColor: config.bg },
        small && styles.StatusBadgeSmall,
      ]}
    >
      <View
        style={[styles.StatusBadgeDotSigil, { backgroundColor: config.color }]}
      />
      <Text
        style={[
          styles.StatusBadgeLabelFiligree,
          { color: config.color },
          small && styles.StatusBadgeSmallText,
        ]}
      >
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  StatusBadgeChipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
    gap: 5,
    width: '40%',
    justifyContent: 'center',
  },

  StatusBadgeSmall: {
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  StatusBadgeDotSigil: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  StatusBadgeLabelFiligree: {
    ...Typography.caption1,
    fontWeight: '600',
  },

  StatusBadgeSmallText: {
    fontSize: 11,
  },
});
