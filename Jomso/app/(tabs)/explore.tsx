/** @format */

import React, { useRef, useState, useEffect, useMemo } from "react";
import { View, Image, ViewStyle, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { fetchBins } from "@/utils/binFetcher";
import BinSheetContent from "@/components/BinSheetContent";
import { mockBins } from "../../utils/mockBin";
import * as Location from "expo-location";
import haversine from "haversine-distance";
import { Bin } from "@/utils/bin";

export default function ExploreScreen() {
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const [bins, setBins] = useState<Bin[]>([]);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%", "60%", "70%"], []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    setBins(mockBins);
  }, []);

  function getDistanceFromUser(bin: Bin): string {
    if (!userLocation) return "–";
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const R = 6371e3;
    const φ1 = toRad(userLocation.latitude);
    const φ2 = toRad(bin.lat);
    const Δφ = toRad(bin.lat - userLocation.latitude);
    const Δλ = toRad(bin.lng - userLocation.longitude);

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance < 1000
      ? `${Math.round(distance)} m`
      : `${(distance / 1000).toFixed(1)} km`;
  }

  function findClosestBin(): Bin | null {
    if (!userLocation || bins.length === 0) return null;

    let closest: Bin | null = null;
    let shortestDistance = Infinity;

    for (const bin of bins) {
      const from = {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      };
      const to = {
        latitude: bin.lat,
        longitude: bin.lng,
      };

      const distance = haversine(from, to);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        closest = bin;
      }
    }

    return closest;
  }

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
        {userLocation && (
          <Marker coordinate={userLocation} title='You' pinColor='blue' />
        )}
        {bins.map((bin) => (
          <Marker
            key={bin.id}
            coordinate={{ latitude: bin.lat, longitude: bin.lng }}
            onPress={() => {
              setSelectedBin(bin);
              sheetRef.current?.expand();
              console.log("Clicked bin:", bin);
              console.log("Sheet ref:", sheetRef.current);
            }}>
            <View style={styles.emojiMarker}>
              <Text style={styles.emojiText}>
                {bin.type === "glass"
                  ? "📦"
                  : bin.type === "clothes"
                  ? "📦"
                  : "📦"}
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>

      <BottomSheet
        key={selectedBin?.id}
        ref={sheetRef}
        snapPoints={snapPoints}
        index={0}
        enablePanDownToClose
        onChange={(index) => {
          if (index === -1) {
            setSelectedBin(null);
          }
        }}>
        <View style={{ flex: 1 }}>
          {selectedBin ? (
            <BinSheetContent
              bin={selectedBin}
              distance={getDistanceFromUser(selectedBin)}
              isNearest={selectedBin?.id === findClosestBin()?.id}
            />
          ) : (
            <Text style={{ padding: 20, textAlign: "center" }}>
              No bin selected
            </Text>
          )}
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  emojiMarker: {
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  emojiText: {
    fontSize: 20,
  },
});
