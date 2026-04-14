import { useRef, useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  strokeColor?: string;
  strokeWidth?: number;
  guideLetter?: string;
}

export default function TracingCanvas({ strokeColor = '#00897B', strokeWidth = 6, guideLetter }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const [hasStrokes, setHasStrokes] = useState(false);

  const drawGuide = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !guideLetter) return;
    const ctx = canvas.getContext('2d')!;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Large dotted letter outline
    ctx.save();
    ctx.font = `900 ${canvas.height * 0.82}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Filled ghost
    ctx.fillStyle = 'rgba(0, 137, 123, 0.08)';
    ctx.fillText(guideLetter, cx, cy);

    // Dashed stroke outline
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = 'rgba(0, 137, 123, 0.35)';
    ctx.strokeText(guideLetter, cx, cy);
    ctx.setLineDash([]);
    ctx.restore();
  }, [guideLetter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width || 400;
      canvas.height = rect.height || 140;
      drawGuide();
    };
    resize();

    const ctx = canvas.getContext('2d')!;

    const pos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const src = 'touches' in e ? e.touches[0] : (e as MouseEvent);
      return { x: src.clientX - rect.left, y: src.clientY - rect.top };
    };

    const onStart = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      isDrawing.current = true;
      const { x, y } = pos(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current) return;
      e.preventDefault();
      const { x, y } = pos(e);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
      setHasStrokes(true);
    };

    const onEnd = () => { isDrawing.current = false; };

    canvas.addEventListener('mousedown', onStart);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseup', onEnd);
    canvas.addEventListener('mouseleave', onEnd);
    canvas.addEventListener('touchstart', onStart, { passive: false });
    canvas.addEventListener('touchmove', onMove, { passive: false });
    canvas.addEventListener('touchend', onEnd);

    return () => {
      canvas.removeEventListener('mousedown', onStart);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseup', onEnd);
      canvas.removeEventListener('mouseleave', onEnd);
      canvas.removeEventListener('touchstart', onStart);
      canvas.removeEventListener('touchmove', onMove);
      canvas.removeEventListener('touchend', onEnd);
    };
  }, [strokeColor, strokeWidth, drawGuide]);

  // Redraw guide when letter changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGuide();
    setHasStrokes(false);
  }, [guideLetter, drawGuide]);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGuide();
    setHasStrokes(false);
  };

  return (
    <View style={styles.wrapper}>
      {/* @ts-ignore */}
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', cursor: 'crosshair', borderRadius: 18 }}
      />
      {hasStrokes && (
        <TouchableOpacity style={styles.clearBtn} onPress={clear}>
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
