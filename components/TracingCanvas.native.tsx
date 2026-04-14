import { useRef, useState } from 'react';
import { View, PanResponder, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';

interface Props {
  strokeColor?: string;
  strokeWidth?: number;
  guideLetter?: string;
}

export default function TracingCanvas({ strokeColor = '#00897B', strokeWidth = 6, guideLetter }: Props) {
  const [paths, setPaths] = useState<string[]>([]);
  const currentPoints = useRef<{ x: number; y: number }[]>([]);

  const pointsToPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    return pts.reduce((d, pt, i) => d + (i === 0 ? `M${pt.x},${pt.y}` : ` L${pt.x},${pt.y}`), '');
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        currentPoints.current = [{ x: locationX, y: locationY }];
        setPaths((prev) => [...prev, pointsToPath(currentPoints.current)]);
      },
      onPanResponderMove: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        currentPoints.current = [...currentPoints.current, { x: locationX, y: locationY }];
        setPaths((prev) => [...prev.slice(0, -1), pointsToPath(currentPoints.current)]);
      },
      onPanResponderRelease: () => {
        currentPoints.current = [];
      },
    })
  ).current;

  return (
    <View style={styles.wrapper} {...panResponder.panHandlers}>
      {/* Dotted guide letter */}
      {guideLetter && (
        <View style={styles.guideContainer} pointerEvents="none">
          <Text style={styles.guideLetter}>{guideLetter}</Text>
        </View>
      )}

      <Svg style={StyleSheet.absoluteFill}>
        {paths.map((d, i) => (
          <Path
            key={i}
            d={d}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
      </Svg>

      {paths.length === 0 && (
        <View style={styles.hint} pointerEvents="none">
          <Text style={styles.hintText}>✏️  Trace here</Text>
        </View>
      )}
      {paths.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={() => setPaths([])}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 140,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    backgroundColor: '#F5F6F7',
    overflow: 'hidden',
    marginBottom: 10,
  },
  guideContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideLetter: {
    fontSize: 110,
    fontWeight: '900',
    color: 'rgba(0,137,123,0.10)',
    textShadowColor: 'rgba(0,137,123,0.22)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  hint: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintText: { color: '#BDBDBD', fontSize: 14 },
  clearBtn: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  clearText: { fontSize: 12, color: '#FF6B6B', fontWeight: '700' },
});
