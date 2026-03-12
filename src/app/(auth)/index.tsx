import { useAuth } from "@clerk/clerk-expo";
import { Text } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

const AuthScreen = () => {
  const { handleAuth, loading } = useAuth();

  const isLoading = loading !== null;
  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text>Auth</Text>
      <Button
        title="Google"
        onPress={() => handleAuth("oauth_google")}
        disabled={isLoading}
      />
      <Button
        title="Discord"
        onPress={() => handleAuth("oauth_discord")}
        disabled={isLoading}
      />
    </View>
  );
};

export default AuthScreen;
