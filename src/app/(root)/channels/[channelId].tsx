import { ChannelSidebar } from "@/components/channel/ChannelSidebar";
import { useChannels } from "@/hooks/useChannels";
import { useAuth } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function ChannelScreen() {
  const { channelId } = useLocalSearchParams();
  const { userId } = useAuth();
  const { channel, loading, fetchChannel } = useChannels();

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

  if (!channel) return null;

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
});
