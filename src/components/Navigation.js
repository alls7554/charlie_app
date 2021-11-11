import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Weather from './Weather';
import Todo from './Todo';
import Info from './Info';
import { theme } from '../common/color';
import News from './News';

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(255, 45, 85)',
    card: theme.bg,
    text: 'rgb(255, 255, 255)',
  },
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const Navigation = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="날씨" component={Weather} options={{
          drawerIcon: ({focused, size}) => (
            <AntDesign
                name={focused ? 'cloud' : 'cloudo'}
                size={size}
                color={focused ? 'tomato' : 'grey'}
            />
          ),
        }} />
        <Drawer.Screen name="할일" component={Todo} options={{
           drawerIcon: ({focused, size}) => (
              <AntDesign
                 name={focused ? 'checksquare' : 'checksquareo'}
                 size={size}
                 color={focused ? 'tomato' : 'grey'}
              />
           ),
        }} />
        <Drawer.Screen name="뉴스" component={News} options={{
           drawerIcon: ({focused, size}) => (
              <Ionicons
                 name={focused ? 'newspaper' : 'newspaper-outline'}
                 size={size}
                 color={focused ? 'tomato' : 'grey'}
              />
           ),
        }}/>
        <Drawer.Screen name="정보" component={Info} options={{
           drawerIcon: ({focused, size}) => (
              <AntDesign
                 name={focused ? 'infocirlce' : 'infocirlceo'}
                 size={size}
                 color={focused ? 'tomato' : 'grey'}
              />
           ),
        }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;