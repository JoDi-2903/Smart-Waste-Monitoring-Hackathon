/** @format */

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Feather } from "@expo/vector-icons";

export default function ReportBinCamera({ onClose }: { onClose: () => void }) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    openCamera();
  }, []);

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission is required to report bins.");
      onClose();
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri);
      await MediaLibrary.saveToLibraryAsync(uri);
    } else {
      onClose(); // close if cancelled
    }
  };

  const handleSubmit = () => {
    Alert.alert("✅ Thank you!", "Your report helps keep the city clean.");
    onClose();
  };

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Feather name='x' size={24} color='#333' />
      </TouchableOpacity>

      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Report</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading camera...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    zIndex: 100,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 20,
    zIndex: 101,
  },
  image: {
    width: 320,
    height: 420,
    borderRadius: 16,
    resizeMode: "cover",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
});
