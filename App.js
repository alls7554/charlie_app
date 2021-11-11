import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navigation from './src/components/Navigation';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <Navigation />
  );
}