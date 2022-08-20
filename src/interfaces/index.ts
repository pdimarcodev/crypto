export enum OperationType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum CryptoCurrency {
  BTC = 'BTC',
  ETH = 'ETH',
  USDC = 'USDC',
}

export enum OrderType {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET',
}

export interface Operation {
  type: OperationType;
  cryptoCurrency: CryptoCurrency;
  orderType: OrderType;
  amount: string;
  price: number;
}
