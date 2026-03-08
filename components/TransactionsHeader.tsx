import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { InAppLogo } from '@/components/InAppLogo';
import { HeaderButton } from '@/components/ui/Header';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export function TransactionsHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>Transactions</Text>
        <View style={styles.logo}>
          <InAppLogo size={24} />
        </View>
      </View>
      <View style={styles.right}>
        <HeaderButton onPress={() => {}} accessibilityLabel="Filter">
          <Ionicons name="options-outline" size={22} color={colors.text} />
        </HeaderButton>
        <HeaderButton onPress={() => {}} accessibilityLabel="Search">
          <Ionicons name="search-outline" size={22} color={colors.text} />
        </HeaderButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: colors.background,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  logo: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});
