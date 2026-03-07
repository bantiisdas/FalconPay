import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export interface SwapPreviewCardProps {
  /** e.g. "50.00 USDC" */
  youSend: string;
  /** e.g. "~50.00 USDC" or "0.023 SOL" */
  theyReceive: string;
  /** Optional network fee line */
  fee?: string;
}

export function SwapPreviewCard({
  youSend,
  theyReceive,
  fee,
}: SwapPreviewCardProps) {
  return (
    <Card padding="lg" withMargin={false} style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>You send</Text>
        <Text style={styles.value}>{youSend}</Text>
      </View>
      <View style={[styles.row, styles.rowBorder]}>
        <Text style={styles.label}>They receive</Text>
        <Text style={styles.value}>{theyReceive}</Text>
      </View>
      {fee != null ? (
        <View style={styles.row}>
          <Text style={styles.label}>Network fee</Text>
          <Text style={styles.fee}>{fee}</Text>
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  rowBorder: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  label: {
    fontSize: 14,
    color: colors.secondaryText,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  fee: {
    fontSize: 14,
    color: colors.secondaryText,
  },
});
