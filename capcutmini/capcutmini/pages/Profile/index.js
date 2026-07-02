import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BOTTOM_TAB_HEIGHT = 80;

const Profile = () => {
  const handleLogout = () => {
    Alert.alert('Keluar', 'Yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Keluar', style: 'destructive' },
    ]);
  };

  const menuItems = [
    { icon: 'moon', label: 'Mode Gelap', type: 'toggle', active: true },
    { icon: 'notifications', label: 'Notifikasi', type: 'toggle', active: true },
    { icon: 'create', label: 'Edit Profil', type: 'arrow' },
    { icon: 'cloud', label: 'Penyimpanan', type: 'arrow' },
    { icon: 'lock-closed', label: 'Privasi', type: 'arrow' },
    { icon: 'help-circle', label: 'Bantuan', type: 'arrow' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileGradient}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={32} color="#fff" />
            </View>
            <Text style={styles.profileName}>Bahrul Ulum</Text>
            <Text style={styles.profileUsername}>@bahrul_ulum</Text>
            <Text style={styles.profileBio}>
              Mahasiswa Informatika ITSNU Pekalongan{'\n'}
              Praktikum Mobile 2 - Video Editor App
            </Text>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Proyek</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Template</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>156</Text>
                <Text style={styles.statLabel}>Views</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Identitas Box */}
        <View style={styles.identityBox}>
          <View style={styles.identityTitleRow}>
            <Ionicons name="clipboard" size={16} color="#fff" />
            <Text style={styles.identityTitle}>Identitas Mahasiswa</Text>
          </View>
          <View style={styles.identityRow}>
            <Text style={styles.identityLabel}>Nama</Text>
            <Text style={styles.identityValue}>: Bahrul Ulum</Text>
          </View>
          <View style={styles.identityRow}>
            <Text style={styles.identityLabel}>NIM</Text>
            <Text style={styles.identityValue}>: K4221001</Text>
          </View>
          <View style={styles.identityRow}>
            <Text style={styles.identityLabel}>Kelompok</Text>
            <Text style={styles.identityValue}>: 1</Text>
          </View>
          <View style={styles.identityRow}>
            <Text style={styles.identityLabel}>Topik</Text>
            <Text style={styles.identityValue}>: Video Editor</Text>
          </View>
          <View style={styles.identityRow}>
            <Text style={styles.identityLabel}>Kampus</Text>
            <Text style={styles.identityValue}>: ITSNU Pekalongan</Text>
          </View>
        </View>

        {/* Menu List */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="settings" size={16} color="#fff" />
            <Text style={styles.sectionTitle}>Preferensi</Text>
          </View>
          <View style={styles.menuList}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <Ionicons name={item.icon} size={18} color="#fff" style={styles.menuIcon} />
                <Text style={styles.menuText}>{item.label}</Text>
                {item.type === 'toggle' ? (
                  <View style={[styles.toggle, item.active && styles.toggleActive]}>
                    <View style={[styles.toggleDot, item.active && styles.toggleDotActive]} />
                  </View>
                ) : (
                  <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.4)" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out" size={16} color="#fe2c55" />
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>

        {/* Version Info */}
        <Text style={styles.versionInfo}>
          MiniCapCut v1.0.0 • Made with ❤️{'\n'}
          Tugas Praktikum Mobile 2 - ITS NU Pekalongan
        </Text>
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
  profileCard: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(254, 44, 85, 0.2)',
  },
  profileGradient: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(254, 44, 85, 0.1)',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fe2c55',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 3,
  },
  profileUsername: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginBottom: 12,
  },
  profileBio: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fe2c55',
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    marginTop: 2,
  },
  identityBox: {
    marginHorizontal: 15,
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 12,
  },
  identityTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  identityTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  identityRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  identityLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    width: 70,
  },
  identityValue: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  section: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  menuList: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  menuIcon: {
    width: 24,
    textAlign: 'center',
  },
  menuText: {
    flex: 1,
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 10,
  },
  toggle: {
    width: 40,
    height: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 11,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#fe2c55',
  },
  toggleDot: {
    width: 18,
    height: 18,
    backgroundColor: '#fff',
    borderRadius: 9,
  },
  toggleDotActive: {
    alignSelf: 'flex-end',
  },
  logoutBtn: {
    marginHorizontal: 15,
    backgroundColor: 'rgba(254, 44, 85, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(254, 44, 85, 0.3)',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 15,
  },
  logoutText: {
    color: '#fe2c55',
    fontSize: 13,
    fontWeight: '700',
  },
  versionInfo: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    marginBottom: 20,
    lineHeight: 16,
  },
});

export default Profile;