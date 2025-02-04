import { useCallback } from "react";
import { FlatList, View } from "react-native";
import { Card } from "~/components/card";
import { Button } from "~/components/ui/button";
import { Plant } from "~/types/plant";
import { Plus } from "~/lib/icons/plus";
import { Text } from "~/components/ui/text";
import { Link } from "expo-router";

export default function HomeScreen() {
  const renderItem = useCallback(
    ({ item }: { item: Plant }) => <Card item={item} />,
    []
  );
  const keyExtractor = useCallback((item: Plant) => item.id.toString(), []);

  return (
    <View className="flex-1">
      <FlatList
        data={data}
        className="flex-1"
        ListHeaderComponent={
          <View className="items-start px-4">
            <Link href="/scan" asChild>
              <Button
                variant="secondary"
                className="flex-row gap-2 items-center"
              >
                <Text>Add a new plant</Text>
                <Plus size={16} className="color-foreground" />
              </Button>
            </Link>
          </View>
        }
        contentContainerClassName="py-4 gap-8"
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

const data: Plant[] = [
  {
    id: 0,
    name: "Talvikukka",
    dateAdded: Date.now() - 1000 * 60 * 60 * 24 * 2,
    imageUri:
      "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 1,
    name: "Päivänkakkara",
    dateAdded: Date.now() - 1000 * 60 * 80 * 24 * 1,
    imageUri:
      "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
