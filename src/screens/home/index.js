import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeMain from './main';

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeMain" component={HomeMain} />
    </HomeStack.Navigator>
  );
}
