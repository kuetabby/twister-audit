import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "react-query";
import { CopyOutlined } from "@ant-design/icons";
import {
  Card,
  CardHeader,
  CardBody,
  List,
  ListItem,
  Divider,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  CardFooter,
} from "@chakra-ui/react";

import { InformationTable } from "./InformationTable";
import { InformationOverview } from "./InformationOverview";

import { useCopyText } from "@/hooks/useCopyText";

import { shortenAddress } from "@/utils/address";
import { ChainInfo } from "./constants";

import {
  DexToolsTokenResponse,
  DexToolsTokenInfoResponse,
  GoPlusTokenResponse,
  SupportedChainId,
  DexToolsPoolPriceResponse,
} from "./models";
import { InformationToken } from "./InformationToken";
import { InformationTrade } from "./InformationTrade";

interface Props {
  scanResponse: GoPlusTokenResponse;
  chainId: SupportedChainId;
  contractAddress: string;
  scanRefetch: () => void;
  onReset: () => void;
}

export const Information: React.FC<Props> = ({
  scanResponse,
  chainId,
  contractAddress,
  scanRefetch,
  onReset,
}) => {
  const {
    token_name,
    token_symbol,
    total_supply,
    owner_address,
    creator_address,
    is_honeypot,
    buy_tax,
    sell_tax,
    holders,
    dex,
    holder_count,
  } = scanResponse;
  const [copyContent] = useCopyText();
  const toast = useToast();

  const info = ChainInfo[chainId as keyof typeof ChainInfo];
  const isEmptyResponse = Object.keys(scanResponse).length === 0;

  const { data: poolPriceResponse, isFetching: isPoolPriceLoading } = useQuery<
    DexToolsPoolPriceResponse,
    {}
  >(
    [chainId, contractAddress, dex, "pool price"],
    async () => {
      const request = await axios.get(`/api/pool/price`, {
        params: {
          chain: info.dexapi,
          poolAddress: dex[0].pair,
        },
      });
      const response = await request.data;
      // console.log(response, "response");
      return response;
    },
    {
      onError: (error: any) => {
        if (error.response) {
          toast({
            title:
              error.response?.data?.description ??
              `Something went wrong! Please try Again`,
            status: "error",
          });

          return error.response?.data?.description;
        }
        toast({
          title: error.message ?? `Something went wrong! Please try Again`,
          status: "error",
        });

        return error.message;
      },
      enabled: !!chainId && !isEmptyResponse && !!Boolean(dex?.length),
      refetchOnWindowFocus: false,
    }
  );

  // console.log(poolPriceResponse, "poolPriceResponse");

  const { data: tokenInfoResponse, isFetching: isTokenInfoLoading } = useQuery<
    DexToolsTokenInfoResponse,
    {}
  >(
    [chainId, contractAddress, "info"],
    async () => {
      const request = await axios.get(`/api/token/info`, {
        params: {
          chain: info.dexapi,
          contractAddress,
        },
      });
      const response = await request.data;
      // console.log(response, "response");
      return response;
    },
    {
      onError: (error: any) => {
        if (error.response) {
          toast({
            title:
              error.response?.data?.description ??
              `Something went wrong! Please try Again`,
            status: "error",
          });

          return error.response?.data?.description;
        }
        toast({
          title: error.message ?? `Something went wrong! Please try Again`,
          status: "error",
        });

        return error.message;
      },
      enabled: !!chainId && !isEmptyResponse,
      refetchOnWindowFocus: false,
    }
  );

  const { data: tokenResponse, isFetching: isTokenLoading } = useQuery<
    DexToolsTokenResponse,
    {}
  >(
    [chainId, contractAddress, "token"],
    async () => {
      const request = await axios.get(`/api/token`, {
        params: {
          chain: info.dexapi,
          contractAddress,
        },
      });
      const response = await request.data;
      // console.log(response, "response");
      return response;
    },
    {
      onError: (error: any) => {
        if (error.response) {
          toast({
            title:
              error.response?.data?.description ??
              `Something went wrong! Please try Again`,
            status: "error",
          });

          return error.response?.data?.description;
        }
        toast({
          title: error.message ?? `Something went wrong! Please try Again`,
          status: "error",
        });

        return error.message;
      },
      enabled:
        !!chainId && !isEmptyResponse && !!tokenInfoResponse?.data?.totalSupply,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="w-full lg:w-[90%] mx-auto mt-10 relative">
      <div className="text-xl sm:text-2xl font-extrabold text-white mb-4 mx-auto sm:mx-0">
        Here's your audit result!
      </div>
      <div className="w-full flex flex-wrap justify-between mb-3">
        <div className="flex items-center">
          <Image src={info.logo} alt={info.label} className="w-8 h-8" />
          <div className="ml-2 font-semibold text-xl">
            CA : {contractAddress ? shortenAddress(contractAddress) : "-"}
            <CopyOutlined
              className="ml-2 cursor-pointer hover:text-secondary"
              onClick={() => copyContent(contractAddress)}
            />
          </div>
        </div>
        <div className="w-full sm:w-60 flex flex-wrap justify-around sm:justify-between mx-auto sm:mx-0 mt-4 sm:mt-0">
          <Button
            className={`w-5/12 sm:w-[45%] h-8 text-white`}
            onClick={scanRefetch}
            colorScheme="blue"
          >
            Refresh
          </Button>
          <Button
            colorScheme="whiteAlpha"
            className="w-5/12 sm:w-[45%] h-8"
            onClick={onReset}
          >
            Audit
          </Button>
        </div>
      </div>

      {isEmptyResponse ? (
        <Alert status="error" className="mt-4 rounded-xl">
          <AlertIcon />
          <AlertTitle className="text-red-500 font-bold">ERROR!</AlertTitle>
          <AlertDescription className="text-red-500">
            Did you choose the right chain? You scanned this contract on{" "}
            {info.code}.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="w-full flex flex-wrap justify-between relative">
          <div className="w-full h-full sm:w-1/2 mt-4 sm:mt-0">
            <InformationToken
              chainId={chainId}
              contractAddress={contractAddress}
              dex={dex}
              creator_address={creator_address}
              owner_address={owner_address}
              token_name={token_name}
              token_symbol={token_symbol}
              total_supply={total_supply}
              is_honeypot={is_honeypot}
              buy_tax={buy_tax}
              sell_tax={sell_tax}
              decimals={tokenResponse?.data?.decimals}
              poolPriceResponse={poolPriceResponse}
            />

            <InformationTable
              chainExplorer={info.explorer}
              dex={dex}
              holders={holders}
              holder_count={holder_count}
              extraClass="hidden sm:block"
            />
          </div>
          <div className="w-full h-full sm:w-[47.5%] mt-4 sm:mt-0">
            <InformationTrade
              chainId={chainId}
              dex={dex}
              poolPriceResponse={poolPriceResponse}
              tokenInfoResponse={tokenInfoResponse}
            />
            <InformationOverview scanResponse={scanResponse} />
            <InformationTable
              chainExplorer={info.explorer}
              dex={dex}
              holders={holders}
              holder_count={holder_count}
              extraClass="block sm:hidden"
            />
            {/* {!!info.dexs && (
              <div className="w-full h-screen mt-4">
                <iframe
                  className="h-full w-full rounded-lg border border-[#131313] z-10"
                  src={`https://dexscreener.com/${info.dexs}/${contractAddress}`}
                ></iframe>
              </div>
            )} */}
          </div>
          {/* <div className="mt-6 mb-3 relative mx-auto w-full sm:w-1/3 px-2 sm:px-0">
            <Image src={GoPlusLogo} alt="go+" className="object-contain" />
          </div> */}
        </div>
      )}
    </div>
  );
};
