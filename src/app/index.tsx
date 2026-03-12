import { useAuth, useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { isSignedIn, signOut, isLoaded: isAuthLoaded } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();

  if (!isAuthLoaded || !isUserLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Debug Info</Text>

      <Text style={styles.text}>User ID: {user?.id}</Text>

      <Text style={styles.text}>
        Email: {user?.primaryEmailAddress?.emailAddress}
      </Text>

      <Text style={styles.text}>Username: {user?.username ?? "Not set"}</Text>

      <Text style={styles.text}>Full Name: {user?.fullName ?? "Not set"}</Text>

      <Text style={styles.text}>Created: {user?.createdAt?.toString()}</Text>

      <Pressable style={styles.button} onPress={() => signOut()}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
