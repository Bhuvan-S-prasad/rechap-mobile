import useAuthentication from "@/hooks/useAuthentication";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const AuthScreen = () => {
  const { handleAuth, loading } = useAuthentication();

  const isLoading = loading !== null;

  return (
    <View className="flex-1 bg-gray-900 justify-between px-6 py-12">
      <View />

      <View className="items-center">
        <Text className="text-4xl font-bold text-white">Welcome to Rechap</Text>

        <Text className="text-gray-400 mt-3 text-center">
          Sign in to continue
        </Text>
      </View>

      <View className="gap-4">
        <Pressable
          onPress={() => !isLoading && handleAuth("oauth_google")}
          disabled={isLoading}
          className="bg-white py-4 rounded-xl flex-row justify-center items-center gap-3"
        >
          {loading === "oauth_google" ? (
            <ActivityIndicator />
          ) : (
            <>
              <FontAwesome5 name="google" size={20} color="black" />
              <Text className="text-black font-semibold text-lg">
                Continue with Google
              </Text>
            </>
          )}
        </Pressable>

        <Pressable
          onPress={() => !isLoading && handleAuth("oauth_discord")}
          disabled={isLoading}
          className="bg-indigo-600 py-4 rounded-xl flex-row justify-center items-center gap-3"
        >
          {loading === "oauth_discord" ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <FontAwesome5 name="discord" size={20} color="white" />
              <Text className="text-white font-semibold text-lg">
                Continue with Discord
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default AuthScreen;
