import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomTabs = ({ state, navigation, descriptors }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (label === 'Create') {
          return (
            <TouchableOpacity key={index} onPress={onPress} style={styles.createButton}>
              <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>
          );
        }

        let iconName;
        switch (label) {
          case 'Home': iconName = isFocused ? 'home' : 'home-outline'; break;
          case 'Template': iconName = isFocused ? 'videocam' : 'videocam-outline'; break;
          case 'Tutorial': iconName = isFocused ? 'book' : 'book-outline'; break;
          case 'Profile': iconName = isFocused ? 'person' : 'person-outline'; break;
          default: iconName = 'circle';
        }

        return (
          <TouchableOpacity key={index} onPress={onPress} style={styles.tabItem}>
            <Ionicons name={iconName} size={24} color={isFocused ? '#fff' : 'rgba(255,255,255,0.5)'} />
            <Text style={[styles.tabLabel, { color: isFocused ? '#fff' : 'rgba(255,255,255,0.5)' }]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(18, 18, 18, 0.98)',
    height: 75,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 5 },
  tabLabel: { fontSize: 11, fontWeight: '600', marginTop: 4 },
  createButton: {
    width: 55, height: 55, backgroundColor: '#fe2c55', borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#fe2c55', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 10,
    marginTop: -20,
  },
});

export default BottomTabs;