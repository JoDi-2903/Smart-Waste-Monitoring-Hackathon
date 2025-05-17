import React, { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Base Docker API URL - change this to your machine's IP when testing on physical devices
const API_BASE_URL = 'http://10.0.2.2:5000'; //Only works on Android simulator for now; 'http://localhost:5000'; // Use actual IP (e.g., '192.168.1.5') for physical devices

export default function HomeScreen() {
  const [element0, setElement0] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // state for demo endpoint data
  const [demoData, setDemoData] = useState(null);
  const [demoLoading, setDemoLoading] = useState(true);
  const [demoError, setDemoError] = useState(null);

  useEffect(() => {
    fetch('https://api.restful-api.dev/objects')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setElement0(data[0]);
        } else {
          setError('No data received');
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // useEffect for fetching data from the docker endpoint
  useEffect(() => {
    setDemoLoading(true);
    fetch(`${API_BASE_URL}/demo`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.rows && data.rows.length > 0) {
          setDemoData(data.rows[0]); // Get the first row
        } else {
          setDemoError('No rows received from demo endpoint');
        }
      })
      .catch((err) => setDemoError(err.message))
      .finally(() => setDemoLoading(false));
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      {/* Online Hosted REST Test View */}
      <ThemedView style={styles.testContainer}>
        <ThemedText type="subtitle">API Test: Element 0</ThemedText>
        {loading && <ThemedText>Loading...</ThemedText>}
        {error && <ThemedText style={{ color: 'red' }}>{error}</ThemedText>}
        {element0 && (
          <ThemedText style={styles.jsonText}>
            {JSON.stringify(element0, null, 2)}
          </ThemedText>
        )}
      </ThemedView>

      {/* Docker API Test View */}
      <ThemedView style={styles.testContainer}>
        <ThemedText type="subtitle">Demo API Test: First Row</ThemedText>
        {demoLoading && <ThemedText>Loading...</ThemedText>}
        {demoError && <ThemedText style={{ color: 'red' }}>{demoError}</ThemedText>}
        {demoData && (
          <ThemedText style={styles.jsonText}>
            {JSON.stringify(demoData, null, 2)}
          </ThemedText>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  testContainer: {
    gap: 8,
    margin: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
  },
  jsonText: {
    fontFamily: 'Courier',
    fontSize: 14,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
