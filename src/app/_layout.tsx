import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import { View } from "react-native";
import "../../global.css";
import { NavigationSidebar } from "@/components/navigation/NavSidebar";

const SCREEN_OPTIONS = { 
  headerShown: false,
  contentStyle: { backgroundColor: "rgb(18, 18, 20)" }
};

const AppContent = () => {
  const { isSignedIn } = useAuth();

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "rgb(18, 18, 20)" }}>
      {isSignedIn && <NavigationSidebar />}
      <View style={{ flex: 1, backgroundColor: "rgb(18, 18, 20)" }}>
        <Stack screenOptions={SCREEN_OPTIONS} />
      </View>
    </View>
  );
};

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <AppContent />
    </ClerkProvider>
  );
}
