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

import {
  DexToolsPoolPriceResponse,
  DexToolsTokenInfoResponse,
  SupportedChainId,
} from "./models";
import { ChartDownIcon, ChartUpIcon } from "@/utils/Icon/Chart";

interface Props {
  dex: any;
  chainId: string;
  poolPriceResponse?: DexToolsPoolPriceResponse;
  tokenInfoResponse?: DexToolsTokenInfoResponse;
}

export const InformationTrade: React.FC<Props> = ({
  dex,
  chainId,
  poolPriceResponse,
  tokenInfoResponse,
}) => {
  const info = ChainInfo[chainId as keyof typeof ChainInfo];
  const poolPrice = poolPriceResponse?.data;

  return (
    <Card className="w-full h-full bg-dark-secondary rounded-lg text-white mb-6 mt-2 sm:mt-0 shadow-sunny">
      <CardBody className="w-full flex flex-wrap justify-between">
        {/* <div className="w-full xs:w-1/2">
          <div className="font-semibold text-xl">Liquidity</div>
        </div> */}

        <div className="w-full">
          <div className="w-full">
            <div className="font-semibold text-xl mt-4 xs:mt-0">Market Cap</div>
            <div className="w-full font-bold mt-1">
              {tokenInfoResponse?.data?.mcap
                ? `$ ${Number(
                    tokenInfoResponse?.data?.mcap.toFixed(2)
                  ).toLocaleString("en-US")}`
                : tokenInfoResponse?.data?.fdv
                ? `$ ${Number(
                    tokenInfoResponse?.data?.fdv.toFixed(2)
                  ).toLocaleString("en-US")}`
                : "-"}
            </div>
          </div>

          <div className="w-full">
            <div className="font-semibold text-xl mt-4">Pair</div>
            {dex && Boolean(dex.length) ? (
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
                {shortenAddress(dex[0].pair)}
              </Link>
            ) : (
              "-"
            )}
          </div>

          <div className="w-full">
            <div className="font-semibold text-xl mt-4">Last 24 Hours</div>
            <div className="max-w-[20em] flex flex-wrap justify-between mt-2">
              <div className="w-1/2">
                {poolPrice?.buys24h ? (
                  <>
                    <ChartUpIcon
                      className="mr-1"
                      style={{ fontSize: "1.25em" }}
                    />
                    {poolPrice?.buys24h} Buys
                  </>
                ) : (
                  "-"
                )}
              </div>
              <div className="w-1/2">
                {poolPrice?.sells24h ? (
                  <>
                    <ChartDownIcon
                      className="mr-1"
                      style={{ fontSize: "1.25em" }}
                    />
                    {poolPrice?.sells24h} Sells
                  </>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </div>
        </div>
      </CardBody>

      {/* <CardHeader className="pb-0 font-semibold text-xl">Project</CardHeader> */}
    </Card>
  );
};
