"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDisclosure } from "@chakra-ui/react";
import clsx from "clsx";

import PageTabs from "../PageTabs";

import { montserrat } from "@/utils/font";

import AppLogo from "@/assets/logo-app.png";

import "./style.css";

interface Props {}

const Navbar: React.FC<Props> = () => {
  const {
    isOpen: isScroll,
    onOpen: onOpenScroll,
    onClose: onCloseScroll,
  } = useDisclosure();

  useEffect(() => {
    window?.addEventListener("scroll", handleScroll);
    return () => window?.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e: Event) => {
    const { scrollY } = e.currentTarget as Window;
    if (scrollY > 160) {
      onOpenScroll();
    }
    if (scrollY === 0) {
      onCloseScroll();
    }
  };

  return (
    <div className={clsx("navbar-container", montserrat.className)}>
      <div className={clsx(isScroll ? "navbar-scroll" : "navbar")}>
        <div className="w-1/4 sm:w-[70%] flex items-center">
          <Link
            href="https://twistercash.tech"
            className={`logo-container text-white`}
          >
            <Image
              src={AppLogo}
              alt="mystic-logo"
              className="w-14 lg:w-16 h-14 lg:h-16 rounded-full"
            />
          </Link>
          <PageTabs containterClass="hidden sm:flex ml-2" />
        </div>

        {/* small devices */}
        <div className="sm:hidden w-full text-xl xs:text-3xl font-extrabold navbar-title">
          Twister Cash Audit Tools
        </div>
      </div>
    </div>
  );
};

export default Navbar;
