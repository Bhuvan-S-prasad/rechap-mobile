import { Hash, Mic, Video } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ChannelRoomProps {
  room: any;
  channel: any;
  role: string;
}

const iconMap: Record<string, any> = {
  TEXT: <Hash size={18} color="#9ca3af" />,
  AUDIO: <Mic size={18} color="#9ca3af" />,
  VIDEO: <Video size={18} color="#9ca3af" />,
};

export const ChannelRoom = ({ room, channel, role }: ChannelRoomProps) => {
  return (
    <Pressable style={styles.container}>
      {iconMap[room.type] || <Hash size={18} color="#9ca3af" />}
      <Text style={styles.name}>{room.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 2,
    marginHorizontal: 8,
    borderRadius: 8,
    gap: 12,
  },
  name: {
    color: "#9ca3af",
    fontSize: 15,
    fontWeight: "500",
  },
});
