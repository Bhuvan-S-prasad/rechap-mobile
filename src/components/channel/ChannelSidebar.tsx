import {
  Hash,
  Mic,
  ShieldAlert,
  ShieldCheck,
  User,
  Video,
} from "lucide-react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import { ChannelRoom } from "./ChannelRoom";
import { ChannelSearch } from "./ChannelSearch";
import { ChannelSidebarHeader } from "./ChannelSidebarHeader";
import { ChannelSection } from "./ChannelSection";

interface ChannelSidebarProps {
  channel: any;
  currentUserId: string;
}

const iconMap: Record<string, any> = {
  TEXT: <Hash size={16} color="#9ca3af" />,
  AUDIO: <Mic size={16} color="#9ca3af" />,
  VIDEO: <Video size={16} color="#9ca3af" />,
};

const roleIconMap: Record<string, any> = {
  ADMIN: <ShieldAlert size={16} color="#f43f5e" />,
  MODERATOR: <ShieldCheck size={16} color="#10b981" />,
  GUEST: <User size={16} color="#71717a" />,
};

export const ChannelSidebar = ({
  channel,
  currentUserId,
}: ChannelSidebarProps) => {
  if (!channel) return null;

  const rooms = Array.isArray(channel.rooms) ? channel.rooms : [];
  const textRooms = rooms.filter((room: any) => room.type === "TEXT");
  const voiceRooms = rooms.filter((room: any) => room.type === "AUDIO");
  const videoRooms = rooms.filter((room: any) => room.type === "VIDEO");

  const allMembers = Array.isArray(channel.members) ? channel.members : [];
  const members = allMembers.filter(
    (member: any) => member.userId !== currentUserId,
  );

  const role =
    allMembers.find((member: any) => member.userId === currentUserId)?.role ||
    "GUEST";

  return (
    <View style={styles.container}>
      <ChannelSidebarHeader channel={channel} role={role} />

      <ScrollView style={styles.scroll}>
        <View style={styles.content}>
          <View style={{ marginTop: 12 }}>
            <ChannelSearch
              data={[
                {
                  label: "Text Room",
                  type: "room",
                  data: textRooms.map((room: any) => ({
                    icon: iconMap[room.type],
                    id: room.id,
                    name: room.name,
                  })),
                },
                {
                  label: "Voice Room",
                  type: "room",
                  data: voiceRooms.map((room: any) => ({
                    icon: iconMap[room.type],
                    id: room.id,
                    name: room.name,
                  })),
                },
                {
                  label: "Video Room",
                  type: "room",
                  data: videoRooms.map((room: any) => ({
                    icon: iconMap[room.type],
                    id: room.id,
                    name: room.name,
                  })),
                },
                {
                  label: "Members",
                  type: "member",
                  data: members.map((member: any) => ({
                    icon: roleIconMap[member.role],
                    id: member.id,
                    name: member.user?.name ?? "Unknown",
                  })),
                },
              ]}
            />
          </View>

          <View style={styles.separator} />

          {!!textRooms.length && (
            <View>
              <ChannelSection
                label="Text Room"
                role={role}
                sectionType="rooms"
                roomType={"TEXT"}
                channel={channel}
              />

              {textRooms.map((room: any) => (
                <ChannelRoom
                  key={room.id}
                  room={room}
                  channel={channel}
                  role={role}
                />
              ))}
            </View>
          )}

          {!!voiceRooms.length && (
            <View>
              <ChannelSection
                label="Voice Room"
                role={role}
                sectionType="rooms"
                roomType={"AUDIO"}
                channel={channel}
              />

              {voiceRooms.map((room: any) => (
                <ChannelRoom
                  key={room.id}
                  room={room}
                  channel={channel}
                  role={role}
                />
              ))}
            </View>
          )}

          {!!videoRooms.length && (
            <View>
              <ChannelSection
                label="Video Room"
                role={role}
                sectionType="rooms"
                roomType={"VIDEO"}
                channel={channel}
              />

              {videoRooms.map((room: any) => (
                <ChannelRoom
                  key={room.id}
                  room={room}
                  channel={channel}
                  role={role}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2d31",
    borderTopLeftRadius: 24,
    overflow: "hidden",
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#3f3f46",
    marginVertical: 10,
    marginHorizontal: 8,
  },
});

