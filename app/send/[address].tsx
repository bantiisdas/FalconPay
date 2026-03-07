import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AmountInput } from "@/components/AmountInput";
import { RecipientCard } from "@/components/RecipientCard";
import { SwapPreviewCard } from "@/components/SwapPreviewCard";
import type { TokenOption } from "@/components/TokenSelector";
import { TokenSelector } from "@/components/TokenSelector";
import { Button } from "@/components/ui/Button";
import { Header, HeaderButton } from "@/components/ui/Header";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";

const TOKENS: TokenOption[] = [
  { id: "usdc", symbol: "USDC", name: "USD Coin", balance: "500.00" },
  { id: "sol", symbol: "SOL", name: "Solana", balance: "1.45" },
  { id: "bonk", symbol: "BONK", name: "Bonk", balance: "1.2M" },
  { id: "jup", symbol: "JUP", name: "Jupiter", balance: "85" },
];

function parseAmount(value: string): string {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");
  if (parts.length > 2) return parts[0] + "." + parts.slice(1).join("");
  if (parts.length === 2 && parts[1].length > 2) {
    return parts[0] + "." + parts[1].slice(0, 2);
  }
  return cleaned;
}

/** Mock USD equivalent (e.g. SOL ~$19). */
function getUsdEquivalent(amount: string, token: TokenOption): string {
  const num = parseFloat(amount || "0");
  if (num <= 0) return "";
  if (token.symbol === "SOL") return (num * 19).toFixed(0);
  if (token.symbol === "USDC") return num.toFixed(2);
  return (num * 0.5).toFixed(2);
}

export default function SendScreen() {
  const { address } = useLocalSearchParams<{ address: string }>();
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState<TokenOption>(TOKENS[1]); // SOL default
  const [enteredAddress, setEnteredAddress] = useState("");

  const effectiveAddress =
    (address && address !== "new" ? address : enteredAddress.trim()) || "";
  const canContinue =
    amount.length > 0 && parseFloat(amount) > 0 && effectiveAddress.length > 0;

  const handleContinue = useCallback(() => {
    if (!canContinue) return;
    // TODO: Navigate to confirmation or submit transaction
  }, [canContinue]);

  const displayAmount = amount || "0";
  const previewSend = `${displayAmount} ${selectedToken.symbol}`;
  const previewReceive = `~${displayAmount} ${selectedToken.symbol}`;
  const usdEquivalent = getUsdEquivalent(amount, selectedToken);

  const recipientName =
    effectiveAddress && effectiveAddress.length > 10 ? "Alice" : undefined;
  const isNewRecipient = !address || address === "new";

  return (
    <ScreenContainer
      edges={["top", "bottom"]}
      paddingHorizontal="lg"
      paddingBottom="xl"
    >
      <Header
        title="Send"
        left={
          <HeaderButton
            onPress={() => router.back()}
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </HeaderButton>
        }
        right={
          <View style={styles.logo}>
            <MaterialCommunityIcons
              name="flash"
              size={24}
              color={colors.text}
            />
          </View>
        }
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <RecipientCard
          address={isNewRecipient ? "new" : (address ?? "")}
          name={recipientName}
          label=""
          editable={isNewRecipient}
          inputValue={enteredAddress}
          onAddressChange={setEnteredAddress}
        />
        <TokenSelector
          selected={selectedToken}
          onPress={() => {
            const idx = TOKENS.findIndex((t) => t.id === selectedToken.id);
            setSelectedToken(TOKENS[(idx + 1) % TOKENS.length]);
          }}
          options={TOKENS}
          label="Pay With"
        />
        <Text style={styles.balance}>
          Balance: {selectedToken.balance ?? "0"} {selectedToken.symbol}
        </Text>
        <AmountInput
          value={amount}
          onChangeText={(v) => setAmount(parseAmount(v))}
          placeholder="0.00"
          editable={true}
          symbol={selectedToken.symbol}
          usdEquivalent={usdEquivalent}
        />
        <SwapPreviewCard
          youSend={previewSend}
          theyReceive={previewReceive}
          fee="0.001 SOL"
        />
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!canContinue}
          fullWidth
        />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  balance: {
    fontSize: 14,
    color: colors.secondaryText,
    marginBottom: spacing.lg,
  },
});
