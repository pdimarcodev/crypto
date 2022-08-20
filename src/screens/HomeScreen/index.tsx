import {FC, useMemo, useState} from 'react';
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
import {getOptions, isBuyOperationType} from '../../helpers';
import {Spacer} from '../../components/Spacer';
import dayjs from '../../helpers/dayjs';
import {RadioButton} from '../../components/RadioButton';

/**
 * Types
 */

type HomeScreenProps = StackScreenProps<NavigationStackParamList, 'Home'>;

/**
 * Constants
 */

export const NUMERIC_REGEX = /\d/;

type OrderForm = Pick<Operation, 'cryptoCurrency' | 'orderType'> & {
  fiatAmount: string;
};

const DEFAULT_VALUES: OrderForm = {
  cryptoCurrency: CryptoCurrency.BTC,
  orderType: OrderType.MARKET,
  fiatAmount: '',
};

const operationTypeOptions = getOptions(OperationType);
const cryptoCurrencyOptions = getOptions(CryptoCurrency);
const orderTypeOptions = getOptions(OrderType);

const price = 20000;

/**
 * Home Screen
 */

const Home: FC<HomeScreenProps> = ({navigation: {navigate}}) => {
  const [loading, setLoading] = useState(false);
  const [operationType, setOperationType] = useState<OperationType>(
    OperationType.BUY,
  );
  const {
    control,
    handleSubmit,
    formState: {isDirty, isValid},
  } = useForm<OrderForm>({mode: 'onChange', defaultValues: DEFAULT_VALUES});

  const isBuyOperation = useMemo(
    () => isBuyOperationType(operationType),
    [operationType],
  );

  const onConfirm = async (
    {cryptoCurrency, orderType, fiatAmount}: OrderForm,
    type: OperationType,
  ) => {
    const fiatAmountToNumber = Number(fiatAmount);

    const cryptoAmount =
      type === OperationType.BUY
        ? fiatAmountToNumber / price
        : fiatAmountToNumber * price;

    const newOrder: Operation = {
      cryptoCurrency,
      orderType,
      fiatAmount: fiatAmountToNumber,
      price,
      type,
      createdAt: dayjs(),
      cryptoAmount,
    };

    console.log({newOrder});

    // setLoading(true);

    // try {
    // } catch (_) {
    //   setLoading(false);
    //   Alert.alert('Error', 'Something happened! Try again!');
    // }
  };

  const onSelectOperation = (value: OperationType) => {
    setOperationType(value);
  };

  return (
    <>
      <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
        <View style={styles.formWrapper}>
          <RadioButton
            data={operationTypeOptions}
            selectedValue={operationType}
            onSelect={onSelectOperation}
          />
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
            name="fiatAmount"
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
          accessibilityLabel={isBuyOperation ? 'buy' : 'sell'}
          title={isBuyOperation ? 'buy' : 'sell'}
          disabled={!isDirty || !isValid}
          loading={loading}
          onPress={handleSubmit(data => onConfirm(data, operationType))}
        />
      </Pressable>
    </>
  );
};

export default Home;
