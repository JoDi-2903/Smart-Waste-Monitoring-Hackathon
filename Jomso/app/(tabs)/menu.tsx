import React, { useState } from "react";
import colors from "@/utils/colors";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    SafeAreaView
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import HeatMap from "@ncuhomeclub/react-native-heatmap";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function WasteManagementDashboard() {
    const [selectedGlassType, setSelectedGlassType] = useState("white");
    const screenWidth = Dimensions.get("window").width - 40;

    // Historical fill level data for different glass container types
    const fillLevelData = {
        white: [40, 52, 65, 70, 45, 60, 75, 80, 65, 55, 73, 85],
        brown: [35, 48, 60, 65, 50, 55, 70, 75, 60, 50, 68, 80],
        green: [30, 45, 55, 60, 40, 50, 65, 70, 55, 45, 63, 75]
    };

    // AI-generated forecast data based on historical patterns
    const predictionData = {
        white: [87, 75, 65, 60, 70, 85, 90],
        brown: [82, 70, 60, 55, 65, 80, 85],
        green: [77, 65, 55, 50, 60, 75, 80]
    };

    // Waste density data for heatmap visualization
    const heatmapData = [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68],
        [99, 28, 22, 4, 66, 90],
        [14, 26, 97, 69, 69, 3],
        [7, 46, 47, 47, 88, 6],
        [41, 55, 73, 23, 3, 79],
        [56, 69, 21, 86, 3, 33],
        [45, 7, 53, 81, 95, 79]
    ];

    // Underserved areas identified by AI analysis
    const underservedAreas = [
        {
            id: 1,
            name: "North District",
            currentContainers: 5,
            recommendedAdd: 3,
            fillRate: 92,
            location: "49.124, 8.432"
        },
        {
            id: 2,
            name: "East Central",
            currentContainers: 8,
            recommendedAdd: 2,
            fillRate: 87,
            location: "49.089, 8.511"
        },
        {
            id: 3,
            name: "South Market",
            currentContainers: 4,
            recommendedAdd: 4,
            fillRate: 95,
            location: "49.045, 8.476"
        }
    ];

    // Helper function to get color for each glass type
    const getColorByType = (type, opacity = 1) => {
        switch (type) {
            case "white": return `rgba(200, 200, 200, ${opacity})`;
            case "brown": return `rgba(139, 69, 19, ${opacity})`;
            case "green": return `rgba(0, 128, 0, ${opacity})`;
            default: return `rgba(100, 100, 100, ${opacity})`;
        }
    };

    // Chart data formatting for historical data
    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                data: fillLevelData[selectedGlassType],
                color: (opacity = 1) => getColorByType(selectedGlassType, opacity),
                strokeWidth: 2
            }
        ]
    };

    // Chart data formatting for AI predictions
    const predictionChartData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
        datasets: [
            {
                data: predictionData[selectedGlassType],
                color: (opacity = 1) => getColorByType(selectedGlassType, opacity * 0.8),
                strokeWidth: 2
            }
        ]
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Waste Management Dashboard</Text>
                    <Text style={styles.headerSubtitle}>AI-powered insights for optimization</Text>
                </View>

                {/* Section 1: Historical Trends and AI Forecasts */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Glass Container Fill Trends & Forecasts</Text>
                    <Text style={styles.sectionSubtitle}>
                        Historical data analysis and AI predictions based on time series data
                    </Text>

                    {/* Glass type selector buttons */}
                    <View style={styles.glassTypeSelector}>
                        <TouchableOpacity
                            style={[
                                styles.glassTypeButton,
                                selectedGlassType === "white" && styles.glassTypeButtonActive,
                                { borderColor: getColorByType("white") }
                            ]}
                            onPress={() => setSelectedGlassType("white")}
                        >
                            <MaterialCommunityIcons name="bottle-wine-outline" size={20} color={getColorByType("white")} />
                            <Text style={styles.glassTypeText}>White Glass</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.glassTypeButton,
                                selectedGlassType === "brown" && styles.glassTypeButtonActive,
                                { borderColor: getColorByType("brown") }
                            ]}
                            onPress={() => setSelectedGlassType("brown")}
                        >
                            <MaterialCommunityIcons name="bottle-wine-outline" size={20} color={getColorByType("brown")} />
                            <Text style={styles.glassTypeText}>Brown Glass</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.glassTypeButton,
                                selectedGlassType === "green" && styles.glassTypeButtonActive,
                                { borderColor: getColorByType("green") }
                            ]}
                            onPress={() => setSelectedGlassType("green")}
                        >
                            <MaterialCommunityIcons name="bottle-wine-outline" size={20} color={getColorByType("green")} />
                            <Text style={styles.glassTypeText}>Green Glass</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Historical data chart */}
                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>Historical Fill Levels (%)</Text>
                        <LineChart
                            data={chartData}
                            width={screenWidth}
                            height={220}
                            chartConfig={{
                                backgroundColor: "#fff",
                                backgroundGradientFrom: "#fff",
                                backgroundGradientTo: "#fff",
                                decimalPlaces: 0,
                                color: (opacity = 1) => getColorByType(selectedGlassType, opacity),
                                labelColor: () => "#333",
                                style: { borderRadius: 16 }
                            }}
                            bezier
                            style={styles.chart}
                        />
                    </View>

                    {/* AI Forecast chart with AI indicator icon */}
                    <View style={styles.chartContainer}>
                        <View style={styles.chartTitleRow}>
                            <Text style={styles.chartTitle}>AI Forecast - Next 7 Weeks (%)</Text>
                            <Ionicons name="analytics-outline" size={20} color="#555" />
                        </View>
                        {/* <Text style={styles.aiDisclaimer}>
                            Predictions generated using machine learning models trained on historical patterns
                        </Text> */}
                        <LineChart
                            data={predictionChartData}
                            width={screenWidth}
                            height={220}
                            chartConfig={{
                                backgroundColor: "#f8f8ff",
                                backgroundGradientFrom: "#f8f8ff",
                                backgroundGradientTo: "#f0f0ff",
                                decimalPlaces: 0,
                                color: (opacity = 1) => getColorByType(selectedGlassType, opacity),
                                labelColor: () => "#333",
                                style: { borderRadius: 16 },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#fff"
                                }
                            }}
                            bezier
                            style={styles.chart}
                        />
                    </View>

                    {/* AI-generated insights */}
                    <View style={styles.insightsContainer}>
                        <Text style={styles.insightsTitle}>Key AI Insights</Text>
                        <View style={styles.insightItem}>
                            <Ionicons name="trending-up" size={22} color="#4CAF50" />
                            <Text style={styles.insightText}>
                                {selectedGlassType.charAt(0).toUpperCase() + selectedGlassType.slice(1)} glass containers
                                show {selectedGlassType === "white" ? "12%" : selectedGlassType === "brown" ? "9%" : "7%"} fill
                                rate increase expected in the coming weeks
                            </Text>
                        </View>
                        <View style={styles.insightItem}>
                            <Ionicons name="calendar-outline" size={22} color="#2196F3" />
                            <Text style={styles.insightText}>
                                Optimal collection schedule: {selectedGlassType === "white" ? "Every 6 days" : selectedGlassType === "brown" ? "Every 7 days" : "Every 8 days"}
                            </Text>
                        </View>
                        <View style={styles.insightItem}>
                            <Ionicons name="alert-circle-outline" size={22} color="#FF9800" />
                            <Text style={styles.insightText}>
                                {selectedGlassType === "white" ? "2" : selectedGlassType === "brown" ? "1" : "3"} containers 
                may reach critical capacity (>90%) by next week
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Section 2: Waste Density Heatmap */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Waste Production Density Map</Text>
                    <Text style={styles.sectionSubtitle}>
                        Heatmap visualization for infrastructure planning
                    </Text>

                    <View style={styles.heatmapContainer}>
                        <View style={styles.heatmapHeaderRow}>
                            <Text style={styles.heatmapTitle}>Glass Container Utilization</Text>
                            <View style={styles.heatmapLegend}>
                                <View style={[styles.legendDot, { backgroundColor: 'rgba(76,175,80,0.7)' }]} />
                                <Text style={styles.legendText}>Low</Text>
                                <View style={[styles.legendDot, { backgroundColor: 'rgba(255,152,0,0.7)' }]} />
                                <Text style={styles.legendText}>Medium</Text>
                                <View style={[styles.legendDot, { backgroundColor: 'rgba(244,67,54,0.7)' }]} />
                                <Text style={styles.legendText}>High</Text>
                            </View>
                        </View>

                        {/* Heatmap visualization */}
                        <HeatMap
                            data={heatmapData.flat()}
                            xNumber={6}
                            yNumber={8}
                            color={{
                                theme: 'red',
                                opacitys: [
                                    { opacity: 0.2, limit: 25 },
                                    { opacity: 0.4, limit: 45 },
                                    { opacity: 0.6, limit: 65 },
                                    { opacity: 0.8, limit: 85 },
                                    { opacity: 1, limit: 100 },
                                ]
                            }}
                            style={styles.heatmap}
                        />

                        {/* Map overlay info */}
                        <View style={styles.mapOverlayContainer}>
                            <Text style={styles.mapOverlayText}>City Districts Map Overlay</Text>
                        </View>
                    </View>

                    {/* Density analysis insights */}
                    <View style={styles.insightsContainer}>
                        <Text style={styles.insightsTitle}>Density Analysis Insights</Text>
                        <View style={styles.insightItem}>
                            <Ionicons name="flame" size={22} color="#F44336" />
                            <Text style={styles.insightText}>
                                Highest waste production detected in North and Central districts
                            </Text>
                        </View>
                        <View style={styles.insightItem}>
                            <Ionicons name="timer-outline" size={22} color="#9C27B0" />
                            <Text style={styles.insightText}>
                                Peak usage times identified: weekends and holidays
                            </Text>
                        </View>
                        <View style={styles.insightItem}>
                            <Ionicons name="trending-down" size={22} color="#607D8B" />
                            <Text style={styles.insightText}>
                                Southern areas show 30% lower utilization rates
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Section 3: Underserved Areas & Optimization */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Underserved Areas & Optimization</Text>
                    <Text style={styles.sectionSubtitle}>
                        AI-recommended container placement based on usage patterns
                    </Text>

                    {/* Cards for each underserved area */}
                    <View style={styles.underservedContainer}>
                        {underservedAreas.map((area) => (
                            <View key={area.id} style={styles.underservedCard}>
                                <View style={styles.underservedHeader}>
                                    <Text style={styles.underservedTitle}>{area.name}</Text>
                                    <View style={[
                                        styles.fillRateBadge,
                                        { backgroundColor: area.fillRate > 90 ? '#F44336' : area.fillRate > 80 ? '#FF9800' : '#4CAF50' }
                                    ]}>
                                        <Text style={styles.fillRateText}>{area.fillRate}% Full</Text>
                                    </View>
                                </View>

                                <View style={styles.underservedDetails}>
                                    <View style={styles.underservedDetailItem}>
                                        <Text style={styles.underservedDetailLabel}>Current Containers:</Text>
                                        <Text style={styles.underservedDetailValue}>{area.currentContainers}</Text>
                                    </View>
                                    <View style={styles.underservedDetailItem}>
                                        <Text style={styles.underservedDetailLabel}>Recommended Add:</Text>
                                        <Text style={[styles.underservedDetailValue, { color: '#4CAF50' }]}>+{area.recommendedAdd}</Text>
                                    </View>
                                    <View style={styles.underservedDetailItem}>
                                        <Text style={styles.underservedDetailLabel}>Location:</Text>
                                        <Text style={styles.underservedDetailValue}>{area.location}</Text>
                                    </View>
                                </View>

                                <View style={styles.optimizationActions}>
                                    <TouchableOpacity style={styles.optimizationButton}>
                                        <Ionicons name="map-outline" size={16} color={colors.bg_dark} />
                                        <Text style={styles.optimizationButtonText}>View on Map</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.optimizationButton, { backgroundColor: '#2196F3' }]}>
                                        <Ionicons name="document-text-outline" size={16} color={colors.bg_dark} />
                                        <Text style={styles.optimizationButtonText}>Details</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Optimization summary */}
                    <View style={styles.optimizationSummary}>
                        <Text style={styles.insightsTitle}>Optimization Summary</Text>
                        <Text style={styles.optimizationSummaryText}>
                            AI analysis recommends adding 9 new containers across 3 underserved areas,
                            which would improve service coverage by 23% and reduce overflow incidents by an estimated 47%.
                        </Text>
                        <View style={styles.optimizationStat}>
                            {/* <View style={styles.optimizationStatItem}>
                                <Text style={styles.optimizationStatValue}>9</Text>
                                <Text style={styles.optimizationStatLabel}>New Containers</Text>
                            </View> */}
                            <View style={styles.optimizationStatItem}>
                                <Text style={styles.optimizationStatValue}>23%</Text>
                                <Text style={styles.optimizationStatLabel}>Coverage Increase</Text>
                            </View>
                            <View style={styles.optimizationStatItem}>
                                <Text style={styles.optimizationStatValue}>47%</Text>
                                <Text style={styles.optimizationStatLabel}>Overflow Reduction</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Footer with AI disclaimer */}
                <View style={styles.footer}>
                    <Ionicons name="analytics" size={24} color="#555" />
                    <Text style={styles.footerText}>
                        All predictions and recommendations are generated using AI models trained on historical time series data.
                        These suggestions should be verified by waste management experts before implementation.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.bg_dark,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        marginTop: 16,
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.primary,
    },
    headerSubtitle: {
        fontSize: 16,
        color: colors.secondary,
        marginTop: 4,
    },
    section: {
        marginBottom: 24,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    sectionSubtitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
        marginBottom: 16,
    },
    // Glass type selector styles
    glassTypeSelector: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    glassTypeButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        flex: 1,
        marginHorizontal: 4,
    },
    glassTypeButtonActive: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
    glassTypeText: {
        fontSize: 12,
        fontWeight: "500",
        marginLeft: 4,
    },
    // Chart styles
    chartContainer: {
        marginBottom: 20,
    },
    chartTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#444",
    },
    aiDisclaimer: {
        fontSize: 12,
        fontStyle: "italic",
        color: "#888",
        marginBottom: 10,
    },
    chart: {
        borderRadius: 16,
        marginVertical: 8,
    },
    // Insights styles
    insightsContainer: {
        backgroundColor: "#f5f5f5",
        padding: 16,
        borderRadius: 12,
        marginTop: 8,
    },
    insightsTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
        color: "#333",
    },
    insightItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    insightText: {
        fontSize: 14,
        color: "#444",
        marginLeft: 10,
        flex: 1,
    },
    // Heatmap styles
    heatmapContainer: {
        marginVertical: 16,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
    },
    heatmapHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#fff",
    },
    heatmapTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#444",
    },
    heatmapLegend: {
        flexDirection: "row",
        alignItems: "center",
    },
    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
    },
    legendText: {
        fontSize: 12,
        color: "#666",
        marginRight: 8,
    },
    heatmap: {
        width: "100%",
        height: 240,
        padding: 10,
    },
    mapOverlayContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 6,
        padding: 6,
    },
    mapOverlayText: {
        fontSize: 12,
        color: "#444",
    },
    // Underserved areas styles
    underservedContainer: {
        marginVertical: 16,
    },
    underservedCard: {
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    underservedHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    underservedTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    fillRateBadge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    fillRateText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#fff",
    },
    underservedDetails: {
        marginBottom: 16,
    },
    underservedDetailItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    underservedDetailLabel: {
        fontSize: 14,
        color: "#666",
    },
    underservedDetailValue: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },
    optimizationActions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    optimizationButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 4,
    },
    optimizationButtonText: {
        fontSize: 12,
        fontWeight: "500",
        color: colors.bg_dark,
        marginLeft: 4,
    },
    // Optimization summary styles
    optimizationSummary: {
        backgroundColor: "#f5f5f5",
        padding: 16,
        borderRadius: 12,
    },
    optimizationSummaryText: {
        fontSize: 14,
        color: "#444",
        marginBottom: 16,
    },
    optimizationStat: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    optimizationStatItem: {
        alignItems: "center",
    },
    optimizationStatValue: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333",
    },
    optimizationStatLabel: {
        fontSize: 12,
        color: "#666",
        marginTop: 4,
    },
    // Footer styles
    footer: {
        flexDirection: "row",
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 12,
        marginVertical: 4,
        alignItems: "center",
    },
    footerText: {
        fontSize: 12,
        color: "#666",
        marginLeft: 8,
        flex: 1,
    },
});
