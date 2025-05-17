/** @format */

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TABS = [
  { name: "index", icon: "home-outline", label: "Home" },
  { name: "explore", icon: "map-outline", label: "Explore" },
];

export default function NeumorphicTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      {TABS.map((tab, index) => {
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => navigation.navigate(tab.name as never)}
            style={[styles.tab, isFocused && styles.activeTab]}>
            <Ionicons
              name={tab.icon as any}
              size={22}
              color={isFocused ? "white" : "#555"}
            />
            {isFocused && <Text style={styles.label}>{tab.label}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f3",
    margin: 16,
    padding: 10,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 5,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 32,
  },
  activeTab: {
    backgroundColor: "#000",
  },
  label: {
    marginLeft: 8,
    color: "white",
    fontWeight: "600",
  },
});
