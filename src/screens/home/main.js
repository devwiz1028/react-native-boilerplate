import React from 'react';
import {View, Text} from 'react-native';

import {Styles} from '../../global/constants';

export default class HomeMain extends React.Component {
  render() {
    return (
      <View style={Styles.container}>
        <Text>Home</Text>
      </View>
    );
  }
}
