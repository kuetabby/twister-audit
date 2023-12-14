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
} from "./models";

interface Props {
  scanResponse: GoPlusTokenResponse;
  chainId: SupportedChainId;
  contractAddress: string;
  scanRefetch: () => void;
  onReset: () => void;
}

const urls = {
  dexScreener: "https://dexscreener.com",
  dexView: "https://www.dexview.com",
  dexTools: "https://www.dextools.io/app/en",
};

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

  const { data: tokenInfoResponse, isFetching: isTokenInfoLoading } = useQuery<
    DexToolsTokenInfoResponse,
    {}
  >(
    [chainId, contractAddress, "info"],
    async () => {
      const request = await axios.get(`/api/token/info`, {
        params: {
          chain: info.dext,
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
          chain: info.dext,
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

  const tax = {
    buy: buy_tax ? Number(buy_tax) * 100 : "-",
    sell: sell_tax ? Number(sell_tax) * 100 : "-",
  };

  return (
    <div className="w-full lg:w-[85%] mx-auto mt-10 relative">
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
            className={`w-5/12 sm:w-[45%] h-8 text-white disabled:bg-light-purple`}
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
            <Card className="w-full h-full bg-dark-secondary rounded-lg text-white">
              <CardHeader className="pb-0 font-semibold text-xl">
                Project
              </CardHeader>
              <CardBody>
                <div className="w-full flex flex-wrap justify-between items-center mb-4">
                  <div className="w-full md:w-3/5">
                    <div className="w-full flex font-semibold">
                      <div
                        className="py-1 px-3 bg-gray-300 font-bold rounded-lg my-auto text-black"
                        style={{ fontSize: "1.5em" }}
                      >
                        {token_name ? token_name[0] : "-"}
                      </div>
                      <div className="ml-3 flex flex-col">
                        <div>{token_name?.toUpperCase() ?? "-"}</div>
                        <div>{token_symbol?.toUpperCase() ?? "-"}</div>
                      </div>
                    </div>
                    <List spacing={2} className="mt-3">
                      <ListItem className="w-full flex justify-between">
                        <div className="w-1/3 sm:w-2/5">Creator</div>
                        <Link
                          href={`${info.explorer}/${
                            chainId === SupportedChainId.AVALANCHE
                              ? "blockchain/all/address"
                              : "address"
                          }/${creator_address ?? "-"}`}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="w-3/5 sm:w-[55%] text-right text-blue-500 underline underline-offset-4"
                        >
                          {creator_address
                            ? shortenAddress(creator_address, 3)
                            : "unknown"}
                        </Link>
                      </ListItem>
                      <ListItem className="w-full flex justify-between">
                        <div className="w-1/3 sm:w-2/5">Owner</div>
                        <Link
                          href={`${info.explorer}/${
                            chainId === SupportedChainId.AVALANCHE
                              ? "blockchain/all/address"
                              : "address"
                          }/${owner_address ?? "-"}`}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="w-3/5 sm:w-[55%] text-right text-blue-500 underline underline-offset-4"
                        >
                          {owner_address
                            ? shortenAddress(owner_address, 3)
                            : "unknown"}
                        </Link>
                      </ListItem>
                      <ListItem className="w-full flex justify-between">
                        <div className="w-1/3 sm:w-2/5">Explorer</div>
                        <Link
                          href={`${info.explorer}/${
                            chainId === SupportedChainId.AVALANCHE
                              ? "blockchain/c/address"
                              : "token"
                          }/${contractAddress ?? "-"}`}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="w-3/5 sm:w-[55%] text-right text-blue-500 underline underline-offset-4"
                        >
                          {contractAddress
                            ? shortenAddress(contractAddress, 3)
                            : "unknown"}
                        </Link>
                      </ListItem>

                      {dex && Boolean(dex.length) && (
                        <ListItem className="w-full flex justify-between">
                          <div className="w-1/3 sm:w-2/5">Pair</div>
                          <Link
                            // href={`${urls.dexTools}/${info.dext}/pair-explorer/${dex[0].pair}`}
                            href={`${info.explorer}/${
                              chainId === SupportedChainId.AVALANCHE
                                ? "blockchain/c/address"
                                : "address"
                            }/${dex[0].pair}`}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="w-3/5 sm:w-[55%] text-right text-blue-500 underline underline-offset-4"
                          >
                            {shortenAddress(dex[0].pair, 3)}
                          </Link>
                        </ListItem>
                      )}
                    </List>
                  </div>

                  <Divider
                    orientation="vertical"
                    className="hidden md:block h-48 border border-white"
                  />

                  <List className="w-full md:w-[35%] mt-4 md:mt-0" spacing={2}>
                    <ListItem className="w-full flex flex-col">
                      <div className="w-full">Token Decimals</div>
                      <div className="w-full">
                        {tokenResponse?.data?.decimals
                          ? Number(
                              tokenResponse?.data?.decimals
                            ).toLocaleString("en-US")
                          : "-"}
                      </div>
                    </ListItem>

                    <ListItem className="w-full flex flex-col">
                      <div className="w-full">Total Supply</div>
                      <div className="w-full">
                        {total_supply
                          ? Number(total_supply).toLocaleString("en-US")
                          : "-"}
                      </div>
                    </ListItem>

                    <ListItem className="w-full flex flex-col">
                      <div className="w-full">Circulating Supply</div>
                      <div className="w-full">
                        {tokenInfoResponse?.data?.circulatingSupply
                          ? Number(
                              tokenInfoResponse?.data?.circulatingSupply
                            ).toLocaleString("en-US")
                          : "-"}
                      </div>
                    </ListItem>
                  </List>
                </div>

                <List spacing={3}>
                  <ListItem className="w-full flex justify-between">
                    <div className="w-1/3 sm:w-2/5">Honeypot Test</div>
                    <div className="w-3/5 sm:w-[55%] text-right font-bold">
                      {Number(is_honeypot) === 0 ? (
                        <span className="text-green-500">PASSED</span>
                      ) : (
                        <span className="text-red-500">FAILED</span>
                      )}
                    </div>
                  </ListItem>

                  <ListItem className="w-full flex justify-between">
                    <div className="w-1/3 sm:w-2/5">Market Cap</div>
                    <div className="w-3/5 sm:w-[55%] text-right font-bold">
                      {tokenInfoResponse?.data?.mcap
                        ? `$ ${Number(
                            tokenInfoResponse?.data?.mcap.toFixed(2)
                          ).toLocaleString("en-US")}`
                        : "-"}
                    </div>
                  </ListItem>

                  <ListItem className="w-full flex justify-between">
                    <div className="w-1/3 sm:w-2/5">Transactions</div>
                    <div className="w-3/5 sm:w-[55%] text-right font-bold">
                      {tokenInfoResponse?.data?.transactions
                        ? Number(
                            tokenInfoResponse?.data?.transactions
                          ).toLocaleString("en-US")
                        : "-"}
                    </div>
                  </ListItem>
                </List>
                <Divider className="my-4" />
                <div className="w-full flex flex-wrap">
                  <div>
                    Buy Tax :
                    <span
                      className={`ml-1 font-semibold ${
                        typeof tax.buy === "number" && tax.buy > 10
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {!!buy_tax ? (Number(buy_tax) * 100).toFixed(1) : "-"}%
                    </span>
                  </div>
                  <span className="mx-2 text-base">/</span>
                  <div>
                    Sell Tax :
                    <span
                      className={`ml-1 font-semibold ${
                        typeof tax.sell === "number" && tax.sell > 10
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {!!sell_tax ? (Number(sell_tax) * 100).toFixed(1) : "-"}%
                    </span>
                  </div>
                  <div className="mt-2">
                    More than 10% is considered a high tax rate, and anything
                    beyond 50% tax rate means it may not be tradable.
                  </div>
                </div>
              </CardBody>
              <CardFooter className="w-full pt-0">
                <div className="w-full flex flex-wrap justify-center mx-auto">
                  {dex && Boolean(dex.length) && (
                    <Link
                      href={`${urls.dexTools}/${info.dext}/pair-explorer/${dex[0].pair}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-base xs:text-lg text-blue-500 underline underline-offset-4"
                    >
                      DexTools
                    </Link>
                  )}

                  {Boolean(info.dexs) && (
                    <Link
                      href={`${urls.dexScreener}/${info.dexs}/${contractAddress}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-base xs:text-lg text-blue-500 underline underline-offset-4 mx-2 xl:mx-4"
                    >
                      DexScreener
                    </Link>
                  )}

                  {Boolean(info.dexv) && (
                    <Link
                      href={`${urls.dexView}/${info.dexv}/${contractAddress}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-base xs:text-lg text-blue-500 underline underline-offset-4"
                    >
                      DexView
                    </Link>
                  )}
                </div>
              </CardFooter>
            </Card>

            <InformationTable
              chainExplorer={info.explorer}
              dex={dex}
              holders={holders}
              holder_count={holder_count}
              extraClass="hidden sm:block"
            />
          </div>
          <div className="w-full h-full sm:w-[47.5%] mt-4 sm:mt-0">
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
