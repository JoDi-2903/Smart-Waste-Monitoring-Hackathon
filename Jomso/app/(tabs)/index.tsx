import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../utils/colors";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
				<View style={styles.mobileContainer}>
					<Text style={styles.mobileTitle}>JOMSO</Text>
				</View>
      <View style={styles.cardRow}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Total Bins</Text>
          <Text style={styles.statValue}>42</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Full (>90%)</Text>
          <Text style={styles.statValue}>7</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Avg Fill</Text>
          <Text style={styles.statValue}>63%</Text>
        </View>
      </View>

      {/* Map Preview */}
      <View style={styles.mapCard}>
        <Image
          source={require("@/assets/mock-map.png")}
          style={styles.mapImage}
          resizeMode='cover'
        />
        <View style={styles.mapOverlay}>
          <Text style={styles.mapTitle}>View bins on map</Text>
          <Text style={styles.mapSubtitle}>Tap to open interactive map</Text>
        </View>
      </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
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
		backgroundColor: colors.bg_dark,
	},
	mobileTitle: {
		fontSize:24,
    fontWeight:600,
		color: colors.highlight,
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
  mapCard: {
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 40,
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  mapOverlay: {
    position: "absolute",
    bottom: 12,
    left: 12,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#080807",
  },
  mapSubtitle: {
    fontSize: 12,
    color: "#080807",
  },
});

// import React from "react";
// import { View, Text } from "react-native";

// export default function ExploreScreen() {
//   return (
//     <View>
//       <Text>Explore Tab</Text>
//     </View>
//   );
// }
