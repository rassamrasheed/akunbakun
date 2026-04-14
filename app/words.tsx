import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

export default function WordsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-sand px-5 py-6">
      <Text className="text-3xl font-bold text-ocean">Word Matching</Text>
      <View className="mt-6 rounded-[32px] bg-white p-5 shadow-xl shadow-slate/10">
        <Text className="text-lg font-semibold text-slate">Choose the matching word to learn spelling and meaning.</Text>
      </View>
    </SafeAreaView>
  );
}
