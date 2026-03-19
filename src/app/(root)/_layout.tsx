import { NavigationSidebar } from "@/components/navigation/NavSidebar";
import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <NavigationSidebar />
      <View style={styles.main}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#121214",
  },
  main: {
    flex: 1,
  },
});
