import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export interface HomeHeaderProps {
  title?: string;
  showNotificationDot?: boolean;
}

export function HomeHeader({
  title = 'FalconPay',
  showNotificationDot = true,
}: HomeHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <View style={styles.logo}>
          <MaterialCommunityIcons name="flash" size={24} color={colors.text} />
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.devnetBadge}>
          <Text style={styles.devnetText}>Devnet</Text>
        </View>
      </View>
      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        hitSlop={spacing.lg}
        accessibilityLabel="Notifications">
        <View>
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color={colors.text}
          />
          {showNotificationDot ? <View style={styles.dot} /> : null}
        </View>
      </Pressable>
      <Pressable
        onPress={() => router.push('/(tabs)/account')}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        hitSlop={spacing.lg}
        accessibilityLabel="Account">
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>J</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: colors.background,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexShrink: 1,
    minWidth: 0,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flexShrink: 1,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  devnetBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    marginLeft: spacing.sm,
  },
  devnetText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  iconButton: {
    padding: spacing.sm,
  },
  pressed: {
    opacity: 0.7,
  },
  dot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.secondaryText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
