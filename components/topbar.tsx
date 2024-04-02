import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const Topbar = () => {
  return (
    <div className=" h-[10%] flex items-center justify-between border-b-2 border-gray-100 p-[1%]">
      <div>
        <div className="text-xl text-[#331900]">livestream</div>
        <div className="text-[#331900]">(00:23:22)</div>
      </div>

      <button className="flex flex-row h-[80%] w-[15%] rounded-lg bg-[#FF7F00] items-center justify-evenly">
        endstream
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Topbar;
