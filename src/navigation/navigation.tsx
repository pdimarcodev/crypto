import {createStackNavigator} from '@react-navigation/stack';
import {Header} from '../components/Header';
import {Home} from '../screens/HomeScreen';
import {OrderBook} from '../screens/OrderBook';

/**
 * Types
 */

export type NavigationStackParamList = {
  Home: undefined;
  OrderBook: undefined;
};

const Stack = createStackNavigator();

/**
 * Navigator
 */

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
      initialRouteName="Home">
      <Stack.Group
        screenOptions={{
          headerMode: 'screen',
          header: () => <Header />,
        }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          title: '',
          headerShown: true,
          headerShadowVisible: false,
        }}>
        <Stack.Screen name="OrderBook" component={OrderBook} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
