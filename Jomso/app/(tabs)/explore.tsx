/** @format */

// /** @format */

// // app/explore.tsx
import React, { useRef, useState, useEffect, useMemo } from "react";
import { View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { fetchBins } from "@/utils/binFetcher";
import BinSheetContent from "@/components/BinSheetContent";
import { mockBins } from "@/utils/mockBin";

type Bin = {
  id: string;
  lat: number;
  lng: number;
  fill: number;
  type: string;
  address: string;
};

export default function ExploreScreen() {
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const [bins, setBins] = useState<Bin[]>([]);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%", "60%"], []);
  useEffect(() => {
    setBins(mockBins); // use mock data
  }, []);

  useEffect(() => {
    fetchBins().then(setBins);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 49.0069,
          longitude: 8.4034,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        {bins.map((bin) => (
          <Marker
            key={bin.id}
            coordinate={{ latitude: bin.lat, longitude: bin.lng }}
            onPress={() => {
              setSelectedBin(bin);
              sheetRef.current?.expand();
            }}>
            <Image
              source={
                bin.type === "glass"
                  ? require("@/assets/icons/glass.png")
                  : bin.type === "clothes"
                  ? require("@/assets/icons/plastic.png")
                  : require("@/assets/icons/pizza_box.png")
              }
              style={{ width: 28, height: 28 }}
            />
          </Marker>
        ))}
      </MapView>

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose>
        {selectedBin && <BinSheetContent bin={selectedBin} />}
      </BottomSheet>
    </View>
  );
}
