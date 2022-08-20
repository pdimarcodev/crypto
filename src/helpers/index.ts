import {OperationType} from '../interfaces';

export const getOptions = (type: any) =>
  (Object.keys(type) as (keyof typeof type)[]).map(key => ({
    label: key,
    value: key,
  }));

export const isBuyOperationType = (operationType: OperationType): boolean =>
  operationType === OperationType.BUY;
