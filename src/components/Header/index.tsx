import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';

export const Header = () => {
  return (
    <View>
      <Text style={styles.title}>Crypto</Text>
    </View>
  );
};
