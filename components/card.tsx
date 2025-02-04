import { View } from "react-native";
import { Text } from "./ui/text";
import { Image } from "expo-image";
import { Plant } from "~/types/plant";
import { timeAgo } from "~/lib/utils";
import { Button } from "./ui/button";
import { Pen } from "~/lib/icons/pen";

type Props = {
  item: Plant;
};
export const Card = ({ item }: Props) => {
  return (
    <View className="flex-1 h-96 relative overflow-hidden gap-2">
      <View className="px-4 flex-row justify-between items-end">
        <Text className=" font-black text-2xl">{item.name}</Text>
      </View>
      <Image
        source={item.imageUri}
        style={{
          flex: 1,
          width: "100%",
        }}
        contentFit="cover"
      />
      <View className="px-4 flex-row justify-between items-center">
        <Text className="text-muted-foreground">{timeAgo(item.dateAdded)}</Text>
        <Button variant="outline" size="icon" className="self-start">
          <Pen size={16} className="text-muted-foreground w-4 h-4" />
        </Button>
      </View>
    </View>
  );
};
