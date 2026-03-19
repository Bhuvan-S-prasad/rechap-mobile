import { ChevronDown, Plus } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ChannelSectionProps {
  label: string;
  role: string;
  sectionType: string;
  roomType?: string;
  channel: any;
}

export const ChannelSection = ({
  label,
  role,
  sectionType,
  roomType,
  channel,
}: ChannelSectionProps) => {
  const isAdmin = role === "ADMIN";
  const isModerator = isAdmin || role === "MODERATOR";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
           <ChevronDown size={14} color="#71717a" />
           <Text style={styles.label}>{label.toUpperCase()}</Text>
        </View>
        
        {isModerator && sectionType === "rooms" && (
          <Pressable style={styles.addButton}>
            <Plus size={16} color="#9ca3af" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  label: {
    color: "#71717a",
    fontSize: 12,
    fontWeight: "700",
  },
  addButton: {
    padding: 2,
  },
});
