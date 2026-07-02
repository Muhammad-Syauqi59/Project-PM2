import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabs } from '../components';

import { Splashscreen, Home, Template, Editor, Tutorial, Profile } from '../pages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabs {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} options={{ title: 'Home' }} />
      <Tab.Screen name="Template" component={Template} options={{ title: 'Template' }} />
      <Tab.Screen name="Create" component={Editor} options={{ title: 'Create' }} />
      <Tab.Screen name="Tutorial" component={Tutorial} options={{ title: 'Tutorial' }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splashscreen" component={Splashscreen} />
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;