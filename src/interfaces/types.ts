export interface Overall {
    count_total: number;
    pnl_perc: number;
    total_current_value: number;
    total_investment: number;
    total_pl: number;
  }
  
  export interface Holding {
    costPrice: number;
    id: number;
    fyToken: string;
    symbol: string;
    isin: string;
    quantity: number;
    exchange: number;
    segment: number;
    qty_t1: number;
    remainingQuantity: number;
    collateralQuantity: number;
    remainingPledgeQuantity: number;
    pl: number;
    ltp: number;
    marketVal: number;
    holdingType: string;
  }
  
  export interface ResponseData {
    code: number;
    message: string;
    s: string;
    overall: Overall;
    holdings: Holding[];
  }
  