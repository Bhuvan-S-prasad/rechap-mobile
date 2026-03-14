import { router } from "expo-router";
import { MessageCircle, Plus } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

export const NavigationAction = () => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.iconWrapper}
        // onPress={() => router.push("/direct-messages")}
      >
        <MessageCircle size={24} color="#6366f1" />
      </Pressable>

      <Pressable
        style={styles.iconWrapper}
        onPress={() => router.push("/create-channel")}
      >
        <Plus size={24} color="#6366f1" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1f2937",
    alignItems: "center",
    justifyContent: "center",
  },
});
