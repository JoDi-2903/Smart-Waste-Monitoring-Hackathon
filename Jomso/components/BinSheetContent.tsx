/** @format */

// components/BinSheetContent.tsx
import React from "react";
import { Text, View } from "react-native";

export default function BinSheetContent({ bin }: { bin: any }) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>🗑 Bin {bin.id}</Text>
      <Text>Fill Level: {bin.fill}%</Text>
      <Text>
        Lat: {bin.lat}, Lng: {bin.lng}
      </Text>
    </View>
  );
}
