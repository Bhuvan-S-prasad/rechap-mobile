import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react-native";
import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface ChannelHeaderProps {
  channel: any;
  role?: string;
}

export const ChannelSidebarHeader = ({
  channel,
  role,
}: ChannelHeaderProps) => {
  const [open, setOpen] = useState(false);

  const isAdmin = role === "ADMIN";
  const isModerator = isAdmin || role === "MODERATOR";

  const closeMenu = () => setOpen(false);

  return (
    <>
      <View style={styles.container}>
        {channel.imageUrl ? (
          <Image 
            source={{ uri: channel.imageUrl }} 
            style={styles.banner}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.banner, { backgroundColor: "#313338" }]} />
        )}
        
        <View style={styles.contentOverlay}>
            <Pressable style={styles.channelButton} onPress={() => setOpen(true)}>
            <Text style={styles.channelName} numberOfLines={1}>{channel.name?.toUpperCase()}</Text>
            <ChevronDown size={18} color="#ffffff" />
            </Pressable>

            {isModerator && (
            <Pressable
                style={styles.inviteButton}
            >
                <UserPlus size={18} color="#ffffff" />
            </Pressable>
            )}
        </View>
      </View>

      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.overlay} onPress={closeMenu}>
          <View style={styles.menu}>
            {isAdmin && (
              <MenuItem
                label="Channel Settings"
                icon={<Settings size={18} color="#e5e7eb" />}
                onPress={() => {
                  closeMenu();
                }}
              />
            )}

            {isAdmin && (
              <MenuItem
                label="Manage Members"
                icon={<Users size={18} color="#e5e7eb" />}
                onPress={() => {
                  closeMenu();
                }}
              />
            )}

            {isModerator && (
              <MenuItem
                label="Invite People"
                icon={<UserPlus size={18} color="#4f46e5" />}
                onPress={() => {
                  closeMenu();
                }}
              />
            )}

            {isModerator && (
              <MenuItem
                label="Create Room"
                icon={<PlusCircle size={18} color="#e5e7eb" />}
                onPress={() => {
                  closeMenu();
                }}
              />
            )}

            <View style={styles.menuSeparator} />

            {isAdmin && (
              <MenuItem
                label="Delete Channel"
                danger
                icon={<Trash size={18} color="#ef4444" />}
                onPress={() => {
                  closeMenu();
                }}
              />
            )}

            {!isAdmin && (
              <MenuItem
                label="Leave Channel"
                icon={<LogOut size={18} color="#ef4444" />}
                onPress={() => {
                  closeMenu();
                }}
              />
            )}
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const MenuItem = ({
  label,
  icon,
  onPress,
  danger,
}: {
  label: string;
  icon: any;
  onPress: () => void;
  danger?: boolean;
}) => (
  <Pressable 
    style={({ hovered }: any) => [
        styles.menuItem,
        hovered && { backgroundColor: "#4f46e5" }
    ]} 
    onPress={onPress}
  >
    <Text style={[styles.menuText, danger && { color: "#ef4444" }]}>
      {label}
    </Text>
    {icon}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  contentOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  channelButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  channelName: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  inviteButton: {
    padding: 6,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  menu: {
    backgroundColor: "#18191c",
    paddingVertical: 8,
    borderRadius: 8,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  menuText: {
    color: "#d1d5db",
    fontSize: 14,
    fontWeight: "500",
  },
  menuSeparator: {
    height: 1,
    backgroundColor: "#2e3338",
    marginVertical: 4,
    marginHorizontal: 12,
  },
  badge: {
     // placeholder
  }
});
