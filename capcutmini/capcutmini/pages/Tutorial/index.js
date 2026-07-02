import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tutorial = () => {
  const tutorials = [
    { id: 1, title: 'Cara Memotong Video', desc: 'Pelajari teknik trim, split, dan merge video dengan mudah.', duration: '3:45', views: '1.2M', likes: '98%', progress: 100, color: '#f093fb', icon: 'cut' },
    { id: 2, title: 'Menambahkan Teks & Caption', desc: 'Buat teks animasi, subtitle otomatis, dan caption menarik.', duration: '5:20', views: '890K', likes: '96%', progress: 60, color: '#4facfe', icon: 'text', isNew: true },
    { id: 3, title: 'Sinkronisasi Musik', desc: 'Tips menyamakan beat musik dengan transisi video.', duration: '4:15', views: '650K', likes: '95%', progress: 0, color: '#fa709a', icon: 'musical-notes' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Featured Tutorial - Lebih kecil */}
        <TouchableOpacity style={styles.featured} activeOpacity={0.9}>
          <View style={[styles.featuredThumb, { backgroundColor: '#667eea' }]}>
            <Ionicons name="film" size={60} color="rgba(255,255,255,0.8)" />
            <View style={styles.playIcon}>
              <Ionicons name="play" size={24} color="#667eea" />
            </View>
          </View>
          <View style={styles.featuredInfo}>
            <View style={styles.featuredTag}>
              <Text style={styles.featuredTagText}>FEATURED</Text>
            </View>
            <Text style={styles.featuredTitle}>Panduan Lengkap MiniCapCut untuk Pemula</Text>
            <Text style={styles.featuredMeta}>15:30 • 2.5M views • 4.9</Text>
          </View>
        </TouchableOpacity>

        {/* Tutorial List */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="book" size={16} color="#fff" />
            <Text style={styles.sectionTitle}>Dasar-Dasar</Text>
          </View>

          {tutorials.map((tutorial) => (
            <TouchableOpacity key={tutorial.id} style={styles.tutorialItem} activeOpacity={0.8}>
              <View style={[styles.tutorialThumb, { backgroundColor: tutorial.color }]}>
                <Ionicons name={tutorial.icon} size={24} color="#fff" />
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{tutorial.duration}</Text>
                </View>
              </View>
              <View style={styles.tutorialInfo}>
                <View style={styles.tutorialTitleRow}>
                  <Text style={styles.tutorialTitle} numberOfLines={2}>{tutorial.title}</Text>
                  {tutorial.isNew && (
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>BARU</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.tutorialDesc} numberOfLines={2}>{tutorial.desc}</Text>
                <View style={styles.tutorialMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="eye" size={10} color="rgba(255,255,255,0.6)" />
                    <Text style={styles.metaText}>{tutorial.views}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="thumbs-up" size={10} color="rgba(255,255,255,0.6)" />
                    <Text style={styles.metaText}>{tutorial.likes}</Text>
                  </View>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${tutorial.progress}%` }]} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  featured: {
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  featuredThumb: {
    aspectRatio: 16/9,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playIcon: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4,
  },
  featuredInfo: {
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  featuredTag: {
    backgroundColor: '#fe2c55',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  featuredTagText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  featuredMeta: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
  },
  section: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  tutorialItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    gap: 10,
  },
  tutorialThumb: {
    width: 90,
    height: 65,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '600',
  },
  tutorialInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  tutorialTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  tutorialTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  newBadge: {
    backgroundColor: '#fe2c55',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '700',
  },
  tutorialDesc: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    lineHeight: 14,
    marginBottom: 5,
  },
  tutorialMeta: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 5,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 9,
  },
  progressBar: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fe2c55',
    borderRadius: 2,
  },
});

export default Tutorial;