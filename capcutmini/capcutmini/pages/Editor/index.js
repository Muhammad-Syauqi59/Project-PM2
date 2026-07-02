import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_KEY = 'your-anon-key';
const TABLE_NAME = 'video_projects';

const { width, height } = Dimensions.get('window');
const BOTTOM_TAB_HEIGHT = 80;

const Editor = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?select=*`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
      });
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
      setProjects([
        { id: 1, judul_proyek: 'Video Liburan Bali', deskripsi: 'Vlog liburan ke pantai', status: 'Draft' },
        { id: 2, judul_proyek: 'Tutorial Masak', deskripsi: 'Resep nasi goreng', status: 'Published' },
      ]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async () => {
    if (!newTitle.trim() || !newDesc.trim()) {
      Alert.alert('Error', 'Judul dan deskripsi tidak boleh kosong!');
      return;
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          judul_proyek: newTitle,
          deskripsi: newDesc,
          status: 'Draft',
        }),
      });

      if (response.status === 201) {
        Alert.alert('Sukses', 'Proyek berhasil ditambahkan!');
        setNewTitle('');
        setNewDesc('');
        setShowModal(false);
        fetchProjects();
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Gagal menambahkan proyek');
    }
  };

  const deleteProject = (id) => {
    Alert.alert(
      'Hapus Proyek',
      'Apakah Anda yakin ingin menghapus proyek ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?id=eq.${id}`, {
                method: 'DELETE',
                headers: {
                  'apikey': SUPABASE_KEY,
                  'Authorization': `Bearer ${SUPABASE_KEY}`,
                },
              });
              fetchProjects();
            } catch (error) {
              console.error(error);
            }
          },
        },
      ]
    );
  };

  const tools = [
    { icon: 'folder-open', name: 'Import' },
    { icon: 'create', name: 'Teks' },
    { icon: 'color-palette', name: 'Filter' },
    { icon: 'cut', name: 'Split' },
    { icon: 'download', name: 'Export' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Preview Area */}
      <View style={styles.previewArea}>
        <View style={styles.videoWrapper}>
          <View style={styles.videoPlaceholder}>
            <Ionicons name="videocam" size={40} color="rgba(255,255,255,0.3)" />
          </View>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Toolbar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.toolbar}
        contentContainerStyle={styles.toolbarContent}
      >
        {tools.map((tool, index) => (
          <TouchableOpacity key={index} style={styles.toolBtn}>
            <Ionicons name={tool.icon} size={16} color="#fff" />
            <Text style={styles.toolBtnText}>{tool.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Timeline */}
      <View style={styles.timelineArea}>
        <View style={styles.timelineControls}>
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={14} color="#fff" />
            <Text style={styles.playBtnText}>
              {isPlaying ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.timeDisplay}>00:00 / 00:30</Text>
        </View>

        <View style={styles.timelineTrack}>
          <View style={styles.trackClip}>
            <Text style={styles.trackText}>Video Clip</Text>
          </View>
          <View style={styles.playhead} />
        </View>
      </View>

      {/* Projects List - dengan padding bottom */}
      <ScrollView 
        style={styles.projectsSection} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.projectsContent}
      >
        <View style={styles.projectsHeader}>
          <Text style={styles.projectsTitle}>Proyek Saya ({projects.length})</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setShowModal(true)}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {projects.map((project) => (
          <View key={project.id} style={styles.projectCard}>
            <View style={styles.projectIcon}>
              <Ionicons name="videocam" size={20} color="#fff" />
            </View>
            <View style={styles.projectInfo}>
              <Text style={styles.projectName} numberOfLines={1}>
                {project.judul_proyek}
              </Text>
              <Text style={styles.projectDesc} numberOfLines={1}>
                {project.deskripsi}
              </Text>
              <View style={styles.projectMeta}>
                <View
                  style={[
                    styles.statusBadge,
                    project.status === 'Published' && styles.statusPublished,
                  ]}
                >
                  <Text style={styles.statusText}>{project.status}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deleteProject(project.id)}
            >
              <Ionicons name="trash" size={18} color="#fe2c55" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal */}
      {showModal && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Buat Proyek Baru</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Judul Proyek"
              placeholderTextColor="#666"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={[styles.modalInput, styles.modalTextArea]}
              placeholder="Deskripsi Proyek"
              placeholderTextColor="#666"
              value={newDesc}
              onChangeText={setNewDesc}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnPrimary]}
                onPress={addProject}
              >
                <Text style={styles.modalBtnText}>Simpan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalBtnText}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  previewArea: {
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  videoWrapper: {
    width: width * 0.45,
    aspectRatio: 9/16,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  videoPlaceholder: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#fe2c55',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbar: {
    backgroundColor: '#1e1e1e',
    maxHeight: 50,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  toolbarContent: {
    padding: 10,
    gap: 8,
  },
  toolBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2c2c',
    borderWidth: 1,
    borderColor: '#444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  toolBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  timelineArea: {
    height: 90,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
    padding: 10,
  },
  timelineControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2c2c',
    borderWidth: 1,
    borderColor: '#444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  playBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  timeDisplay: {
    color: '#fff',
    fontSize: 11,
  },
  timelineTrack: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#444',
  },
  trackClip: {
    position: 'absolute',
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
    backgroundColor: '#fe2c55',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  playhead: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#fff',
    left: '30%',
  },
  projectsSection: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  projectsContent: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: BOTTOM_TAB_HEIGHT + 20, // PENTING
  },
  projectsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  projectsTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  addBtn: {
    width: 32,
    height: 32,
    backgroundColor: '#fe2c55',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  projectIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#fe2c55',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  projectDesc: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    marginBottom: 4,
  },
  projectMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    backgroundColor: 'rgba(254, 44, 85, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusPublished: {
    backgroundColor: 'rgba(46, 213, 115, 0.2)',
  },
  statusText: {
    color: '#fe2c55',
    fontSize: 9,
    fontWeight: '700',
  },
  deleteBtn: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(254, 44, 85, 0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  modalContent: {
    backgroundColor: '#2c2c2c',
    padding: 20,
    borderRadius: 12,
    width: '85%',
    maxWidth: 320,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 15,
  },
  modalInput: {
    backgroundColor: '#1e1e1e',
    borderWidth: 1,
    borderColor: '#444',
    padding: 10,
    borderRadius: 6,
    color: '#fff',
    marginBottom: 10,
    fontSize: 13,
  },
  modalTextArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  modalBtn: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    borderWidth: 1,
    borderColor: '#444',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalBtnPrimary: {
    backgroundColor: '#fe2c55',
    borderColor: '#fe2c55',
  },
  modalBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default Editor;