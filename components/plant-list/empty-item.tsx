import { View } from "react-native";
import { Text } from "../ui/text";

export const EmptyItem = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-center">No plants yet</Text>
    </View>
  );
};
