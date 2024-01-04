export enum SupportedCategory {
  None = "",
  Token = "1",
  NFT = "2",
}

export enum SupportedChainId {
  None = "",
  ETH = "1",
  BSC = "56",
  OPTIMISM = "10",
  CRONOS = "25",
  OKC = "66",
  GNOSIS = "100",
  HECO = "128",
  POLYGON = "137",
  FANTOM = "250",
  KCC = "321",
  ZKSYNC = "324",
  AVALANCHE = "43114",
  LINEA = "59144",
  TRON = "tron",
  OPBNB = "204",
  ARBITRUM = "42161",
  BASE = "8453",
}

export interface Dex {
  name: string;
  liquidity: string;
  pair: string;
}

export interface Holder {
  address: string;
  tag: string;
  is_contract: number;
  balance: string;
  percent: string;
  is_locked: number;
}

export interface LpHolder {
  address: string;
  tag: string;
  is_contract: number;
  balance: string;
  percent: string;
  is_locked: number;
  locked_detail?: LockedDetail[];
}

export interface LockedDetail {
  amount: string;
  end_time: string;
  opt_time: string;
}

export interface Supply {
  circulatingSupply: number;
  totalSupply: number;
  mcap: number;
  fdv: number;
  holders: number;
  transactions: number;
}

export interface Info {
  name: string;
  symbol: string;
  creationTime: string;
  creationBlock: number;
  decimals: number;
  socialInfo: SocialInfo;
}

export interface SocialInfo {
  bitbucket: string;
  discord: string;
  facebook: string;
  github: string;
  instagram: string;
  linkedin: string;
  medium: string;
  reddit: string;
  telegram: string;
  tiktok: string;
  twitter: string;
  website: string;
  youtube: string;
}

export interface Price {
  price: number;
  priceChain: number;
  variation5m: any;
  variationChain5m: any;
  price1h: number;
  priceChain1h: number;
  volume1h: number;
  buys1h: number;
  sells1h: number;
  sellVolume1h: number;
  buyVolume1h: number;
  variation1h: number;
  variationChain1h: number;
  price6h: number;
  priceChain6h: number;
  volume6h: number;
  buys6h: number;
  sells6h: number;
  sellVolume6h: number;
  buyVolume6h: number;
  variation6h: number;
  variationChain6h: number;
  price24h: number;
  priceChain24h: number;
  volume24h: number;
  buys24h: number;
  sells24h: number;
  sellVolume24h: number;
  buyVolume24h: number;
  variation24h: number;
  variationChain24h: number;
}

export interface GoPlusTokenResponse {
  anti_whale_modifiable: string;
  buy_tax: string;
  can_take_back_ownership: string;
  cannot_buy: string;
  cannot_sell_all: string;
  creator_address: string;
  creator_balance: string;
  creator_percent: string;
  dex: Dex[];
  external_call: string;
  hidden_owner: string;
  holder_count: string;
  holders: Holder[];
  honeypot_with_same_creator: string;
  is_anti_whale: string;
  is_blacklisted: string;
  is_honeypot: string;
  is_in_dex: string;
  is_mintable: string;
  is_open_source: string;
  is_proxy: string;
  is_whitelisted: string;
  lp_holder_count: string;
  lp_holders: LpHolder[];
  lp_total_supply: string;
  owner_address: string;
  owner_balance: string;
  owner_change_balance: string;
  owner_percent: string;
  personal_slippage_modifiable: string;
  selfdestruct: string;
  sell_tax: string;
  slippage_modifiable: string;
  token_name: string;
  token_symbol: string;
  total_supply: string;
  trading_cooldown: string;
  transfer_pausable: string;
}

export interface DexToolsTokenResponse {
  statusCode: number;
  data: Info;
}

export interface DexToolsPoolPriceResponse {
  statusCode: number;
  data: Price;
}

export interface DexToolsTokenInfoResponse {
  statusCode: number;
  data: Supply;
}
