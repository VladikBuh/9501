import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Typography } from '../../theme';

type Props = {
  title: string;
  onBack?: () => void;
};

/**
 * Native-stack's headerLargeTitle only collapses on iOS. On Android this
 * renders the same large title as a normal element inside the scroll
 * content instead, so it scrolls away with the rest of the screen.
 *
 * Pass onBack for pushed (non-tab-root) screens whose native header is
 * hidden on Android — otherwise there is no way back on that platform.
 */
export function ScreenTitleHeader({ title, onBack }: Props) {
  if (Platform.OS !== 'android') return null;

  return (
    <View style={styles.ScreenTitleHeaderWrap}>
      <View style={styles.ScreenTitleHeaderRow}>
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            style={styles.ScreenTitleHeaderBackPortico}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.ScreenTitleHeaderBackFiligree}>‹</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.ScreenTitleHeaderFiligree}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ScreenTitleHeaderWrap: {
    paddingTop: 60,
  },
  ScreenTitleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ScreenTitleHeaderBackPortico: {
    marginLeft: -8,
    padding: 8,
  },
  ScreenTitleHeaderBackFiligree: {
    fontSize: 30,
    lineHeight: 34,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  ScreenTitleHeaderFiligree: {
    ...Typography.largeTitle,
    color: Colors.textPrimary,
  },
});
