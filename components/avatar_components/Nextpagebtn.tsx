"use client";

import Link from "next/link";
import React from "react";

interface Nextpagebtnprops {
  btn_type: string;
}

const Nextpagebtn = (props: Nextpagebtnprops) => {
  return (
    <Link
      className="text-[#663300] font-bold p-[1%] mx-[10%] bg-[#FF7F00] rounded-lg hover:bg-[#ff800092] transition-transform hover:scale-110"
      href={"/dashboard"}
    >
      {props.btn_type}
    </Link>
  );
};

export default Nextpagebtn;
