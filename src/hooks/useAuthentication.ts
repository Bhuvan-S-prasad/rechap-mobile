import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";

const useAuthentication = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const { startSSOFlow } = useSSO();

  const handleAuth = async (stratergy: "oauth_google" | "oauth_discord") => {
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
      console.log("[Auth_Error]", error);
      Alert.alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return {
    handleAuth,
    loading,
  };
};

export default useAuthentication;
