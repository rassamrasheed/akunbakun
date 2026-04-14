import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform, Animated, Easing } from 'react-native';
import { PencilLine, MessageCircle, BookOpen, Trophy } from 'lucide-react-native';

const FLOATERS = [
  { id: 1,  x: '8%',  y: '12%', size: 18, color: 'rgba(0,137,123,0.18)', emoji: null,  dur: 3200, delay: 0 },
  { id: 2,  x: '80%', y: '8%',  size: 12, color: 'rgba(255,107,107,0.2)', emoji: null,  dur: 2800, delay: 400 },
  { id: 3,  x: '55%', y: '20%', size: 22, color: 'rgba(0,137,123,0.12)', emoji: null,  dur: 4000, delay: 800 },
  { id: 4,  x: '20%', y: '40%', size: 10, color: 'rgba(255,107,107,0.15)',emoji: null,  dur: 2400, delay: 200 },
  { id: 5,  x: '70%', y: '50%', size: 16, color: 'rgba(0,137,123,0.15)', emoji: null,  dur: 3600, delay: 600 },
  { id: 6,  x: '90%', y: '35%', size: 8,  color: 'rgba(0,137,123,0.2)',  emoji: null,  dur: 2000, delay: 1000 },
  { id: 7,  x: '5%',  y: '65%', size: 14, color: 'rgba(255,107,107,0.12)',emoji: null, dur: 3000, delay: 300 },
  { id: 8,  x: '40%', y: '75%', size: 20, color: 'rgba(0,137,123,0.10)', emoji: null,  dur: 4400, delay: 700 },
  { id: 9,  x: '15%', y: '22%', size: 0,  color: '',                     emoji: '🐠',  dur: 5000, delay: 500 },
  { id: 10, x: '72%', y: '68%', size: 0,  color: '',                     emoji: '⭐',  dur: 3800, delay: 900 },
  { id: 11, x: '48%', y: '55%', size: 0,  color: '',                     emoji: '🐚',  dur: 4200, delay: 1200 },
  { id: 12, x: '85%', y: '80%', size: 0,  color: '',                     emoji: '✨',  dur: 2600, delay: 150 },
];

function FloatingItem({ x, y, size, color, emoji, dur, delay }: typeof FLOATERS[0]) {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatY = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, { toValue: -14, duration: dur, easing: Easing.inOut(Easing.sin), useNativeDriver: true, delay }),
        Animated.timing(translateY, { toValue: 14,  duration: dur, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    const floatX = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, { toValue: 8,   duration: dur * 1.3, easing: Easing.inOut(Easing.sin), useNativeDriver: true, delay }),
        Animated.timing(translateX, { toValue: -8,  duration: dur * 1.3, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    floatY.start();
    floatX.start();
    return () => { floatY.stop(); floatX.stop(); };
  }, []);

  return (
    <Animated.View
      // eslint-disable-next-line react-native/no-inline-styles
      style={[{ position: 'absolute', left: x as any, top: y as any }, { transform: [{ translateY }, { translateX }] }]}
    >
      {emoji
        ? <Text style={{ fontSize: size || 18, opacity: 0.55 }}>{emoji}</Text>
        : <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color }} />
      }
    </Animated.View>
  );
}

const modules = [
  { label: 'Letters', route: '/letters', Icon: PencilLine,  accent: '#E0F7F6', iconColor: '#00897B' },
  { label: 'Words',   route: '/words',   Icon: MessageCircle, accent: '#FFE6E2', iconColor: '#FF6B6B' },
  { label: 'Stories', route: '/stories', Icon: BookOpen,    accent: '#F1F5F9', iconColor: '#5C6BC0' },
  { label: 'Quiz',    route: '/quiz',    Icon: Trophy,      accent: '#FFF8E1', iconColor: '#FF8F00' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {FLOATERS.map((f) => <FloatingItem key={f.id} {...f} />)}
      <View style={styles.circleRight} />
      <View style={styles.circleLeft} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.smallTitle}>Good morning,</Text>
            <Text style={styles.mainTitle}>Amina</Text>
            <Text style={styles.bodyText}>Let's learn Dhivehi and English today!</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Stars</Text>
            <Text style={styles.statValue}>84</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Adventure</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: '72%' }]} />
          </View>
          <Text style={styles.bodyText}>You're 72% of the way to your next badge!</Text>
          <View style={styles.tagCard}>
            <Text style={styles.tagTitle}>Fili says hello!</Text>
            <Text style={styles.tagBody}>Trace letters, match words, and hear stories with your new friend.</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Fun Games with Fili</Text>
          <Text style={styles.sectionSubtitle}>Tap a module</Text>
        </View>

        <View style={styles.moduleGrid}>
          {modules.map((module) => (
            <TouchableOpacity
              key={module.label}
              onPress={() => router.push(module.route)}
              activeOpacity={0.85}
              style={[styles.moduleCard, { backgroundColor: module.accent }]}
            >
              <module.Icon size={40} color={module.iconColor} strokeWidth={1.8} />
              <Text style={[styles.moduleTitle, { color: module.iconColor }]}>{module.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  scrollContent: {
    paddingBottom: 48,
    paddingHorizontal: 20,
  },
  circleRight: {
    position: 'absolute',
    right: -20,
    top: 40,
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 137, 123, 0.15)',
  },
  circleLeft: {
    position: 'absolute',
    left: -20,
    top: 220,
    width: 140,
    height: 140,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 107, 107, 0.12)',
  },
  headerRow: {
    marginTop: 24,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  smallTitle: {
    color: '#475057',
    fontSize: 16,
    marginBottom: 6,
  },
  mainTitle: {
    color: '#00897B',
    fontSize: 38,
    fontWeight: '800',
  },
  bodyText: {
    color: '#475057',
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 14,
    ...Platform.select({
      web: { boxShadow: '0px 12px 20px rgba(0, 0, 0, 0.06)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.06,
        shadowRadius: 20,
        elevation: 4,
      },
    }),
  },
  statLabel: {
    color: '#475057',
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  statValue: {
    color: '#00897B',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 22,
    ...Platform.select({
      web: { boxShadow: '0px 14px 24px rgba(0, 0, 0, 0.05)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.05,
        shadowRadius: 24,
        elevation: 4,
      },
    }),
    marginBottom: 20,
  },
  cardTitle: {
    color: '#475057',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
  },
  progressBarBackground: {
    width: '100%',
    height: 10,
    borderRadius: 20,
    marginBottom: 14,
    backgroundColor: '#E8F1F0',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#00897B',
  },
  tagCard: {
    marginTop: 18,
    borderRadius: 24,
    padding: 18,
    backgroundColor: '#FFE6E2',
  },
  tagTitle: {
    color: '#00897B',
    fontSize: 18,
    fontWeight: '800',
  },
  tagBody: {
    color: '#475057',
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#00897B',
    fontSize: 18,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: '#7F8A93',
    fontSize: 13,
    fontWeight: '700',
  },
  moduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  moduleCard: {
    width: 160,
    height: 160,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(71, 80, 87, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.07)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.07,
        shadowRadius: 16,
        elevation: 4,
      },
    }),
  },
  moduleTitle: {
    fontSize: 13,
    fontWeight: '800',
    marginTop: 10,
  },
  moduleBody: {
    display: 'none',
  },
});
