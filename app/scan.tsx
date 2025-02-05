import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { usePlantContext } from "~/db/context";
import { generateUUID } from "~/lib/utils";

export default function Scan() {
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
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

  const onSave = () => {
    if (!image || !name) {
      return;
    }
    addPlant({
      dateAdded: new Date(),
      id: generateUUID(),
      imageUri: image,
      name,
    });

    router.replace("/");
  };

  if (image) {
    return (
      <Animated.View
        className="flex-1"
        style={[animatedStyles, { paddingBottom: insets.bottom + 16 }]}
      >
        <Image
          source={image}
          style={{
            width: "100%",
            height: 384,
            objectFit: "contain",
          }}
          contentFit="cover"
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            <View className="px-4 pt-4 gap-2">
              <Input placeholder="Name" value={name} onChangeText={setName} />
              <Textarea
                placeholder="Notes"
                value={notes}
                onChangeText={setNotes}
              />
            </View>

            <Button className="mt-4 mx-4 self-end" onPress={onSave}>
              <Text className="">Save</Text>
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
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
