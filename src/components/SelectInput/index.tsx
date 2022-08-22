import {StyleSheet} from 'react-native';
import {Control, Controller, Path} from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import {CryptoCurrency} from '../../interfaces';

/**
 * Types
 */

interface ISelectInput<ContentType> {
  control: Control<ContentType, object>;
  name: Path<ContentType>;
  data: any[];
  rules?: Object;
  placeholder?: string;
  changePrice?: (cryptoCurrency: CryptoCurrency) => Promise<void>;
}

/**
 * SelectInput
 */

export function SelectInput<ContentType>({
  control,
  name,
  data,
  rules = {},
  placeholder,
  changePrice,
}: ISelectInput<ContentType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange}}) => (
        <RNPickerSelect
          placeholder={{
            label: placeholder,
            value: '',
          }}
          value={value}
          onValueChange={e => {
            onChange(e);
            changePrice && changePrice(e);
          }}
          items={data}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
        />
      )}
    />
  );
}

/**
 * Styles
 */

const pickerSelectStyles = StyleSheet.create({
  inputIOSContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  inputIOS: {
    flex: 1,
    height: 30,
    paddingHorizontal: 5,
    fontSize: 15,
    color: 'black',
  },
  inputAndroidContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  inputAndroid: {
    flex: 1,
    height: 36,
    paddingBottom: 3,
    paddingHorizontal: 5,
    fontSize: 15,
    color: 'black',
  },
  placeholder: {
    fontSize: 15,
    color: 'black',
  },
});
