import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import HomeScreen from './home.js';
import RegionScreen from './region.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Puglia" component={RegionScreen} />
        <Drawer.Screen name="Marche" component={RegionScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}