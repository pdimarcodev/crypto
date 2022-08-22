import {FC} from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';

/**
 * Types
 */

type RadioButtonProps = {
  data: any[];
  selectedValue: string;
  onSelect: (value: any) => void;
};

/**
 * RadioButton
 */

export const RadioButton: FC<RadioButtonProps> = ({
  data,
  selectedValue,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      {data.map(({label, value}) => (
        <Pressable
          key={value}
          style={[
            styles.itemNonSelected,
            value === selectedValue && styles.itemSelected,
          ]}
          onPress={() => onSelect(value)}>
          <Text style={[styles.text]}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
};

/**
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemNonSelected: {
    borderRadius: 50,
    height: 60,
    width: 60,
    marginRight: 10,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSelected: {
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    padding: 4,
  },
  xGenderText: {
    fontSize: 16,
    paddingTop: Platform.OS === 'android' ? -8 : 2,
  },
});
