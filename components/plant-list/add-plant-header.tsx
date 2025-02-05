import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { Plus } from "../../lib/icons/plus";

export const AddPlantHeader = () => {
  return (
    <View className="items-start px-4">
      <Link href="/scan" asChild>
        <Button variant="secondary" className="flex-row gap-2 items-center">
          <Text>Add a new plant</Text>
          <Plus size={16} className="color-foreground" />
        </Button>
      </Link>
    </View>
  );
};
