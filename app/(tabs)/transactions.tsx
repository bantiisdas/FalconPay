import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { colors } from '@/constants/colors';

export default function TransactionsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText type="subtitle">Transactions</ThemedText>
        <ThemedText style={styles.hint}>Transaction history placeholder</ThemedText>
      </View>
    </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
  },
  hint: {
    marginTop: 8,
    opacity: 0.8,
  },
});
