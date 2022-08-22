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
import {
  generateUUID,
  getCryptoPrice,
  getOptions,
  isBuyOperationType,
} from '../../helpers';
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

/**
 * Home Screen
 */

export const Home: FC<HomeScreenProps> = ({navigation: {navigate}}) => {
  const {orders, setOrders} = useOrdersContext();
  const [price, setPrice] = useState(0);
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

  const changePrice = async (cryptoCurrency: CryptoCurrency) => {
    try {
      const newPrice = await getCryptoPrice(cryptoCurrency);
      setPrice(newPrice);
    } catch (_) {
      Alert.alert('Error', 'Something happened! Try again!');
    }
  };

  const onConfirm = ({
    cryptoCurrency,
    orderType,
    fiatAmount,
    cryptoAmount,
  }: OrderForm) => {
    setLoading(true);

    try {
      changePrice(cryptoCurrency);

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
        type: operationType,
        createdAt: dayjs(),
        cryptoAmount: isBuyOperation
          ? fiatAmountToNumber / price
          : cryptoAmountToNumber,
      };

      if (orderType === OrderType.MARKET) {
        setLoading(false);
        return Alert.alert(
          isBuyOperation
            ? `You've got ${cryptoCurrency} ${newOrder.cryptoAmount.toFixed(8)}`
            : `You've got USD ${newOrder.fiatAmount.toFixed(2)}`,
        );
      }

      setOrders([...orders, newOrder]);
      reset({...getValues(), fiatAmount: '', cryptoAmount: ''});

      setTimeout(() => {
        setUpdateOrders(true);
      }, ORDER_EXPIRATION_TIME);

      setLoading(false);

      Alert.alert('Limit order processed');
    } catch (_) {
      setLoading(false);
      Alert.alert('Error', 'Something happened! Try again!');
    }
  };

  const onSelectOperation = (value: OperationType) => {
    reset(DEFAULT_VALUES);
    setOperationType(value);
    changePrice(CryptoCurrency.BTC);
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

  useEffect(() => {
    changePrice(CryptoCurrency.BTC);
  }, []);

  return (
    <>
      <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
        <RadioButton
          data={operationTypeOptions}
          selectedValue={operationType}
          onSelect={onSelectOperation}
        />
        <View style={styles.formWrapper}>
          <SelectInput
            name="cryptoCurrency"
            placeholder="Crypto currency"
            data={cryptoCurrencyOptions}
            control={control}
            rules={{required: true}}
            changePrice={changePrice}
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
          <Spacer />
          <Text style={styles.price}>Price: USD {price}</Text>
          <Spacer />
          <Pressable onPress={() => navigate('OrderBook')}>
            <Text style={styles.orderBook}>{'Order Book >'}</Text>
          </Pressable>
        </View>
        <Spacer />
        <Button
          accessibilityLabel={isBuyOperation ? 'buy' : 'sell'}
          title={isBuyOperation ? 'buy' : 'sell'}
          disabled={!isDirty || !isValid}
          loading={loading}
          onPress={handleSubmit(onConfirm)}
        />
      </Pressable>
    </>
  );
};
