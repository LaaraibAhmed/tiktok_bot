import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Userchat from "@/components/userchat";
import Botchat from "@/components/botchat";
const Chat = () => {
  return (
    <div className="text-[#331900] w-1/3 border-l-2 border-gray-100 flex flex-col ">
      <div className="flex flex-row m-[3%]">
        Chat
        <RiArrowDropDownLine />
      </div>
      <div className="overflow-y-scroll p-[4%]" id="chatscroll">
        <Userchat />
        <Botchat />
        <Userchat />
        <Userchat />
        <Userchat />
        <Userchat />
        <Userchat />
        <Userchat />
        <Botchat />
        <Botchat />
        <Botchat />
        <Botchat />
        <Botchat />
      </div>
    </div>
  );
};

export default Chat;
