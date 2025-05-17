/** @format */

// components/FloatingBinCard.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Bin } from "@/utils/bin";
import colors from "@/utils/colors";

export default function FloatingBinCard({
  bin,
  distance,
  onReport,
}: {
  bin: Bin;
  distance: string;
  onReport: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{bin.address}</Text>

      <Text style={styles.label}>Fill level</Text>
      <View style={styles.fillBarBackground}>
        <View style={[styles.fillBar, { width: `${bin.fill}%` }]} />
      </View>
      <Text style={styles.value}>{bin.fill}%</Text>

      <Text style={styles.label}>Type</Text>
      <View style={styles.row}>
        <Text style={styles.icon}>🍾</Text>
        <Text style={styles.value}>{bin.type}</Text>
      </View>

      <Text style={styles.label}>Size</Text>
      <View style={styles.row}>
        <Text style={styles.icon}>📦</Text>
        <Text style={styles.value}>{bin.size}</Text>
      </View>

      <TouchableOpacity onPress={onReport} style={styles.reportButton}>
        <Text style={styles.reportText}>Report</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    bottom: 5,
    marginBottom: -10,
    // right: 16,
    // left: 16,
    width: "100%",
    maxWidth: "100%",
    backgroundColor: colors.highlight,
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  fillBarBackground: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.highlight,
    marginVertical: 6,
    overflow: "hidden",
  },
  fillBar: {
    height: 8,
    backgroundColor: colors.accent,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  icon: {
    fontSize: 16,
  },
  reportButton: {
    marginTop: 12,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  reportText: {
    fontWeight: "600",
    color: "#111827",
  },
});
