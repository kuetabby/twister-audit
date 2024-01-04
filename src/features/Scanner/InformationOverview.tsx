import { Card, CardHeader, CardBody, List, ListItem } from "@chakra-ui/react";

import { deadAddress, zeroAddress } from "@/utils/address";

import { GoPlusTokenResponse } from "./models";

interface Props {
  scanResponse: GoPlusTokenResponse;
}

export const InformationOverview: React.FC<Props> = ({ scanResponse }) => {
  const {
    owner_address,
    is_open_source,
    is_anti_whale,
    is_blacklisted,
    is_proxy,
    is_whitelisted,
    is_mintable,
    cannot_sell_all,
    trading_cooldown,
    hidden_owner,
    owner_change_balance,
    honeypot_with_same_creator,
    slippage_modifiable,
    transfer_pausable,
    can_take_back_ownership,
  } = scanResponse;

  const isRenounced =
    owner_address &&
    (owner_address === zeroAddress || owner_address === deadAddress);
  const isOpenSource = !!Number(is_open_source);
  const isAntiWhale = !!Number(is_anti_whale);
  const isSlippageModifiable = !!Number(slippage_modifiable);
  const isHiddenOwner = !!Number(hidden_owner);
  const isTradingCooldown = !!Number(trading_cooldown);
  const isBlacklist = !!Number(is_blacklisted);
  const isWhitelist = !!Number(is_whitelisted);
  const isProxy = !!Number(is_proxy);
  const isMintable = !!Number(is_mintable);
  const isTransferPausable = !!Number(transfer_pausable);
  const isCantSellAll = !!Number(cannot_sell_all);
  const isOwnerChangeBalance = !!Number(owner_change_balance);
  const isTakeBackOwnership = !!Number(can_take_back_ownership);
  const isSameOwnerHoneypot = !!Number(honeypot_with_same_creator);

  return (
    <Card className="w-full h-full bg-dark-secondary rounded-lg text-white shadow-sunny">
      <CardHeader className="pb-0 font-semibold text-xl">
        Contract Security!
      </CardHeader>
      <CardBody>
        <List spacing={3}>
          <ListItem className="flex items-baseline">
            <div className="w-11/12 flex justify-between">
              <div className="w-2/5 sm:w-1/2">Renounced</div>
              <div className="w-1/4 sm:w-2/5 text-right">
                {isRenounced ? "YES" : "NO"}
              </div>
            </div>
            <div
              className={`w-2 h-2 p-2 rounded-full ${
                isRenounced ? "bg-green-500" : "bg-red-500"
              } ml-2`}
            />
          </ListItem>
          <ListItem className="flex items-baseline">
            <div className="w-11/12 flex justify-between">
              <div className="w-2/5 sm:w-1/2">
                Verified contract source code
              </div>
              <div className="w-1/4 sm:w-2/5 text-right">
                {isOpenSource ? "YES" : "NO"}
              </div>
            </div>
            <div
              className={`w-2 h-2 p-2 rounded-full ${
                isOpenSource ? "bg-green-500" : "bg-red-500"
              } ml-2`}
            />
          </ListItem>
          <ListItem className="flex items-baseline">
            <div className="w-11/12 flex justify-between">
              <div className="w-2/5 sm:w-1/2">Is anti whale</div>
              <div className="w-1/4 sm:w-2/5 text-right">
                {isAntiWhale ? "YES" : "NO"}
              </div>
            </div>
            <div
              className={`w-2 h-2 p-2 rounded-full ${
                isAntiWhale ? "bg-green-500" : "bg-red-500"
              } ml-2`}
            />
          </ListItem>
          <ListItem className="flex items-baseline">
            <div className="w-11/12 flex justify-between">
              <div className="w-2/5 sm:w-1/2">Tax modifiable</div>
              <div className="w-1/4 sm:w-2/5 text-right">
                {isSlippageModifiable ? "YES" : "NO"}
              </div>
            </div>
            <div
              className={`w-2 h-2 p-2 rounded-full ${
                !isSlippageModifiable ? "bg-green-500" : "bg-red-500"
              } ml-2`}
            />
          </ListItem>
          <ListItem className="flex items-baseline">
            <div className="w-11/12 flex justify-between">
              <div className="w-2/5 sm:w-1/2">Hidden owner address</div>
              <div className="w-1/4 sm:w-2/5 text-right">
                {isHiddenOwner ? "YES" : "NO"}
              </div>
            </div>
            <div
              className={`w-2 h-2 p-2 rounded-full ${
                !isHiddenOwner ? "bg-green-500" : "bg-red-500"
              } ml-2`}
            />
          </ListItem>
          <ListItem className="flex items-baseline">
            <div className="w-11/12 flex justify-between">
              <div className="w-2/5 sm:w-1/2">Trading cooldown</div>
              <div className="w-1/4 sm:w-2/5 text-right">
                {isTradingCooldown ? "YES" : "NO"}
              </div>
            </div>
            <div
              className={`w-2 h-2 p-2 rounded-full ${
                !isTradingCooldown ? "bg-green-500" : "bg-red-500"
              } ml-2`}
            />
          </ListItem>
          <ListItem className="flex items-baseline">
            <div className="w-11/12 flex justify-between">
              <div className="w-2/5 sm:w-1/2">Has blacklist</div>
              <div className="w-1/4 sm:w-2/5 text-right">
                {isBlacklist ? "YES" : "NO"}
              </div>
            </div>
            <div
              className={`w-2 h-2 p-2 rounded-full ${
                !isBlacklist ? "bg-green-500" : "bg-red-500"
              } ml-2`}
            />
          </ListItem>
          <ListItem className="flex items-baseline">
            <div className="w-11/12 flex justify-between">
              <div className="w-2/5 sm:w-1/2">Has whitelist</div>
              <div className="w-1/4 sm:w-2/5 text-right">
                {isWhitelist ? "YES" : "NO"}
              </div>
            </div>
            <div
              className={`w-2 h-2 p-2 rounded-full ${
                !isWhitelist ? "bg-green-500" : "bg-red-500"
              } ml-2`}
            />
          </ListItem>
          <ListItem className="flex items-baseline">
            <div className="w-11/12 flex justify-between">
              <div className="w-2/5 sm:w-1/2">Proxy found</div>
              <div className="w-1/4 sm:w-2/5 text-right">
                {isProxy ? "YES" : "NO"}
              </div>
            </div>
            <div
              className={`w-2 h-2 p-2 rounded-full ${
                !isProxy ? "bg-green-500" : "bg-red-500"
              } ml-2`}
            />
          </ListItem>
          <ListItem className="flex items-baseline">
            <div className="w-11/12 flex justify-between">
              <div className="w-2/5 sm:w-1/2">Mint function</div>
              <div className="w-1/4 sm:w-2/5 text-right">
                {isMintable ? "YES" : "NO"}
              </div>
            </div>
            <div
              className={`w-2 h-2 p-2 rounded-full ${
                !isMintable ? "bg-green-500" : "bg-red-500"
              } ml-2`}
            />
          </ListItem>
          <ListItem className="flex items-baseline">
            <div className="w-11/12 flex justify-between">
              <div className="w-2/5 sm:w-1/2">Transfer pausable</div>
              <div className="w-1/4 sm:w-2/5 text-right">
                {isTransferPausable ? "YES" : "NO"}
              </div>
            </div>
            <div
              className={`w-2 h-2 p-2 rounded-full ${
                !isTransferPausable ? "bg-green-500" : "bg-red-500"
              } ml-2`}
            />
          </ListItem>
          <ListItem className="flex items-baseline">
            <div className="w-11/12 flex justify-between">
              <div className="w-2/5 sm:w-1/2">Can't sell all</div>
              <div className="w-1/4 sm:w-2/5 text-right">
                {isCantSellAll ? "YES" : "NO"}
              </div>
            </div>
            <div
              className={`w-2 h-2 p-2 rounded-full ${
                !isCantSellAll ? "bg-green-500" : "bg-red-500"
              } ml-2`}
            />
          </ListItem>
          <ListItem className="flex items-baseline">
            <div className="w-11/12 flex justify-between">
              <div className="w-2/5 sm:w-1/2">Creator has honeypot</div>
              <div className="w-1/4 sm:w-2/5 text-right">
                {isSameOwnerHoneypot ? "YES" : "NO"}
              </div>
            </div>
            <div
              className={`w-2 h-2 p-2 rounded-full ${
                !isSameOwnerHoneypot ? "bg-green-500" : "bg-red-500"
              } ml-2`}
            />
          </ListItem>
          <ListItem className="flex items-baseline">
            <div className="w-11/12 flex justify-between">
              <div className="w-2/5 sm:w-1/2">
                Owner contract can modify balance
              </div>
              <div className="w-1/4 sm:w-2/5 text-right">
                {isOwnerChangeBalance ? "YES" : "NO"}
              </div>
            </div>
            <div
              className={`w-2 h-2 p-2 rounded-full ${
                !isOwnerChangeBalance ? "bg-green-500" : "bg-red-500"
              } ml-2`}
            />
          </ListItem>
          <ListItem className="flex items-baseline">
            <div className="w-11/12 flex justify-between">
              <div className="w-2/5 sm:w-1/2">
                Owner can take back ownership
              </div>
              <div className="w-1/4 sm:w-2/5 text-right">
                {isTakeBackOwnership ? "YES" : "NO"}
              </div>
            </div>
            <div
              className={`w-2 h-2 p-2 rounded-full ${
                !isTakeBackOwnership ? "bg-green-500" : "bg-red-500"
              } ml-2`}
            />
          </ListItem>
        </List>
      </CardBody>
    </Card>
  );
};
