/** @format */

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Animated,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import colors from "@/utils/colors";
import { rewards } from "../../utils/rewards";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

// Get screen width for slider calculations
const { width } = Dimensions.get('window');
const REWARD_ITEM_WIDTH = width * 0.3; // Each reward takes 70% of screen width
const REWARD_ITEM_SPACING = 12;

// Sample user data
const userData = {
  name: "Alex Johnson",
  role: "Administrator",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

// Sample notifications data
const notifications = [
  {
    id: '1',
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    username: "Sarah Parker",
    time: "2 hours ago",
    message: "Recycled 3 glass bottles at Container #12"
  },
  {
    id: '2',
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    username: "Michael Chen",
    time: "Yesterday",
    message: "Earned the Green Warrior badge with 500 points!"
  },
  {
    id: '3',
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    username: "Emma Williams",
    time: "3 days ago",
    message: "Added you as a friend on JOMSO"
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

  // Add these for the slider
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Current points and next reward threshold
  const currentPoints = 350;
  const nextRewardThreshold = 500;
  const progressPercentage = (currentPoints / nextRewardThreshold) * 100;

  // Modify rewards array to unlock entry-level reward (you'll need to import or define the rewards array)
  const enhancedRewards = [...rewards];
  if (enhancedRewards.length > 0 && !enhancedRewards[0].unlocked) {
    enhancedRewards[0] = { ...enhancedRewards[0], unlocked: true, isNew: true };
  }

  const NotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Image source={{ uri: item.image }} style={styles.notificationImage} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationUsername}>{item.username}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </View>
  );

  // Add reward item renderer for horizontal list
  const renderRewardItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.rewardItemHorizontal,
        item.unlocked ? styles.unlockedReward : styles.lockedReward
      ]}
    >
      <Text style={styles.rewardEmoji}>{item.emoji}</Text>
      <Text style={styles.rewardLabel}>
        {item.label}
      </Text>
      {!item.unlocked && (
        <View style={styles.lockedBadge}>
          <Ionicons name="lock-closed" size={14} color="#fff" />
        </View>
      )}
      {item.isNew && item.unlocked && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>NEW</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  // Add pagination indicator renderer
  const renderPaginationDots = () => {
    const totalPages = Math.ceil(enhancedRewards.length / 1); // 2 visible items per page
    return (
      <View style={styles.paginationContainer}>
        {Array(totalPages).fill(0).map((_, i) => (
          <View
            key={`dot-${i}`}
            style={[
              styles.paginationDot,
              currentIndex === i ? styles.paginationDotActive : {}
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg_tertiary }}>
      <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header with notifications and user profile */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => setShowNotifications(true)}
          >
            <Ionicons name="notifications" size={24} color={colors.primary} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.mobileTitle}>JOMSO</Text>

          <TouchableOpacity style={styles.userProfileButton}>
            <View style={styles.userProfileContent}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userRole}>{userData.role}</Text>
            </View>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: userData.avatar }} style={styles.avatar} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Enhanced gamification scorecard */}
        <View style={styles.enhancedScoreCard}>
          <LinearGradient
            colors={['#f0fdfa', '#99f6e4', '#2dd4bf']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.scoreGradient}
          >
            <View style={styles.scoreHeader}>
              <View style={styles.enhancedCirclePoints}>
                <Text style={styles.enhancedScoreNumber}>{currentPoints}</Text>
                <Text style={styles.enhancedScoreLabel}>Points</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <View style={styles.rankBadge}>
                  <FontAwesome5 name="medal" size={16} color="#f59e0b" />
                  <Text style={styles.enhancedRankText}>Rank #3</Text>
                </View>
                <Text style={styles.enhancedRankSubtext}>
                  Only 150 points to unlock theater tickets!
                </Text>

                {/* Progress bar */}
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
                  <View style={styles.progressMarker} />
                </View>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressCurrentLabel}>{currentPoints}</Text>
                  <Text style={styles.progressNextLabel}>{nextRewardThreshold}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.viewLeaderboardButton}>
              <Text style={styles.viewLeaderboardText}>View Leaderboard</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Rewards section with horizontal slider */}
        <View style={styles.rewardsSection}>
          <View style={styles.rewardsSectionHeader}>
            <Text style={styles.sectionTitle}>Rewards</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Horizontal rewards list */}
          <Animated.FlatList
            data={enhancedRewards}
            renderItem={renderRewardItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rewardsListContainer}
            snapToInterval={REWARD_ITEM_WIDTH + REWARD_ITEM_SPACING}
            snapToAlignment="start"
            decelerationRate="fast"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(
                e.nativeEvent.contentOffset.x / (REWARD_ITEM_WIDTH + REWARD_ITEM_SPACING)
              );
              setCurrentIndex(newIndex);
            }}
          />

          {/* Pagination dots */}
          {renderPaginationDots()}
        </View>

        {/* Call to action section */}
        <View style={styles.ctaSection}>
          {/* <View style={styles.ctaIcon}>
            <LinearGradient
              colors={['#10b981', '#059669']}
              style={styles.ctaIconBg}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="leaf" size={28} color="#fff" />
            </LinearGradient>
          </View> */}
          <Text style={styles.ctaTitle}>Make an Impact Today!</Text>
          <Text style={styles.ctaDescription}>
            Glass recycling reduces landfill waste by 100% and saves energy. Find a container near you and start earning points!
          </Text>
        </View>

        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => router.push("/explore")}>
          <Ionicons
            name='location-sharp'
            size={20}
            color='#111827'
            style={{ marginRight: 8 }}
          />
          <Text style={styles.exploreButtonText}>
            Find Nearby Empty Glass Containers
          </Text>
        </TouchableOpacity>

        {/* Notifications Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showNotifications}
          onRequestClose={() => setShowNotifications(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.notificationsPanel}>
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>Notifications</Text>
                <TouchableOpacity onPress={() => setShowNotifications(false)}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={notifications}
                renderItem={({ item }) => <NotificationItem item={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.notificationsList}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.bg_tertiary,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 10,
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ef4444',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  mobileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  userProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfileContent: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  userRole: {
    fontSize: 12,
    color: colors.accent,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  enhancedScoreCard: {
    borderRadius: 20,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  scoreGradient: {
    padding: 20,
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  enhancedCirclePoints: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  enhancedScoreNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  enhancedScoreLabel: {
    fontSize: 14,
    color: '#4b5563',
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  enhancedRankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 6,
  },
  enhancedRankSubtext: {
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 12,
  },
  progressContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
    marginTop: 6,
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  progressMarker: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
    position: 'absolute',
    top: -3,
    right: 0,
    borderWidth: 2,
    borderColor: '#2dd4bf',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressCurrentLabel: {
    fontSize: 12,
    color: '#1f2937',
  },
  progressNextLabel: {
    fontSize: 12,
    color: '#1f2937',
    fontWeight: 'bold',
  },
  viewLeaderboardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 12,
  },
  viewLeaderboardText: {
    color: colors.primary,
    fontWeight: '600',
    marginRight: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 14,
    color: colors.primary,
  },
  rewardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  rewardItemGrid: {
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
    minHeight: 110,
  },
  unlockedReward: {
    backgroundColor: '#f9fafb',
  },
  lockedReward: {
    backgroundColor: '#f3f4f6',
    opacity: 0.8,
  },
  rewardLabel: {
    marginTop: 8,
    fontSize: 13,
    textAlign: "center",
    fontWeight: '500',
  },
  lockedBadge: {
    position: 'absolute',
    top: 8,
    left: 8, // Changed from right: 8 to left: 8
    backgroundColor: 'rgba(107, 114, 128, 0.8)',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  exploreButtonText: {
    color: "#111827",
    fontWeight: "600",
    fontSize: 16,
  },
  // Modal and notifications styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  notificationsPanel: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '80%',
    padding: 20,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    marginBottom: 16,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationsList: {
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    alignItems: 'center',
  },
  notificationImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  notificationContent: {
    marginLeft: 14,
    flex: 1,
  },
  notificationUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
  },
  // Legacy styles kept for compatibility
  mobileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  mobileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  // Add these to the StyleSheet

  ctaSection: {
    paddingVertical: 2,
    marginBottom: 8,
    alignItems: 'center',
  },
  ctaIcon: {
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaIconBg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 15,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 0,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  // Rewards horizontal slider styles
  rewardsSection: {
    marginBottom: 24,
  },
  rewardsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: 14,
    marginRight: 4,
  },
  rewardsListContainer: {
    paddingLeft: 2,
    paddingRight: 8,
    paddingVertical: 4,
  },
  rewardItemHorizontal: {
    width: REWARD_ITEM_WIDTH,
    marginRight: REWARD_ITEM_SPACING,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 160,
    position: 'relative',
  },
  rewardEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,  // Changed from right: 12 to left: 8
    backgroundColor: '#10b981',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  newBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 16,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});
