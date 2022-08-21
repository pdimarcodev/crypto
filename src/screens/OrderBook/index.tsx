import {FC} from 'react';
import {View, Text, SectionList, SectionListRenderItem} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {NavigationStackParamList} from '../../navigation/navigation';
import {styles} from './styles';
import HeaderTitle from '../../components/HeaderTitle';
import {Operation, OperationType, Order, OrderBookType} from '../../interfaces';
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
  item,
}) => <Text>{item.createdAt.toString()}</Text>;

/**
 * OrderBook Screen
 */

export const OrderBook: FC<OrderBookScreenProps> = ({navigation: {goBack}}) => {
  const {orders, setOrders} = useOrdersContext();

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
        ListHeaderComponent={() => <HeaderTitle title="Order Book" />}
        // ListFooterComponent={() => (
        //   <HeaderTitle title={'Total of houses: ' + operations.length} />
        // )}
        sections={operations}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.createdAt.toString() + index}
        stickySectionHeadersEnabled
        renderSectionHeader={({section}) => (
          <View style={{backgroundColor: 'white'}}>
            <HeaderTitle title={section.operationType} />
          </View>
        )}
        // renderSectionFooter={({section}) => (
        //   <View style={{backgroundColor: 'white'}}>
        //     <HeaderTitle title={'Total: ' + section.data.length} />
        //   </View>
        // )}
        SectionSeparatorComponent={() => <Divider />}
        ItemSeparatorComponent={() => <Divider />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
