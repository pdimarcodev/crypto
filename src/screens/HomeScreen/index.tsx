import {FC, useEffect, useMemo, useState} from 'react';
import {Alert, Keyboard, Pressable, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useForm} from 'react-hook-form';

import {NavigationStackParamList} from '../../navigation/navigation';
import {useOrdersContext} from '../../context/OrdersContext';
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
import {generateUUID, getOptions, isBuyOperationType} from '../../helpers';
import {Spacer} from '../../components/Spacer';
import {RadioButton} from '../../components/RadioButton';
import dayjs from '../../helpers/dayjs';

/**
 * Types
 */

type HomeScreenProps = StackScreenProps<NavigationStackParamList, 'Home'>;

type OrderForm = Pick<Operation, 'cryptoCurrency' | 'orderType'> & {
  fiatAmount: string;
  cryptoAmount: string;
};

const DEFAULT_VALUES: OrderForm = {
  cryptoCurrency: CryptoCurrency.BTC,
  orderType: OrderType.MARKET,
  fiatAmount: '',
  cryptoAmount: '',
};

/**
 * Constants
 */

const ORDER_EXPIRATION_TIME = 60000;
const operationTypeOptions = getOptions(OperationType);
const cryptoCurrencyOptions = getOptions(CryptoCurrency);
const orderTypeOptions = getOptions(OrderType);

const price = 20000;

/**
 * Home Screen
 */

export const Home: FC<HomeScreenProps> = ({navigation: {navigate}}) => {
  const {orders, setOrders} = useOrdersContext();

  const [loading, setLoading] = useState(false);
  const [updateOrders, setUpdateOrders] = useState(false);
  const [operationType, setOperationType] = useState<OperationType>(
    OperationType.BUY,
  );
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: {isDirty, isValid},
  } = useForm<OrderForm>({mode: 'onChange', defaultValues: DEFAULT_VALUES});

  const isBuyOperation = useMemo(
    () => isBuyOperationType(operationType),
    [operationType],
  );

  const onConfirm = (
    {cryptoCurrency, orderType, fiatAmount, cryptoAmount}: OrderForm,
    type: OperationType,
  ) => {
    setLoading(true);
    const fiatAmountToNumber = Number(fiatAmount.replace(',', '.'));
    const cryptoAmountToNumber = Number(cryptoAmount.replace(',', '.'));

    const newOrder: Operation = {
      id: generateUUID(10),
      cryptoCurrency,
      orderType,
      fiatAmount: !isBuyOperation
        ? cryptoAmountToNumber * price
        : fiatAmountToNumber,
      price,
      type,
      createdAt: dayjs(),
      cryptoAmount: isBuyOperation
        ? fiatAmountToNumber / price
        : cryptoAmountToNumber,
    };

    if (orderType === OrderType.MARKET) {
      setLoading(false);
      return Alert.alert(
        isBuyOperation
          ? `You've got ${cryptoCurrency} ${newOrder.cryptoAmount}`
          : `You've got USD ${newOrder.fiatAmount}`,
      );
    }

    setOrders([...orders, newOrder]);
    reset({...getValues(), fiatAmount: '', cryptoAmount: ''});

    setTimeout(() => {
      setUpdateOrders(true);
    }, ORDER_EXPIRATION_TIME);

    Alert.alert('Limit order processed');
    setLoading(false);

    // setLoading(true);

    // try {
    // } catch (_) {
    //   setLoading(false);
    //   Alert.alert('Error', 'Something happened! Try again!');
    // }
  };

  const onSelectOperation = (value: OperationType) => {
    reset(DEFAULT_VALUES);
    setOperationType(value);
  };

  useEffect(() => {
    if (updateOrders) {
      const filteredOrders = orders.filter(
        order => dayjs().diff(order.createdAt, 'ms') < ORDER_EXPIRATION_TIME,
      );
      setOrders(filteredOrders);
      setUpdateOrders(false);
    }
  }, [orders, setOrders, updateOrders]);

  return (
    <>
      <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
        <Pressable onPress={() => navigate('OrderBook')}>
          <Text>Order Book</Text>
        </Pressable>
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
          {isBuyOperation ? (
            <FormInput
              name="fiatAmount"
              placeholder="amount in USD"
              control={control}
              keyboardType="numeric"
              rules={{
                required: true,
              }}
            />
          ) : (
            <FormInput
              name="cryptoAmount"
              placeholder="amount in Crypto"
              control={control}
              keyboardType="numeric"
              rules={{
                required: true,
              }}
            />
          )}
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
