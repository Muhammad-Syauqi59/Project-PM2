import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const BOTTOM_TAB_HEIGHT = 80; // Tinggi bottom tab bar

const Home = ({ navigation }) => {
  const [projects, setProjects] = useState([]);

  const quickTools = [
    { icon: 'cut', name: 'Potong' },
    { icon: 'link', name: 'Gabung' },
    { icon: 'text', name: 'Teks' },
    { icon: 'musical-notes', name: 'Musik' },
    { icon: 'color-palette', name: 'Filter' },
    { icon: 'star', name: 'Stiker' },
    { icon: 'speed-medium', name: 'Kecepatan' },
    { icon: 'robot', name: 'AI Edit' },
  ];

  const templates = [
    { name: 'Vlog Aesthetic', uses: '1.2M', color: '#667eea', icon: 'videocam' },
    { name: 'TikTok Trend', uses: '850K', color: '#f093fb', icon: 'musical-notes' },
    { name: 'Cinematic', uses: '620K', color: '#4facfe', icon: 'film' },
    { name: 'IG Reels', uses: '430K', color: '#fa709a', icon: 'camera' },
    { name: 'Slideshow', uses: '290K', color: '#30cfd0', icon: 'images' },
  ];

  useEffect(() => {
    setProjects([
      { id: 1, name: 'Video Liburan', date: '2 Jam yang lalu', duration: '0:45' },
      { id: 2, name: 'Vlog Gaming', date: '1 Hari yang lalu', duration: '2:15' },
    ]);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <TouchableOpacity 
          style={[styles.hero, { backgroundColor: '#fe2c55' }]}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Create')}
        >
          <Text style={styles.heroTitle}>Buat Video Keren</Text>
          <Text style={styles.heroSubtitle}>
            Edit video seperti profesional dalam hitungan menit
          </Text>
          <View style={styles.heroButton}>
            <Ionicons name="add-circle" size={18} color="#fe2c55" />
            <Text style={styles.heroButtonText}>Proyek Baru</Text>
          </View>
        </TouchableOpacity>

        {/* Quick Tools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fitur Cepat</Text>
          <View style={styles.quickToolsGrid}>
            {quickTools.map((tool, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.toolItem}
                onPress={() => navigation.navigate('Editor')}
                activeOpacity={0.7}
              >
                <Ionicons name={tool.icon} size={24} color="#fff" style={styles.toolIcon} />
                <Text style={styles.toolName}>{tool.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Templates */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Template Populer</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Template')}>
              <Text style={styles.seeAll}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.templatesScroll}
          >
            {templates.map((template, index) => (
              <TouchableOpacity 
                key={index}
                style={[styles.templateCard, { backgroundColor: template.color }]}
                onPress={() => navigation.navigate('Template')}
                activeOpacity={0.8}
              >
                <Ionicons name={template.icon} size={40} color="rgba(255,255,255,0.8)" />
                <View style={styles.templateLabel}>
                  <Text style={styles.templateName}>{template.name}</Text>
                  <Text style={styles.templateUses}>{template.uses} digunakan</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Proyek Terbaru</Text>
          {projects.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="folder-open" size={40} color="rgba(255,255,255,0.3)" />
              <Text style={styles.emptyText}>Belum ada proyek</Text>
              <Text style={styles.emptySubtext}>Mulai buat video pertamamu!</Text>
            </View>
          ) : (
            <View style={styles.projectsGrid}>
              {projects.map((project) => (
                <TouchableOpacity 
                  key={project.id}
                  style={styles.projectCard}
                  onPress={() => navigation.navigate('Editor')}
                  activeOpacity={0.8}
                >
                  <View style={styles.projectThumb}>
                    <Ionicons name="videocam" size={32} color="rgba(255,255,255,0.3)" />
                    <View style={styles.durationBadge}>
                      <Text style={styles.durationText}>{project.duration}</Text>
                    </View>
                  </View>
                  <View style={styles.projectInfo}>
                    <Text style={styles.projectName} numberOfLines={1}>
                      {project.name}
                    </Text>
                    <Text style={styles.projectDate}>{project.date}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
    paddingBottom: BOTTOM_TAB_HEIGHT + 20, // PENTING: Tambah padding bottom
  },
  hero: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    minHeight: 130,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 15,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    alignSelf: 'flex-start',
    gap: 6,
  },
  heroButtonText: {
    color: '#fe2c55',
    fontWeight: '700',
    fontSize: 13,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  seeAll: {
    color: '#fe2c55',
    fontSize: 12,
    fontWeight: '600',
  },
  quickToolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  toolItem: {
    width: (width - 40) / 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },
  toolIcon: {
    marginBottom: 6,
  },
  toolName: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  templatesScroll: {
    paddingRight: 15,
  },
  templateCard: {
    width: 120,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  templateLabel: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 6,
    borderRadius: 6,
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
  },
  templateName: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  templateUses: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 9,
    marginTop: 2,
  },
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  projectCard: {
    width: (width - 40) / 2,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  projectThumb: {
    width: '100%',
    aspectRatio: 9/14,
    backgroundColor: '#2c2c2c',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  projectInfo: {
    padding: 8,
  },
  projectName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  projectDate: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
  },
  emptyState: {
    alignItems: 'center',
    padding: 25,
    opacity: 0.6,
  },
  emptyText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
  },
  emptySubtext: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    marginTop: 4,
  },
});

export default Home;