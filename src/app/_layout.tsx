import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import { View } from "react-native";
import "../../global.css";

const SCREEN_OPTIONS = { 
  headerShown: false,
  contentStyle: { backgroundColor: "#121214" }
};

const AppContent = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#121214" }}>
      <Stack screenOptions={SCREEN_OPTIONS} />
    </View>
  );
};

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error(
    "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Please set it in your environment variables."
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY}
    >
      <AppContent />
    </ClerkProvider>
  );
}
