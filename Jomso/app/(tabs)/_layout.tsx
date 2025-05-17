/** @format */

// import { Tabs } from "expo-router";
// import NeumorphicTabBar from "@/components/ui/NeumorphicTabBar";

// export default function TabLayout() {
//   return (
//     <Tabs
//       tabBar={(props) => <NeumorphicTabBar {...props} />}
//       screenOptions={{ headerShown: false }}>
//       <Tabs.Screen name='index' options={{ title: "Home" }} />
//       {/* <Tabs.Screen name='explore' options={{ title: "Explore" }} /> */}
//     </Tabs>
//   );
// }

import { Tabs } from "expo-router";
import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../../utils/colors";
import { router } from "expo-router";
import { Feather, Fontisto } from "@expo/vector-icons";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.bg_tertiary,
            borderTopWidth: 0,
            height:
              Platform.OS === "ios" ? 54 + insets.bottom : 64 + insets.bottom,
            paddingBottom: insets.bottom,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.highlight,
          tabBarLabelStyle: {
            fontSize: 16,
          },
          tabBarItemStyle: {
            paddingVertical: Platform.OS === "android" ? 10 : 0,
          },
        }}>
        <Tabs.Screen
          name='index'
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{ color: focused ? colors.primary : colors.highlight }}>
                Home
              </Text>
            ),
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.tabItem}>
                {focused && <View style={styles.activeLine} />}
                <Feather name='home' size={size} color={color}></Feather>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name='explore'
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{ color: focused ? colors.primary : colors.highlight }}>
                Explore
              </Text>
            ),
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.tabItem}>
                {focused && <View style={styles.activeLine} />}
                <Feather name='map' size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name='distributor'
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{ color: focused ? colors.primary : colors.highlight }}>
                Distributor
              </Text>
            ),
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.tabItem}>
                {focused && <View style={styles.activeLine} />}
                <Feather name='truck' size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name='aiAnalysis'
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{ color: focused ? colors.primary : colors.highlight }}>
                AI Analysis
              </Text>
            ),
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.tabItem}>
                {focused && <View style={styles.activeLine} />}
                <Feather name='activity' size={size} color={color} />
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  mobileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    backgroundColor: colors.bg_dark,
  },
  mobileTitle: {
    fontSize: 26,
    color: colors.highlight,
    textAlign: "center",
  },
  eventCreationButtonContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
  createButton: {
    width: 64,
    borderRadius: 20,
    paddingRight: -16,
    marginTop: 4,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeLine: {
    top: Platform.OS == "ios" ? -4 : -8,
    height: 3,
    width: 64,
    backgroundColor: colors.primary,
  },
});
