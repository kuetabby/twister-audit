import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";

import UserGroup from "@/assets/logo-user-group.png";

import { shortenAddress } from "@/utils/address";

import { Dex, Holder } from "./models";

interface Props {
  dex: Dex[];
  holders: Holder[];
  holder_count: string;
  chainExplorer: string;
  extraClass?: string;
}

export const InformationTable: React.FC<Props> = ({
  dex,
  holder_count,
  holders,
  chainExplorer,
  extraClass,
}) => {
  const detectLP = (address: string) => {
    if (dex && dex.length) {
      const holder = dex.find(
        (item) => item.pair.toLowerCase() === address.toLowerCase()
      );
      return holder ? (
        <span className="text-xs font-semibold !no-underline ml-1">LP</span>
      ) : (
        ""
      );
    }

    return;
  };

  return (
    <Card
      className={`w-full h-full bg-dark-secondary rounded-lg text-white mt-6 mb-4 sm:mb-0 ${extraClass} shadow-sunny`}
    >
      <CardHeader className="pb-0 text-slate-400">Top 10 Holders</CardHeader>
      <CardBody className="pt-2">
        <div className="flex items-center w-40 mb-2">
          <Image src={UserGroup} alt="user-group" className="w-6 h-6 mr-3" />
          <div className="text-xl font-bold">{holder_count ?? "-"} Holders</div>
        </div>
        <TableContainer>
          <Table variant={"unstyled"}>
            <Thead>
              <Tr>
                <Th className="!text-white">Wallet</Th>
                <Th className="!text-white">Amount</Th>
                <Th className="!text-white">%</Th>
              </Tr>
            </Thead>
            <Tbody>
              {holders &&
                Boolean(holders.length) &&
                holders.map((item, index) => (
                  <Tr key={item.address}>
                    <Td>
                      <span className="!text-sm mr-1">{index + 1}.</span>
                      <Link
                        href={`${chainExplorer}/address/${item.address ?? "-"}`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="w-full text-blue-500 underline underline-offset-4"
                      >
                        {shortenAddress(item.address, 3)}{" "}
                      </Link>
                      {detectLP(item.address)}
                    </Td>
                    <Td>{Number(item.balance).toLocaleString("en-US")}</Td>
                    <Td>{(Number(item.percent) * 100).toFixed(2)} %</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};
