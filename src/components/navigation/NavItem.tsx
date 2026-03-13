import { Pressable, Image, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

interface NavItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavItem = ({ id, imageUrl }: NavItemProps) => {
  const params = useLocalSearchParams();
  const isActive = params?.channelId === id;

//   const onPress = () => {
//     router.push(`/channels/${id}`);
//   };

  return (
    <Pressable style={styles.wrapper}>
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
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  active: {
    borderWidth: 3,
    borderColor: "#6366f1",
  },
});
