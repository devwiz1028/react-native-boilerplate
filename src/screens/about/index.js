import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AboutMain from './main';

const AboutStack = createStackNavigator();

export default function AboutStackScreen() {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen name="AboutMain" component={AboutMain} />
    </AboutStack.Navigator>
  );
}
