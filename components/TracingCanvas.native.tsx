import { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Canvas, Path, Skia, useTouchHandler } from '@shopify/react-native-skia';
import type { SkPath } from '@shopify/react-native-skia';

interface Props {
  strokeColor?: string;
  strokeWidth?: number;
  guideLetter?: string;
}

export default function TracingCanvas({ strokeColor = '#00897B', strokeWidth = 6, guideLetter }: Props) {
  const [paths, setPaths] = useState<SkPath[]>([]);
  const current = useRef<SkPath | null>(null);

  const touchHandler = useTouchHandler({
    onStart: ({ x, y }) => {
      const p = Skia.Path.Make();
      p.moveTo(x, y);
      current.current = p;
      setPaths((prev) => [...prev, p.copy()]);
    },
    onActive: ({ x, y }) => {
      if (!current.current) return;
      current.current.lineTo(x, y);
      setPaths((prev) => [...prev.slice(0, -1), current.current!.copy()]);
    },
    onEnd: () => { current.current = null; },
  }, []);

  return (
    <View style={styles.wrapper}>
      {/* Dotted guide letter rendered behind the canvas */}
      {guideLetter && (
        <View style={styles.guideContainer} pointerEvents="none">
          <Text style={styles.guideLetter}>{guideLetter}</Text>
        </View>
      )}

      <Canvas style={styles.canvas} onTouch={touchHandler}>
        {paths.map((p, i) => (
          <Path
            key={i}
            path={p}
            color={strokeColor}
            style="stroke"
            strokeWidth={strokeWidth}
            strokeCap="round"
            strokeJoin="round"
          />
        ))}
      </Canvas>

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
    color: 'rgba(0, 137, 123, 0.10)',
    // Dashed border effect using text shadow repeats
    textShadowColor: 'rgba(0, 137, 123, 0.22)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  canvas: { flex: 1 },
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
