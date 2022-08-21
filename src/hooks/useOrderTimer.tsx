import {useEffect, useRef, useState} from 'react';
// import {useAppStateEffect} from '@core/hooks';
import {useOrdersContext} from '../context/OrdersContext';

/**
 * Types
 */
interface CountdownTimerResult {
  timer: string;
  onTime: boolean;
  resetTimer: () => void;
}

/**
 * Constants
 */

const TIMER_INTERVAL_IN_MILISECONDS = 1000;
const TIME_TO_SECONDS_CONVERSION_FACTOR = 1000;
const PADDING_LENGTH = 2;

/**
 * Hooks
 */

export const useOrderTimer = (id: string) => {
  //   const [timeLeft, setTimeLeft] = useState<number>(10);
  //   const [backgroundTime, setBackgroundTime] = useState<number>(0);
  const {orders, setOrders} = useOrdersContext();
  const timer = useRef(setTimeout(() => {}, 0));

  //   const resetTimer = (): void => {
  //     setTimeLeft(seconds);
  //   };

  //   useAppStateEffect(status => {
  //     let diff;

  //     if (status === 'background') {
  //       setBackgroundTime(Date.now());
  //     }

  //     if (status === 'active' && backgroundTime) {
  //       diff = Math.round(
  //         (Date.now() - backgroundTime) / TIME_TO_SECONDS_CONVERSION_FACTOR,
  //       );
  //     }

  //     setTimeLeft(timeLeft - (diff || 0));
  //   });

  useEffect(() => {
    // if (timeLeft <= 0) {
    //   setTimeLeft(0);
    // }

    // if (!timeLeft) {
    //   return undefined;
    // }

    timer.current = setTimeout(() => {
      setOrders(orders.filter(order => order.id !== id));
    }, 10000);
  }, [id, orders, setOrders]);

  //   return {
  //     timer: timeLeft.toString().padStart(PADDING_LENGTH, '0'),
  //     onTime: !!timeLeft,
  //     resetTimer,
  //   };
};
