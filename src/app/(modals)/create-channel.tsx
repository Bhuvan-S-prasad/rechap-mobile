import { useChannels } from "@/hooks/useChannels";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { useImageUploader } from "@/utils/uploadthing";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type FormData = {
  name: string;
  imageUrl: string;
};

export default function CreateChannelModal() {
  const { createChannel } = useChannels();
  const { getToken } = useAuth();
  const { control, handleSubmit, reset, setValue } = useForm<FormData>({
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const { openImagePicker, isUploading } = useImageUploader("serverImage", {
    onClientUploadComplete: (res: any) => {
      const uploadedUrl = res?.[0]?.url;
      if (uploadedUrl) {
        setValue("imageUrl", uploadedUrl);
      }
    },
    onUploadError: (error: any) => {
      console.log("Upload error", error);
    },
    headers: async () => {
      const token = await getToken();
      return {
        Authorization: `Bearer ${token}`,
      };
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createChannel(data);
      reset();
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customize your Channel</Text>

      <Text style={styles.description}>
        Give your channel a name and an image. You can always change it later.
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>CHANNEL IMAGE</Text>

        <Controller
          control={control}
          name="imageUrl"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <>
              {value ? (
                <View style={styles.previewWrapper}>
                  <Image source={{ uri: value }} style={styles.preview} />

                  <Pressable
                    style={styles.removeButton}
                    onPress={() => onChange("")}
                  >
                    <X size={16} color="white" />
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  style={styles.uploadButton}
                  onPress={() => openImagePicker({
                    source: "library",
                  })}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.uploadText}>Select Channel Image</Text>
                  )}
                </Pressable>
              )}
            </>
          )}
        />

        <Text style={[styles.label, { marginTop: 20 }]}>CHANNEL NAME</Text>

        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter channel name"
              placeholderTextColor="#6b7280"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Create</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    padding: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#f9fafb",
  },

  description: {
    textAlign: "center",
    color: "#9ca3af",
    marginTop: 10,
    marginBottom: 30,
  },

  form: {
    gap: 12,
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9ca3af",
  },

  input: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: "#000000",
  },

  uploadButton: {
    backgroundColor: "#374151",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },

  uploadText: {
    color: "#f9fafb",
  },

  previewWrapper: {
    width: 80,
    height: 80,
    position: "relative",
  },

  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },

  removeButton: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#ef4444",
    padding: 6,
    borderRadius: 20,
  },

  button: {
    marginTop: 30,
    backgroundColor: "#10b981",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "700",
    color: "#000",
    fontSize: 16,
  },
});
