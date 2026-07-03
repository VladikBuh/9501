import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Typography } from '../../theme';
import { guestData } from '../../data/guest';

export default function FullBarcodeScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[styles.FullBarcodeScreenFacetChassis, { opacity: fadeAnim }]}
    >
      <StatusBar barStyle="light-content" />

      <TouchableOpacity
        style={styles.FullBarcodeScreenClosePortico}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.FullBarcodeScreenClosePorticoFiligree}>
          ✕ Close
        </Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.FullBarcodeScreenCenterContentEnclave}
        contentContainerStyle={styles.FullBarcodeScreenCenterContentScroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Full width barcode */}
        <View style={styles.FullBarcodeScreenBarcodeEnclave}>
          {Array.from({ length: 90 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.FullBarcodeScreenBarcodePieceSigil,
                {
                  width: [1, 2, 3, 1, 2, 1, 3][i % 7],
                  height: i % 11 === 0 ? 110 : 90,
                  backgroundColor: [3, 7, 13, 17, 23].includes(i % 30)
                    ? 'transparent'
                    : Colors.white,
                },
              ]}
            />
          ))}
        </View>
        <Text style={styles.FullBarcodeScreenReservationNumberFiligree}>
          {guestData.reservationNumber}
        </Text>

        {/* Guest info under barcode */}
        <View style={styles.FullBarcodeScreenInfoBlockEnclave}>
          <InfoLine label="Guest" value={guestData.name} />
          <InfoLine label="Room" value={guestData.roomNumber} />
          <InfoLine label="Reservation" value={guestData.reservationNumber} />
          <InfoLine label="Hotel" value="Woobine Guest Hub" />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.FullBarcodeScreenBrightnessPortico}
        activeOpacity={0.8}
      >
        <Text style={styles.FullBarcodeScreenBrightnessPorticoFiligree}>
          ☀️ Maximum Brightness
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const InfoLine = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.FullBarcodeScreenInfoLineLintel}>
    <Text style={styles.FullBarcodeScreenInfoLineLabelFiligree}>{label}</Text>
    <Text style={styles.FullBarcodeScreenInfoLineValueFiligree}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  FullBarcodeScreenFacetChassis: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },

  FullBarcodeScreenClosePortico: {
    position: 'absolute',
    top: 60,
    right: Spacing.lg,
    zIndex: 10,
  },
  FullBarcodeScreenClosePorticoFiligree: {
    ...Typography.callout,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },
  FullBarcodeScreenCenterContentEnclave: {
    flex: 1,
  },
  FullBarcodeScreenCenterContentScroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  FullBarcodeScreenBarcodeEnclave: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    paddingHorizontal: Spacing.md,
    height: 120,
  },
  FullBarcodeScreenBarcodePieceSigil: { borderRadius: 1 },
  FullBarcodeScreenReservationNumberFiligree: {
    ...Typography.callout,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 3,
    fontWeight: '500',
  },

  FullBarcodeScreenInfoBlockEnclave: { gap: 8, width: '80%' },
  FullBarcodeScreenInfoLineLintel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  FullBarcodeScreenInfoLineLabelFiligree: {
    ...Typography.subheadline,
    color: 'rgba(255,255,255,0.45)',
  },
  FullBarcodeScreenInfoLineValueFiligree: {
    ...Typography.subheadline,
    color: Colors.white,
    fontWeight: '600',
  },

  FullBarcodeScreenBrightnessPortico: {
    marginHorizontal: Spacing.xl,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  FullBarcodeScreenBrightnessPorticoFiligree: {
    ...Typography.headline,
    color: Colors.white,
  },
});
