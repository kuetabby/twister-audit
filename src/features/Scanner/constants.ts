import EthLogo from "@/assets/logo-ethereum.png";
import ArbitrumLogo from "@/assets/logo-arbitrum.png";
import BscLogo from "@/assets/logo-bnb.webp";
import BaseLogo from "@/assets/logo-base.png";
import AvalancheLogo from "@/assets/logo-avalanche.webp";
// import CronosLogo from "@/assets/logo-cronos.png";
import FantomLogo from "@/assets/logo-fantom.png";
// import GnosisLogo from "@/assets/logo-gnosis.png";
// import HecoLogo from "@/assets/logo-heco.png";
// import KucoinLogo from "@/assets/logo-kucoin.png";
// import LineaLogo from "@/assets/logo-linea.png";
// import OkcLogo from "@/assets/logo-okc.png";
import PolygonLogo from "@/assets/logo-polygon.png";
import OptimismLogo from "@/assets/logo-optimism.webp";
// import UltronLogo from "@/assets/logo-ultron.png";
// import zkSyncLogo from "@/assets/logo-zksync.png";

import { SupportedChainId } from "./models";

export const ChainInfo = {
  [SupportedChainId.ETH]: {
    label: "Ethereum",
    code: "ETH",
    logo: EthLogo,
    explorer: "https://etherscan.io",
    dexs: "ethereum",
    dexv: "eth",
    dext: "ether",
    dexapi: "ether",
  },
  [SupportedChainId.ARBITRUM]: {
    label: "Arbitrum",
    code: "ARB",
    logo: ArbitrumLogo,
    explorer: "https://arbiscan.io",
    dexs: "arbitrum",
    dexv: "arbitrum",
    dext: "arbitrum",
    dexapi: "arbitrum",
  },
  [SupportedChainId.BASE]: {
    label: "Base",
    code: "BASE",
    logo: BaseLogo,
    explorer: "https://basescan.org",
    dexs: "base",
    dexv: "",
    dext: "base",
    dexapi: "base",
  },
  [SupportedChainId.BSC]: {
    label: "Binance Smart Chain",
    code: "BSC",
    logo: BscLogo,
    explorer: "https://bscscan.io",
    dexs: "bsc",
    dexv: "bsc",
    dext: "bnb",
    dexapi: "bsc",
  },
  [SupportedChainId.AVALANCHE]: {
    label: "Avalanche",
    code: "AVAX",
    logo: AvalancheLogo,
    explorer: "https://avascan.info",
    dexs: "avalanche",
    dexv: "",
    dext: "avalanche",
    dexapi: "avalanche",
  },
  // [SupportedChainId.OKC]: {
  //   label: "Okc",
  //   code: "OKT",
  //   logo: OkcLogo,
  //   explorer: "https://www.oklink.com/en/okc",
  //   dexs: "okc",
  //   dexv: "",
  //   dext: "okc",
  // },
  // [SupportedChainId.CRONOS]: {
  //   label: "Cronos",
  //   code: "CRO",
  //   logo: OkcLogo,
  //   explorer: "https://cronoscan.com",
  //   dexs: "cronos",
  //   dexv: "",
  //   dext: "cronos",
  // },
  // [SupportedChainId.GNOSIS]: {
  //   label: "Gnosis",
  //   code: "XDAI",
  //   logo: GnosisLogo,
  //   explorer: "https://gnosisscan.io",
  //   dexs: "gnosischain",
  //   dexv: "",
  //   dext: "gnosis",
  // },
  // [SupportedChainId.HECO]: {
  //   label: "Heco",
  //   code: "HT",
  //   logo: HecoLogo,
  //   explorer: "https://hecoscan.io",
  //   dexs: "heco",
  //   dexv: "",
  //   dext: "heco",
  // },
  [SupportedChainId.POLYGON]: {
    label: "Polygon",
    code: "MATIC",
    logo: PolygonLogo,
    explorer: "https://polygonscan.com",
    dexs: "polygon",
    dexv: "",
    dext: "polygon",
    dexapi: "polygon",
  },
  [SupportedChainId.FANTOM]: {
    label: "Fantom",
    code: "FTM",
    logo: FantomLogo,
    explorer: "https://ftmscan.com",
    dexs: "fantom",
    dexv: "",
    dext: "fantom",
    dexapi: "fantom",
  },
  // [SupportedChainId.KCC]: {
  //   label: "Kcc",
  //   code: "KCC",
  //   logo: KucoinLogo,
  //   explorer: "https://explorer.kcc.io",
  //   dexs: "kcc",
  //   dexv: "",
  //   dext: "kucoin",
  // },
  // [SupportedChainId.ZKSYNC]: {
  //   label: "zkSync",
  //   code: "USDC",
  //   logo: zkSyncLogo,
  //   explorer: "https://explorer.zksync.io",
  //   dexs: "zksync",
  //   dexv: "",
  //   dext: "zksync",
  // },
  // [SupportedChainId.LINEA]: {
  //   label: "Linea",
  //   code: "LEET",
  //   logo: LineaLogo,
  //   explorer: "https://lineascan.build",
  //   dexs: "linea",
  //   dexv: "",
  //   dext: "linea",
  // },
  // [SupportedChainId.TRON]: {
  //   label: "Tron",
  //   code: "ULX",
  //   logo: UltronLogo,
  //   explorer: "https://ulxscan.com",
  //   dexs: "",
  //   dexv: "",
  //   dext: "tron",
  // },
  [SupportedChainId.OPTIMISM]: {
    label: "Optimism",
    code: "OPTIMISM",
    logo: OptimismLogo,
    explorer: "https://optimistic.etherscan.io",
    dexs: "optimism",
    dexv: "",
    dext: "optimism",
    dexapi: "optimism",
  },
  // [SupportedChainId.OPBNB]: {
  //   label: "opBNB",
  //   code: "0101",
  //   logo: BscLogo,
  //   explorer: "https://opbnbscan.com",
  //   dexs: "",
  //   dexv: "",
  //   dext: "opbnb",
  // },
};

