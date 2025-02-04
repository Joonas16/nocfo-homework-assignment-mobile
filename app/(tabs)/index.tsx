import { Image } from "expo-image";
import { FlatList, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Pen } from "~/lib/icons/Pen";
import { timeAgo } from "~/lib/utils";

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <View className="flex-1">
        <FlatList
          data={data}
          className="flex-1"
          contentContainerClassName="py-4 gap-8"
          renderItem={({ item }) => (
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
                <Text className="text-muted-foreground">
                  {timeAgo(item.dateAdded)}
                </Text>
                <Button variant="outline" size="icon" className="self-start">
                  <Pen size={16} className="text-muted-foreground w-4 h-4" />
                </Button>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const data = [
  {
    name: "John Doe",
    dateAdded: Date.now() - 1000 * 60 * 60 * 24 * 2,
    imageUri:
      "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jane Doe",
    dateAdded: Date.now() - 1000 * 60 * 80 * 24 * 1,
    imageUri:
      "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
