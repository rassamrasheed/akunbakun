import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.subtitle}>Your learning adventure so far.</Text>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly stars</Text>
          <View style={styles.statBlock}>
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statText}>Keep going — your story skills are growing!</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Badges</Text>
          <View style={styles.badgeGrid}>
            <View style={[styles.badgeItem, styles.badgeBlue]}>
              <Text style={styles.badgeEmoji}>🐟</Text>
              <Text style={styles.badgeLabel}>Fish Badge</Text>
            </View>
            <View style={[styles.badgeItem, styles.badgeCoral]}>
              <Text style={styles.badgeEmoji}>🌊</Text>
              <Text style={styles.badgeLabel}>Coral Badge</Text>
            </View>
            <View style={[styles.badgeItem, styles.badgeGray]}>
              <Text style={styles.badgeEmoji}>📚</Text>
              <Text style={styles.badgeLabel}>Story Badge</Text>
            </View>
          </View>
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
    fontSize: 14,
    lineHeight: 20,
    color: '#475057',
  },
  content: {
    marginTop: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 22,
    ...Platform.select({
      web: { boxShadow: '0px 14px 22px rgba(0, 0, 0, 0.06)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.06,
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
  statBlock: {
    marginTop: 18,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 137, 123, 0.08)',
    padding: 18,
  },
  statNumber: {
    fontSize: 44,
    fontWeight: '900',
    color: '#00897B',
  },
  statText: {
    marginTop: 10,
    color: '#475057',
    fontSize: 14,
    lineHeight: 20,
  },
  badgeGrid: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeItem: {
    width: '32%',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeBlue: {
    backgroundColor: 'rgba(0, 137, 123, 0.1)',
  },
  badgeCoral: {
    backgroundColor: 'rgba(255, 107, 107, 0.12)',
  },
  badgeGray: {
    backgroundColor: 'rgba(71, 80, 87, 0.08)',
  },
  badgeEmoji: {
    fontSize: 26,
  },
  badgeLabel: {
    marginTop: 10,
    color: '#475057',
    fontWeight: '800',
    fontSize: 12,
    textAlign: 'center',
  },
});