export const ChainList = [
  {
    chainId: SupportedChainId.ETH,
    label: "Ethereum",
    code: "ETH",
    logo: EthLogo,
  },
  {
    chainId: SupportedChainId.BSC,
    label: "Binance Smart Chain",
    code: "BSC",
    logo: BscLogo,
  },
  {
    chainId: SupportedChainId.ARBITRUM,
    label: "Arbitrum",
    code: "ARB",
    logo: ArbitrumLogo,
  },
  {
    chainId: SupportedChainId.BASE,
    label: "Base",
    code: "BASE",
    logo: BaseLogo,
  },
  {
    chainId: SupportedChainId.AVALANCHE,
    label: "Avalanche",
    code: "AVAX",
    logo: AvalancheLogo,
  },
  // {
  //   chainId: SupportedChainId.OKC,
  //   label: "Okc",
  //   code: "OKT",
  //   logo: OkcLogo,
  // },
  // {
  //   chainId: SupportedChainId.CRONOS,
  //   label: "Cronos",
  //   code: "CRO",
  //   logo: CronosLogo,
  // },
  // {
  //   chainId: SupportedChainId.GNOSIS,
  //   label: "Gnosis",
  //   code: "XDAI",
  //   logo: GnosisLogo,
  // },
  // {
  //   chainId: SupportedChainId.HECO,
  //   label: "Heco",
  //   code: "HT",
  //   logo: HecoLogo,
  // },
  {
    chainId: SupportedChainId.POLYGON,
    label: "Polygon",
    code: "MATIC",
    logo: PolygonLogo,
  },
  {
    chainId: SupportedChainId.FANTOM,
    label: "Fantom",
    code: "FTM",
    logo: FantomLogo,
  },
  // {
  //   chainId: SupportedChainId.KCC,
  //   label: "Kcc",
  //   code: "KCC",
  //   logo: KucoinLogo,
  // },
  // {
  //   chainId: SupportedChainId.ZKSYNC,
  //   label: "zkSync",
  //   code: "USDC",
  //   logo: zkSyncLogo,
  // },
  // {
  //   chainId: SupportedChainId.LINEA,
  //   label: "Linea",
  //   code: "LEET",
  //   logo: LineaLogo,
  // },
  // {
  //   chainId: SupportedChainId.TRON,
  //   label: "Tron",
  //   code: "ULX",
  //   logo: UltronLogo,
  // },
  // {
  //   chainId: SupportedChainId.OPBNB,
  //   label: "opBNB",
  //   code: "0101",
  //   logo: BscLogo,
  // },
  {
    chainId: SupportedChainId.OPTIMISM,
    label: "Optimism",
    code: "OPTIMISM",
    logo: OptimismLogo,
  },
];
