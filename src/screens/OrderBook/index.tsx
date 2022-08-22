import {FC} from 'react';
import {View, Text, SectionList, SectionListRenderItem} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {NavigationStackParamList} from '../../navigation/navigation';
import {styles} from './styles';
import HeaderTitle from '../../components/HeaderTitle';
import {Operation, OperationType, OrderBookType} from '../../interfaces';
import {useOrdersContext} from '../../context/OrdersContext';
import {Divider} from '../../components/Divider';

/**
 * Types
 */

type OrderBookScreenProps = StackScreenProps<
  NavigationStackParamList,
  'OrderBook'
>;

const renderItem: SectionListRenderItem<Operation, OrderBookType> = ({
  item: {createdAt, cryptoCurrency, cryptoAmount, fiatAmount},
}) => {
  return (
    <Text>
      <Text>{createdAt.format('HH:mm:ss')} </Text>
      <Text>{cryptoCurrency}=</Text>
      <Text>{cryptoAmount.toFixed(8)} </Text>
      <Text>USD={fiatAmount.toFixed(2)}</Text>
    </Text>
  );
};

/**
 * OrderBook Screen
 */

export const OrderBook: FC<OrderBookScreenProps> = () => {
  const {orders} = useOrdersContext();

  const operations: OrderBookType[] = [
    {
      operationType: OperationType.BUY,
      data: orders.filter(order => order.type === OperationType.BUY),
    },
    {
      operationType: OperationType.SELL,
      data: orders.filter(order => order.type === OperationType.SELL),
    },
  ];

  return (
    <View style={styles.container}>
      <SectionList
        ListHeaderComponent={() => <HeaderTitle title="ORDER BOOK" />}
        sections={operations}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.createdAt.toString() + index}
        stickySectionHeadersEnabled
        renderSectionHeader={({section}) => (
          <View style={{backgroundColor: 'white'}}>
            <HeaderTitle title={section.operationType} />
          </View>
        )}
        SectionSeparatorComponent={() => <Divider />}
        ItemSeparatorComponent={() => <Divider />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
