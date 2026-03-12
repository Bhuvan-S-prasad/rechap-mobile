import useAuthentication from "@/hooks/useAuthentication";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const AuthScreen = () => {
  const { handleOAuth, handleEmailLogin, loading } = useAuthentication();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          className="bg-gray-800 text-white px-4 py-4 rounded-xl"
          autoCapitalize="none"
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          className="bg-gray-800 text-white px-4 py-4 rounded-xl"
        />

        <Pressable
          onPress={() => !isLoading && handleEmailLogin(email, password)}
          disabled={isLoading}
          className="bg-emerald-500 py-4 rounded-xl items-center"
        >
          {loading === "email" ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold text-lg">Sign in</Text>
          )}
        </Pressable>

        <View className="flex-row items-center gap-3 my-2">
          <View className="flex-1 h-[1px] bg-gray-700" />
          <Text className="text-gray-400">OR</Text>
          <View className="flex-1 h-[1px] bg-gray-700" />
        </View>

        <Pressable
          onPress={() => !isLoading && handleOAuth("oauth_google")}
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
          onPress={() => !isLoading && handleOAuth("oauth_discord")}
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
