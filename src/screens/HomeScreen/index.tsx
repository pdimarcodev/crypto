import {FC, useState} from 'react';
import {Alert, Keyboard, Pressable, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useForm} from 'react-hook-form';

import {NavigationStackParamList} from '../../navigation/navigation';
import {FormInput} from '../../components/FormInput';
import {styles} from './styles';
import {Button} from '../../components/Button';
import {
  CryptoCurrency,
  Operation,
  OperationType,
  OrderType,
} from '../../interfaces';
import {SelectInput} from '../../components/SelectInput';
import {getOptions} from '../../helpers';
import {Spacer} from '../../components/Spacer';

/**
 * Types
 */

type HomeScreenProps = StackScreenProps<NavigationStackParamList, 'Home'>;

/**
 * Constants
 */

export const NUMERIC_REGEX = /\d/;

const DEFAULT_VALUES: Partial<Operation> = {
  cryptoCurrency: CryptoCurrency.BTC,
  orderType: OrderType.MARKET,
  amount: '',
};

const cryptoCurrencyOptions = getOptions(CryptoCurrency);

const orderTypeOptions = getOptions(OrderType);

const price = 20000;

/**
 * Home Screen
 */

const Home: FC<HomeScreenProps> = ({navigation: {navigate}}) => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,

    formState: {isDirty, isValid},
  } = useForm<Operation>({mode: 'onChange', defaultValues: DEFAULT_VALUES});

  const onConfirm = async (data: Partial<Operation>, type: OperationType) => {
    console.log({data});
    console.log(type);

    // setLoading(true);

    // try {
    // } catch (_) {
    //   setLoading(false);
    //   Alert.alert('Error', 'Something happened! Try again!');
    // }
  };

  return (
    <>
      <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
        <View style={styles.formWrapper}>
          <SelectInput
            name="cryptoCurrency"
            placeholder="Crypto currency"
            data={cryptoCurrencyOptions}
            control={control}
            rules={{required: true}}
          />
          <Spacer />
          <SelectInput
            name="orderType"
            placeholder="Order Type"
            data={orderTypeOptions}
            control={control}
            rules={{required: true}}
          />
          <Spacer />
          <Text>${price}</Text>
          <FormInput
            name="amount"
            placeholder="amount"
            control={control}
            keyboardType="number-pad"
            rules={{
              required: true,
              pattern: {
                value: NUMERIC_REGEX,
                message: 'Enter a number',
              },
            }}
          />
        </View>

        <Spacer />
        <Button
          accessibilityLabel="buy"
          title="buy"
          disabled={!isDirty || !isValid}
          loading={loading}
          onPress={handleSubmit(data => onConfirm(data, OperationType.BUY))}
        />
        <Spacer />
        <Button
          accessibilityLabel="sell"
          title="sell"
          disabled={!isDirty || !isValid}
          loading={loading}
          onPress={handleSubmit(data => onConfirm(data, OperationType.SELL))}
        />
      </Pressable>
    </>
  );
};

export default Home;
