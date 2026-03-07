import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export interface AssetItem {
  id: string;
  ticker: string;
  amount: string;
  fiatValue: string;
  changePercent?: number;
  iconType: 'sol' | 'usdc' | 'bonk' | 'jup';
}

export interface AssetListProps {
  assets?: AssetItem[];
}

const DEFAULT_ASSETS: AssetItem[] = [
  { id: '1', ticker: 'SOL', amount: '1.45 SOL', fiatValue: '$188.42', changePercent: 1.2, iconType: 'sol' },
  { id: '2', ticker: 'USDC', amount: '500 USDC', fiatValue: '$500.00', iconType: 'usdc' },
  { id: '3', ticker: 'BONK', amount: '1.2M BONK', fiatValue: '$32.11', changePercent: 0.8, iconType: 'bonk' },
  { id: '4', ticker: 'JUP', amount: '85 JUP', fiatValue: '$48.95', changePercent: -0.5, iconType: 'jup' },
];

function AssetIcon({ iconType }: { iconType: AssetItem['iconType'] }) {
  const iconStyles: Record<AssetItem['iconType'], { bg: string }> = {
    sol: { bg: colors.swap + '50' },
    usdc: { bg: colors.primary + '50' },
    bonk: { bg: colors.brandOrange + '50' },
    jup: { bg: colors.success + '40' },
  };
  const { bg } = iconStyles[iconType];
  if (iconType === 'sol') {
    return (
      <View style={[styles.iconCircle, { backgroundColor: bg }]}>
        <Text style={styles.iconText}>S</Text>
      </View>
    );
  }
  if (iconType === 'usdc') {
    return (
      <View style={[styles.iconCircle, { backgroundColor: bg }]}>
        <Text style={styles.iconText}>$</Text>
      </View>
    );
  }
  if (iconType === 'bonk') {
    return (
      <View style={[styles.iconCircle, { backgroundColor: bg }]}>
        <Text style={styles.iconText}>B</Text>
      </View>
    );
  }
  return (
    <View style={[styles.iconCircle, { backgroundColor: bg }]}>
      <Text style={styles.iconText}>J</Text>
    </View>
  );
}

export function AssetList({ assets = DEFAULT_ASSETS }: AssetListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.scroll}>
      {assets.map((asset) => (
        <Card key={asset.id} padding="md" withMargin={false} style={styles.assetCard}>
          <AssetIcon iconType={asset.iconType} />
          <Text style={styles.amount} numberOfLines={1}>{asset.amount}</Text>
          <Text style={styles.fiat}>{asset.fiatValue}</Text>
          {asset.changePercent !== undefined ? (
            <Text
              style={[
                styles.change,
                asset.changePercent >= 0 ? styles.changePositive : styles.changeNegative,
              ]}>
              {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent}%
            </Text>
          ) : null}
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginBottom: spacing.xl,
  },
  scrollContent: {
    flexDirection: 'row',
    paddingRight: spacing.lg,
  },
  assetCard: {
    minWidth: 100,
    marginRight: spacing.md,
    marginBottom: 0,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  iconText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  fiat: {
    fontSize: 12,
    color: colors.secondaryText,
    marginBottom: spacing.xs,
  },
  change: {
    fontSize: 12,
    fontWeight: '600',
  },
  changePositive: {
    color: colors.success,
  },
  changeNegative: {
    color: colors.error,
  },
});
