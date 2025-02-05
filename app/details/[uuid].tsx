import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Button, View } from "react-native";
import Plant from "~/components/plant";
import { Text } from "~/components/ui/text";
import { usePlantContext } from "~/db/context";

export default function Detail() {
  const { uuid } = useLocalSearchParams();
  const { getPlantById, removePlantById, updatePlantById } = usePlantContext();
  const router = useRouter();

  if (!uuid) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl text-center">Missing uuid</Text>
      </View>
    );
  }

  const plant = getPlantById(uuid as string);

  if (!plant) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl text-center">Plant not found</Text>
      </View>
    );
  }

  const onDeletePress = () => {
    Alert.alert("Delete Plant", "Are you sure you want to delete this plant?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          removePlantById(uuid as string);
          router.replace("/");
        },
      },
    ]);
  };

  const onSave = (name: string, notes: string) => {
    updatePlantById(uuid as string, {
      ...plant,
      name,
      notes,
    });

    router.canGoBack() ? router.back() : router.replace("/");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: plant.name,
          headerBackButtonDisplayMode: "minimal",
          headerRight: () => (
            <Button onPress={onDeletePress} color="red" title="Delete" />
          ),
        }}
      />
      <View className="flex-1">
        <Plant
          image={plant.imageUri}
          onSave={onSave}
          name={plant.name}
          notes={plant.notes}
        />
      </View>
    </>
  );
}
