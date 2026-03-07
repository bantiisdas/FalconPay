import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export interface FavoriteWallet {
  id: string;
  name: string;
  address?: string;
  avatarType?: 'initial' | 'coffee' | 'dex' | 'wallet' | 'exchange';
  avatarColor?: string;
}

export interface FavoriteWalletsProps {
  wallets?: FavoriteWallet[];
  title?: string;
}

const DEFAULT_WALLETS: FavoriteWallet[] = [
  { id: '1', name: 'Alice', avatarType: 'initial', avatarColor: '#E11D48' },
  { id: '2', name: 'Bob', avatarType: 'initial', avatarColor: '#1E3A5F' },
  { id: '3', name: 'Coffee Shop', avatarType: 'coffee', avatarColor: '#78350F' },
  { id: '4', name: 'Exchange', avatarType: 'exchange', avatarColor: '#166534' },
];

function AvatarContent({
  wallet,
}: {
  wallet: FavoriteWallet;
}) {
  const bg = wallet.avatarColor ?? colors.primary + '40';
  if (wallet.avatarType === 'coffee') {
    return (
      <View style={[styles.avatar, { backgroundColor: bg }]}>
        <Ionicons name="cafe-outline" size={24} color={colors.text} />
      </View>
    );
  }
  if (wallet.avatarType === 'dex') {
    return (
      <View style={[styles.avatar, { backgroundColor: bg }]}>
        <Text style={styles.avatarText}>X</Text>
      </View>
    );
  }
  if (wallet.avatarType === 'exchange') {
    return (
      <View style={[styles.avatar, { backgroundColor: bg }]}>
        <Ionicons name="trending-up" size={24} color={colors.text} />
      </View>
    );
  }
  if (wallet.avatarType === 'wallet') {
    return (
      <View style={[styles.avatar, { backgroundColor: bg }]}>
        <MaterialCommunityIcons name="fox" size={22} color={colors.text} />
      </View>
    );
  }
  return (
    <View style={[styles.avatar, { backgroundColor: bg }]}>
      <Text style={styles.avatarText}>
        {wallet.name.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}

export function FavoriteWallets({
  wallets = DEFAULT_WALLETS,
  title = 'Favorite Wallets',
}: FavoriteWalletsProps) {
  const router = useRouter();

  const handleWalletPress = (wallet: FavoriteWallet) => {
    const address = wallet.address ?? `0x${wallet.id}`;
    router.push(`/send/${address}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {wallets.map((wallet) => (
          <Pressable
            key={wallet.id}
            onPress={() => handleWalletPress(wallet)}
            style={({ pressed }) => [
              styles.walletChip,
              pressed && styles.walletChipPressed,
            ]}
            accessibilityLabel={`Send to ${wallet.name}`}>
            <AvatarContent wallet={wallet} />
            <Text style={styles.walletName} numberOfLines={1}>
              {wallet.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  scrollContent: {
    flexDirection: 'row',
    paddingRight: spacing.lg,
  },
  walletChip: {
    alignItems: 'center',
    width: 72,
    marginRight: spacing.lg,
  },
  walletChipPressed: {
    opacity: 0.7,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  walletName: {
    fontSize: 12,
    color: colors.text,
    maxWidth: 72,
    textAlign: 'center',
  },
});
