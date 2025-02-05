import { useCallback } from "react";
import { FlatList, View } from "react-native";
import { Plant } from "~/types/plant";
import { usePlantContext } from "~/db/context";
import { Card } from "~/components/plant-list/card";
import { EmptyItem } from "~/components/plant-list/empty-item";
import { AddPlantHeader } from "~/components/plant-list/add-plant-header";

export default function HomeScreen() {
  const { plants } = usePlantContext();
  const renderItem = useCallback(
    ({ item }: { item: Plant }) => <Card item={item} />,
    []
  );
  const keyExtractor = useCallback((item: Plant) => item.id.toString(), []);

  const sortedPlants = plants.sort(
    (a, b) => b.dateAdded.getTime() - a.dateAdded.getTime()
  );

  return (
    <View className="flex-1">
      <FlatList
        data={sortedPlants}
        ListEmptyComponent={EmptyItem}
        className="flex-1"
        ListHeaderComponent={AddPlantHeader}
        contentContainerClassName="py-4 gap-8"
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}
