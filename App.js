import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import Weather from './src/components/Weather';
import Todo from './src/components/Todo';
import Info from './src/components/Info';
import { StatusBar } from 'expo-status-bar';
import { Appearance } from 'react-native';
import Navigation from './src/components/Navigation';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
      <Navigation />
  );
}