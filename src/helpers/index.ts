import axios from 'axios';
import {CryptoCurrency, OperationType} from '../interfaces';

const TICKER_PRICE_URL = 'https://api.binance.com/api/v3/ticker/price?symbol=';

export const getOptions = (type: any) =>
  (Object.keys(type) as (keyof typeof type)[]).map(key => ({
    label: key,
    value: key,
  }));

export const isBuyOperationType = (operationType: OperationType): boolean =>
  operationType === OperationType.BUY;

export function generateUUID(digits: number) {
  let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
  let uuid = [];
  for (let i = 0; i < digits; i++) {
    uuid.push(str[Math.floor(Math.random() * str.length)]);
  }
  return uuid.join('');
}

export const getCryptoPrice = async (cryptoCurrency: CryptoCurrency) => {
  const symbol = `${cryptoCurrency}USDT`;

  const response = await axios.get(`${TICKER_PRICE_URL}${symbol}`);
  return Number(response.data.price);
};
