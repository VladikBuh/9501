import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { HomeStackParamList, RequestStatus } from '../../types';
import { useRequests } from '../../hooks/useRequests';
import { ScreenTitleHeader } from '../../components/common/ScreenTitleHeader';

type Route = RouteProp<HomeStackParamList, 'RequestTracking'>;

const steps: RequestStatus[] = [
  'Submitted',
  'Accepted',
  'In Progress',
  'Completed',
];

const stepLabels: Record<RequestStatus, string> = {
  Submitted: 'Request received by hotel system',
  Accepted: 'Request accepted by staff',
  'In Progress': 'Staff member is working on your request',
  Completed: 'Request completed successfully',
};

export default function RequestTrackingScreen() {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const { requestId } = route.params;
  const { requests } = useRequests();
  const req = requests.find(r => r.id === requestId);

  if (!req) {
    return (
      <View style={styles.RequestTrackingScreenFacetChassis}>
        <ScreenTitleHeader
          title="Track Request"
          onBack={() => navigation.goBack()}
        />
        <Text style={styles.RequestTrackingScreenErrorTextFiligree}>
          Request not found
        </Text>
      </View>
    );
  }

  const currentIndex = steps.indexOf(req.status as RequestStatus);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.RequestTrackingScreenFacetChassis}
      contentContainerStyle={styles.RequestTrackingScreenScrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ScreenTitleHeader title="Track Request" />
      {/* Header info */}
      <View style={styles.RequestTrackingScreenHeaderCardFacetChassis}>
        <Text style={styles.RequestTrackingScreenRequestIdFiligree}>
          {req.id}
        </Text>
        <Text style={styles.RequestTrackingScreenRequestTitleFiligree}>
          {req.subject || req.category}
        </Text>
        <Text style={styles.RequestTrackingScreenRequestDescriptionFiligree}>
          {req.description}
        </Text>
        <View style={styles.RequestTrackingScreenMetaRowLintel}>
          <Text style={styles.RequestTrackingScreenMetaItemFiligree}>
            ⏱ {req.estimatedTime}
          </Text>
          <Text style={styles.RequestTrackingScreenMetaItemFiligree}>
            🔺 {req.priority}
          </Text>
        </View>
      </View>

      {/* Timeline */}
      <View style={styles.RequestTrackingScreenTimelineCardFacetChassis}>
        <Text style={styles.RequestTrackingScreenSectionTitleFiligree}>
          Request Timeline
        </Text>
        {steps.map((step, i) => {
          const isDone = i <= currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <View
              key={step}
              style={styles.RequestTrackingScreenTimelineRowLintel}
            >
              <View style={styles.RequestTrackingScreenTimelineLeftEnclave}>
                <View
                  style={[
                    styles.RequestTrackingScreenDotSigil,
                    isDone && styles.RequestTrackingScreenDotDoneSigil,
                    isCurrent && styles.RequestTrackingScreenDotCurrentSigil,
                  ]}
                >
                  {isDone && (
                    <Text style={styles.RequestTrackingScreenDotCheckFiligree}>
                      ✓
                    </Text>
                  )}
                </View>
                {i < steps.length - 1 && (
                  <View
                    style={[
                      styles.RequestTrackingScreenTimelineLineLintel,
                      i < currentIndex &&
                        styles.RequestTrackingScreenTimelineLineDoneLintel,
                    ]}
                  />
                )}
              </View>
              <View style={styles.RequestTrackingScreenTimelineContentEnclave}>
                <Text
                  style={[
                    styles.RequestTrackingScreenStepTitleFiligree,
                    isDone
                      ? styles.RequestTrackingScreenStepTitleFiligreeCompleted
                      : styles.RequestTrackingScreenStepTitleFiligreeGray,
                  ]}
                >
                  {step}
                </Text>
                <Text
                  style={styles.RequestTrackingScreenStepDescriptionFiligree}
                >
                  {stepLabels[step]}
                </Text>
                {isCurrent && req.staffName && (
                  <View style={styles.RequestTrackingScreenStaffRowLintel}>
                    <View
                      style={styles.RequestTrackingScreenStaffAvatarEnclave}
                    >
                      <Text
                        style={styles.RequestTrackingScreenStaffAvatarFiligree}
                      >
                        {req.staffName.charAt(0)}
                      </Text>
                    </View>
                    <Text style={styles.RequestTrackingScreenStaffNameFiligree}>
                      Assigned to {req.staffName}
                    </Text>
                  </View>
                )}
                {isDone && i < currentIndex && (
                  <Text style={styles.RequestTrackingScreenTimestampFiligree}>
                    {req.submittedAt}
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  RequestTrackingScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  RequestTrackingScreenScrollContent: {
    padding: Spacing.md,
    paddingTop: 15,
    gap: Spacing.md,
  },
  RequestTrackingScreenErrorTextFiligree: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 60,
  },

  RequestTrackingScreenHeaderCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    ...(Shadows.small as object),
  },
  RequestTrackingScreenRequestIdFiligree: {
    ...Typography.caption1,
    color: Colors.red,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  RequestTrackingScreenRequestTitleFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  RequestTrackingScreenRequestDescriptionFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.sm,
  },

  RequestTrackingScreenMetaRowLintel: { flexDirection: 'row', gap: Spacing.md },
  RequestTrackingScreenMetaItemFiligree: {
    ...Typography.footnote,
    color: Colors.textTertiary,
    fontWeight: '500',
  },

  RequestTrackingScreenTimelineCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    ...(Shadows.small as object),
  },
  RequestTrackingScreenSectionTitleFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  RequestTrackingScreenTimelineRowLintel: {
    flexDirection: 'row',
    gap: Spacing.md,
  },

  RequestTrackingScreenTimelineLeftEnclave: { width: 28, alignItems: 'center' },
  RequestTrackingScreenDotSigil: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.backgroundCardElevated,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  RequestTrackingScreenDotDoneSigil: {
    backgroundColor: Colors.statusCompleted,
    borderColor: Colors.statusCompleted,
  },
  RequestTrackingScreenDotCurrentSigil: {
    borderColor: Colors.red,
    backgroundColor: Colors.redMuted,
  },
  RequestTrackingScreenDotCheckFiligree: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  RequestTrackingScreenTimelineLineLintel: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.border,
    marginVertical: 2,
  },

  RequestTrackingScreenTimelineLineDoneLintel: {
    backgroundColor: Colors.statusCompleted,
  },
  RequestTrackingScreenTimelineContentEnclave: {
    flex: 1,
    paddingBottom: Spacing.lg,
  },
  RequestTrackingScreenStepTitleFiligree: {
    ...Typography.subheadline,
    fontWeight: '600',
    marginBottom: 2,
  },
  RequestTrackingScreenStepTitleFiligreeCompleted: {
    color: Colors.textPrimary,
  },
  RequestTrackingScreenStepTitleFiligreeGray: { color: Colors.textTertiary },
  RequestTrackingScreenStepDescriptionFiligree: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  RequestTrackingScreenStaffRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },

  RequestTrackingScreenStaffAvatarEnclave: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  RequestTrackingScreenStaffAvatarFiligree: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  RequestTrackingScreenStaffNameFiligree: {
    ...Typography.caption1,
    color: Colors.textSecondary,
    fontWeight: '500',
  },

  RequestTrackingScreenTimestampFiligree: {
    ...Typography.caption2,
    color: Colors.textTertiary,
    marginTop: 4,
  },
});
