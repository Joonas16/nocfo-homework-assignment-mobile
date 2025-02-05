import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";
import Plant from "~/components/plant";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { usePlantContext } from "~/db/context";
import { generateUUID } from "~/lib/utils";

export default function Scan() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
  const { addPlant } = usePlantContext();
  const keyboard = useAnimatedKeyboard();

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 items-center justify-center gap-4">
        <Text className="text-2xl text-center px-4">
          We need your permission to show the camera
        </Text>
        <Button variant="outline" onPress={requestPermission}>
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

  const onSave = (name: string, notes: string) => {
    if (!image || !name) {
      return;
    }
    addPlant({
      dateAdded: new Date(),
      id: generateUUID(),
      imageUri: image,
      name,
      notes,
    });

    router.replace("/");
  };

  if (image) {
    return <Plant image={image} onSave={onSave} />;
  }

  return (
    <View className="flex-1">
      <CameraView style={{ flex: 1 }} ref={cameraRef} ratio="1:1">
        <View className="flex-1 "></View>
      </CameraView>
      <View className="h-96 w-full bg-primary items-center justify-center">
        <Pressable
          className="p-2 bg-slate-100 rounded-full"
          onPress={takeAPicture}
        >
          <View className="rounded-full bg-white h-14 w-14 border-2  border-black" />
        </Pressable>
      </View>
    </View>
  );
}
