import { Tabs } from "expo-router";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { ThemeToggle } from "~/components/ThemeToggle";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { top } = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        header: (p) => {
          return (
            <View
              className="p-4 flex-row justify-between"
              style={{ paddingTop: top + 8 }}
            >
              <Text className="font-bold">{p.options.title}</Text>
              <ThemeToggle />
            </View>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "List",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name={"list"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name={"cog"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name={"user-alt"} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
