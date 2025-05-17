/** @format */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Bin } from "@/utils/bin";
import { ScrollView } from "react-native-gesture-handler";

export default function BinSheetContent({
  bin,
  distance,
  isNearest,
}: {
  bin: Bin;
  distance: string;
  isNearest?: boolean;
}) {
  const handleReport = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      console.log("Uploaded image URI:", result.assets[0].uri);
      // TODO: Upload image to server
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{bin.address}</Text>
          {isNearest && <Text style={styles.nearestTag}>• Nearest 🧭</Text>}
        </View>

        <Text style={styles.distanceText}>Distance: {distance}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Fill level</Text>
          <Text style={styles.value}>{bin.fill}%</Text>
        </View>

        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${bin.fill}%` }]} />
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Type</Text>
          <View style={styles.row}>
            <Text style={styles.icon}>🍾</Text>
            <Text style={styles.value}>{bin.type}</Text>
          </View>
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Size</Text>
          <View style={styles.row}>
            <Text style={styles.icon}>📦</Text>
            <Text style={styles.value}>{bin.size}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleReport} style={styles.reportButton}>
          <Text style={styles.reportText}>Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 14,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    flexShrink: 1,
  },
  nearestTag: {
    fontSize: 14,
    color: "#16a34a",
    fontWeight: "500",
    marginLeft: 8,
  },
  distanceText: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rowItem: {
    marginTop: 6,
  },
  label: {
    fontSize: 14,
    color: "#444",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    fontSize: 18,
  },
  barBackground: {
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    overflow: "hidden",
  },
  barFill: {
    height: 10,
    backgroundColor: "#fb923c",
  },
  reportButton: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  reportText: {
    fontWeight: "600",
    color: "#111827",
  },
});
