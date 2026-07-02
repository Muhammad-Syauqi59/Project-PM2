import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Splashscreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => { navigation.replace('MainApp'); }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Ionicons name="videocam" size={50} color="#fff" />
        </View>
        <Text style={styles.logoText}>MiniCapCut</Text>
      </View>
      <Text style={styles.tagline}>Edit video dengan mudah</Text>
      <View style={styles.loadingBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  logoBox: { width: 100, height: 100, backgroundColor: '#FF2D55', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 15, shadowColor: '#FF2D55', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 10 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#fff', letterSpacing: 2 },
  tagline: { fontSize: 16, color: '#999', marginBottom: 50 },
  loadingBar: { width: 200, height: 3, backgroundColor: '#333', borderRadius: 2, overflow: 'hidden' },
});

export default Splashscreen;