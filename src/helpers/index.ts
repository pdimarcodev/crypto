import {OperationType} from '../interfaces';

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
