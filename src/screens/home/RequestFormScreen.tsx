import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Spacing, Typography, Radius, Shadows } from '../../theme';
import { HomeStackParamList, Priority } from '../../types';
import { useRequests } from '../../hooks/useRequests';

type Nav = NativeStackNavigationProp<HomeStackParamList>;
type Route = RouteProp<HomeStackParamList, 'RequestForm'>;

const priorities: Priority[] = ['Normal', 'High', 'Very High'];
const priorityColors: Record<Priority, string> = {
  Normal: Colors.statusSubmitted,
  High: Colors.statusInProgress,
  'Very High': Colors.statusCancelled,
};

export default function RequestFormScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { category } = route.params;
  const { submitRequest } = useRequests();

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('Normal');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!description.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const id = submitRequest(category, subject, description, priority);
      navigation.replace('RequestConfirm', { requestId: id });
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.RequestFormScreenScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category display */}
        <View
          style={[
            styles.RequestFormScreenCardFacetChassis,
            styles.RequestFormScreenCategoryCard,
          ]}
        >
          <Text style={styles.RequestFormScreenCategoryLabelFiligree}>
            Category
          </Text>
          <Text style={styles.RequestFormScreenCategoryTitleFiligree}>
            {category.title}
          </Text>
          <Text style={styles.RequestFormScreenCategoryTimeFiligree}>
            Estimated response: {category.estimatedTime}
          </Text>
        </View>

        {/* Subject */}
        <View style={styles.RequestFormScreenFieldEnclave}>
          <Text style={styles.RequestFormScreenFieldLabelFiligree}>
            Subject{' '}
            <Text style={styles.RequestFormScreenOptionalFiligree}>
              (optional)
            </Text>
          </Text>
          <TextInput
            style={styles.RequestFormScreenInputPortico}
            placeholder="Brief subject..."
            placeholderTextColor={Colors.textTertiary}
            value={subject}
            onChangeText={setSubject}
          />
        </View>

        {/* Description */}
        <View style={styles.RequestFormScreenFieldEnclave}>
          <Text style={styles.RequestFormScreenFieldLabelFiligree}>
            Description{' '}
            <Text style={styles.RequestFormScreenRequiredFiligree}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.RequestFormScreenInputPortico,
              styles.RequestFormScreenTextAreaPortico,
            ]}
            placeholder="Please describe your request in detail..."
            placeholderTextColor={Colors.textTertiary}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        {/* Priority */}
        <View style={styles.RequestFormScreenFieldEnclave}>
          <Text style={styles.RequestFormScreenFieldLabelFiligree}>
            Priority
          </Text>
          <View style={styles.RequestFormScreenPriorityRowLintel}>
            {priorities.map(p => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.RequestFormScreenPriorityPortico,
                  priority === p && {
                    backgroundColor: priorityColors[p] + '33',
                    borderColor: priorityColors[p],
                  },
                ]}
                onPress={() => setPriority(p)}
              >
                <Text
                  style={[
                    styles.RequestFormScreenPriorityPorticoFiligree,
                    priority === p && { color: priorityColors[p] },
                  ]}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={[
            styles.RequestFormScreenSubmitPortico,
            (!description.trim() || loading) &&
              styles.RequestFormScreenSubmitPorticoDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!description.trim() || loading}
          activeOpacity={0.85}
        >
          <Text style={styles.RequestFormScreenSubmitPorticoFiligree}>
            {loading ? 'Submitting…' : 'Submit Request'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.RequestFormScreenNoteFiligree}>
          Hotel staff usually responds within several minutes.
        </Text>
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  RequestFormScreenScrollContent: {
    padding: Spacing.md,
    paddingTop: 15,
    gap: Spacing.md,
  },
  RequestFormScreenCardFacetChassis: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    ...(Shadows.small as object),
  },
  RequestFormScreenCategoryCard: { padding: Spacing.md },
  RequestFormScreenCategoryLabelFiligree: {
    ...Typography.caption1,
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  RequestFormScreenCategoryTitleFiligree: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  RequestFormScreenCategoryTimeFiligree: {
    ...Typography.footnote,
    color: Colors.red,
  },
  RequestFormScreenFieldEnclave: { gap: 8 },
  RequestFormScreenFieldLabelFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    fontWeight: '600',
  },

  RequestFormScreenOptionalFiligree: {
    color: Colors.textTertiary,
    fontWeight: '400',
  },
  RequestFormScreenRequiredFiligree: { color: Colors.red },
  RequestFormScreenInputPortico: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...Typography.body,
    color: Colors.textPrimary,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },

  RequestFormScreenTextAreaPortico: { minHeight: 120 },
  RequestFormScreenPriorityRowLintel: { flexDirection: 'row', gap: Spacing.sm },
  RequestFormScreenPriorityPortico: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: Radius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  RequestFormScreenPriorityPorticoFiligree: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  RequestFormScreenSubmitPortico: {
    backgroundColor: Colors.red,
    borderRadius: Radius.lg,
    padding: 17,
    alignItems: 'center',
  },
  RequestFormScreenSubmitPorticoDisabled: { opacity: 0.5 },
  RequestFormScreenSubmitPorticoFiligree: {
    ...Typography.headline,
    color: Colors.white,
  },

  RequestFormScreenNoteFiligree: {
    ...Typography.footnote,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
});
