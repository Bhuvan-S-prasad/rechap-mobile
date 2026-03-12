import { useSignIn, useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";

const useAuthentication = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();
  const { signIn, setActive } = useSignIn();

  const handleOAuth = async (stratergy: "oauth_google" | "oauth_discord") => {
    if (loading) return;
    setLoading(stratergy);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: stratergy,
      });

      if (!createdSessionId || !setActive) {
        const provider = stratergy === "oauth_google" ? "Google" : "Discord";
        Alert.alert(`Sign in did not complete`);
        return;
      }

      await setActive({ session: createdSessionId });
    } catch (error) {
      console.log("[OAuth_Error]", error);
      Alert.alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const handleEmailLogin = async (email: string, password: string) => {
    if (!signIn) return;

    setLoading("email");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      } else {
        Alert.alert("Sign in not complete");
      }
    } catch (error) {
      console.log("[Email_Login_Error]", error);
      Alert.alert("Invalid email or password");
    } finally {
      setLoading(null);
    }
  };

  return {
    handleOAuth,
    handleEmailLogin,
    loading,
  };
};

export default useAuthentication;
