import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

export default function StoriesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-sand px-5 py-6">
      <Text className="text-3xl font-bold text-ocean">Story Time</Text>
      <View className="mt-6 rounded-[32px] bg-white p-5 shadow-xl shadow-slate/10">
        <Text className="text-lg font-semibold text-slate">Bilingual stories will appear here with audio narration and word highlighting.</Text>
      </View>
    </SafeAreaView>
  );
}
