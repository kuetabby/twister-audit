"use client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DownOutlined } from "@ant-design/icons";
import { isAddress } from "ethers/lib/utils";

import { Information } from "./Information";
import Loader from "@/components/Loader";
import { ScanLoader } from "@/components/Loader/Scan";

import useDebounce from "@/hooks/useDebounce";
import { useIsMounted } from "@/hooks/useIsMounted";

import { ChainInfo, ChainList } from "./constants";

import { GoPlusTokenResponse, SupportedChainId } from "./models";

import "./style.css";

interface Props {}

const Scanner: React.FC<Props> = () => {
  const [chainId, setChainId] = useState(SupportedChainId.ETH);
  const [contractAddress, setContractAddress] = useState("");

  const { isOpen: isScan, onOpen: onScan, onClose: offScan } = useDisclosure();
  const isMounted = useIsMounted();
  const toast = useToast();

  const debounceContractAddress = useDebounce(contractAddress, 250);

  const isValidContractAddress = isAddress(debounceContractAddress);
  const isDisabled = !chainId || !contractAddress || !isValidContractAddress;

  useEffect(() => {
    if (debounceContractAddress && !isValidContractAddress) {
      offScan();
    }
  }, [debounceContractAddress]);

  const {
    data: scanTokenResponse,
    // isLoading: isScanTokenLoading,
    isFetching: isScanTokenLoading,
    refetch: scanRefetch,
  } = useQuery<GoPlusTokenResponse, {}>(
    [chainId, isScan, contractAddress],
    async () => {
      const request = await axios.get(`/api/scan`, {
        params: {
          chainId,
          contractAddress,
        },
      });
      const response = await request.data;
      const isEmpty = Object.keys(response?.result).length === 0;

      if (!isEmpty) {
        return Object.values(response?.result)[0];
      }

      return response?.result;
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
      enabled: !!chainId && !!isValidContractAddress && isScan,
      refetchOnWindowFocus: false,
    }
  );

  const onChangeChainId = (id: SupportedChainId) => {
    setChainId(id);
  };

  const onChangeContract = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setContractAddress(value);
  };

  const onResetState = () => {
    offScan();
    setChainId(SupportedChainId.ETH);
    setContractAddress("");
  };

  if (!isMounted) {
    return (
      <div className="scannerpage-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="scannerpage-container">
      {/* <div className="h-6" /> */}
      <div className="h-6 relative" />
      {isScanTokenLoading && <ScanLoader />}
      {!isScanTokenLoading && !scanTokenResponse && (
        <div className="w-full md:w-11/12 lg:w-[85%] mx-auto relative">
          <div className="w-full">
            <div className="text-xl sm:text-3xl !font-extrabold text-white">
              <span className="scanner-title mr-1">Twister Cash</span> Auditor
            </div>
            <div className="text-lg sm:text-xl text-white mt-4 mb-1 w-full md:w-4/5 lg:w-3/5 2xl:w-1/2">
              Conduct comprehensive analyses and audits on smart contracts to
              identify potential errors and vulnerabilities.
            </div>
            <div className="text-lg sm:text-xl text-white">
              Paste the smart contract here !
            </div>
            <div className="w-full h-full flex flex-wrap justify-between">
              <Card className="w-full h-full md:w-4/5 lg:w-3/5 xl:w-1/2 bg-dark-secondary shadow-sunny rounded-lg mt-4">
                <CardBody className="pb-0">
                  <div className="w-full flex flex-wrap justify-between">
                    <div className="w-full sm:w-[35%] lg:w-2/5 flex flex-col">
                      <div className="text-lg text-white">Select Network</div>
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<DownOutlined />}
                          transition="all 0.2s"
                          className="w-full lg:w-11/12 sm:mr-auto mt-2 bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent border border-white text-white"
                        >
                          {chainId ? (
                            <div className="w-full flex items-center">
                              <Image
                                src={
                                  ChainInfo[chainId as keyof typeof ChainInfo]
                                    .logo
                                }
                                alt="chain-logo"
                                className="w-6 h-6"
                              />
                              <div className="ml-3">
                                {
                                  ChainInfo[chainId as keyof typeof ChainInfo]
                                    .code
                                }
                              </div>
                            </div>
                          ) : (
                            "Select"
                          )}
                        </MenuButton>
                        <MenuList className="!min-w-[5em] !max-w-[17.5em] !bg-dark-secondary max-h-[11em] overflow-auto flex flex-wrap">
                          {ChainList.map((item) => (
                            <MenuItem
                              key={item.chainId}
                              className="w-1/2 bg-inherit text-white"
                              onClick={() => onChangeChainId(item.chainId)}
                            >
                              <Box display="flex" alignItems="center">
                                <Image
                                  src={item.logo}
                                  alt="eth-logo"
                                  className="w-6 h-6 mr-2"
                                />
                                <span>{item.code}</span>
                              </Box>
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </div>
                    <div className="w-full sm:w-3/5 flex flex-col mt-3 sm:mt-0">
                      <div className="text-lg text-white">
                        Enter the Contract Address
                      </div>
                      <Input
                        value={contractAddress}
                        onChange={onChangeContract}
                        // className="w-full sm:w-full my-2 py-1 border border-white"
                        className="w-full sm:w-full my-2 py-1 border border-white"
                        color={"white"}
                        isInvalid={
                          !!debounceContractAddress && !isValidContractAddress
                        }
                        placeholder="Contract Address"
                        _placeholder={{
                          textColor: "white",
                        }}
                      />
                      {!!debounceContractAddress && !isValidContractAddress && (
                        <div className="text-center text-red-500 font-semibold">
                          Enter a valid Address
                        </div>
                      )}
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="w-full flex-wrap">
                  <div className="w-full sm:w-60 flex flex-wrap justify-evenly sm:justify-between mx-auto sm:mx-0">
                    <Button
                      className={`w-5/12 sm:w-[45%] h-8 text-white ${
                        isDisabled && "pointer-events-none"
                      }`}
                      colorScheme="blue"
                      onClick={onScan}
                      isDisabled={isDisabled}
                      isLoading={isScanTokenLoading}
                    >
                      Audit
                    </Button>
                    <Button
                      colorScheme="whiteAlpha"
                      className="w-5/12 sm:w-[45%] h-8"
                      onClick={onResetState}
                      isDisabled={isDisabled}
                      isLoading={isScanTokenLoading}
                    >
                      Clear
                    </Button>
                  </div>
                  <div className="mt-4 w-full sm:w-3/4 text-white font-semibold">
                    Please be aware that this tool is not designed for formal
                    auditing purposes. Users are advised to use it with
                    discretion and at their own risk
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      )}
      {!isScanTokenLoading && scanTokenResponse && (
        <Information
          scanResponse={scanTokenResponse}
          chainId={chainId}
          contractAddress={contractAddress}
          scanRefetch={scanRefetch}
          onReset={onResetState}
        />
      )}
    </div>
  );
};

export default Scanner;
