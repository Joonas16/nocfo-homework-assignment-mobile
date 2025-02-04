import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export default function Scan() {
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState<string | null>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>
          <Text>Grant permission</Text>
        </Button>
      </View>
    );
  }

  const takeAPicture = async () => {
    const result = await cameraRef.current?.takePictureAsync();
    if (result) {
      const uri = result.uri;
      setImage(uri);
    }
  };

  if (image) {
    return (
      <View className="flex-1" style={{ paddingBottom: insets.bottom + 16 }}>
        <Image
          source={image}
          style={{
            width: "100%",
            height: 384,
            objectFit: "contain",
          }}
          contentFit="cover"
        />
        <View className="px-4 pt-4 gap-2">
          <Input placeholder="Name" />
          <Textarea placeholder="Notes" />
        </View>
        <Button className="mt-4 mx-4 self-end">
          <Text className="text-white">Save</Text>
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        className="flex-1"
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
      >
        <View className="flex-1 "></View>
        <View className="h-96 w-full bg-[rgba(0,0,0,70%)] items-center justify-center">
          <Pressable
            className="p-2 bg-slate-100 rounded-full"
            onPress={takeAPicture}
          >
            <View className="rounded-full bg-white h-14 w-14 border-2  border-black" />
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
