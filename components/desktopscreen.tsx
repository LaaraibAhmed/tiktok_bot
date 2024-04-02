"use client";
import React, { useState } from "react";

const Desktopscreen = () => {
  const [sharescreen, setSharescreen] = useState(false);
  const displayscreen = () => {
    setSharescreen(() => true);
  };

  return (
    <div className="w-[95%] h-[40%] bg-[#663300] m-[2%] text-white rounded-lg flex flex-col items-center justify-center">
      <div className="m-[2%]">you are not displaying anything</div>
      <button
        className="flex flex-row h-[15%] w-[15%] rounded-lg bg-[#FF7F00] items-center justify-evenly"
        onClick={() => displayscreen()}
      >
        {sharescreen ? (
          <span>Screen is shared</span>
        ) : (
          <span>Share the Screen</span>
        )}
      </button>
    </div>
  );
};

export default Desktopscreen;
