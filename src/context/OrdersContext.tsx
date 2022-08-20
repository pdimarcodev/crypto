import {
  createContext,
  Dispatch,
  ReactNode,
  useState,
  SetStateAction,
  useContext,
} from 'react';
import {Operation} from '../interfaces';

type OrdersContextType = {
  orders: Operation[];
  setOrders: Dispatch<SetStateAction<Operation[]>>;
};

const OrdersContext = createContext<OrdersContextType>({
  orders: [],
  setOrders: () => {},
});

const OrdersContextProvider = ({children}: {children: ReactNode}) => {
  const [orders, setOrders] = useState<Operation[]>([]);

  return (
    <OrdersContext.Provider value={{orders, setOrders}}>
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersContextProvider;
export const useOrdersContext = () => useContext(OrdersContext);
