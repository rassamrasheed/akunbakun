import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Switch, StyleSheet, Platform } from 'react-native';
import { useState } from 'react';

export default function SettingsScreen() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [rtlPreview, setRtlPreview] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Customize your learning experience.</Text>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.row}>
            <View>
              <Text style={styles.cardTitle}>Sound effects</Text>
              <Text style={styles.cardText}>Enable pronunciation and celebration audio.</Text>
            </View>
            <Switch value={soundEnabled} onValueChange={setSoundEnabled} thumbColor={soundEnabled ? '#00897B' : '#d1d5db'} trackColor={{ false: '#D9D9D9', true: '#A6E3D8' }} />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <View>
              <Text style={styles.cardTitle}>RTL preview</Text>
              <Text style={styles.cardText}>Toggle Dhivehi layout preview for reading direction.</Text>
            </View>
            <Switch value={rtlPreview} onValueChange={setRtlPreview} thumbColor={rtlPreview ? '#00897B' : '#d1d5db'} trackColor={{ false: '#D9D9D9', true: '#A6E3D8' }} />
          </View>
        </View>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.cardTitle}>Quick tips</Text>
        <View style={styles.tipList}>
          <Text style={styles.tipText}>• Tap a letter or word to hear its sound.</Text>
          <Text style={styles.tipText}>• Keep fingers inside the tracing path for best results.</Text>
          <Text style={styles.tipText}>• Check progress together with your child each week.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#00897B',
  },
  subtitle: {
    marginTop: 6,
    color: '#475057',
    fontSize: 14,
    lineHeight: 20,
  },
  content: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 22,
    ...Platform.select({
      web: { boxShadow: '0px 14px 22px rgba(0, 0, 0, 0.05)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.05,
        shadowRadius: 22,
        elevation: 5,
      },
    }),
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#475057',
  },
  cardText: {
    marginTop: 6,
    color: '#7F8A93',
    fontSize: 14,
    lineHeight: 20,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 22,
    ...Platform.select({
      web: { boxShadow: '0px 14px 22px rgba(0, 0, 0, 0.05)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.05,
        shadowRadius: 22,
        elevation: 5,
      },
    }),
    marginTop: 16,
  },
  tipList: {
    marginTop: 16,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#7F8A93',
    marginBottom: 12,
  },
});
