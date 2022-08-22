import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from './styles';

interface Props {
  title: string;
}

const HeaderTitle: FC<Props> = ({title}) => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={{marginTop: top + 20, marginBottom: 20}}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default HeaderTitle;
