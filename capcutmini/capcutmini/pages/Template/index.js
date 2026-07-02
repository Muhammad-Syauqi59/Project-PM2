import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const BOTTOM_TAB_HEIGHT = 80;

const Template = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Semua', icon: 'sparkles' },
    { id: 'vlog', name: 'Vlog', icon: 'videocam' },
    { id: 'tiktok', name: 'TikTok', icon: 'musical-notes' },
    { id: 'reels', name: 'Reels', icon: 'camera' },
    { id: 'cinematic', name: 'Cinematic', icon: 'film' },
  ];

  const templates = [
    { id: 1, name: 'Vlog Aesthetic', cat: 'vlog', uses: '1.2M', rating: '4.9', color: '#667eea', icon: 'videocam', badge: 'HOT' },
    { id: 2, name: 'TikTok Trend', cat: 'tiktok', uses: '850K', rating: '4.8', color: '#f093fb', icon: 'musical-notes', badge: 'TREND' },
    { id: 3, name: 'Cinematic Travel', cat: 'cinematic', uses: '620K', rating: '4.9', color: '#4facfe', icon: 'globe', badge: '' },
    { id: 4, name: 'IG Reels Fashion', cat: 'reels', uses: '430K', rating: '4.7', color: '#fa709a', icon: 'shirt', badge: 'NEW' },
    { id: 5, name: 'Slideshow Memories', cat: 'vlog', uses: '290K', rating: '4.8', color: '#30cfd0', icon: 'images', badge: '' },
    { id: 6, name: 'Birthday Celebration', cat: 'tiktok', uses: '180K', rating: '4.9', color: '#a8edea', icon: 'cake', badge: 'HOT' },
    { id: 7, name: 'Food Vlog', cat: 'vlog', uses: '320K', rating: '4.7', color: '#ff9a9e', icon: 'restaurant', badge: '' },
    { id: 8, name: 'Workout Motivation', cat: 'reels', uses: '210K', rating: '4.6', color: '#ffecd2', icon: 'barbell', badge: 'NEW' },
  ];

  const filteredTemplates = templates.filter(t => {
    const matchCat = activeCategory === 'all' || t.cat === activeCategory;
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Box */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={16} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari template..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContent}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryChip, activeCategory === cat.id && styles.categoryChipActive]}
              onPress={() => setActiveCategory(cat.id)}
            >
              <Ionicons name={cat.icon} size={12} color="#fff" style={{marginRight: 4}} />
              <Text style={styles.categoryText}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Template Grid */}
        <View style={styles.templateGrid}>
          {filteredTemplates.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Tidak ada template ditemukan</Text>
            </View>
          ) : (
            filteredTemplates.map((template) => (
              <TouchableOpacity key={template.id} style={styles.templateItem} activeOpacity={0.8}>
                <View style={[styles.templatePreview, { backgroundColor: template.color }]}>
                  {template.badge && (
                    <View style={[styles.templateBadge, (template.badge === 'HOT' || template.badge === 'TREND') && styles.templateBadgeHot]}>
                      <Text style={styles.badgeText}>{template.badge}</Text>
                    </View>
                  )}
                  <Ionicons name={template.icon} size={40} color="rgba(255,255,255,0.9)" />
                </View>
                <View style={styles.templateInfo}>
                  <Text style={styles.templateName}>{template.name}</Text>
                  <View style={styles.templateMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="star" size={10} color="#ffa502" />
                      <Text style={styles.metaText}>{template.rating}</Text>
                    </View>
                    <Text style={styles.metaText}>{template.uses} digunakan</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
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
    paddingBottom: BOTTOM_TAB_HEIGHT + 20, // PENTING
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 15,
    height: 42,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 13,
    marginLeft: 8,
  },
  categoriesContent: {
    paddingHorizontal: 15,
    gap: 8,
    marginBottom: 15,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 18,
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#fe2c55',
    borderColor: '#fe2c55',
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  templateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    gap: 12,
  },
  templateItem: {
    width: (width - 42) / 2,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    overflow: 'hidden',
  },
  templatePreview: {
    aspectRatio: 9/14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  templateBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  templateBadgeHot: {
    backgroundColor: '#fe2c55',
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  templateInfo: {
    padding: 10,
  },
  templateName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 3,
  },
  templateMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
  },
  emptyState: {
    width: '100%',
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default Template;