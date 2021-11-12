import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Weather from './Weather';
import Todo from './Todo';
import Info from './Info';
import { theme } from '../common/color';
import News from './News';
import { Text, View,  TouchableOpacity } from 'react-native';

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(255, 45, 85)',
    card: theme.bg,
    text: 'rgb(255, 255, 255)',
  },
};

const menuList = [
  {
    index: 1,
    component: Weather,
    title: '날씨',
    iconTitle: AntDesign,
    icon: 'cloud',
    focused_icon: 'cloudo'
  },
  {
    index: 2,
    component: Todo,
    title: '할일',
    iconTitle: AntDesign,
    icon: 'checksquare',
    focused_icon: 'checksquareo'
  },
  {
    index: 3,
    component: News,
    title: '뉴스',
    iconTitle: Ionicons,
    icon: 'newspaper',
    focused_icon: 'newspaper-outline'
  },
  {
    index: 4,
    component: Info,
    title: '정보',
    iconTitle: AntDesign,
    icon: 'infocirlce',
    focused_icon: 'infocirlceo'
  }
];

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ paddingHorizontal: 10, flexDirection:'row-reverse', }}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Ionicons name={'close-outline'} color={'white'} size={42}/>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 3, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 30 }}>
        <FontAwesome name='mobile' color='white' size={80}/>
        <Text style={{color:'white', fontSize: 36}}>Living App</Text>
      </View>
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
        {menuList.map(menu => (
          <Drawer.Screen
            key={menu.index}
            name={menu.title}
            component={menu.component}
            options={({ navigation }) => ({
              headerLeft: () => (
                <View style={{ marginHorizontal: 10}}>
                  <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name={'md-menu-outline'} color={'white'} size={28}/>
                  </TouchableOpacity>
                </View>
              ),
              drawerIcon: ({focused, size}) => (
                <menu.iconTitle
                    name={focused ? menu.icon : menu.focused_icon}
                    size={size}
                    color={focused ? 'tomato' : 'grey'}
                />
              )
            })}
          />
        ))}
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

{/* <Drawer.Screen
          name="날씨"
          component={Weather}
          options={({ navigation }) => ({
            headerLeft: () => (
              <View style={{ marginHorizontal: 10}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Ionicons name={'md-menu-outline'} color={'white'} size={28}/>
                </TouchableOpacity>
              </View>
            ),
            drawerIcon: ({focused, size}) => (
              <AntDesign
                  name={focused ? 'cloud' : 'cloudo'}
                  size={size}
                  color={focused ? 'tomato' : 'grey'}
              />
            )
          })}
        />

        <Drawer.Screen
          name="할일"
          component={Todo}
          options={({ navigation }) => ({
            headerLeft: () => (
              <View style={{ marginHorizontal: 10}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Ionicons name={'md-menu-outline'} color={'white'} size={28}/>
                </TouchableOpacity>
              </View>
            ),
            drawerIcon: ({focused, size}) => (
              <AntDesign
                  name={focused ? 'checksquare' : 'checksquareo'}
                  size={size}
                  color={focused ? 'tomato' : 'grey'}
              />
            ),
          })}
        />

        <Drawer.Screen
          name="뉴스"
          component={News}
          options={({ navigation }) => ({
            headerLeft: () => (
              <View style={{ marginHorizontal: 10}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Ionicons name={'md-menu-outline'} color={'white'} size={28}/>
                </TouchableOpacity>
              </View>
            ),
            drawerIcon: ({focused, size}) => (
              <Ionicons
                name={focused ? 'newspaper' : 'newspaper-outline'}
                size={size}
                color={focused ? 'tomato' : 'grey'}
              />
            ),
          })}
        />

        <Drawer.Screen
          name="정보"
          component={Info}
          options={{
            headerLeft: () => (
              <View style={{ marginHorizontal: 10}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Ionicons name={'md-menu-outline'} color={'white'} size={28}/>
                </TouchableOpacity>
              </View>
            ),
            drawerIcon: ({focused, size}) => (
              <AntDesign
                name={focused ? 'infocirlce' : 'infocirlceo'}
                size={size}
                color={focused ? 'tomato' : 'grey'}
              />
            ),
          }}
        /> */}