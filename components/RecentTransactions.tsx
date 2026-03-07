import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { TransactionItem } from '@/components/TransactionItem';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import type { TransactionIconType, TransactionType } from '@/components/TransactionItem';

export interface RecentTransactionData {
  id: string;
  title: string;
  amount: string;
  type: TransactionType;
  subtitle?: string;
  time?: string;
  date?: string;
  iconType?: TransactionIconType;
}

export interface RecentTransactionsProps {
  transactions: RecentTransactionData[];
  title?: string;
}

export function RecentTransactions({
  transactions,
  title = 'Recent Transactions',
}: RecentTransactionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Card padding={0} withMargin={false}>
        <View style={styles.list}>
          {transactions.map((tx, index) => (
            <TransactionItem
              key={tx.id}
              id={tx.id}
              title={tx.title}
              amount={tx.amount}
              type={tx.type}
              subtitle={tx.subtitle}
              date={tx.date}
              time={tx.time}
              iconType={tx.iconType}
              showDivider={index < transactions.length - 1}
            />
          ))}
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  list: {
    overflow: 'hidden',
  },
});
