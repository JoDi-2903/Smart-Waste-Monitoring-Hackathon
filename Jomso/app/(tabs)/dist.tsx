import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../utils/colors";

// Mock data for bins with fill levels
const mockBins = [
    { id: 1, location: "Main Street 22", fillLevel: 94, priority: "High", type: "White Glass" },
    { id: 2, location: "Park Avenue 15", fillLevel: 92, priority: "High", type: "Brown Glass" },
    { id: 3, location: "Central Square 7", fillLevel: 88, priority: "High", type: "Green Glass" },
    { id: 4, location: "Market Street 33", fillLevel: 79, priority: "Medium", type: "Green Glass" },
    { id: 5, location: "Brook Lane 12", fillLevel: 68, priority: "Medium", type: "White Glass" },
    { id: 6, location: "Hillside Avenue 45", fillLevel: 97, priority: "Low", type: "Brown Glass" },
];

export default function RouteOptimizationScreen() {
    const insets = useSafeAreaInsets();
    const [isCalculating, setIsCalculating] = useState(false);
    const [optimizedRoute, setOptimizedRoute] = useState(null);

    // Simulate route calculation process
    const calculateOptimizedRoute = () => {
        setIsCalculating(true);
        setTimeout(() => {
            setOptimizedRoute({
                totalDistance: 12.4,
                estimatedTime: 42,
                binsToCollect: 6,
                fuelSavings: "14%",
            });
            setIsCalculating(false);
        }, 1500);
    };

    useEffect(() => {
        // Calculate route on initial load
        calculateOptimizedRoute();
    }, []);

    // Yellow progress bar fill color
    const fillColor = "#FFFF00";

    return (
        <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Route Optimization</Text>
                <TouchableOpacity
                    style={styles.refreshButton}
                    onPress={calculateOptimizedRoute}
                    disabled={isCalculating}
                >
                    {isCalculating ? (
                        <ActivityIndicator size="small" color={fillColor} />
                    ) : (
                        <Ionicons name="refresh" size={22} color={colors.text_dark} />
                    )}
                </TouchableOpacity>
            </View>

            {/* Map with optimized route */}
            <View style={styles.mapCard}>
                <Image
                    source={require("@/assets/route-map.png")}
                    style={styles.mapImage}
                    resizeMode="cover"
                />
                <View style={styles.mapOverlay}>
                    <Text style={styles.mapTitle}>Optimized Collection Route</Text>
                    <Text style={styles.mapSubtitle}>Algorithm: Travelling Salesman</Text>
                </View>
            </View>

            {/* Route summary */}
            {optimizedRoute && (
                <View style={styles.routeSummary}>
                    <View style={styles.summaryItem}>
                        <Ionicons name="navigate" size={22} color={colors.text_dark} />
                        <Text style={styles.summaryValue}>{optimizedRoute.totalDistance} km</Text>
                        <Text style={styles.summaryLabel}>Distance</Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <Ionicons name="time" size={22} color={colors.text_dark} />
                        <Text style={styles.summaryValue}>{optimizedRoute.estimatedTime} min</Text>
                        <Text style={styles.summaryLabel}>Est. Time</Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <Ionicons name="trash" size={22} color={colors.text_dark} />
                        <Text style={styles.summaryValue}>{optimizedRoute.binsToCollect}</Text>
                        <Text style={styles.summaryLabel}>Bins</Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <Ionicons name="leaf" size={22} color={colors.text_dark} />
                        <Text style={styles.summaryValue}>{optimizedRoute.fuelSavings}</Text>
                        <Text style={styles.summaryLabel}>Fuel Savings</Text>
                    </View>
                </View>
            )}

            {/* Bins to collect list */}
            <Text style={styles.sectionTitle}>Collection Priority List</Text>
            <View style={styles.binsContainer}>
                {mockBins.map((bin) => (
                    <View key={bin.id} style={styles.binItem}>
                        <View style={[styles.priorityIndicator, { backgroundColor: fillColor }]} />
                        <View style={styles.binDetails}>
                            <Text style={styles.binLocation}>{bin.location}</Text>
                            <Text style={styles.binType}>{bin.type}</Text>
                        </View>
                        <View style={styles.fillLevelContainer}>
                            <Text style={[styles.fillLevelText, { color: colors.text_dark }]}>
                                {bin.fillLevel}%
                            </Text>
                            <View style={styles.progressBarBackground}>
                                <View
                                    style={[
                                        styles.progressBarFill,
                                        {
                                            width: `${bin.fillLevel}%`,
                                            backgroundColor: fillColor
                                        }
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            {/* Start navigation button */}
            <TouchableOpacity style={[styles.startButton, { backgroundColor: fillColor }]}>
                <Ionicons name="navigate-circle" size={22} color="#333" style={styles.buttonIcon} />
                <Text style={[styles.buttonText, { color: "#333" }]}>Start Navigation</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#f9f9f9",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.text_dark,
    },
    refreshButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        justifyContent: "center",
    },
    mapCard: {
        height: 200,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 20,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    mapImage: {
        width: "100%",
        height: "100%",
    },
    mapOverlay: {
        position: "absolute",
        bottom: 12,
        left: 12,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    mapTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#080807",
    },
    mapSubtitle: {
        fontSize: 12,
        color: "#555",
    },
    routeSummary: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 8,
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    summaryItem: {
        alignItems: "center",
        flex: 1,
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.text_dark,
        marginTop: 4,
    },
    summaryLabel: {
        fontSize: 12,
        color: "#888",
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.text_dark,
        marginBottom: 12,
    },
    binsContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
        marginBottom: 20,
    },
    binItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    priorityIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 12,
    },
    binDetails: {
        flex: 1,
    },
    binLocation: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.text_dark,
    },
    binType: {
        fontSize: 13,
        color: "#777",
        marginTop: 2,
    },
    fillLevelContainer: {
        alignItems: "flex-end",
        width: 100,
    },
    fillLevelText: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 4,
    },
    progressBarBackground: {
        width: "100%",
        height: 6,
        backgroundColor: "#e0e0e0",
        borderRadius: 3,
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
    },
    startButton: {
        flexDirection: "row",
        backgroundColor: colors.highlight,
        paddingVertical: 16,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
    },
    buttonIcon: {
        marginRight: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
