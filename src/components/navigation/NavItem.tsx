import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";

interface NavItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavItem = ({ id, imageUrl }: NavItemProps) => {
  const params = useLocalSearchParams();
  const isActive = params?.channelId === id;
  const router = useRouter();

  const onPress = () => {
    router.push(`/channels/${id}`);
  };

  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <View
        style={[
          styles.indicator,
          isActive ? styles.indicatorActive : styles.indicatorInactive,
        ]}
      />
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, isActive && styles.active]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
  indicator: {
    position: "absolute",
    left: 0,
    width: 4,
    backgroundColor: "white",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  indicatorActive: {
    height: 36,
  },
  indicatorInactive: {
    height: 8,
    opacity: 0,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  active: {
    borderWidth: 3,
    borderColor: "#6366f1",
  },
});
