"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { CopyrightOutlined } from "@ant-design/icons";

import { useIsMounted } from "@/hooks/useIsMounted";

import TwitterLogo from "@/assets/logo-twitter.png";
// import DiscordLogo from "@/assets/logo-discord.png";
import TelegramLogo from "@/assets/logo-telegram.png";
import MediumLogo from "@/assets/logo-medium.png";

import { montserrat } from "@/utils/font";

import "./style.css";

interface Props {}

const AppFooter: React.FC<Props> = () => {
  if (!useIsMounted) {
    return null;
  }

  return (
    <footer
      className={clsx("app-footer bg-dark-fade", montserrat.className)}
      // style={{
      //   background:
      //     "linear-gradient(180deg, rgba(60,60,60,1) 0%, rgba(56,56,56,1) 33%, rgba(68,68,68,1) 66%, rgba(36,36,36,1) 100%)",
      // }}
    >
      <div className="app-footer-wrapper">
        <div className="w-3/4 sm:w-full lg:w-11/12 2xl:w-4/5 flex flex-wrap items-center justify-between lg:justify-center m-auto">
          <div className="w-full lg:w-4/5 flex">
            <Link
              href="https://x.com/Ordinalsfi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/3 flex justify-center items-center mx-auto hover:text-blue-500"
            >
              <Image
                src={TwitterLogo}
                alt="tw-logo"
                className="w-10 lg:w-12 h-10 lg:h-12"
              />
              <div className="hidden sm:block text-xs md:text-sm font-semibold ml-1 sm:ml-2">
                Twitter
              </div>
            </Link>
            <Link
              href="http://medium.com/@ordinalsfi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/3 flex justify-center items-center mx-auto hover:text-blue-500"
            >
              <Image
                src={MediumLogo}
                alt="dc-logo"
                className="w-10 lg:w-12 h-10 lg:h-12 !rounded-full"
              />
              <div className="hidden sm:block text-xs md:text-sm font-semibold ml-1 sm:ml-2">
                Medium
              </div>
            </Link>
            <Link
              href="https://t.me/OrdinalsFi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/3 flex justify-center items-center mx-auto hover:text-blue-500"
            >
              <Image
                src={TelegramLogo}
                alt="tele-logo"
                className="w-10 lg:w-12 h-10 lg:h-12"
              />
              <div className="hidden sm:block text-xs md:text-sm font-semibold ml-1 sm:ml-2">
                Telegram
              </div>
            </Link>
          </div>
        </div>

        <div className="all-reserved">
          <div className="flex items-center my-2">
            <CopyrightOutlined style={{ fontSize: "0.75em" }} />
            <div className="ml-2 text-xs font-semibold">
              2023 <span className="lg:text-sm">OrdinalsFi</span>. All Right
              Reserved.{" "}
              {/* <Link
                href="mailto:locafierc20@locafi.network"
                rel="noopener noreferrer"
                className="font-extrabold underline underline-offset-4 hover:text-blue-500"
              >
                Contact Us
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
