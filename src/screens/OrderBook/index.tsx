import {FC} from 'react';
import {View, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {NavigationStackParamList} from '../../navigation/navigation';
import {Button} from '../../components/Button';
import {styles} from './styles';

/**
 * Types
 */

type QuoteScreenProps = StackScreenProps<NavigationStackParamList, 'OrderBook'>;

/**
 * Quote Screen
 */

const Quote: FC<QuoteScreenProps> = ({navigation: {reset}}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TEXT</Text>
      <Button
        accessibilityLabel="scan again"
        title="scan again"
        onPress={() => {}}
      />
    </View>
  );
};

export default Quote;
