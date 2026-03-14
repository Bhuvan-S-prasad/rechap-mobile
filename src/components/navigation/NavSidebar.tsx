import { useChannels } from "@/hooks/useChannels";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { NavigationAction } from "./NavAction";
import { NavItem } from "./NavItem";

export const NavigationSidebar = () => {
  const { channels } = useChannels();

  return (
    <View style={styles.container}>
      <NavigationAction />

      <View style={styles.separator} />

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={channels}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <NavItem id={item.id} imageUrl={item.imageUrl} name={item.name} />
        )}
      />

      <View style={styles.user}>
        <CustomUserButton />
      </View>
    </View>
  );
};

const CustomUserButton = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  if (!user) return null;

  return (
    <Pressable onPress={() => signOut()} style={styles.userButtonContainer}>
      <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: "100%",
    backgroundColor: "rgb(18, 18, 20)",
    alignItems: "center",
    paddingVertical: 16,
  },
  separator: {
    height: 2,
    width: 32,
    backgroundColor: "rgb(43, 45, 49)",
    borderRadius: 1,
    marginVertical: 8,
  },
  list: {
    flex: 1,
    width: "100%",
    marginTop: 12,
  },
  listContent: {
    alignItems: "center",
    paddingBottom: 20,
  },
  user: {
    marginTop: "auto",
  },
  userButtonContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});
