import React from "react";
import Desktopscreen from "@/components/desktopscreen";
import Webcamscreen from "./webcamscreen";

const Livescreens = () => {
  return (
    <div className="text-[#331900] w-2/3 flex flex-col items-center">
      <Desktopscreen />
      <Webcamscreen />
    </div>
  );
};

export default Livescreens;
