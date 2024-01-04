import Link from "next/link";
import {
  Card,
  CardHeader,
  CardBody,
  List,
  ListItem,
  Divider,
  CardFooter,
} from "@chakra-ui/react";

import { shortenAddress } from "@/utils/address";

import { ChainInfo } from "./constants";

import { DexToolsPoolPriceResponse, SupportedChainId } from "./models";

interface Props {
  token_name?: string;
  token_symbol?: string;
  creator_address?: string;
  owner_address?: string;
  contractAddress: string;
  total_supply?: string;
  is_honeypot?: string;
  buy_tax?: string;
  sell_tax?: string;
  decimals?: number;
  dex: any;
  chainId: string;
  poolPriceResponse?: DexToolsPoolPriceResponse;
}

const urls = {
  dexScreener: "https://dexscreener.com",
  dexView: "https://www.dexview.com",
  dexTools: "https://www.dextools.io/app/en",
};

export const InformationToken: React.FC<Props> = ({
  token_name,
  token_symbol,
  chainId,
  creator_address,
  owner_address,
  contractAddress,
  is_honeypot,
  buy_tax,
  sell_tax,
  dex,
  decimals,
  total_supply,
  poolPriceResponse,
}) => {
  const info = ChainInfo[chainId as keyof typeof ChainInfo];

  const poolPrice = poolPriceResponse?.data;

  const tax = {
    buy: buy_tax ? Number(buy_tax) * 100 : "-",
    sell: sell_tax ? Number(sell_tax) * 100 : "-",
  };

  // console.log(
  //   Math.abs(+Number(poolPrice?.price).toFixed(decimals)),
  //   "Number(poolPrice?.price).toFixed(decimals)"
  // );

  return (
    <Card className="w-full h-full bg-dark-secondary rounded-lg text-white shadow-sunny">
      <CardHeader className="pb-0 font-semibold text-xl">Project</CardHeader>
      <CardBody>
        <div className="w-full flex flex-wrap justify-between mb-4">
          <div className="w-full lg:w-1/2">
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
                  {owner_address ? shortenAddress(owner_address, 3) : "unknown"}
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
            </List>
          </div>

          <Divider
            orientation="vertical"
            className="hidden lg:block h-56 border border-white"
          />
          <List className="w-full lg:w-[45%] mt-4 lg:mt-0" spacing={2}>
            <ListItem className="w-full flex flex-col">
              <div className="w-full">Honeypot Test</div>
              <div className="w-full font-bold ">
                {Number(is_honeypot) === 0 ? (
                  <span className="text-green-500">PASSED</span>
                ) : (
                  <span className="text-red-500">FAILED</span>
                )}
              </div>
            </ListItem>

            <ListItem className="w-full flex flex-col">
              <div className="w-full">Tax</div>
              <div className="w-full flex mt-1">
                <div className="border border-white rounded-lg p-1 mr-2">
                  <span
                    className={`mr-1 font-semibold ${
                      typeof tax.buy === "number" && tax.buy > 10
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {!!buy_tax ? (Number(buy_tax) * 100).toFixed(1) : "- "}%
                  </span>
                  Buy
                </div>
                <div className="border border-white rounded-lg p-1">
                  <span
                    className={`mr-1 font-semibold ${
                      typeof tax.sell === "number" && tax.sell > 10
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {!!sell_tax ? (Number(sell_tax) * 100).toFixed(1) : "- "}%
                  </span>
                  Sell
                </div>
              </div>
            </ListItem>

            <ListItem className="w-full flex flex-col">
              <div className="w-full">Total Supply</div>
              <div className="w-full font-bold ">
                {total_supply
                  ? Number(total_supply).toLocaleString("en-US")
                  : "-"}
              </div>
            </ListItem>

            <ListItem className="w-full flex flex-col">
              <div className="w-full">Price</div>
              <div className="w-full font-bold ">
                {!!poolPrice?.price && !!decimals
                  ? `$ ${
                      !!Math.abs(+Number(poolPrice?.price).toFixed(decimals))
                        ? Number(poolPrice?.price).toFixed(decimals)
                        : Number(poolPrice?.price).toFixed(18)
                    }`
                  : "-"}
              </div>
            </ListItem>

            {/* <ListItem className="w-full flex flex-col">
                    <div className="w-full">Circulating Supply</div>
                    <div className="w-full">
                      {tokenInfoResponse?.data?.circulatingSupply
                        ? Number(
                            tokenInfoResponse?.data?.circulatingSupply
                          ).toLocaleString("en-US")
                        : "-"}
                    </div>
                  </ListItem> */}
          </List>
        </div>
      </CardBody>

      <CardFooter className="w-full pt-0 block">
        <div className="w-full mt-2">
          Note: More than 10% is considered a high tax rate, and anything beyond
          50% tax rate means it may not be tradable.
        </div>

        <div className="w-full flex flex-wrap justify-center mx-auto mt-4">
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

      {/* <List spacing={3}>
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
            </CardFooter> */}
    </Card>
  );
};
