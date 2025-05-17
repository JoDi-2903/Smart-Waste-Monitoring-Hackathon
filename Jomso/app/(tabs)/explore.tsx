/** @format */

import React, { useRef, useState, useEffect, useMemo } from "react";
import { View, Image, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import BinSheetContent from "@/components/BinSheetContent";
import { mockBins } from "../../utils/mockBin";
import * as Location from "expo-location";
import haversine from "haversine-distance";
import { Bin } from "@/utils/bin";
import FloatingBinCard from "@/components/FloatingBinCard";
import ReportBinCamera from "@/components/ReportBinCamera";

export default function ExploreScreen() {
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const [bins, setBins] = useState<Bin[]>([]);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const sheetRef = useRef<BottomSheet>(null);
  // const snapPoints = useMemo(() => ["30%", "60%", "70%"], []);
  const mapRef = useRef<MapView>(null);
  const [showCamera, setShowCamera] = useState(false);

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
  const [popoverPos, setPopoverPos] = useState<{ x: number; y: number } | null>(
    null
  );

  return (
    <View style={{ flex: 1 }}>
      {selectedBin && popoverPos && (
        <View
          style={[
            styles.popover,
            { top: popoverPos.y - 120, left: popoverPos.x - 140 },
          ]}>
          <BinSheetContent
            bin={selectedBin}
            distance={getDistanceFromUser(selectedBin)}
            isNearest={selectedBin.id === findClosestBin()?.id}
          />
        </View>
      )}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        // onPress={() => setSelectedBin(null)}
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
            onPress={(event) => {
              setSelectedBin(bin);
              console.log("Clicked bin:", bin);
              mapRef.current
                ?.pointForCoordinate(event.nativeEvent.coordinate)
                .then((point) => {
                  setPopoverPos(point);
                });
              console.log(userLocation?.latitude, userLocation?.longitude);
              sheetRef.current?.expand();
              mapRef.current?.animateToRegion(
                {
                  latitude: bin.lat,
                  longitude: bin.lng,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                },
                300
              );
            }}>
            <Image
              source={
                bin.type === "green"
                  ? require("@/assets/images/bottle_green.webp")
                  : bin.type === "white"
                    ? require("@/assets/images/bottle_red.webp")
                    : require("@/assets/images/bottle_yellow.webp")
              }
              style={{ width: 48, height: 48 }}
            />
          </Marker>
        ))}
      </MapView>
      {selectedBin && (
        <FloatingBinCard
          bin={selectedBin}
          distance={getDistanceFromUser(selectedBin)}
          onReport={() => {
            // trigger photo upload or other logic
            // router.push("/reportBinCamera");
            setShowCamera(true);
          }}
          onClose={() => {
            setSelectedBin(null);
          }}
        />
      )}
      {showCamera && (
        <ReportBinCamera
          onClose={() => {
            setShowCamera(false);
            // alert("Thank you for helping keep your city clean!");
          }}
        />
      )}
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
  popover: {
    position: "absolute",
    width: 280,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  bottomCardContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
});
