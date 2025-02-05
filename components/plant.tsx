import { Image } from "expo-image";
import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Text } from "./ui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  image: string;
  name?: string;
  notes?: string;
  onSave: (name: string, notes: string) => void;
};
const Plant = ({ name: _name, notes: _notes, image, onSave }: Props) => {
  const insets = useSafeAreaInsets();

  const [name, setName] = useState(_name ?? "");
  const [notes, setNotes] = useState(_notes ?? "");

  const keyboard = useAnimatedKeyboard();

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));

  const handleSave = () => {
    onSave(name, notes);
  };

  return (
    <Animated.ScrollView
      className="flex-1"
      style={[animatedStyles, { paddingBottom: insets.bottom + 16 }]}
      contentContainerClassName="pb-safe-offset-4"
    >
      <Image
        source={image}
        style={{
          width: "100%",
          aspectRatio: 1,
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

          <Button
            className="mt-4 mx-4 self-end"
            onPress={handleSave}
            disabled={!name}
          >
            <Text>Save</Text>
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </Animated.ScrollView>
  );
};

export default Plant;
