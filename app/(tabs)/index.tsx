import { ScrollView, StyleSheet } from 'react-native';

import { AssetList } from '@/components/AssetList';
import { BalanceCard } from '@/components/BalanceCard';
import { FavoriteWallets } from '@/components/FavoriteWallets';
import { HomeHeader } from '@/components/HomeHeader';
import { QuickActions } from '@/components/QuickActions';
import { RecentTransactions } from '@/components/RecentTransactions';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { spacing } from '@/constants/spacing';
import type { RecentTransactionData } from '@/components/RecentTransactions';

const RECENT_TRANSACTIONS: RecentTransactionData[] = [
  {
    id: '1',
    title: 'Coffee Shop',
    amount: '$5.00',
    type: 'sent',
    subtitle: '5 USDC',
    iconType: 'coffee',
  },
  {
    id: '2',
    title: 'Alice',
    amount: '12 USDC',
    type: 'received',
    iconType: 'avatar',
  },
  {
    id: '3',
    title: 'Swap SOL → USDC',
    amount: '0.1 SOL',
    type: 'swap',
    iconType: 'swap',
  },
];

export default function HomeScreen() {
  return (
    <ScreenContainer edges={['top']} paddingHorizontal="lg" paddingBottom="xl">
      <HomeHeader />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <BalanceCard
          balance="$1,248.32"
          label="Total Balance"
          cryptoBreakdown="$1,060.00 | 14.5 SOL"
          withMargin={false}
        />
        <AssetList />
        <QuickActions />
        <FavoriteWallets />
        <RecentTransactions transactions={RECENT_TRANSACTIONS} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
});
