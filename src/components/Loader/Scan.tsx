import React from "react";

import "./style.css";

interface Props {}

export const ScanLoader: React.FC<Props> = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center mx-auto overflow-hidden">
      <div className="flex justify-center items-center relative w-60 lg:w-80 h-60 lg:h-80">
        <div className="absolute border-[0.75em] border-t-transparent rounded-full border-solid border-secondary h-full w-full animate-spin"></div>
        {/* <div className="absolute border-[0.75em] border-b-transparent rounded-full border-solid border-blue-300 w-3/4 h-3/4 animate-spin"></div> */}
        <h1 className="flex text-white text-xl lg:text-2xl 2xl:text-3xl font-semibold">
          Auditing
          <div className="loading-pulse">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </h1>
      </div>
    </div>
  );
};
