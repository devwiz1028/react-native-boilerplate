import React from 'react';
import {View, Text} from 'react-native';

import {Styles} from '../../global/constants';

export default class AboutMain extends React.Component {
  render() {
    return (
      <View style={Styles.container}>
        <Text>About</Text>
      </View>
    );
  }
}
