/** @format */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../utils/colors";
import { rewards } from "../../utils/rewards";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.mobileContainer}>
        <Text style={styles.mobileTitle}>JOMSO</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.bg_tertiary,
    gap: 9,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 8,
  },
  mobileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  mobileTitle: {
    fontSize: 34,
    fontWeight: 900,
    color: colors.primary,
    textAlign: "center",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  subtext: {
    fontSize: 14,
    color: "#777",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statTitle: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  scoreCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  circlePoints: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: "#2dd4bf",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  scoreLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  rankText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  rankSubtext: {
    fontSize: 13,
    color: "#4b5563",
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.primary,
  },
  rewardItem: {
    backgroundColor: "#f9fafb",
    padding: 12,
    marginRight: 12,
    alignItems: "center",
    borderRadius: 12,
    width: 90,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  exploreButtonText: {
    color: "#111827",
    fontWeight: "600",
    fontSize: 16,
  },

  rewardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 12,
  },

  rewardItemGrid: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});
