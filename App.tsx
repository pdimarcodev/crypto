import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './src/navigation/navigation';
import OrdersContextProvider from './src/context/OrdersContext';

const App = () => {
  return (
    <OrdersContextProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </OrdersContextProvider>
  );
};

export default App;
