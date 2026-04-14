import '../global.css';
import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Platform, StyleSheet } from 'react-native';
import { Home, ChartBar, Settings } from 'lucide-react-native';

const tabScreenOptions = {
  headerShown: false,
  tabBarActiveTintColor: '#00897B',
  tabBarInactiveTintColor: '#9EADA6',
  tabBarStyle: {
    backgroundColor: '#FFF8F0',
    borderTopColor: '#D9CBB9',
    height: 70,
    paddingBottom: 10,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '700' as const,
  },
};

function TabScreens() {
  return (
    <Tabs screenOptions={tabScreenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} strokeWidth={1.8} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => <ChartBar color={color} size={size} strokeWidth={1.8} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} strokeWidth={1.8} />,
        }}
      />
      {/* Hide game screens from tab bar */}
      <Tabs.Screen name="letters"  options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="words"    options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="stories"  options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="quiz"     options={{ href: null, headerShown: false }} />
    </Tabs>
  );
}

export default function Layout() {
  return (
    <SafeAreaProvider>
      {Platform.OS === 'web' ? (
        <View style={styles.webShell}>
          <View style={styles.webFrame}>
            <TabScreens />
          </View>
        </View>
      ) : (
        <TabScreens />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  webShell: {
    flex: 1,
    backgroundColor: '#E8E0D5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webFrame: {
    width: 820,
    maxWidth: '100%',
    height: '100%',
    overflow: 'hidden',
    // @ts-ignore web only
    boxShadow: '0 0 60px rgba(0,0,0,0.18)',
  },
});
