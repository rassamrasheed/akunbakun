import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform, Pressable } from 'react-native';
import TracingCanvas from '../components/TracingCanvas';
import { SafeAreaView } from 'react-native-safe-area-context';
import dhivehiLetters from '../data/dhivehi-letters.json';
import { englishLetters } from '../data/english-letters';
import { DhivehiLetter, EnglishLetter } from '../types';

type ScriptMode = 'english' | 'dhivehi';

const PIN_COLORS = ['#FF6B6B', '#00BFA5', '#7C4DFF', '#FF9800', '#29B6F6', '#66BB6A'];

export default function LetterTracingScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<ScriptMode>('english');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => { setSelectedIndex(0); }, [mode]);

  const letterData = useMemo(
    () => (mode === 'english' ? englishLetters : dhivehiLetters),
    [mode]
  );

  const current = letterData[selectedIndex];
  const displayChar = mode === 'english'
    ? (current as EnglishLetter).letter
    : (current as DhivehiLetter).char;
  const displayName = mode === 'english'
    ? (current as EnglishLetter).name
    : `${(current as DhivehiLetter).name} · ${(current as DhivehiLetter).phonetic}`;
  const displayExample = mode === 'english'
    ? `Example: ${(current as EnglishLetter).example}`
    : `${(current as DhivehiLetter).exampleWordDhivehi} — ${(current as DhivehiLetter).exampleWordEnglish}`;

  return (
    <View style={styles.root}>
      {/* ── Illustrated background ── */}
      <View style={styles.sky} />
      <View style={styles.ocean} />
      <View style={styles.blob1} />
      <View style={styles.blob2} />
      <View style={styles.blob3} />
      <View style={styles.coral1} />
      <View style={styles.coral2} />

      <SafeAreaView style={styles.safeArea}>
        {/* ── Top bar ── */}
        <View style={styles.topBar}>
          <Pressable onPress={() => router.back()} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </Pressable>

          {/* Pill title */}
          <View style={styles.titlePill}>
            <Text style={styles.titlePillText}>Letter Tracing</Text>
          </View>

          {/* Mode toggle */}
          <View style={styles.modeToggle}>
            <TouchableOpacity
              onPress={() => setMode('english')}
              style={[styles.modeBtn, mode === 'english' && styles.modeBtnActive]}
            >
              <Text style={[styles.modeBtnText, mode === 'english' && styles.modeBtnTextActive]}>EN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMode('dhivehi')}
              style={[styles.modeBtn, mode === 'dhivehi' && styles.modeBtnActive]}
            >
              <Text style={[styles.modeBtnText, mode === 'dhivehi' && styles.modeBtnTextActive]}>DV</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Main content ── */}
        <View style={styles.content}>
          {/* Mascot placeholder */}
          <View style={styles.mascotArea}>
            <View style={styles.mascotBody}>
              <Text style={styles.mascotEmoji}>🐠</Text>
            </View>
            <Text style={styles.mascotLabel}>Fili</Text>
          </View>

          {/* Game card */}
          <View style={styles.gameCard}>
            {/* Big letter display */}
            <View style={styles.letterDisplay}>
              <Text style={[
                styles.bigLetter,
                mode === 'dhivehi' && { writingDirection: 'rtl' },
              ]}>
                {displayChar}
              </Text>
            </View>

            {/* Tracing canvas */}
            <TracingCanvas strokeColor="#00897B" strokeWidth={6} guideLetter={displayChar} />

            {/* Letter name + example */}
            <Text style={styles.letterName}>{displayName}</Text>
            <Text style={styles.example}>{displayExample}</Text>
          </View>
        </View>

        {/* ── Letter picker pins ── */}
        <View style={styles.pickerWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pickerScroll}
          >
            {letterData.map((item, index) => {
              const isSelected = index === selectedIndex;
              const color = PIN_COLORS[index % PIN_COLORS.length];
              const label = mode === 'english'
                ? (item as EnglishLetter).letter
                : (item as DhivehiLetter).char;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedIndex(index)}
                  activeOpacity={0.8}
                  style={styles.pinWrap}
                >
                  <View style={[
                    styles.pinCircle,
                    { backgroundColor: isSelected ? color : '#FFFFFF', borderColor: color },
                    isSelected && styles.pinSelected,
                  ]}>
                    <Text style={[styles.pinLabel, { color: isSelected ? '#FFFFFF' : color }]}>
                      {label}
                    </Text>
                  </View>
                  {/* Pin tail */}
                  <View style={[styles.pinTail, { borderTopColor: isSelected ? color : 'transparent' }]} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  // ── Background layers ──
  sky: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#B3E5FC',
  },
  ocean: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '38%',
    backgroundColor: '#006064',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  blob1: {
    position: 'absolute',
    top: 60,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#80DEEA',
    opacity: 0.5,
  },
  blob2: {
    position: 'absolute',
    top: 30,
    right: -30,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#80CBC4',
    opacity: 0.45,
  },
  blob3: {
    position: 'absolute',
    top: 120,
    right: 60,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#B2EBF2',
    opacity: 0.6,
  },
  coral1: {
    position: 'absolute',
    bottom: '30%',
    left: 20,
    width: 28,
    height: 70,
    borderRadius: 14,
    backgroundColor: '#FF6B6B',
    opacity: 0.7,
  },
  coral2: {
    position: 'absolute',
    bottom: '32%',
    right: 30,
    width: 22,
    height: 55,
    borderRadius: 11,
    backgroundColor: '#FF8A65',
    opacity: 0.7,
  },

  // ── Layout ──
  safeArea: { flex: 1 },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: { fontSize: 14, color: '#475057', fontWeight: '800' },

  titlePill: {
    backgroundColor: '#FF8F00',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#FFCA28',
    ...Platform.select({
      web: { boxShadow: '0 3px 0 #E65100' },
      default: {
        shadowColor: '#E65100',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
      },
    }),
  },
  titlePillText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16, letterSpacing: 0.3 },

  modeToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 3,
  },
  modeBtn: { borderRadius: 17, paddingHorizontal: 10, paddingVertical: 5 },
  modeBtnActive: { backgroundColor: '#00897B' },
  modeBtnText: { fontSize: 12, fontWeight: '800', color: '#475057' },
  modeBtnTextActive: { color: '#FFFFFF' },

  // ── Content row ──
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
  },

  mascotArea: { alignItems: 'center', marginRight: 10, marginBottom: 40 },
  mascotBody: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotEmoji: { fontSize: 38 },
  mascotLabel: { marginTop: 6, color: '#FFFFFF', fontWeight: '800', fontSize: 13 },

  gameCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 32,
    padding: 16,
    alignItems: 'center',
    ...Platform.select({
      web: { boxShadow: '0 8px 32px rgba(0,0,0,0.14)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.14,
        shadowRadius: 24,
        elevation: 8,
      },
    }),
  },

  letterDisplay: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: '#E0F7F6',
    borderWidth: 2,
    borderColor: '#00897B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bigLetter: { fontSize: 56, fontWeight: '900', color: '#00897B', lineHeight: 68 },

  letterName: { fontSize: 16, fontWeight: '800', color: '#00897B', textAlign: 'center' },
  example: { marginTop: 4, fontSize: 13, color: '#7F8A93', textAlign: 'center' },

  // ── Pin picker ──
  pickerWrapper: {
    paddingBottom: 10,
  },
  pickerScroll: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-end',
  },
  pinWrap: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  pinCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    ...Platform.select({
      web: { boxShadow: '0 4px 10px rgba(0,0,0,0.2)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
      },
    }),
  },
  pinSelected: {},
  pinLabel: { fontSize: 20, fontWeight: '900' },
  pinTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },
});
