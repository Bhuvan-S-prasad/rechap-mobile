import { ChannelSidebar } from "@/components/channel/ChannelSidebar";
import { useChannels } from "@/hooks/useChannels";
import { useAuth } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AlertCircle, Home, RefreshCw } from "lucide-react-native";
import { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChannelScreen() {
  const { channelId } = useLocalSearchParams();
  const { userId } = useAuth();
  const router = useRouter();
  const { channel, loading, error, fetchChannel } = useChannels();

  useEffect(() => {
    if (channelId) {
      fetchChannel(channelId as string);
    }
  }, [channelId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (error || !channel) {
    return (
      <View style={styles.errorContainer}>
        <AlertCircle size={48} color="#f43f5e" />
        <Text style={styles.errorTitle}>
          {error ? "Oops! Something went wrong" : "Channel not found"}
        </Text>
        <Text style={styles.errorMessage}>
          {error ||
            "We couldn't find the channel you're looking for. It might have been deleted or the link is invalid."}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => channelId && fetchChannel(channelId as string)}
          >
            <RefreshCw size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => router.replace("/")}
          >
            <Home size={18} color="#6366f1" style={{ marginRight: 8 }} />
            <Text style={[styles.buttonText, { color: "#6366f1" }]}>
              Go Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ChannelSidebar channel={channel} currentUserId={userId || ""} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121214",
    marginTop: 15,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121214",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121214",
    padding: 24,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginTop: 16,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 32,
    gap: 12,
  },
  retryButton: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  homeButton: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6366f1",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
});
